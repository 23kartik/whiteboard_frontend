import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import DrawingCanvas from './components/DrawingCanvas';
import RoomPage from './components/RoomPage';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {
  const [user, setUser] = useState(null);
  const navigate=useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');

 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} setUser={setUser} onLogout={handleLogout} />
      <div className="flex-1 flex justify-center mt-4">
        <div style={{ marginTop: '60px' }}>
          <Routes>
            <Route
              path="/"
              element={
                  <>
                    {tabValue === 0 && <Login user={user} setUser={setUser} setTabValue={setTabValue}/>}
                    {tabValue === 1 && <Signup  setTabValue={setTabValue}/>}
                  </>
               
              }
            />
            <Route path="/room" element={<RoomPage user={user} />} />
            <Route path="/drawing/:roomID" element={<DrawingCanvas user={user} setUser={setUser} onLogout={handleLogout} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
