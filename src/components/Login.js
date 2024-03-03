import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast messages

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
      toast.success('Signed up successfully!', {
        onClose: () => navigate('/room'), // Redirect to the room page after successful login
      });
      localStorage.setItem('jwtToken', accessToken);
      localStorage.setItem('userEmail', email);
  
      setUser({ email });
  
      console.log('Login successful');
      
    
     
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed. Please check your credentials.'); // Display error message in toast
    }
  };

  const toSignUp = () => {
    setTabValue(1);
  };

  return (
    <div className="flex ">
      {/* Left section */}
      <div className="p-8 login-container">
        <div className="p-6 login-form">
          <Typography variant="h6" className=" login-heading">
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
            className="login-input mt-8"
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

          <button variant="contained" color="primary" fullWidth onClick={handleLogin} className="login-button mt-4">
            Login
          </button>
          <p className="login-text ml-4 mb-2 pt-6 text-center">Not Signed Up? <button onClick={toSignUp}><strong className='text-rose-300'>SignUp</strong></button></p>

        </div>
      </div>
      



      <ToastContainer /> {/* Toast container for displaying messages */}
    </div>
  );
};

export default Login;
