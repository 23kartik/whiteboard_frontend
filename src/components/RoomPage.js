import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api'; // Import the axios instance configured with your backend URL
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RoomPage.css'; // Import updated CSS file for styling
import { CardStackDemo } from './CardStackDemo';

function RoomPage({ user }) {
  const [newRoomName, setNewRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);
  const createRoom = async () => {
    try {
      if (newRoomName.trim() !== '') {
         await api.post('/api/users/rooms', { roomId: newRoomName, userEmail: user.email });

        setNewRoomName('');
    
        toast.success('Room created successfully!', {
          onClose: () =>navigate(`/drawing/${newRoomName}`), // Redirect to the room page after successful login
        });
      } else {
        const newRoomName = Math.random().toString(36).substr(2, 9);
        console.log(newRoomName);
         await api.post('/api/users/rooms', {  roomId: newRoomName, userEmail: user.email });
       
        // Clear input field after successful room creation
        setNewRoomName('');
        toast.success('Room created successfully!', {
          onClose: () =>navigate(`/drawing/${newRoomName}`), // Redirect to the room page after successful login
        });
      }
    } catch (error) {
      console.error('Error creating room:', error);
      toast.error('Failed to create room. Please try again.');
    }
  };

  const joinRoom = async () => {
    try {
      if (roomId.trim() !== '') {
         await api.post('/api/users/rooms/join', { roomId, userEmail: user.email });
       
        // Clear input field after successful room joining
        setRoomId('');
        toast.success('Room joined successfully!', {
          onClose: () =>navigate(`/drawing/${roomId}`), // Redirect to the room page after successful login
        });
      } else {
        console.error('Room ID cannot be empty');
        toast.error('Room ID cannot be empty');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      toast.error('Failed to join room. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-[342px] " >
      {/* Left section */}
      <div className="p-8">
       <CardStackDemo />
      </div>
  
      {/* Right section */}
      <div className="room-container p-4">
        <h1 className='heading'>Let's Draw Together!</h1>
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
      <ToastContainer
       />
    </div>
  );
}

export default RoomPage;
