// src/components/Login.js
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../service/api'; // Import the API service

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/api/users/login', {
        email,
        password,
      });

      const { accessToken } = response.data;
      // Store the token in local storage or state
      // Example: localStorage.setItem('accessToken', accessToken);

      // Update user state or perform other actions
      setUser({ email }); // You can include more user information as needed

      console.log('Login successful');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error, e.g., display an error message to the user
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h6">Login</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label="Password"
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Paper>
  );
};

export default Login;
