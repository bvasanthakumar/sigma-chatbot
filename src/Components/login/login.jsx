import { FormControl, InputLabel, OutlinedInput, Typography, InputAdornment, IconButton, TextField, Button, Box, Divider } from '@mui/material';
import logo from '../../assets/logo.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import './login.css';

const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const dividerStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
        marginTop: '20px'
    };

    const lineStyle = {
        flex: 1,
        borderBottom: '1px solid #ddd', // Customize divider line color
        margin: '0 10px', // Spacing around the text
    };

    const textStyle = {
        fontSize: '12px', // Customize font size
        color: '#2E3339', // Customize text color
        whiteSpace: 'nowrap',
    };

    return (
        <div className="login-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className='img-container' >
                <img src={logo} height="58px" width="154px" />
            </div>
            <Typography variant="h5" gutterBottom className='welcome-text' sx={{ mt: 2 }}>
                Welcome
            </Typography>
            <div className='textfield-container'>
                <TextField id="outlined-basic" label="Email address" variant="outlined" autoComplete='off' sx={{ width: '320px', mt: 2 }} />


                <FormControl variant="outlined" sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        sx={{ width: '320px' }}
                        autoComplete='off'
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <Button variant="contained" sx={{ width: '320px', backgroundColor: '#344A9A', color: "#fff", mt: 3, height: '50px' }}>Continue</Button>

                <Box sx={{ mt: 3 }} className='no-account-text'>Don't have an account?  Sign up</Box>

                <div style={dividerStyle}>
                    <div style={lineStyle} />
                    <span style={textStyle}>{'OR'}</span>
                    <div style={lineStyle} />
                </div>
            </div>

            <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                <Button
                    variant="outlined"
                    size="large"
                    display="flex"
                    alignitems="center"
                    justifycontent="center"
                    sx={{
                        width: "320px",
                        height: '50px',
                        borderColor: "#dde3e8",
                        borderWidth: "2px",
                        textAlign: "center",
                        mt: 2,
                        pt: "10px",
                        pb: "10px",
                        "&:hover": {
                            borderColor: "#dde3e8",
                            borderWidth: "2px",
                        },
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <GoogleIcon
                            sx={{
                                color: (theme) => theme.palette.error.main,
                                fontSize: "15px",
                                p: 0,
                                m: 0,
                            }}
                        />
                        <Typography
                            sx={{
                                ml: 1,
                                fontSize: '15px',
                                color: '#2E3339',
                                textTransform: 'none'
                            }}
                        >
                            Continue with Google
                        </Typography>
                    </Box>
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    display="flex"
                    alignitems="center"
                    justifycontent="center"
                    sx={{
                        width: "320px",
                        height: '50px',
                        borderColor: "#dde3e8",
                        borderWidth: "2px",
                        textAlign: "center",
                        mt: 2,
                        pt: "10px",
                        pb: "10px",
                        "&:hover": {
                            borderColor: "#dde3e8",
                            borderWidth: "2px",
                        },
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <MicrosoftIcon
                            sx={{
                                color: (theme) => theme.palette.error.primary,
                                fontSize: "15px",
                                p: 0,
                                m: 0,
                            }}
                        />
                        <Typography
                            sx={{
                                ml: 1,
                                fontSize: '15px',
                                color: '#2E3339',
                                textTransform: 'none'
                            }}
                        >
                            Continue with Microsoft
                        </Typography>
                    </Box>
                </Button>
            </Box>
        </div >
    )
}

export default Login;
