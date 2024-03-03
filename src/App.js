import React, { useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import DrawingCanvas from './components/DrawingCanvas';
import RoomPage from './components/RoomPage';
import HomePage from './components/HomePage';


function App() {
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);



  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');

 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} setUser={setUser} onLogout={handleLogout}  setTabValue={setTabValue}/>
      <div className="flex-1 flex justify-center mt-20">
        <div >
          <Routes>
          <Route path="/" element={<HomePage user={user}/>} />
            <Route
              path="/auth"
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
