import { useEffect, useState } from 'react';
import { aboutApi } from '../../api/about.api';
import Spinner from '../../components/ui/Spinner';
import IntroPhilosophyEditor from './IntroPhilosophyEditor';
import TeamEditor from './TeamEditor';

export default function AboutManager() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    aboutApi.get().then(setAbout);
  }, []);

  if (!about) return <Spinner />;

  return (
    <div className="space-y-8">
      <IntroPhilosophyEditor
        intro={about.intro}
        philosophy={about.philosophy}
        onSaved={(patch) => setAbout((a) => ({ ...a, ...patch }))}
      />
      <TeamEditor team={about.team} onChange={(team) => setAbout((a) => ({ ...a, team }))} />
    </div>
  );
}
