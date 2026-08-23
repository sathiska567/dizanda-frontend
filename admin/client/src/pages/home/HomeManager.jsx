import { useEffect, useState } from 'react';
import { homeApi } from '../../api/home.api';
import Spinner from '../../components/ui/Spinner';
import HeroEditor from './HeroEditor';
import FeaturedProductsEditor from './FeaturedProductsEditor';

export default function HomeManager() {
  const [home, setHome] = useState(null);

  useEffect(() => {
    homeApi.get().then(setHome);
  }, []);

  if (!home) return <Spinner />;

  return (
    <div className="space-y-8">
      <HeroEditor hero={home.hero} onSaved={(hero) => setHome((h) => ({ ...h, hero }))} />
      <FeaturedProductsEditor
        products={home.featuredProducts}
        onChange={(featuredProducts) => setHome((h) => ({ ...h, featuredProducts }))}
      />
    </div>
  );
}
