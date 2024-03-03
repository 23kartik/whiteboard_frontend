import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';

import api from '../service/api'; // Import the API service
import './Signup.css'; // Import the custom CSS file

const Signup = ({ setTabValue }) => {
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
      toast.success('Signed up successfully!', {
        onClose: () => {
          setTabValue(0);
        }
      });
    } catch (error) {
      console.error('Error during signup:', error);
      // Show error toast
      toast.error('Signup failed. Please try again.');
    }
  };

  const toLogin = () => {
    setTabValue(0);
  };

  return (
    <div className="flex ">
      {/* Left section */}
      <div className="p-8 signup-container">
        <div  className="p-6 signup-form">
          <Typography variant="h6" className="signup-heading">
            Sign Up
          </Typography>
          <input
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="signup-input mt-8"
            required // This attribute makes the input field required
          />
          <input
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="signup-input"
            required // This attribute makes the input field required
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
            className="signup-input"
            required // This attribute makes the input field required
          />
          <button variant="contained"  fullWidth onClick={handleSignup} className="signup-button mt-4">
            Sign Up
          </button>
          <p className="login-text ml-4 mb-2 pt-6 text-center ">Already Signed Up? <button onClick={toLogin}><strong className='text-rose-300'>Login</strong></button></p>

          
          <ToastContainer />
        </div>
      </div>


    </div>
  );
};

export default Signup;
