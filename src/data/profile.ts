export const PROFILE = {
  name: 'Daanial Mirza',
  role: 'Software Engineer',
  intro:
    'AI & ML engineering student at SIES Graduate School of Technology, Mumbai, and Software Engineer Intern at Orion Innovation.',
  pitch:
    'I build full-stack systems in Python and TypeScript that show how they reach their results: incident reconstruction, data observability, agent safety, retrieval and decision support.',
  education: 'Studying AI & ML engineering at SIES Graduate School of Technology, Mumbai.',
  email: 'daanialmirza@gmail.com',
  github: 'https://github.com/daanialmirza5',
  linkedin: 'https://www.linkedin.com/in/daanialbaig/',
};

export const EXPERIENCE = [
  {
    role: 'Software Engineer Intern',
    org: 'Orion Innovation (India), Mumbai',
    period: 'Aug 2026 – present',
    detail: '',
  },
  {
    role: 'Web & Android Development Intern',
    org: 'DeveloperOnGo Private Limited',
    period: 'Jun – Jul 2023',
    detail: 'Built responsive web pages, assisted with Android development in Java, and integrated REST APIs.',
  },
];

/** Honors exactly as listed on the GitHub profile. */
export const HONORS = [
  { result: '1st Prize', event: 'RocketRide Buildathon, Mumbai', date: 'Aug 2026', project: 'BidFactory', team: true },
  { result: 'Top 10', event: 'HackCelestial', date: 'Sep 2026', project: 'SafarSathi, built on TripRescue', team: true },
  { result: 'National Finalist', event: 'Smart India Hackathon 2025', date: '', project: 'AI-based autonomous drone solution', team: true },
  { result: 'Elimination Round Qualifier', event: 'ISRO Indian Space Robotics Challenge 2026', date: '', project: '', team: true },
];

export const PRINCIPLES = [
  {
    title: 'Show the evidence',
    body: 'Every score, alert or recommendation should point at the data behind it. When the evidence is not there, the system says so instead of guessing.',
  },
  {
    title: 'Deterministic where it matters',
    body: 'Rules, statistics and graphs make the decisions people need to trust; language models explain and draft, behind a provider interface that can be swapped or switched off.',
  },
  {
    title: 'Honest limits',
    body: 'Synthetic data is labelled as synthetic, simulations as simulations, and unfinished features as unfinished, in the README and in the product.',
  },
  {
    title: 'Tested, then shipped',
    body: 'Unit, integration and browser tests run in CI, and the projects that are deployed were opened and checked after every release.',
  },
];

/** Only tools used in at least one public repository. */
export const SKILLS: { area: string; items: string[] }[] = [
  { area: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Kotlin', 'SQL'] },
  { area: 'AI / ML', items: ['LangGraph', 'Qdrant', 'pgvector', 'scikit-learn', 'XGBoost', 'SHAP', 'PyTorch', 'Ultralytics YOLO', 'Groq', 'Ollama'] },
  { area: 'Backend', items: ['FastAPI', 'SQLAlchemy', 'Alembic', 'Celery', 'Express', 'Next.js API routes'] },
  { area: 'Data', items: ['PostgreSQL', 'PostGIS', 'SQLite', 'Redis', 'Prisma', 'Firebase'] },
  { area: 'Frontend & mobile', items: ['React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Jetpack Compose', 'Expo / React Native'] },
  { area: 'Testing & delivery', items: ['pytest', 'Vitest', 'Playwright', 'Docker', 'GitHub Actions', 'Render', 'Railway', 'Vercel'] },
];
