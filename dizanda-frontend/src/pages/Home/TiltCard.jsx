import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Mouse-tracked 3D tilt wrapper — gives flat product photography a
// hover-responsive, physical "held card" feel without any 3D asset pipeline.
export default function TiltCard({ children, className = '', maxTilt = 14, scale = 1.04 }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 300, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring);
  const scaleSpring = useSpring(1, spring);
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);
  const glareOpacity = useSpring(0, spring);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleEnter() {
    scaleSpring.set(scale);
    glareOpacity.set(0.25);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    scaleSpring.set(1);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ perspective: 1200 }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full w-full will-change-transform"
      >
        {children}
        <motion.div
          style={{
            opacity: glareOpacity,
            background: 'radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.55), transparent 60%)',
            '--gx': glareX,
            '--gy': glareY,
          }}
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
        />
      </motion.div>
    </motion.div>
  );
}
