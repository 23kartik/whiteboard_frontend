import React, { useState, useEffect } from 'react';
import { useDraw } from '../hooks/useDraw';
import { ChromePicker } from 'react-color';
import { FaPalette, FaTrashAlt, FaSave } from 'react-icons/fa';
import api from '../service/api';
import { drawLine } from '../utils/drawLine';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001');

const DrawingCanvas = ({ user }) => {
  const [color, setColor] = useState('#000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const createLine = ({ prevPoint, currentPoint, ctx }) => {
    socket.emit('draw-line', { prevPoint, currentPoint, color });
    drawLine({ prevPoint, currentPoint, ctx, color });
  };

  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

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

    socket.on('draw-line', ({ prevPoint, currentPoint, color }) => {
      if (!ctx) return console.log('no ctx here');
      drawLine({ prevPoint, currentPoint, ctx, color });
    });

    socket.on('clear', clear);

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

  useEffect(() => {
    loadDrawing();
  }, []); // Load the drawing when the component mounts

  return (
    <div className='max-h-screen flex items-center justify-center relative'>
    <div className='flex flex-row items-center space-x-4 p-6 relative z-10'>
      <div className='flex flex-col items-center space-y-4 relative'>
        <button
          type='button'
          className='bg-gray-300 p-2 rounded-md border border-gray-400 hover:bg-gray-400'
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <FaPalette />
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
          <FaTrashAlt />
        </button>
        <button
          type='button'
          className='bg-green-400 text-white p-2 rounded-md hover:bg-blue-600'
          onClick={saveDrawing}
        >
          <FaSave />
        </button>
      </div>
      <div className='border rounded-xl shadow-md mt-8' style={{ width: '1365px', height: '635px', background: 'white' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={1365}
          height={635}
        />
      </div>
    </div>
  </div>
  );
};

export default DrawingCanvas;
