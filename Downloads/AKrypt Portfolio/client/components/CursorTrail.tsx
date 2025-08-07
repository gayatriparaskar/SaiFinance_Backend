import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function CursorTrail() {
  // Temporarily disabled to debug framer-motion error
  return null;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  // Early return for touch devices
  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isTouchDevice) {
    return null;
  }

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++
      };

      setMousePosition({ x: e.clientX, y: e.clientY });

      setTrail(prev => {
        const newTrail = [newPoint, ...prev.slice(0, 19)]; // Keep only 20 points
        return newTrail;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Check if the target or any parent is a button or link
      const isInteractive = target.tagName === 'BUTTON' ||
                           target.tagName === 'A' ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.getAttribute('role') === 'button';

      if (isInteractive) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Check if we're leaving an interactive element
      const isInteractive = target.tagName === 'BUTTON' ||
                           target.tagName === 'A' ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.getAttribute('role') === 'button';

      if (isInteractive) {
        setIsHovering(false);
      }
    };

    // Touch device check handled at component level

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);


  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main Cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full border-2 border-purple-400"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.2)' : 'transparent'
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />

      {/* Trail Points */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
          initial={{ scale: 1, opacity: 0.8, x: point.x - 2, y: point.y - 2 }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Hover Effect Particles */}
      {isHovering && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
              initial={{
                scale: 0,
                opacity: 0,
                x: mousePosition.x + Math.cos(i * 60) * 20 - 2,
                y: mousePosition.y + Math.sin(i * 60) * 20 - 2,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: mousePosition.x + Math.cos(i * 60) * 40 - 2,
                y: mousePosition.y + Math.sin(i * 60) * 40 - 2,
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
