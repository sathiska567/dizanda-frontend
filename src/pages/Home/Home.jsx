import HeroSection from './HeroSection';
import Collections from './Collections';
import Philosophy from './Philosophy';
import FeaturedProducts from './FeaturedProducts';
import EventsSection from './EventsSection';
import ProcessSection from './ProcessSection';
import Testimonials from './Testimonials';
import ReviewSection from './ReviewSection';
import Newsletter from './Newsletter';
import { useAdminContent } from '../../hooks/useAdminContent';
import { DEFAULT_HOME_CONTENT } from './homeContent';

export default function Home() {
  const home = useAdminContent('/home', DEFAULT_HOME_CONTENT);

  return (
    <>
      <HeroSection hero={home.hero} />
      <Philosophy />
      <Collections />
      <FeaturedProducts products={home.featuredProducts} />
      <EventsSection />
      <ProcessSection />
      <Testimonials />
      <ReviewSection />
      <Newsletter />
    </>
  );
}