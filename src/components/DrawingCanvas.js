import React, { useRef,useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import io from 'socket.io-client';


const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const socket = io('http://localhost:5001');


  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const handleCanvasChange = (canvas) => {
    // Emit draw event to the server
    socket.emit('draw', canvas.getSaveData());
  };

  useEffect(() => {
    // Listen for draw events from the server
    socket.on('draw', (data) => {
      // Load the drawing data received from the server
      canvasRef.current.loadSaveData(data, true);
    });

    return () => {
      // Clean up the socket connection
      socket.disconnect();
    };
  }, []);

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
          imgSrc="https://example.com/image.jpg"
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
