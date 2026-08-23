import { motion } from 'framer-motion';

const REVIEWS = [
  {
    id: 1,
    name: 'Amara Fernando',
    role: 'Wedding Client',
    rating: 5,
    review: 'Beyond anything we imagined. Every guest asked who created our cake — it was the true centerpiece of the evening.'
  },
  {
    id: 2,
    name: 'Nadia Perera',
    role: 'Private Event Host',
    rating: 5,
    review: 'The attention to detail and the taste were flawless. Booking Dizanda for our celebrity gala was the best decision we made.'
  },
  {
    id: 3,
    name: 'Rashmi De Silva',
    role: 'Birthday Celebration',
    rating: 5,
    review: 'A true work of art that tasted even better than it looked. The team was professional from consultation to delivery.'
  }
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 justify-center mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${i < rating ? 'fill-luxury-champagne' : 'fill-luxury-sand'}`}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewSection() {
  return (
    <section className="py-24 px-4 sm:px-6 md:px-12 bg-luxury-onyx text-luxury-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-extreme text-luxury-champagne mb-3">Client Reviews</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">Loved by Our Guests</h2>
          <p className="text-xs text-luxury-muted font-light leading-relaxed">
            Real words from the celebrations we've had the honor to be part of.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {REVIEWS.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="border border-luxury-cream/10 p-8 text-center flex flex-col items-center"
            >
              <StarRating rating={r.rating} />
              <p className="text-sm font-light text-luxury-cream/90 leading-relaxed mb-6">
                "{r.review}"
              </p>
              <div>
                <h3 className="text-sm tracking-wide">{r.name}</h3>
                <span className="text-[10px] uppercase tracking-extreme text-luxury-muted">{r.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
