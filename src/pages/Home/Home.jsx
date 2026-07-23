import HeroSection from './HeroSection';
import Collections from './Collections';
import Philosophy from './Philosophy';
import FeaturedProducts from './FeaturedProducts';
import ProcessSection from './ProcessSection';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Philosophy />
      <Collections />
      <FeaturedProducts />
      <ProcessSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}