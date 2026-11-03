import { CATEGORIES, PROJECTS } from '../data/projects';

/** Static version of the hero for devices without WebGL. */
export function FallbackEye({ onSelect }: { onSelect: (id: string) => void }) {
  const featured = PROJECTS.filter((p) => p.featured);
  return (
    <div className="fallback-eye">
      <svg viewBox="0 0 200 200" role="img" aria-label="A mechanical eye with an open aperture">
        <defs>
          <radialGradient id="fe-iris" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2fd0de" />
            <stop offset="45%" stopColor="#14637a" />
            <stop offset="100%" stopColor="#0a1622" />
          </radialGradient>
          <linearGradient id="fe-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eef1f5" />
            <stop offset="100%" stopColor="#aeb7c3" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="url(#fe-metal)" stroke="#8d97a5" strokeWidth="3" />
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i / 72) * Math.PI * 2;
          const r1 = i % 6 === 0 ? 76 : 80;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * 85}
              y2={100 + Math.sin(a) * 85}
              stroke="#3a4552"
              strokeWidth="1"
            />
          );
        })}
        <circle cx="100" cy="100" r="44" fill="url(#fe-iris)" stroke="#27313d" strokeWidth="5" />
        <circle cx="100" cy="100" r="16" fill="#050a10" />
        <circle cx="94" cy="94" r="3.5" fill="#fff" />
      </svg>
      <ul className="fallback-list">
        {featured.map((p) => (
          <li key={p.id}>
            <button type="button" onClick={() => onSelect(p.id)}>
              <span className="dot" style={{ background: CATEGORIES[p.category].color }} />
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
