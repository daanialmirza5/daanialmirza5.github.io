import { useMemo, useState } from 'react';
import { CATEGORIES, CATEGORY_ORDER, PROJECTS, type Category, type Project } from '../data/projects';

type Filter = 'all' | Category;

function Card({ p, onOpen, large }: { p: Project; onOpen: (id: string) => void; large?: boolean }) {
  const cat = CATEGORIES[p.category];
  return (
    <li className={`card${large ? ' card-large' : ''}`} style={{ '--c': cat.color } as React.CSSProperties}>
      <button type="button" className="card-hit" onClick={() => onOpen(p.id)} aria-label={`Open details for ${p.name}`} />
      {p.image ? (
        <img className="card-shot" src={p.image} alt="" loading="lazy" width={1280} height={800} />
      ) : (
        <div className="card-shot card-shot-empty" aria-hidden="true">
          <span>{p.name}</span>
        </div>
      )}
      <div className="card-body">
        <div className="card-meta">
          <span className="chip">{cat.short}</span>
          {p.live && <span className="live">Live demo</span>}
        </div>
        <h3>{p.name}</h3>
        <p className="card-tagline">{p.tagline}</p>
        {large && <p className="card-summary">{p.summary}</p>}
        <ul className="stack" aria-label="Technology">
          {p.stack.slice(0, large ? 5 : 3).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Featured({ onOpen }: { onOpen: (id: string) => void }) {
  const featured = PROJECTS.filter((p) => p.featured);
  return (
    <ul className="featured-grid">
      {featured.map((p) => (
        <Card key={p.id} p={p} onOpen={onOpen} large />
      ))}
    </ul>
  );
}

export function AllProjects({ onOpen }: { onOpen: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const list = useMemo(() => PROJECTS.filter((p) => !p.featured && (filter === 'all' || p.category === filter)), [filter]);
  const filters: Filter[] = ['all', ...CATEGORY_ORDER];
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by domain">
        {filters.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : CATEGORIES[f].label}
          </button>
        ))}
      </div>
      <ul className="project-grid">
        {list.map((p) => (
          <Card key={p.id} p={p} onOpen={onOpen} />
        ))}
        {list.length === 0 && <li className="empty">The featured projects above cover this domain.</li>}
      </ul>
    </>
  );
}
