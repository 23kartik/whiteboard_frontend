import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import ss1 from '../assets/ss1.png';
import ss2 from '../assets/ss2.png';
import ss3 from '../assets/ss3.png';
import ss4 from '../assets/ss4.png';
import ss5 from '../assets/ss5.jpeg';
import ss6 from '../assets/ss6.webp';
import ss7 from '../assets/ss7.png';
import ss8 from '../assets/ss8.png';
import ss9 from '../assets/ss9.jpg';
import ss10 from '../assets/ss10.jpeg';

import s11 from '../assets/s11.avif';
import ss12 from '../assets/ss12.jpeg';
import ss13 from '../assets/ss13.webp';
import ss14 from '../assets/ss14.png';
import ss15 from '../assets/ss15.webp';
import ss16 from '../assets/ss16.png';
import ss17 from '../assets/ss17.jpeg';

export function HeroParallaxDemo() {
  const products = [
    {
      
     
      thumbnail:ss9,
    },
    {

      
      thumbnail:ss2,

    },
    {

     
      thumbnail:ss3,

    },
    {
    
     
      thumbnail:ss4,

    },
    {

     
      thumbnail:ss5,

    },
    {
 
     
      thumbnail:ss6,

    },
    {
   
      
      thumbnail:ss7,

    },
    {
  
 
      thumbnail:ss8,

    },
    {
    
 
      thumbnail:s11,

    },
    {

      thumbnail:ss12,

    },
    {
     
      thumbnail:ss13,

    },
    {
    
     
      thumbnail:ss14,

    },
    {
     
     
      thumbnail:ss15,

    },
    {
    
     
      thumbnail:ss16,

    },
    {
      
    
      thumbnail:ss17,

    },
  ];

  return <HeroParallax products={products} />;
}
