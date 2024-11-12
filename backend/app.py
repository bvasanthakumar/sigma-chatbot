from flask import Flask, request, jsonify
import os
import re
from langchain.sql_database import SQLDatabase
from operator import itemgetter
from langchain.chains import create_sql_query_chain
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

app = Flask(__name__)

    # Initialize database connection to sigma_chatbot
current_dir = os.getcwd()
db_path = os.path.join(current_dir, "sigma_chatbot.db")
db = SQLDatabase.from_uri(f"sqlite:///{db_path}")

llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key="AIzaSyAOpOpeZKuwCAiQR_5aM335ILxuoN8Ldd4", convert_system_message_to_human=True, temperature=0.0)
template = '''Given an input question, first create a syntactically correct sqlite query to run, then look at the results of the query and return the {top_k} answer.
    Use the following format:

    Question: "Question here"
    "SQL Query to run"
    SQLResult: "Result of the SQLQuery"
    Answer: "Final answer here"

    Only use the following tables:

    {table_info}.

    Provide SQL query as simple string without any markdown.

    Question: {input}'''

answer_prompt = PromptTemplate.from_template(
    """Given the following user question, corresponding SQL query, and SQL result, answer the user question with detail manner.

    Question: {question}
    {query}
    SQL Result: {result}
    Answer: """
    )
 
@app.route('/api/query', methods=['POST'])
def query_endpoint():
    # Get the question from the request
    data = request.get_json()
    question = data.get("question")
    print(question)
    if not question:
        return jsonify({"error": "Question not provided"}), 400
 

    execute_query = QuerySQLDataBaseTool(db=db)

    # Function to clean up markdown formatting if present
    def clean_query_output(output):
        # Remove markdown code block if exists
        cleaned_output = re.sub(r"```(?:sql)?\n(.*)\n```", r"\1", output, flags=re.DOTALL)
        return cleaned_output.strip()


    prompt = PromptTemplate.from_template(template)

    write_query = create_sql_query_chain(llm, db, prompt)
    # Example usage
    
    raw_output = write_query.invoke({"question": question})
    
    # Clean the output
    cleaned_query = clean_query_output(raw_output)
    
    execute_result = execute_query.invoke({"query": cleaned_query})
    
    # Set up the final answer pipeline
    answer = answer_prompt | llm | StrOutputParser()

    # Pass the cleaned query result into the chain
    chain = (
        RunnablePassthrough.assign(query=lambda x: cleaned_query)
        .assign(result=lambda x: execute_result)
        | answer
    )

    result = chain.invoke({"question": question})
    return jsonify({"question": question, "answer": result})

if __name__ == '__main__':
    app.run(debug=True)

