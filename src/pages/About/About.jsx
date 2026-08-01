import { motion } from 'framer-motion';

const TEAM = [
  {
    name: 'Basilu Kekirideniya',
    role: 'Co-Founder & Executive Pastry Architect',
    comment: '"Cake formulation is structural engineering disguised as art. Every tier requires mathematical balance, exact temperature precision, and pure architectural intention."',
    bio: 'Pioneering structural sugar architecture with over a decade of French pastry craft experience. Basilu approaches every cake formulation as fine sculpture.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Elena Rostova',
    role: 'Co-Founder & Creative Design Director',
    bio: 'Bringing high-fashion aesthetics and minimalist botanical artistry into Dizanda’s signature aesthetic palette and custom client bespoke commissions.',
    comment: '"We design for the room, the mood, and the lighting. A wedding centerpiece should feel as personal and refined as a haute couture gown."',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
  }
];

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-luxury-cream text-luxury-charcoal">
      {/* Brand Ethos Hero */}
      <section className="px-4 sm:px-6 md:px-12 max-w-4xl mx-auto text-center mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-extreme text-luxury-muted mb-4"
        >
          Established MMXXIV
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif font-light mb-8 leading-tight"
        >
          Where Haute Couture Meets <br />
          <span className="italic">Confectionary Craft.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xs md:text-sm text-luxury-muted leading-relaxed font-light max-w-xl mx-auto"
        >
          Dizanda was founded with a singular vision: to transcend traditional baking by merging geometric precision, rare global ingredients, and modern sculptural beauty.
        </motion.p>
      </section>

      {/* Founders Section */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-24">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-extreme text-luxury-champagne mb-2">Leadership & Vision</p>
          <h2 className="text-3xl md:text-4xl font-serif font-light">The Founders</h2>
          <div className="w-12 h-[1px] bg-luxury-champagne mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {TEAM.map((person, index) => (
            <motion.div 
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center bg-white/50 border border-luxury-sand/60 p-8 md:p-10 shadow-sm"
            >
              {/* Controlled Image Container */}
              <div className="w-48 h-60 md:w-56 md:h-72 bg-luxury-sand overflow-hidden mb-6 rounded-xs shadow-inner">
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Title & Role */}
              <h3 className="text-2xl font-serif text-luxury-charcoal mb-1">{person.name}</h3>
              <p className="text-[10px] uppercase tracking-extreme text-luxury-champagne mb-4 font-medium">{person.role}</p>
              
              {/* Bio */}
              <p className="text-xs text-luxury-muted leading-relaxed font-light max-w-sm mb-6">
                {person.bio}
              </p>

              {/* Founder Comment Block */}
              <div className="border-t border-luxury-sand/80 pt-6 mt-auto w-full">
                <p className="text-xs font-serif italic text-luxury-charcoal/90 leading-relaxed px-2">
                  {person.comment}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-luxury-sand/40 py-16 px-6 md:px-12 border-y border-luxury-sand/60">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-extreme text-luxury-muted block mb-3">Our Commitment</span>
          <blockquote className="text-xl md:text-2xl font-serif italic text-luxury-charcoal mb-6 leading-relaxed">
            "Every cake is crafted as an ephemeral masterpiece—designed for moments that demand nothing short of perfection."
          </blockquote>
          <div className="w-8 h-[1px] bg-luxury-charcoal/30 mx-auto" />
        </div>
      </section>
    </div>
  );
}