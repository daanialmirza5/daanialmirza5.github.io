import { useEffect, useRef } from 'react';
import { CATEGORIES, repoUrl, type Project } from '../data/projects';

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="pd-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {project && (
        <article>
          <header className="pd-head">
            <span className="chip" style={{ '--c': CATEGORIES[project.category].color } as React.CSSProperties}>
              {CATEGORIES[project.category].short}
            </span>
            <h2 id="pd-title">{project.name}</h2>
            <p className="pd-tagline">{project.tagline}</p>
            <button type="button" className="pd-close" onClick={onClose} aria-label="Close">
              ×
            </button>
          </header>
          {project.image && <img className="pd-shot" src={project.image} alt={`${project.name} screenshot`} loading="lazy" />}
          <div className="pd-body">
            <p>{project.summary}</p>
            <ul className="pd-highlights">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {project.context && (
              <p className="pd-meta">
                <strong>Context:</strong> {project.context}
              </p>
            )}
            {project.limits && (
              <p className="pd-meta">
                <strong>Current limits:</strong> {project.limits}
              </p>
            )}
            <ul className="stack" aria-label="Technology">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="pd-actions">
              {project.live && (
                <a className="btn btn-primary" href={project.live.url} target="_blank" rel="noreferrer">
                  {project.live.label}
                </a>
              )}
              <a className="btn" href={repoUrl(project)} target="_blank" rel="noreferrer">
                Source on GitHub
              </a>
            </div>
            {project.live?.note && <p className="pd-note">{project.live.note}</p>}
          </div>
        </article>
      )}
    </dialog>
  );
}
