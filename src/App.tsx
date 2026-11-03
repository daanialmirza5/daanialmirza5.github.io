import { useCallback, useEffect, useState } from 'react';
import { Activity } from './components/Activity';
import { ProjectDialog } from './components/ProjectDialog';
import { AllProjects, Featured } from './components/Projects';
import { EXPERIENCE, HONORS, PRINCIPLES, PROFILE, SKILLS } from './data/profile';
import { PROJECTS, projectById } from './data/projects';
import { EyeUniverse } from './eye/EyeUniverse';

const HASH_PREFIX = '#project-';

function useProjectRoute() {
  const read = () => (location.hash.startsWith(HASH_PREFIX) ? location.hash.slice(HASH_PREFIX.length) : null);
  const [id, setId] = useState<string | null>(read);
  useEffect(() => {
    const onHash = () => setId(read());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const open = useCallback((next: string) => {
    history.pushState(null, '', HASH_PREFIX + next);
    setId(next);
  }, []);
  const close = useCallback(() => {
    if (location.hash.startsWith(HASH_PREFIX)) history.pushState(null, '', location.pathname + location.search);
    setId(null);
  }, []);
  return { id, open, close };
}

export function App() {
  const route = useProjectRoute();
  const project = route.id ? projectById(route.id) ?? null : null;
  const liveCount = PROJECTS.filter((p) => p.live).length;

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true" />
          {PROFILE.name}
        </a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Software engineer · AI/ML · Full-stack</p>
            <h1>Systems that show how they reach their answers.</h1>
            <p className="lede">{PROFILE.pitch}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">
                See the work
              </a>
              <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
            <p className="hero-hint">Select a project in the orbit to open it. {liveCount} projects have a live demo.</p>
          </div>
          <EyeUniverse onSelect={route.open} />
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-head">
            <p className="eyebrow">Featured work</p>
            <h2 id="work-title">Six projects, end to end</h2>
            <p className="muted">Each one has a real problem, a working implementation, tests in CI and an honest list of what it does not do yet.</p>
          </div>
          <Featured onOpen={route.open} />
        </section>

        <section className="section" aria-labelledby="more-title">
          <div className="section-head">
            <p className="eyebrow">More projects</p>
            <h2 id="more-title">Across AI, reliability, full-stack and robotics</h2>
          </div>
          <AllProjects onOpen={route.open} />
        </section>

        <section className="section approach" id="approach" aria-labelledby="approach-title">
          <div className="section-head">
            <p className="eyebrow">Engineering approach</p>
            <h2 id="approach-title">How I build</h2>
          </div>
          <ol className="principles">
            {PRINCIPLES.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section split" id="experience" aria-labelledby="exp-title">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 id="exp-title">Where I work</h2>
            <ul className="timeline">
              {EXPERIENCE.map((e) => (
                <li key={e.role}>
                  <p className="tl-period">{e.period}</p>
                  <h3>{e.role}</h3>
                  <p className="tl-org">{e.org}</p>
                  {e.detail && <p className="muted">{e.detail}</p>}
                </li>
              ))}
            </ul>
            <p className="muted edu">{PROFILE.education}</p>
          </div>
          <div>
            <p className="eyebrow">Hackathons</p>
            <h2>Honors</h2>
            <ul className="honors">
              {HONORS.map((h) => (
                <li key={h.event}>
                  <p className="honor-result">{h.result}</p>
                  <p className="honor-event">
                    {h.event}{h.date && <span className="muted"> · {h.date}</span>}
                  </p>
                  {(h.project || h.team) && (
                    <p className="muted">
                      {h.project}
                      {h.project && h.team ? ' · ' : ''}
                      {h.team ? 'Team entry' : ''}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="skills-title">
          <div className="section-head">
            <p className="eyebrow">Toolbox</p>
            <h2 id="skills-title">Technologies I have shipped with</h2>
            <p className="muted">Listed only where used in at least one public repository.</p>
          </div>
          <dl className="skills">
            {SKILLS.map((s) => (
              <div key={s.area}>
                <dt>{s.area}</dt>
                <dd>
                  <ul className="stack">
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section" aria-labelledby="activity-title">
          <div className="section-head">
            <p className="eyebrow">GitHub</p>
            <h2 id="activity-title">Recently updated</h2>
          </div>
          <Activity />
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Let’s talk</h2>
          <p className="lede">Open to software engineering roles and internships in backend, full-stack and applied AI.</p>
          <p className="contact-mail">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </p>
          <div className="hero-actions">
            <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © 2026 {PROFILE.name}. Source for this site: <a href="https://github.com/daanialmirza5/daanialmirza5.github.io">daanialmirza5.github.io</a>
        </p>
      </footer>

      <ProjectDialog project={project} onClose={route.close} />
    </>
  );
}
