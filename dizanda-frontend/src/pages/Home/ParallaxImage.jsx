import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxImage({ src, alt, className = '', imgClassName = '', strength = 15, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: 1.35 }} className="absolute inset-0 h-full w-full">
        <img src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} />
      </motion.div>
      {children}
    </div>
  );
}
