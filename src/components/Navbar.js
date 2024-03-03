import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import logo from "../assets/logo.png"
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import useHistory and useLocation from React Router

const transparentButtonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  borderRadius: '4px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const Navbar = ({ user, setUser, onLogout, setTabValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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

  const handleSignupClick = () => {
    setTabValue(1);
  };

  const handleLoginClick = () => {
    setTabValue(0);
  };

  const handleGetStartedClick = () => {
    // Handle the "Get Started" button click
    // For example, redirect the user to a specific route
    navigate('/auth');
  };

  // Check if the user is on the homepage
  const isHomePage = location.pathname === '/';

  return (
    <AppBar style={{ backgroundColor: '#164863', zIndex: 1000 }}>
      <Toolbar>
        <div variant="h6" style={{ flex: 1}}>
          <Link to="/">
        <img src={logo} alt="DrawSync Logo" style={{ flex: 1, height: '71px',width:'150px' }} />
        </Link>
        </div>

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
              MenuProps={{ PaperProps: { style: { backgroundColor: '#2a3f4d', color: 'white' } } }}
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
          // Conditionally render the buttons based on the route
          isHomePage ? (
            <Button variant="outlined" style={transparentButtonStyle} onClick={handleGetStartedClick}>
              Get Started
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outlined" style={transparentButtonStyle} onClick={handleSignupClick}>
                Signup
              </Button>
              <Button variant="outlined" style={transparentButtonStyle} onClick={handleLoginClick}>
                Login
              </Button>
            </div>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
