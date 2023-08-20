import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import { setUser } from '../reducer/slice/userSlice';

const theme = createTheme();

export default function Login() {
    const baseUrl = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://localhost:3333"
    const dispatch = useDispatch()
    console.log(baseUrl)

    let navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = { email: data.get('email'), password: data.get('password') };

        await fetch(`https://cp-sustainability.herokuapp.com/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'ok') {
                    console.log('data: ', data)
                    sessionStorage.setItem('token', data.token);
                    console.log('data.user: ', data.user[0])
                    sessionStorage.setItem('user', JSON.stringify(data.user[0]))
                    navigate('/home')
                    dispatch(setUser({ user: data.user[0] }))
                    // navigate("/home", { state: { users: data.user.id } })
                } else {
                    alert('login failed',)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='login-container'>
                <CssBaseline />
                <Grid
                    className='home-background'
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className='login-right'>
                        <img className='login-img' src="assets/hacker.png" />
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Username"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </div>
                </Grid>
            </div>
        </ThemeProvider>
    );
}
