import { useEffect, useState } from 'react';

interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

const fmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Most recently pushed public repositories, read live from the GitHub API. */
export function Activity() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch('https://api.github.com/users/daanialmirza5/repos?sort=pushed&per_page=12', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Repo[]) => setRepos(data.filter((r) => !r.fork && r.name !== 'daanialmirza5').slice(0, 6)))
      .catch((e: unknown) => {
        if (!(e instanceof DOMException && e.name === 'AbortError')) setFailed(true);
      });
    return () => ctrl.abort();
  }, []);

  if (failed)
    return (
      <p className="muted">
        Recent activity could not be loaded right now. See it on <a href="https://github.com/daanialmirza5">GitHub</a>.
      </p>
    );
  if (!repos) return <p className="muted" aria-busy="true">Loading recent activity from GitHub…</p>;
  return (
    <ul className="activity">
      {repos.map((r) => (
        <li key={r.name}>
          <a href={r.html_url} target="_blank" rel="noreferrer">
            <span className="activity-name">{r.name}</span>
            <span className="activity-date">Updated {fmt.format(new Date(r.pushed_at))}</span>
          </a>
          {r.description && <p>{r.description}</p>}
          {r.language && <span className="activity-lang">{r.language}</span>}
        </li>
      ))}
    </ul>
  );
}
