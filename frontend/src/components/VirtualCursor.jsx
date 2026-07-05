import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useVirtualCursor } from '../hooks/useVirtualCursor';

export const VirtualCursor = () => {
  const { position, hovered, cursorType } = useVirtualCursor();

  // Position motion values
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Springs for smooth drag lag
  const springConfig = { stiffness: 600, damping: 30, mass: 0.4 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position.x, position.y]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  // Determine styles for the retro sticker cursor
  const getCursorStyles = () => {
    switch (cursorType) {
      case 'button':
        return {
          size: 40,
          bg: '#fef08a', // yellow
          label: 'PLAY'
        };
      case 'card':
        return {
          size: 54,
          bg: '#ffedd5', // orange
          label: 'VIEW'
        };
      case 'node':
        return {
          size: 46,
          bg: '#fecdd3', // pink
          label: 'EDIT'
        };
      default:
        return {
          size: 20,
          bg: '#cffafe', // cyan
          label: ''
        };
    }
  };

  const styles = getCursorStyles();

  return (
    <>
      {/* Outer Retro Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border-[3px] border-[#1a1a1a] flex items-center justify-center shadow-[2px_2px_0px_rgba(26,26,26,1)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: styles.size,
          height: styles.size,
          backgroundColor: styles.bg,
        }}
        animate={{
          scale: hovered ? 1.15 : 1.0,
          rotate: hovered ? 45 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {/* Crosshair ticks */}
        <div className="absolute w-[3px] h-[7px] bg-[#1a1a1a] top-0" />
        <div className="absolute w-[3px] h-[7px] bg-[#1a1a1a] bottom-0" />
        <div className="absolute h-[3px] w-[7px] bg-[#1a1a1a] left-0" />
        <div className="absolute h-[3px] w-[7px] bg-[#1a1a1a] right-0" />

        {styles.label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute text-[8px] font-bold tracking-widest text-[#1a1a1a] uppercase font-mono bg-white border-2 border-[#1a1a1a] px-1 rounded shadow-[1px_1px_0px_rgba(26,26,26,1)]"
            style={{ top: styles.size - 6 }}
          >
            {styles.label}
          </motion.span>
        )}
      </motion.div>

      {/* Central Sticker Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100000] rounded-full border-2 border-[#1a1a1a]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          backgroundColor: '#ffb3ba' // pastel pink center
        }}
      />
    </>
  );
};
export default VirtualCursor;
