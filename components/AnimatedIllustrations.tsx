
import React from 'react';
import { motion } from 'framer-motion';

export const HeroOrganicBg = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg className="absolute w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: '#22c55e', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 50 Q 25 30 50 50 T 100 50 V 100 H 0 Z"
          fill="url(#grad1)"
          animate={{
            d: [
              "M0 50 Q 25 30 50 50 T 100 50 V 100 H 0 Z",
              "M0 50 Q 25 70 50 50 T 100 50 V 100 H 0 Z",
              "M0 50 Q 25 30 50 50 T 100 50 V 100 H 0 Z",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0 60 Q 35 40 60 60 T 100 60 V 100 H 0 Z"
          fill="url(#grad1)"
          style={{ opacity: 0.5 }}
          animate={{
            d: [
              "M0 60 Q 35 40 60 60 T 100 60 V 100 H 0 Z",
              "M0 60 Q 35 80 60 60 T 100 60 V 100 H 0 Z",
              "M0 60 Q 35 40 60 60 T 100 60 V 100 H 0 Z",
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>
      
      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-neon-400/20"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const ScannerIllustration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(74, 222, 128, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Scanning Laser Line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-neon-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] z-10"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Target Reticles */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-12 h-12 border-2 border-neon-500 rounded-lg opacity-40"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
         <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-neon-400"></div>
         <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-neon-400"></div>
      </motion.div>

      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-neon-500/30 rounded-full"
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
};

export const AiTreeIllustration = () => {
  // Classic Neuro-Decision Tree Structure
  const nodes = [
    { id: 'root', x: 50, y: 90 }, // Level 0
    { id: 'l1-a', x: 30, y: 65 }, { id: 'l1-b', x: 70, y: 65 }, // Level 1
    { id: 'l2-a', x: 15, y: 40 }, { id: 'l2-b', x: 45, y: 40 }, { id: 'l2-c', x: 55, y: 40 }, { id: 'l2-d', x: 85, y: 40 }, // Level 2
    { id: 'l3-a', x: 15, y: 20 }, { id: 'l3-b', x: 45, y: 20 }, { id: 'l3-c', x: 55, y: 20 }, { id: 'l3-d', x: 85, y: 20 }, // Level 3 Ghost
  ];

  const edges = [
    { from: 'root', to: 'l1-a' }, { from: 'root', to: 'l1-b' },
    { from: 'l1-a', to: 'l2-a' }, { from: 'l1-a', to: 'l2-b' },
    { from: 'l1-b', to: 'l2-c' }, { from: 'l1-b', to: 'l2-d' },
    // Fade out lines extending up
    { from: 'l2-a', to: 'l3-a' }, { from: 'l2-b', to: 'l3-b' },
    { from: 'l2-c', to: 'l3-c' }, { from: 'l2-d', to: 'l3-d' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl z-0 bg-black">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        
        {/* Edges (Static Lines) */}
        {edges.map((edge, i) => {
          const start = nodes.find(n => n.id === edge.from);
          const end = nodes.find(n => n.id === edge.to);
          if (!start || !end) return null;
          
          return (
            <line 
              key={`line-${i}`}
              x1={start.x} y1={start.y}
              x2={end.x} y2={end.y}
              stroke="#a855f7" 
              strokeWidth="0.5" 
              opacity="0.08" // Extremely dim
            />
          );
        })}

        {/* Traveling Signals (Packets) */}
        {edges.map((edge, i) => {
          const start = nodes.find(n => n.id === edge.from);
          const end = nodes.find(n => n.id === edge.to);
          if (!start || !end) return null;

          return (
            <motion.circle
              key={`signal-${i}`}
              r="1"
              fill="#c084fc"
              initial={{ cx: start.x, cy: start.y, opacity: 0 }}
              animate={{ 
                cx: [start.x, end.x],
                cy: [start.y, end.y],
                opacity: [0, 0.3, 0] // Subtle flash
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "linear"
              }}
            />
          );
        })}

        {/* Nodes (Dots) */}
        {nodes.map((node, i) => {
          // Skip level 3 dots to make it fade out
          if (node.id.startsWith('l3')) return null;

          return (
            <motion.circle
              key={`node-${i}`}
              cx={node.x} cy={node.y}
              r="2"
              fill="#581c87"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }} // Subtle breathing
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          );
        })}

      </svg>
    </div>
  );
};
