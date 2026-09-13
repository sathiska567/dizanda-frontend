// Fallback content used if the admin API (dizanda-backend) is not reachable.
// Mirrors the seed data in dizanda-backend/src/data/defaultData.js so the site
// looks identical whether or not the admin backend is running.
export const DEFAULT_HOME_CONTENT = {
  hero: {
    backgroundImage:
      'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=1974&auto=format&fit=crop',
    eyebrow: 'Bespoke Ceremony Cakes',
    title: 'Sculptural cakes for the most memorable moments.',
    subtitle:
      'A refined atelier where architectural sugar artistry meets elegant flavor direction for weddings, editorial events, and private celebrations.',
    ctaPrimaryText: 'View Gallery',
    ctaPrimaryLink: '/gallery',
    ctaSecondaryText: 'Book Consultation',
    ctaSecondaryLink: '/contact',
    cardEyebrow: 'Featured Atelier Service',
    cardTitle: 'Editorial Wedding Cakes',
    cardDescription:
      'Elegant tiered compositions with hand-sculpted florals, gold leaf detailing, and signature fillings.',
    cardImages: [
      'https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525257023060-74944f5c8716?q=80&w=600&auto=format&fit=crop',
    ],
  },
  featuredProducts: [
    {
      id: 'default-1',
      name: 'The Noir Marquis',
      flavor: '70% Valrhona Dark Ganache & Espresso',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'default-2',
      name: 'Solstice Blossom',
      flavor: 'Elderflower, Wild Raspberry & Pistachio',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'default-3',
      name: 'Aurelia Crown',
      flavor: 'Champagne Sponge & Salted Praline',
      image: 'https://images.unsplash.com/photo-1525257023060-74944f5c8716?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'default-4',
      name: 'Ivory Structure',
      flavor: 'Vanilla Sponge & Hidden Passionfruit Mousse',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'default-5',
      name: 'Golden Vows',
      flavor: 'Champagne, Almond & Salted Caramel',
      image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'default-6',
      name: 'Golden Cascade',
      flavor: 'Vanilla, Hazelnut & Champagne Praline',
      image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'default-7',
      name: 'Sculpted Garden',
      flavor: 'White Chocolate, Lemon & Lavender',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'default-8',
      name: 'Frosted Romance',
      flavor: 'Vanilla, Strawberry & Hazelnut',
      image: 'https://images.unsplash.com/photo-1523475496153-3d6cc3c08b79?q=80&w=800&auto=format&fit=crop',
    },
  ],
};
