import { useState } from 'react';
import './App.css';
import MoodPanel from './MoodPanel.jsx';
import GoalPanel from './GoalPanel.jsx';
import ResourcePanel from './ResourcePanel.jsx';
import { IconBrain, IconMood, IconGoal, IconResource } from './components/IsometricIcons.jsx';

const TABS = [
  { id: 'moods', label: 'Mood logs', Icon: IconMood },
  { id: 'goals', label: 'Goals', Icon: IconGoal },
  { id: 'resources', label: 'Resources', Icon: IconResource },
];

export default function App() {
  const [tab, setTab] = useState('moods');

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-row">
          <div className="brand-mark" aria-hidden="true">
            <IconBrain size={44} />
          </div>
          <div className="header-copy">
            <h1>Mental Mood Tracker</h1>
            <p className="lead">
              When you notice how mood, sleep, and stress shift over time, you can spot trouble earlier, adjust
              habits with purpose, and ask for help before things feel overwhelming. Small honest check-ins add
              up to real resilience.
            </p>
          </div>
        </div>
      </header>

      <nav className="tabs" aria-label="Sections">
        {TABS.map((t) => {
          const Icon = t.Icon;
          return (
            <button
              key={t.id}
              type="button"
              className={tab === t.id ? 'active' : ''}
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
            >
              <span className="tab-icon" aria-hidden>
                <Icon size={26} />
              </span>
              <span className="tab-label">{t.label}</span>
            </button>
          );
        })}
      </nav>

      <main>
        {tab === 'moods' && <MoodPanel />}
        {tab === 'goals' && <GoalPanel />}
        {tab === 'resources' && <ResourcePanel />}
      </main>
    </div>
  );
}
