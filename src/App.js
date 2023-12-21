// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import DrawingCanvas from './components/DrawingCanvas';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    // Clear user information and remove JWT token from local storage
    setUser(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex-1 flex justify-center mt-4">
        <div style={{ maxWidth: '600px', marginTop: '60px' }}>
          {!user && (
            <Paper elevation={3} style={{ margin: '0 auto', padding: '20px' }}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Login" />
                <Tab label="Signup" />
              </Tabs>
              <>
                {tabValue === 0 && <Login setUser={setUser} />}
                {tabValue === 1 && <Signup />}
              </>
            </Paper>
          )}
          {user && <DrawingCanvas user={user} onLogout={handleLogout} />}
        </div>
      </div>
    </div>
  );
}

export default App;
