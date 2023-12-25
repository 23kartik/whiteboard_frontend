import React, { useRef, useEffect, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import io from 'socket.io-client';
import api from '../service/api';

const DrawingCanvas = ({ user }) => {
  const canvasRef = useRef(null);
  const socket = io('http://localhost:5001');
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    let isComponentMounted = true;
  
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
  
        if (isComponentMounted) {
          const drawings = response.data.drawingData.lines;
  
          if (Array.isArray(drawings)) {
            try {
              const saveData = {
                lines: drawings,
                width: response.data.drawingData.width,
                height: response.data.drawingData.height,
              };
  
              setLoadingData(true);
              canvasRef.current.loadSaveData(JSON.stringify(saveData), true);
              setLoadingData(false);
              console.log('Drawing loaded successfully', saveData);
            } catch (loadError) {
              console.error('Error loading drawing:', loadError);
            }
          } else {
            console.error('Invalid format for response.data.drawingData.lines:', drawings);
          }
        }
      } catch (error) {
        console.error('Error loading drawings:', error);
      }
    };
  
    loadDrawings();
  
    const handleDraw = (data) => {
      if (!loadingData) {
        canvasRef.current.loadSaveData(data, true);
      }
    };
  
    socket.on('draw', handleDraw);
  
    return () => {
      isComponentMounted = false;
      socket.off('draw', handleDraw);
      socket.disconnect();
    };
  }, [socket, loadingData, user.email]);
  

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };



  const saveDrawings = async () => {
    try {
      const drawingData = JSON.parse(canvasRef.current.getSaveData());

      // Check if there is any drawing data before making the request
      if (drawingData && drawingData.lines && drawingData.lines.length > 0) {
        const validDrawingData = drawingData.lines.every((line) =>
          line.points.every((point) => point.x !== undefined && point.y !== undefined)
        );

        if (validDrawingData) {
          const email = user.email;
          const payload = {
            email,
            drawingData: JSON.stringify(drawingData),
          };

          const response = await api.post('/api/users/save-drawings', payload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
          });

          console.log('Server Response:', response.data);
        } else {
          console.error('Invalid format for drawingData:', drawingData);
        }
      } else {
        console.warn('No drawing data to save.');
      }
    } catch (error) {
      console.error('Error saving drawing:', error);
    }
  };

  const handleSaveClick = () => {
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
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={clearCanvas}
        >
          Clear Canvas
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
