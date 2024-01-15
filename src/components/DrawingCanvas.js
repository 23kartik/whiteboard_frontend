import React, { useState, useEffect } from 'react';
import { useDraw } from '../hooks/useDraw';
import { ChromePicker } from 'react-color';
import {
  FaPalette,
  FaTrashAlt,
  FaSave,
  FaFileExport,
  FaPencilAlt,
  FaEraser,
  FaPlus,
  FaMinus,
  FaSpinner,
  FaCloudDownloadAlt,
} from 'react-icons/fa';
import Avatar from 'react-avatar';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import api from '../service/api';
import { drawLine } from '../utils/drawLine';
import { io } from 'socket.io-client';


import { useUserContext } from '../UserContext';
const socket = io('http://localhost:5001');


const DrawingCanvas = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevOpen) => !prevOpen);
  };



  const [color, setColor] = useState('#000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [canvasBackground, setCanvasBackground] = useState('#ffffff');
  const [eraserMode, setEraserMode] = useState(false);
  const [newUsers, setNewUsers] = useState([]);

 
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '######';
      // for (let i = 0; i < 6; i++) {
      //   color += letters[Math.floor(Math.random() * 16)];
      // }
      return color;
    };

  

  
  const createLine = ({ prevPoint, currentPoint, ctx }) => {
    const lineColor = eraserMode ? canvasBackground : color;
    const userInitial = user.email.charAt(0);
    socket.emit('draw-line', {
      prevPoint,
      currentPoint,
      color: lineColor,
      lineWidth,
      
    });
    drawLine({ prevPoint, currentPoint, ctx, color: lineColor, lineWidth });
  };
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  useEffect(() => {
    
    socket.emit('new-users',user.email);
    console.log('User Email:', user.email);
    socket.on('update-users', (updatedUsers) => {
      setNewUsers(updatedUsers);
    });

    return () => {
      socket.off('update-users');
    };
  }, [user.email]);

 
  


  const exportDrawing = () => {
    try {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');

      // Set the dimensions of the temporary canvas
      tempCanvas.width = canvasRef.current.width;
      tempCanvas.height = canvasRef.current.height;

      // Draw the background color onto the temporary canvas
      tempCtx.fillStyle = canvasBackground; // Set the background color
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw the current canvas content onto the temporary canvas
      tempCtx.drawImage(canvasRef.current, 0, 0);

      // Use toBlob with a callback to get the Blob data
      tempCanvas.toBlob((blob) => {
        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'drawing.png'; // Set the desired file name and format
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Cleanup
        document.body.removeChild(link);
      });
    } catch (error) {
      console.error('Error exporting drawing:', error);
    }
  };

  const increaseLineWidth = () => {
    setLineWidth((prevWidth) => prevWidth + 10);
  };

  const decreaseLineWidth = () => {
    setLineWidth((prevWidth) => (prevWidth > 1 ? prevWidth - 1 : 1));
  };

  const switchEraserMode = () => {
    setEraserMode((prevMode) => !prevMode);
  };

  

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    socket.emit('client-ready');
    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return;
      socket.emit('canvas-state', canvasRef.current.toDataURL());
    });

    socket.on('canvas-state-from-server', (state) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on('draw-line', ({ prevPoint, currentPoint, color, lineWidth }) => {
      if (!ctx) return console.log('no ctx here');
      drawLine({ prevPoint, currentPoint, ctx, color, lineWidth });
    });

    socket.on('clear', () => {
      clear();
    });
    return () => {
      socket.off('draw-line');
      socket.off('get-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('clear');
    };
  }, [canvasRef]);

  const saveDrawing = async () => {
    try {
      const drawingData = canvasRef.current.toDataURL();
      const email = user.email;
      const payload = {
        email,
        drawingData,
      };
      const response = await api.post('/api/users/save-drawings', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      console.log('Drawing saved successfully', response);
    } catch (error) {
      console.error('Error saving drawing:', error);
    }
  };

  const loadDrawing = async () => {
    try {
      const email = user.email;
      const response = await api.get(`/api/users/load-drawings?email=${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      const { drawingData } = response.data;
      const img = new Image();
      img.src = drawingData;

      img.onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(img, 0, 0);
      };
    } catch (error) {
      console.error('Error loading drawing:', error);
    }
  };

  return (
    <div className='max-h-screen flex items-center justify-center relative'>
      <div className='flex flex-row space-x-4 p-6 relative '>
      
        <div className='flex flex-col items-center space-y-4 fixed left-2 z-10' >
          
          <button
            type='button'
            className={`bg-${eraserMode ? 'gray' : 'blue'}-400 p-2 rounded-md border border-gray-400 hover:bg-gray-400 `}        
                onClick={switchEraserMode}
          >
            {eraserMode ? <FaEraser style={{ fontSize: '.6cm' }} /> : <FaPencilAlt style={{ fontSize: '.6cm' }} />}
          </button>
          <button
            type='button'
            className='bg-gray-300 p-2 rounded-md border border-gray-400 hover:bg-gray-400 '
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <FaPalette style={{ fontSize: '.6cm' }} />
          </button>
          {showColorPicker && (
            <>
              <div
                className='fixed top-0 left-0 w-full h-full bg-black opacity-50'
                onClick={() => setShowColorPicker(false)}
              />
              <div className='absolute top-0 left-full'>
                <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
              </div>
            </>
          )}
          <button
            type='button'
            className='bg-red-400 p-2 rounded-md border border-gray-400 hover:bg-gray-400'
            onClick={() => socket.emit('clear')}
          >
            <FaTrashAlt style={{ fontSize: '.6cm' }} />
          </button>
          <button
            type='button'
            className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-600'
            onClick={loadDrawing}
          >
          <FaCloudDownloadAlt style={{ fontSize: '.6cm' }} />
          </button>
          <button
            type='button'
            className='bg-green-400 text-white p-2 rounded-md hover:bg-blue-600'
            onClick={saveDrawing}
          >
            <FaSave style={{ fontSize: '.6cm' }} />
          </button>
         
          <button
            type='button'
            className='bg-yellow-400 p-2 rounded-md border border-gray-400 hover:bg-gray-400'
            onClick={() => exportDrawing()}
          >
            <FaFileExport style={{ fontSize: '.6cm' }} />
          </button>

          <button
            type='button'
            className='bg-blue-400 p-[6px] rounded-md border border-gray-400 hover:bg-gray-400'
            onClick={increaseLineWidth}
          >
            <FontAwesomeIcon icon={faPaintBrush} style={{ fontSize: '.6cm' }} />
            <FaPlus className='ml-3' style={{ fontSize: '.3cm' }} />
          </button>

          <button
            type='button'
            className='bg-red-400 p-[6px] rounded-md border border-gray-400 hover:bg-gray-400'
            onClick={decreaseLineWidth}
          >
            <FontAwesomeIcon icon={faPaintBrush} style={{ fontSize: '.6cm' }} />
            <FaMinus className='ml-3' style={{ fontSize: '.3cm' }} />
          </button>
        </div>

        <div className='border rounded-[2rem] shadow-xl -mt-5 w-[1055px] h-[685px] left-16 fixed ' style={{ background: canvasBackground }}>


          <canvas className={`${eraserMode ? 'eraser-cursor' : 'pencil-canvas'}` } ref={canvasRef} onMouseDown={onMouseDown} width={1055} height={685} />
        </div>    
        <div className="connected-users fixed top-0 right-0 h-full bg-gradient-to-t from-#FF5733 to-#33FF57 p-4   w-52 overflow-hidden">
  <div className="bookshelf grid grid-cols-2  mt-20 h-full overflow-y-auto">
    {newUsers.map((connectedUser, index) => (
      <div key={`${connectedUser}-${index}`} className="user-card hover:shadow-lg ">
        <div className="user-cover">
          <FaUser className="user-icon" />
        </div>
        <span className="user-name">{connectedUser}</span>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default DrawingCanvas;