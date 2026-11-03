import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, CATEGORY_ORDER, PROJECTS } from '../data/projects';
import { FallbackEye } from './FallbackEye';
import type { SceneNode } from './scene';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

const NODES: SceneNode[] = PROJECTS.map((p) => ({
  id: p.id,
  name: p.name,
  color: CATEGORIES[p.category].color,
  ring: CATEGORY_ORDER.indexOf(p.category),
  featured: !!p.featured,
}));

export function EyeUniverse({ onSelect }: { onSelect: (id: string) => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'loading' | '3d' | 'fallback'>('loading');
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;

  useEffect(() => {
    if (!hasWebGL()) {
      setMode('fallback');
      return;
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let handle: { dispose: () => void } | undefined;
    import('./scene')
      .then(({ createEyeScene }) => {
        if (disposed || !stage.current || !labels.current) return;
        handle = createEyeScene(stage.current, labels.current, NODES, {
          reducedMotion,
          onSelect: (id) => selectRef.current(id),
        });
        setMode('3d');
      })
      .catch(() => setMode('fallback'));
    return () => {
      disposed = true;
      handle?.dispose();
    };
  }, []);

  return (
    <div className="universe" data-mode={mode}>
      {mode === 'fallback' ? (
        <FallbackEye onSelect={onSelect} />
      ) : (
        <div className="universe-stage" ref={stage} role="img" aria-label="An engineering eye opening, with each project orbiting it, grouped by domain.">
          <div className="universe-labels" ref={labels} />
        </div>
      )}
      <ul className="universe-legend" aria-label="Project domains">
        {CATEGORY_ORDER.map((c) => (
          <li key={c}>
            <span className="dot" style={{ background: CATEGORIES[c].color }} />
            {CATEGORIES[c].label}
          </li>
        ))}
      </ul>
    </div>
  );
}
