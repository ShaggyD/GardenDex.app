import React from 'react';
import { motion } from 'framer-motion';

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ src, alt, className = "", delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={`relative mx-auto w-[300px] h-[610px] ${className}`}
    >
      {/* Outer Shadow Glow */}
      <div className="absolute inset-0 bg-neon-400 blur-3xl opacity-20 rounded-[3rem] transform scale-90 translate-y-4 -z-10"></div>

      {/* Frame Body */}
      <div className="relative w-full h-full bg-gray-900 rounded-[3.5rem] p-3 shadow-2xl border-[6px] border-gray-800 ring-1 ring-white/10">
        
        {/* Buttons */}
        <div className="absolute left-[-8px] top-28 h-8 w-[6px] bg-gray-700 rounded-l-md"></div>
        <div className="absolute left-[-8px] top-40 h-14 w-[6px] bg-gray-700 rounded-l-md"></div>
        <div className="absolute left-[-8px] top-56 h-14 w-[6px] bg-gray-700 rounded-l-md"></div>
        <div className="absolute right-[-8px] top-44 h-20 w-[6px] bg-gray-700 rounded-r-md"></div>

        {/* Screen Container */}
        <div className="relative w-full h-full bg-black rounded-[2.8rem] overflow-hidden">
          
          {/* Dynamic Island / Notch */}
          <div className="absolute top-0 left-0 right-0 h-8 flex justify-center z-20 pt-2">
            <div className="h-7 w-28 bg-black rounded-full flex items-center justify-center space-x-2">
              <div className="w-16 h-4 bg-black rounded-full"></div>
            </div>
          </div>

          {/* Status Bar Time (Fake) */}
          <div className="absolute top-3 left-8 text-[10px] font-bold text-white z-20">9:41</div>
          
          {/* Status Bar Icons (Fake) */}
          <div className="absolute top-3 right-8 flex space-x-1 z-20">
             <div className="w-4 h-3 border border-white/80 rounded-[2px]"></div>
          </div>

          {/* Actual Image */}
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover" 
          />
          
          {/* Screen Glare Reflection */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 pointer-events-none"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneFrame;