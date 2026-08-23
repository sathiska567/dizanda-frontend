import { useState } from 'react';
import { Save } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Field, Input, Textarea } from '../../components/ui/Field';
import { aboutApi } from '../../api/about.api';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../context/ToastContext';

export default function IntroPhilosophyEditor({ intro, philosophy, onSaved }) {
  const [introForm, setIntroForm] = useState(intro);
  const [philosophyForm, setPhilosophyForm] = useState(philosophy);
  const [savingIntro, setSavingIntro] = useState(false);
  const [savingPhilosophy, setSavingPhilosophy] = useState(false);
  const toast = useToast();

  // Re-sync each form whenever a fresh value comes down from the parent
  // (e.g. right after a save resolves with the server's response).
  // See https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [syncedIntro, setSyncedIntro] = useState(intro);
  if (syncedIntro !== intro) {
    setSyncedIntro(intro);
    setIntroForm(intro);
  }
  const [syncedPhilosophy, setSyncedPhilosophy] = useState(philosophy);
  if (syncedPhilosophy !== philosophy) {
    setSyncedPhilosophy(philosophy);
    setPhilosophyForm(philosophy);
  }

  const saveIntro = async (e) => {
    e.preventDefault();
    setSavingIntro(true);
    try {
      const saved = await aboutApi.updateIntro(introForm);
      onSaved({ intro: saved });
      toast.success('Brand intro updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSavingIntro(false);
    }
  };

  const savePhilosophy = async (e) => {
    e.preventDefault();
    setSavingPhilosophy(true);
    try {
      const saved = await aboutApi.updatePhilosophy(philosophyForm);
      onSaved({ philosophy: saved });
      toast.success('Philosophy banner updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSavingPhilosophy(false);
    }
  };

  if (!introForm || !philosophyForm) return null;

  return (
    <>
      <Card title="Brand Introduction" description="The opening statement at the top of the About page.">
        <form onSubmit={saveIntro} className="space-y-4">
          <Field label="Eyebrow Label">
            <Input value={introForm.eyebrow} onChange={(e) => setIntroForm((f) => ({ ...f, eyebrow: e.target.value }))} />
          </Field>
          <Field label="Headline">
            <Textarea rows={2} value={introForm.title} onChange={(e) => setIntroForm((f) => ({ ...f, title: e.target.value }))} />
          </Field>
          <Field label="Description">
            <Textarea rows={3} value={introForm.description} onChange={(e) => setIntroForm((f) => ({ ...f, description: e.target.value }))} />
          </Field>
          <div className="flex justify-end">
            <Button type="submit" icon={Save} loading={savingIntro}>Save Introduction</Button>
          </div>
        </form>
      </Card>

      <Card title="Philosophy Banner" description="The quoted commitment statement shown near the bottom of the page.">
        <form onSubmit={savePhilosophy} className="space-y-4">
          <Field label="Label">
            <Input value={philosophyForm.label} onChange={(e) => setPhilosophyForm((f) => ({ ...f, label: e.target.value }))} />
          </Field>
          <Field label="Quote">
            <Textarea rows={3} value={philosophyForm.quote} onChange={(e) => setPhilosophyForm((f) => ({ ...f, quote: e.target.value }))} />
          </Field>
          <div className="flex justify-end">
            <Button type="submit" icon={Save} loading={savingPhilosophy}>Save Philosophy</Button>
          </div>
        </form>
      </Card>
    </>
  );
}
