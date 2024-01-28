import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../service/api'; // Import the API service
import './Login.css'; // Import the custom CSS file

const Login = ({ user, setUser, setTabValue }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/room');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const response = await api.post('/api/users/login', {
        email,
        password,
      });
      
      const { accessToken } = response.data;
  
      localStorage.setItem('jwtToken', accessToken);
      localStorage.setItem('userEmail', email);
  
      setUser({ email });
  
      console.log('Login successful');
      navigate('/room');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const toSignUp = () => {
    setTabValue(1);
  };

  return (
    <div className="grid grid-cols-2 gap-[348px] ">
      {/* Left section */}
      <div className="p-8 login-container">
        <div className="p-6 login-form">
          <Typography variant="h6" className="mb-4 login-heading">
            Login
          </Typography>
          <input
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
            required // This attribute makes the input field required
            autoFocus 
            
          />
          <input
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            required // This attribute makes the input field required
            
          />
         <p className="login-text ml-4 mb-2">Not Signed Up? <button onClick={toSignUp}><strong className='text-rose-300'>SignUp</strong></button></p>

          <button variant="contained" color="primary" fullWidth onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      </div>
      
      {/* Right section */}
      <div className="p-8 welcome-section">
        <h1 className="welcome-heading">Welcome Back!</h1>
        <p className="welcome-text">Please login to continue.</p>
      </div>
    </div>
  );
};

export default Login;
