import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../service/api'; // Import the API service
import './Signup.css'; // Import the custom CSS file

const Signup = ({ setTabValue }) => {
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

  const toLogin = () => {
    setTabValue(0);
  };

  return (
    <div className="grid grid-cols-2 gap-[348px] ">
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
            className="signup-input"
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
          <p className="login-text ml-4 mb-2">Already Signed Up? <button onClick={toLogin}><strong className='text-rose-300'>Login</strong></button></p>
          <button variant="contained"  fullWidth onClick={handleSignup} className="signup-button">
            Sign Up
          </button>
          
          <ToastContainer />
        </div>
      </div>

      {/* Right section */}
      <div className="p-8 welcome-section">
        <h1 className="welcome-heading">Welcome to our platform!</h1>
        <p className="welcome-text">Sign up to get started.</p>
      </div>
    </div>
  );
};

export default Signup;
