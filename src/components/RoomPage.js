import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomPage.css'; // Import updated CSS file for styling

function RoomPage({ user }) {
  const [newRoomName, setNewRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const createRoom = () => {
    try {
      if (newRoomName.trim() !== '') {
        navigate(`/drawing/${newRoomName}`);
      } else {
        const newRoomName = Math.random().toString(36).substr(2, 9);
        navigate(`/drawing/${newRoomName}`);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const joinRoom = () => {
    try {
      if (roomId.trim() !== '') {
        navigate(`/drawing/${roomId}`);
      } else {
        console.error('Room ID cannot be empty');
      }
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-[342px]">
      {/* Left section */}
      <div className="p-8">
        <h1 className="text-2xl font-bold">hellcwecocweonvovnern3ign3rnveribv rbverbvoerverovberoverivnerovnerovo</h1>
        <div>
          <h1 className="text-2xl font-bold">hello</h1> 
          <h1 className="text-2xl font-bold">hello</h1>
        </div>
      </div>
  
      {/* Right section */}
      <div className="room-container p-4">
        <h1>Let's Draw Together!</h1>
        <div className="create-room-section">
          <h2>Create New Room</h2>
          <input
            className="room-input"
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Enter Room Name"
          />
          <button className="room-button" onClick={createRoom}>Create Room</button>
        </div>
        <div className="join-room-section">
          <h2>Join Room</h2>
          <div>
            <input
              className="room-input"
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button className="room-button" onClick={joinRoom}>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
}

export default RoomPage;
