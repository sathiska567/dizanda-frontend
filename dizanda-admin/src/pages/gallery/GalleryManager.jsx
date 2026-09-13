import { useEffect, useState } from 'react';
import { galleryApi } from '../../api/gallery.api';
import Spinner from '../../components/ui/Spinner';
import CategoriesEditor from './CategoriesEditor';
import ItemsEditor from './ItemsEditor';

export default function GalleryManager() {
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    galleryApi.get().then(setGallery);
  }, []);

  if (!gallery) return <Spinner />;

  return (
    <div className="space-y-8">
      <CategoriesEditor categories={gallery.categories} onChange={(categories) => setGallery((g) => ({ ...g, categories }))} />
      <ItemsEditor items={gallery.items} categories={gallery.categories} onChange={(items) => setGallery((g) => ({ ...g, items }))} />
    </div>
  );
}
