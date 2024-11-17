import './App.css';
import React from 'react';
import Login from './Components/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Components/home/home';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/home" element={<Home />} />         {/* Default route */}
      <Route path="/" element={<Login />} />   {/* Login route */}
    </Routes>
  </Router>
  );
}

export default App;
