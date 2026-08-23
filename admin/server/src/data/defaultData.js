// Seed content — mirrors what is currently hard-coded on the public site,
// so the admin panel starts out in sync with what visitors already see.
import { createId } from '../utils/id.js';

export function buildDefaultData() {
  return {
    home: {
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
          id: createId(),
          name: 'The Noir Marquis',
          flavor: '70% Valrhona Dark Ganache & Espresso',
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
          order: 1,
        },
        {
          id: createId(),
          name: 'Solstice Blossom',
          flavor: 'Elderflower, Wild Raspberry & Pistachio',
          image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop',
          order: 2,
        },
        {
          id: createId(),
          name: 'Aurelia Crown',
          flavor: 'Champagne Sponge & Salted Praline',
          image: 'https://images.unsplash.com/photo-1525257023060-74944f5c8716?q=80&w=800&auto=format&fit=crop',
          order: 3,
        },
      ],
    },
    about: {
      intro: {
        eyebrow: 'Established MMXXIV',
        title: 'Where Haute Couture Meets Confectionary Craft.',
        description:
          'Dizanda was founded with a singular vision: to transcend traditional baking by merging geometric precision, rare global ingredients, and modern sculptural beauty.',
      },
      philosophy: {
        label: 'Our Commitment',
        quote:
          'Every cake is crafted as an ephemeral masterpiece—designed for moments that demand nothing short of perfection.',
      },
      team: [
        {
          id: createId(),
          name: 'Basilu Kekirideniya',
          role: 'Co-Founder & Executive Pastry Architect',
          bio: 'Pioneering structural sugar architecture with over a decade of French pastry craft experience. Basilu approaches every cake formulation as fine sculpture.',
          comment:
            '"Cake formulation is structural engineering disguised as art. Every tier requires mathematical balance, exact temperature precision, and pure architectural intention."',
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop',
          order: 1,
        },
        {
          id: createId(),
          name: 'Elena Rostova',
          role: 'Co-Founder & Creative Design Director',
          bio: 'Bringing high-fashion aesthetics and minimalist botanical artistry into Dizanda’s signature aesthetic palette and custom client bespoke commissions.',
          comment:
            '"We design for the room, the mood, and the lighting. A wedding centerpiece should feel as personal and refined as a haute couture gown."',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
          order: 2,
        },
      ],
    },
    gallery: {
      categories: [
        { id: createId(), name: 'Cake Structure' },
        { id: createId(), name: 'Golden Wedding Cakes' },
        { id: createId(), name: 'Cup Cakes' },
        { id: createId(), name: 'Brownies' },
      ],
      items: [
        {
          id: createId(),
          title: 'Ivory Structure',
          category: 'Cake Structure',
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
          description: 'Architectural vanilla sponge with delicate sugar panels and hidden passionfruit mousse.',
          availableFlavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Hazelnut'],
          order: 1,
        },
        {
          id: createId(),
          title: 'Golden Vows',
          category: 'Golden Wedding Cakes',
          image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=800&auto=format&fit=crop',
          description: 'Three-tier wedding cake decorated in edible gold, white peonies, and champagne buttercream.',
          availableFlavors: ['Champagne', 'Almond', 'Salted Caramel', 'Lemon'],
          order: 2,
        },
        {
          id: createId(),
          title: 'Rose Petal Cupcakes',
          category: 'Cup Cakes',
          image: 'https://images.unsplash.com/photo-1549047026-2c1a62c0b13c?q=80&w=800&auto=format&fit=crop',
          description: 'Mini cupcakes topped with cream cheese frosting, rose petals, and a hint of raspberry.',
          availableFlavors: ['Vanilla', 'Chocolate', 'Strawberry', 'Matcha'],
          order: 3,
        },
        {
          id: createId(),
          title: 'Brownie Bliss Box',
          category: 'Brownies',
          image: 'https://images.unsplash.com/photo-1516685018646-549d7e8d76d0?q=80&w=800&auto=format&fit=crop',
          description: 'Decadent chocolate brownies with toasted nuts, sea salt, and caramel drizzle.',
          availableFlavors: ['Classic Chocolate', 'Salted Caramel', 'Espresso', 'Nutella'],
          order: 4,
        },
        {
          id: createId(),
          title: 'Golden Cascade',
          category: 'Golden Wedding Cakes',
          image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop',
          description: 'Grand wedding cake with gold leaf accents, sugar orchids, and layered hazelnut praline.',
          availableFlavors: ['Vanilla', 'Hazelnut', 'Champagne', 'Strawberry'],
          order: 5,
        },
        {
          id: createId(),
          title: 'Sculpted Garden',
          category: 'Cake Structure',
          image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',
          description: 'Modern sculpted cake with edible blooms, mirror glaze, and chiffon sponge tiers.',
          availableFlavors: ['White Chocolate', 'Lemon', 'Lavender', 'Coconut'],
          order: 6,
        },
        {
          id: createId(),
          title: 'Frosted Romance',
          category: 'Cup Cakes',
          image: 'https://images.unsplash.com/photo-1523475496153-3d6cc3c08b79?q=80&w=800&auto=format&fit=crop',
          description: 'A floral cupcake collection with buttercream swirls and delicate sugar petals.',
          availableFlavors: ['Vanilla', 'Strawberry', 'Chocolate', 'Hazelnut'],
          order: 7,
        },
        {
          id: createId(),
          title: 'Caramel Brownies',
          category: 'Brownies',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
          description: 'Chewy brownies layered with caramel and topped with sea salt crystals.',
          availableFlavors: ['Classic Chocolate', 'Caramel', 'Espresso', 'Nutella'],
          order: 8,
        },
      ],
    },
    orders: [],
    admins: [],
  };
}
