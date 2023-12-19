import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../service/api'; // Import the API service

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await api.post('/api/users/register', {
        username,
        email,
        password,
      });

      // Handle signup success
      console.log('Signup successful:', response.data);

      // Show success toast
      toast.success('Signed up successfully!');


    } catch (error) {
      console.error('Error during signup:', error);
      // Handle signup error, e.g., display an error message to the user
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h6">Sign Up</Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        aria-label="Username"
      />
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
      <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
        Sign Up
      </Button>

     
      <ToastContainer />
    </Paper>
  );
};

export default Signup;
