// src/components/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


const transparentButtonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
    border: '1px solid rgba(255, 255, 255, 0.2)', // Semi-transparent white border
    color: 'white',
    borderRadius: '4px', // Adjust the border radius as needed
    backdropFilter: 'blur(10px)', // Apply blur for glass effect
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Apply a subtle shadow
  };
  
const Navbar = ({ user }) => {
  return (
    <AppBar style={{ backgroundColor: '#164863', zIndex: 1000  }}>
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          Whiteboard
        </Typography>
        {user ? (
          // Show user icon if signed in
          <IconButton edge="end" color="inherit">
            <Avatar>{user.username.charAt(0)}</Avatar>
          </IconButton>
        ) : (
          // Show signup/login buttons if not signed in
          <div className="flex space-x-2">
            <Button
              variant="outlined"
              style={transparentButtonStyle}
            >
              Signup
            </Button>
            <Button
              variant="outlined"
              style={transparentButtonStyle}
              
            >
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
