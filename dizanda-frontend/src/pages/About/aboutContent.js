// Fallback content used if the admin API (dizanda-backend) is not reachable.
// Mirrors the seed data in dizanda-backend/src/data/defaultData.js.
export const DEFAULT_ABOUT_CONTENT = {
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
      id: 'default-1',
      name: 'Basilu Kekirideniya',
      role: 'Co-Founder & Executive Pastry Architect',
      comment:
        '"Cake formulation is structural engineering disguised as art. Every tier requires mathematical balance, exact temperature precision, and pure architectural intention."',
      bio: 'Pioneering structural sugar architecture with over a decade of French pastry craft experience. Basilu approaches every cake formulation as fine sculpture.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'default-2',
      name: 'Elena Rostova',
      role: 'Co-Founder & Creative Design Director',
      bio: 'Bringing high-fashion aesthetics and minimalist botanical artistry into Dizanda’s signature aesthetic palette and custom client bespoke commissions.',
      comment:
        '"We design for the room, the mood, and the lighting. A wedding centerpiece should feel as personal and refined as a haute couture gown."',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    },
  ],
};
