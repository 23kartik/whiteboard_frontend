import React, { useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import io from 'socket.io-client';
import api from '../service/api'; // Make sure to use the correct path

const DrawingCanvas = ({ user }) => {
  const canvasRef = useRef(null);
  const socket = io('http://localhost:5001');

  useEffect(() => {
 const loadDrawings = async () => {
  try {
    const response = await api.get('/api/users/load-drawings', {
      params: {
        email: user.email,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(response.data.drawingData);

    const drawings = response.data.drawingData;
    drawings.forEach((drawingData) => {
      try {
        // Parse the JSON string in drawingData.data
        const drawing = JSON.parse(drawingData.data);
    
        // Check if the parsed drawing has lines property
        if (drawing && drawing.lines) {
          console.log("hello");
          const saveData = {
            lines: drawing.lines,
            brushColor: drawing.brushColor || '#000000',
            brushRadius: drawing.brushRadius || 5,
          };
    
          canvasRef.current.loadSaveData(JSON.stringify(saveData), true);
        } else {
          console.error('Invalid format for drawingData:', drawingData);
        }
      } catch (error) {
        console.error('Error parsing drawing data:', error);
      }
    });
  } catch (error) {
    console.error('Error loading drawings:', error);
  }
};


    loadDrawings();

    socket.on('draw', (data) => {
      canvasRef.current.loadSaveData(data, true);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const handleCanvasChange = (canvas) => {
    socket.emit('draw', canvas.getSaveData());
  
    const saveDrawings = async () => {
      try {
        const drawingData = JSON.parse(canvas.getSaveData());
    
        // Log the drawingData for debugging
    
        // Check if drawingData has lines property and it is an array
        if (drawingData && drawingData.lines && Array.isArray(drawingData.lines)) {
          // Ensure that each point in lines has x and y coordinates
          const validDrawingData = drawingData.lines.every((line) =>
            line.points.every((point) => point.x !== undefined && point.y !== undefined)
          );
    
          if (validDrawingData) {
            const email = user.email; // Assuming user.email is defined
            const payload = {
              email,
              drawingData: JSON.stringify(drawingData), // Stringify the drawing data
            };
               
    
            // Send the API request
            const response = await api.post('/api/users/save-drawings', payload, {

              headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
              },
            });
    
            // Log the server response
            console.log('Server Response:', response.data);
          } else {
            console.error('Invalid format for drawingData:', drawingData);
          }
        } else {
          console.error('Invalid format for drawingData:', drawingData);
        }
      } catch (error) {
        console.error('Error saving drawing:', error);
      }
    };
    
  
    saveDrawings();
  };
  
  

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Artistic Drawing Canvas</h2>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <CanvasDraw
          ref={canvasRef}
          canvasWidth={398}
          canvasHeight={500}
          brushColor="#4CAF50"
          brushRadius={3}
          lazyRadius={1}
          onChange={handleCanvasChange}
          gridColor="#DDD"
          backgroundColor="#F5F5F5"
          hideGrid={true}
          disabled={false}
          enablePanAndZoom={true}
          zoomExtents={{ min: 0.5, max: 3 }}
          clampLinesToDocument={true}
          immediateLoading={false}
          gridSizeX={25}
          gridSizeY={25}
          gridLineWidth={1}
          hideGridX={false}
          hideGridY={false}
          className="custom-canvas-class"
          style={{ border: '2px solid #4CAF50', borderRadius: '4px' }}
        />
      </div>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={clearCanvas}
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default DrawingCanvas;