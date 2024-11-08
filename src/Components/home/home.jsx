import * as React from 'react';
import logo from '../../assets/logo.png';
import sample from '../../assets/sample.png';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Button, Divider, IconButton, List, ListItemButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid2';

import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import EastIcon from '@mui/icons-material/East';

const drawerWidth = 310;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const Home = () => {
    const [open, setOpen] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [showSuggestions, setShowSuggestions] = React.useState(true);
    const [conversation, setConversation] = React.useState([
        {
            id: 1,
            title: 'Conversation 1',
            date: new Date(),
            messages: [
                {
                    type: 'user',
                    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                },
                {
                    type: 'bot',
                    message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
                }
            ]
        }
    ]);
    const [context, setContexts] = React.useState([])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (event, item) => {
        setSelectedIndex(item.id);
        setContexts(item.messages);
        setShowSuggestions(false);
    };

    const handleNewChat = () => {
        setShowSuggestions(true);
        setSelectedIndex(null)
    }

    const handleSend = () => {}

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#F9F9F9',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Box sx={{
                    height: 'calc(100vh - 70px)', overflowY: 'scroll',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ mt: 3 }}>
                        <Box>
                            <img src={logo} height="58px" width="154px" />
                        </Box>
                        <Button
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                width: "286px",
                                height: '44px',
                                borderColor: "#dde3e8",
                                borderWidth: "2px",
                                mt: 2,
                                "&:hover": {
                                    borderColor: "#dde3e8",
                                    borderWidth: "2px",
                                },
                                backgroundColor: '#fff'
                            }}
                            onClick={handleNewChat}
                        >
                            <Box display="flex" alignItems="center">
                                <AddIcon
                                    sx={{
                                        color: '#000',
                                        fontSize: "14px",
                                        p: 0,
                                        m: 0,
                                        fontWeight: 600
                                    }}
                                />
                                <Typography
                                    sx={{
                                        ml: 1,
                                        fontSize: '14px',
                                        color: '#000',
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    New Chat
                                </Typography>
                            </Box>
                        </Button>
                    </Box>
                    <Box sx={{ mt: 2, px: 2 }}>
                        {conversation?.map((e) => {
                            return (
                                <Box>
                                    <Typography variant='caption'>{(e.date).toISOString().slice(0, 10)}</Typography>
                                    <List component="nav">
                                        <ListItemButton
                                            sx={{
                                                backgroundColor: selectedIndex === e.id ? '#FFF1DC' : 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderRadius: '6px',
                                                py: 1.5
                                            }}
                                            onClick={(event) => handleListItemClick(event, e)}
                                        >
                                            <Box display={'flex'} alignItems={'center'}>
                                                <IconButton sx={{ py: 0, pr: 1, pl: 0, m: 0, color: '#000' }}>
                                                    <ChatBubbleOutlineIcon sx={{ fontSize: '16px' }} />
                                                </IconButton>
                                                <Typography variant='body2' sx={{ color: '#000', fontWeight: 500 }}>{e.title}</Typography>
                                            </Box>
                                            <Box display={'flex'} alignItems={'center'}>
                                                <IconButton sx={{ py: 0, pr: 1, pl: 0, m: 0, color: '#000' }}>
                                                    <EditOutlinedIcon sx={{ fontSize: '16px' }} />
                                                </IconButton>
                                                <IconButton sx={{ py: 0, pr: 1, pl: 0, m: 0, color: '#000' }}>
                                                    <DeleteOutlineIcon sx={{ fontSize: '16px' }} />
                                                </IconButton>
                                            </Box>
                                        </ListItemButton>
                                    </List>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
                <List>
                    <ListItemButton
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '6px',
                            py: 1.5,
                        }}
                    >
                        <Box display={'flex'} alignItems={'center'}>
                            <IconButton sx={{ py: 0, pr: 1, pl: 0, m: 0, color: '#000' }}>
                                <MenuRoundedIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                            <Typography variant='body2' sx={{ color: '#000', fontWeight: 500 }}>Other Options</Typography>
                        </Box>

                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '6px',
                        }}
                    >
                        <Box display={'flex'} alignItems={'center'}>
                            <AutoAwesomeRoundedIcon sx={{ fontSize: '16px', border: '1px solid #B4B4B4', borderRadius: '50%', mr: 1, height: '30px', width: '30px', p: 0.5 }} />
                            <Typography variant='caption' sx={{ color: '#B4B4B4', fontWeight: 400 }}>Get version 2.2, and more</Typography>
                        </Box>

                    </ListItemButton>
                </List>
            </Drawer>
            <Main open={open}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} padding={2}>
                    <Box>
                        {open ? <IconButton sx={{ padding: 0, margin: 0 }} onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton> : <IconButton sx={{ padding: 0, margin: 0 }} onClick={handleDrawerOpen}>
                            <ChevronRightIcon />
                        </IconButton>}

                    </Box>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant='body2' fontWeight={600} sx={{ px: 1.5 }}>Nicolas</Typography>
                        <img src="https://th.bing.com/th/id/OIP.2DZWT7N1zAjnQSgue9K57gHaHa?w=217&h=216&c=7&r=0&o=5&dpr=1.4&pid=1.7" height={30} width={30} style={{ borderRadius: '50%' }} />

                    </Box>
                </Box>
                <Divider />
                <Box padding={2} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    <Box sx={{
                        height: 'calc(100vh - 187px)', width: 762, overflowY: 'scroll',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        py: 1
                    }}>
                        {showSuggestions ?
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ height: '100%' }}>
                                <Typography variant='body1' fontWeight={600} sx={{ my: 1 }}>Suggestions</Typography>
                                <Grid container spacing={2} sx={{ width: '100%' }}>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ cursor: 'pointer' }}>
                                        <Box sx={{ backgroundColor: '#344A9A', borderRadius: '5px', color: '#fff', p: 1.5 }}>
                                            <Typography variant='body2' align='center'>“Explain quantum computing in simple terms” <EastIcon sx={{ fontSize: '12px' }} /></Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box> :
                            <>
                                {context && context.length > 0 &&
                                    <Box>
                                        {context.map((e) => {
                                            return (

                                                e.type === 'user' ?
                                                    <Box display={'flex'} flexDirection={'column'}>
                                                        <Box display={'flex'} alignItems={'center'} sx={{ pb: 2 }}>
                                                            <img src="https://th.bing.com/th/id/OIP.2DZWT7N1zAjnQSgue9K57gHaHa?w=217&h=216&c=7&r=0&o=5&dpr=1.4&pid=1.7" height={30} width={30} style={{ borderRadius: '50%' }} />
                                                            <Typography variant='body2' fontWeight={600} sx={{ px: 1.5 }}>You</Typography>
                                                        </Box>
                                                        <Typography sx={{ marginBottom: 2 }}>
                                                            {e.message}
                                                        </Typography>
                                                    </Box> :
                                                    <Box display={'flex'} flexDirection={'column'}>
                                                        <Box display={'flex'} alignItems={'center'} sx={{ pb: 2 }}>
                                                            <img src={sample} height={30} width={30} style={{ borderRadius: '50%' }} />
                                                            <Typography variant='body2' fontWeight={600} sx={{ px: 1.5 }}>Sigma Bot</Typography>
                                                        </Box>
                                                        <Typography sx={{ marginBottom: 2 }}>
                                                            {e.message}
                                                        </Typography>
                                                    </Box>

                                            )
                                        })}


                                    </Box>
                                }
                            </>
                        }
                    </Box>

                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 762, background: 'transparent', boxShadow: 'none', border: '1px solid #ccc', height: '48px', mt: 2 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Type your message here..."
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton onClick={handleSend} sx={{
                            p: '10px', mx: '10px', my: 1, background: '#344A9A', color: '#fff', height: '30px', width: '30px', borderRadius: '8px',
                            '&:hover': { background: '#344A9A', color: '#fff', }
                        }}>
                            <ArrowUpwardRoundedIcon />
                        </IconButton>
                    </Paper>
                    <Typography variant='caption' sx={{ pt: 1, color: '#B4B4B4' }}>Sigma paints AI Chat Version V1</Typography>
                </Box>
            </Main>
        </Box>
    )
}

export default Home;