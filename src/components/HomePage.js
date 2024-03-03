import React, { useState, useEffect } from 'react';
import { HeroParallaxDemo} from './HeroParallaxDemo'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';

const HomePage = ({user}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/room');
    }
  }, [user, navigate]);
  return (
    <div style={{ marginTop:"-.5cm", backgroundColor: '#101010' }}>   
      <HeroParallaxDemo />
    </div>
  );
}

export default HomePage;
