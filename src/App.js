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

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar user={user} />
    <div className="flex-1 flex justify-center mt-4">
      <div  style={{ maxWidth: '600px', marginTop: '60px' }}>
        
        <Paper elevation={3} style={{ margin: '0 auto', padding: '20px' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          {!user && (
            <>
              {tabValue === 0 && <Login setUser={setUser} />}
              {tabValue === 1 && <Signup />}
            </>
          )}
          {user && <DrawingCanvas />}
        </Paper>
      </div>
    </div>
  </div>
  
  );
}

export default App;
