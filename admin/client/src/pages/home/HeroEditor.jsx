import { useState } from 'react';
import { Save } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ImageUpload from '../../components/ui/ImageUpload';
import { Field, Input, Textarea } from '../../components/ui/Field';
import { homeApi } from '../../api/home.api';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../context/ToastContext';

export default function HeroEditor({ hero, onSaved }) {
  const [form, setForm] = useState(hero);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  // Re-sync the form whenever a fresh hero object comes down from the
  // parent (e.g. right after a save resolves with the server's response).
  // See https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [syncedHero, setSyncedHero] = useState(hero);
  if (syncedHero !== hero) {
    setSyncedHero(hero);
    setForm(hero);
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const updateCardImage = (index) => (url) =>
    setForm((f) => {
      const images = [...f.cardImages];
      images[index] = url;
      return { ...f, cardImages: images };
    });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await homeApi.updateHero(form);
      onSaved(saved);
      toast.success('Hero section updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (!form) return null;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <Card title="Hero Banner" description="The full-width section visitors see first on the home page.">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Field label="Eyebrow Label">
              <Input value={form.eyebrow} onChange={update('eyebrow')} />
            </Field>
            <Field label="Headline">
              <Textarea rows={2} value={form.title} onChange={update('title')} />
            </Field>
            <Field label="Subtitle">
              <Textarea rows={3} value={form.subtitle} onChange={update('subtitle')} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Primary Button Text">
                <Input value={form.ctaPrimaryText} onChange={update('ctaPrimaryText')} />
              </Field>
              <Field label="Primary Button Link">
                <Input value={form.ctaPrimaryLink} onChange={update('ctaPrimaryLink')} />
              </Field>
              <Field label="Secondary Button Text">
                <Input value={form.ctaSecondaryText} onChange={update('ctaSecondaryText')} />
              </Field>
              <Field label="Secondary Button Link">
                <Input value={form.ctaSecondaryLink} onChange={update('ctaSecondaryLink')} />
              </Field>
            </div>
          </div>

          <ImageUpload label="Background Image" value={form.backgroundImage} onChange={(url) => setForm((f) => ({ ...f, backgroundImage: url }))} aspect="aspect-[4/3]" />
        </div>
      </Card>

      <Card title="Featured Service Card" description="The highlighted card overlaid on the hero banner.">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Field label="Eyebrow Label">
              <Input value={form.cardEyebrow} onChange={update('cardEyebrow')} />
            </Field>
            <Field label="Title">
              <Input value={form.cardTitle} onChange={update('cardTitle')} />
            </Field>
            <Field label="Description">
              <Textarea rows={3} value={form.cardDescription} onChange={update('cardDescription')} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload label="Image 1" value={form.cardImages?.[0]} onChange={updateCardImage(0)} aspect="aspect-square" />
            <ImageUpload label="Image 2" value={form.cardImages?.[1]} onChange={updateCardImage(1)} aspect="aspect-square" />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" icon={Save} loading={saving}>Save Hero Section</Button>
      </div>
    </form>
  );
}
