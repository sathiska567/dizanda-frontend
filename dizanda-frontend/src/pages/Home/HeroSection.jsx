
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DEFAULT_HOME_CONTENT } from './homeContent';

export default function HeroSection({ hero = DEFAULT_HOME_CONTENT.hero }) {
  const [cardImage1, cardImage2] = hero.cardImages || [];
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-luxury-sand">
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url('${hero.backgroundImage}')`, y: bgY, scale: 1.15 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-sand/70 via-luxury-cream/80 to-luxury-cream/100" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="text-center lg:text-left"
          >
            <p className="text-sm uppercase tracking-extreme text-luxury-charcoal/70 mb-4">{hero.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-tight text-luxury-charcoal mb-6">
              {hero.title}
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-base md:text-lg text-luxury-charcoal/80 leading-relaxed mb-8">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to={hero.ctaPrimaryLink}
                className="inline-flex items-center justify-center rounded-full border border-luxury-charcoal bg-luxury-charcoal px-6 py-3 text-sm uppercase tracking-[0.32em] text-luxury-cream transition hover:bg-luxury-onyx"
              >
                {hero.ctaPrimaryText}
              </Link>
              <Link
                to={hero.ctaSecondaryLink}
                className="inline-flex items-center justify-center rounded-full border border-luxury-charcoal bg-white/90 px-6 py-3 text-sm uppercase tracking-[0.32em] text-luxury-charcoal transition hover:bg-luxury-cream"
              >
                {hero.ctaSecondaryText}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="rounded-[2rem] border border-luxury-sand bg-white/90 p-6 shadow-2xl backdrop-blur-sm"
          >
            <p className="text-xs uppercase tracking-extreme text-luxury-muted mb-3">{hero.cardEyebrow}</p>
            <h2 className="text-2xl font-serif text-luxury-charcoal mb-4">{hero.cardTitle}</h2>
            <p className="text-base text-luxury-charcoal/80 leading-relaxed mb-6">
              {hero.cardDescription}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {cardImage1 && (
                <div className="rounded-3xl overflow-hidden bg-luxury-sand h-36">
                  <img src={cardImage1} alt={hero.cardTitle} className="w-full h-full object-cover" />
                </div>
              )}
              {cardImage2 && (
                <div className="rounded-3xl overflow-hidden bg-luxury-sand h-36">
                  <img src={cardImage2} alt={hero.cardTitle} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
