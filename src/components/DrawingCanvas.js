import React, { useState,useEffect } from 'react';
import { useDraw } from '../hooks/useDraw';
import { ChromePicker } from 'react-color';
import api from '../service/api';
import { drawLine } from '../utils/drawLine'
import { io } from 'socket.io-client'
const socket = io('http://localhost:5001')



const DrawingCanvas = ({user}) => {

  const [color, setColor] = useState('#000');
  const [lineWidth,setLineWidth]=useState(5);
  const createLine = ({ prevPoint, currentPoint, ctx }) => {
    socket.emit('draw-line', { prevPoint, currentPoint, color });
    drawLine({ prevPoint, currentPoint, ctx, color });
  };
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  useEffect(()=>{
    const ctx = canvasRef.current?.getContext('2d');

    socket.emit('client-ready');

    socket.on('get-canvas-state',()=>{
      if (!canvasRef.current?.toDataURL()) return
      console.log('sending canvas state')
      socket.emit('canvas-state', canvasRef.current.toDataURL())
    })

    socket.on('canvas-state-from-server', (state) => {
      console.log('I received the state')
      const img = new Image()
      img.src = state
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on('draw-line',({prevPoint,currentPoint,color})=>{
      if (!ctx) return console.log('no ctx here');
      drawLine({ prevPoint, currentPoint, ctx, color });
    })

    socket.on('clear', clear);

    return () => {
      console.log('Cleaning up DrawingCanvas');
      socket.off('draw-line')
      socket.off('get-canvas-state')
      
      socket.off('canvas-state-from-server')
      socket.off('clear')
    }
  },[canvasRef]);



  const saveDrawing = async () => {
    try {
      const drawingData = canvasRef.current.toDataURL();
      const email = user.email;
          const payload = {
            email,
            drawingData,
          };
      // console.log("drawing data is this :",payload) // Get the drawing data as a data URL
      const response = await api.post('/api/users/save-drawings', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      console.log('Drawing saved successfully',response);
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
      // console.log("Drawing from the server:",response.data);
      const { drawingData } = response.data;
      const img = new Image();
      img.src = drawingData;

      img.onload = () => {
        // console.log('Image loaded successfully');
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
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
    <div className='flex flex-col gap-10 pr-10'>
      <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
      <button type='button' className='p-2 rounded-md border border-black'  onClick={() => socket.emit('clear')}>
        Clear canvas
      </button>
      <button type='button' className='p-2 rounded-md border border-black' onClick={saveDrawing}>
        Save canvas
      </button>
    </div>
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      width={750}
      height={750}
      className='border border-black rounded-md'
    />
  </div>
  );
};

export default DrawingCanvas;
