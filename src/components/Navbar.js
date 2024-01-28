import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

const transparentButtonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  borderRadius: '4px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const Navbar = ({ user, setUser, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    console.log("6");
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail && !user && !initialized) {
      setUser({ email: storedEmail });
      setInitialized(true);
    }
  }, [user, setUser, initialized]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
  };
  const handleClick=()=>{
    navigate('/');
  };

  return (
    <AppBar style={{ backgroundColor: '#164863', zIndex: 1000 }}>
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          Whiteboard
        </Typography>
        {user ? (
          <>
            <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
              <Avatar>{user.email.charAt(0)}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Avatar>{user.email.charAt(0)}</Avatar>
                  <div className="ml-2">
                    <Typography variant="subtitle1">{user.email}</Typography>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <Button variant="outlined" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </Menu>
          </>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outlined" style={transparentButtonStyle} onClick={handleClick}>
              Signup
            </Button>
            <Button variant="outlined" style={transparentButtonStyle} onClick={handleClick}>
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
