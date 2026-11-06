export type Category = 'ai' | 'fullstack' | 'robotics' | 'hackathon' | 'research';

export const CATEGORIES: Record<Category, { label: string; short: string; color: string }> = {
  ai: { label: 'Artificial Intelligence', short: 'AI', color: '#3f5bd8' },
  fullstack: { label: 'Full-Stack Development', short: 'Full-stack', color: '#0f9b6c' },
  robotics: { label: 'Robotics & Vision', short: 'Robotics', color: '#d4521a' },
  hackathon: { label: 'Hackathons & Innovation', short: 'Hackathon', color: '#c02662' },
  research: { label: 'Reliability & Research', short: 'Research', color: '#7a4ae0' },
};

export const CATEGORY_ORDER: Category[] = ['research', 'ai', 'fullstack', 'hackathon', 'robotics'];

export interface Project {
  id: string;
  name: string;
  repo: string;
  category: Category;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Only links that were opened and checked. */
  live?: { label: string; url: string; note?: string };
  /** Competition context exactly as stated in the repository. */
  context?: string;
  /** What the project does not do yet, stated plainly. */
  limits?: string;
  image?: string;
  featured?: boolean;
}

const gh = (repo: string) => `https://github.com/daanialmirza5/${repo}`;
export const repoUrl = (p: Project) => gh(p.repo);

export const PROJECTS: Project[] = [
  {
    id: 'safarsathi',
    name: 'SafarSathi',
    repo: 'SafarSathi',
    category: 'fullstack',
    featured: true,
    tagline: 'Recovers a multi-leg trip when one booking breaks.',
    summary:
      'Models an itinerary as a dependency graph. When a flight, train or hotel is disrupted, it propagates the impact to every downstream booking, generates recovery options, ranks them by cost, time and risk, and re-validates the whole plan after one is applied.',
    highlights: [
      'Dependency-graph impact propagation and ranked recovery plans',
      'Deployed end to end: GitHub Pages frontend and FastAPI on Render',
      '504 backend and 244 frontend tests run in CI on every push',
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'],
    live: { label: 'Open the live app', url: 'https://daanialmirza5.github.io/SafarSathi/', note: 'The API may take a minute to wake outside 09:30–23:30 IST.' },
    context: 'Top 10 at HackCelestial 2026 (team entry), grown from my earlier project TripRescue.',
    image: '/shots/safarsathi.webp',
  },
  {
    id: 'ghosttrace',
    name: 'GhostTrace',
    repo: 'ghosttrace',
    category: 'research',
    featured: true,
    tagline: 'Reconstructs a software incident from its logs.',
    summary:
      'Imports JSON or CSV event logs, correlates events through trace ancestry and request IDs, detects error and latency bursts with Poisson tail tests, and ranks root-cause hypotheses with a deterministic score in which every value cites the event IDs behind it.',
    highlights: [
      'Timing alone never creates a causal link; evidence is labelled observed or inferred',
      'Reports “insufficient evidence” instead of guessing',
      'CI covers lint, types, unit tests, Playwright end-to-end and the Docker image',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'TypeScript'],
    live: { label: 'Open the live demo', url: 'https://ghosttrace-f2xy.onrender.com', note: 'Open Import events and load a bundled incident. Free hosting: the first load can take about a minute.' },
    image: '/shots/ghosttrace.webp',
  },
  {
    id: 'datasentinel',
    name: 'DataSentinel',
    repo: 'datasentinel',
    category: 'research',
    featured: true,
    tagline: 'Catches silent data failures before they reach a report.',
    summary:
      'Versions every imported dataset, runs declarative quality rules, detects schema and statistical drift (KS, chi-squared and PSI with effect-size floors), and traces which downstream reports and models are at risk through a lineage graph.',
    highlights: [
      'Fault-injection lab corrupts copies of the data and scores the detectors against hidden ground truth',
      'Every alert explains which rule or test fired and why',
      'CI runs on Python 3.12 and 3.14, plus end-to-end and container checks',
    ],
    stack: ['Python', 'FastAPI', 'pandas', 'SciPy', 'React'],
    live: { label: 'Open the live demo', url: 'https://datasentinel-demo.onrender.com', note: 'Free hosting: the first load can take about a minute while the server wakes.' },
    image: '/shots/datasentinel.webp',
  },
  {
    id: 'agentvault',
    name: 'AgentVault',
    repo: 'agentvault',
    category: 'ai',
    featured: true,
    tagline: 'A checkpoint between an AI agent and its tools.',
    summary:
      'Checks every tool call an agent proposes against a versioned tool registry and a deterministic policy, pauses for human approval when required, records each step in a hash-chained audit trail and replays runs deterministically.',
    highlights: [
      'Reproducible safety evaluations over scripted scenarios',
      'Runs on a laptop: no GPU, no paid API; an LLM adapter is optional',
      'Tool execution happens only against a mock sandbox',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'TypeScript'],
    live: { label: 'Open the live demo', url: 'https://agentvault-191i.onrender.com', note: 'Public sandbox: scripted agents and mock tools. Free hosting: the first load can take about a minute.' },
    limits: 'Outside the public sandbox, access uses one shared API token rather than user accounts.',
    image: '/shots/agentvault.webp',
  },
  {
    id: 'safejourney',
    name: 'SafeJourney',
    repo: 'SafeJourney',
    category: 'fullstack',
    featured: true,
    tagline: 'Closes the loop on maternal and newborn referrals.',
    summary:
      'Tracks a referral from the referring clinic to the receiving hospital and back to community follow-up, with role-based access for doctors, intake coordinators, health workers and administrators, and a QR referral passport.',
    highlights: [
      'Five roles with server-side role checks on the API',
      'Unit and Playwright end-to-end tests in CI',
      'Clinical decisions stay with qualified professionals; the app tracks, it does not diagnose',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Docker'],
    live: { label: 'Open the live app', url: 'https://safejourney-w7dz.onrender.com', note: 'Free hosting: the first load can take about a minute.' },
    context: 'Built as a hackathon MVP.',
    image: '/shots/safejourney.webp',
  },
  {
    id: 'followthrough',
    name: 'FollowThrough',
    repo: 'followthrough-agent',
    category: 'hackathon',
    featured: true,
    tagline: 'Meetings end. Work begins.',
    summary:
      'A voice-first meeting-to-execution agent. You speak the meeting through Wispr Flow; it extracts decisions, owners and deadlines with an LLM on Groq, flags when a team quietly reverses an earlier decision, and executes follow-ups only after approval.',
    highlights: [
      'Live deployment with a guided demo and an auto-playing product tour',
      'Conflict detection against the decision history',
      'Tests for the structured-output repair loop and the API, run in CI',
    ],
    stack: ['Next.js', 'TypeScript', 'Groq', 'Zod'],
    live: { label: 'Open the live app', url: 'https://followthrough-agent.vercel.app' },
    context: "Agentic AI Hackathon '26 (Product Space × Wispr Flow), problem statement 3.",
    image: '/shots/followthrough.webp',
  },
  {
    id: 'riptide',
    name: 'Riptide',
    repo: 'riptide',
    category: 'hackathon',
    tagline: 'Sees an outage before it cascades.',
    summary:
      'Simulates a 20-service system, forecasts cascading failures from EWMA baselines and noisy-OR propagation over the dependency graph, ranks root causes and compares recovery strategies in a live 3D console.',
    highlights: ['Live 3D command center streamed over WebSocket', 'Benchmark page comparing recovery strategies'],
    stack: ['React', 'Three.js', 'FastAPI', 'WebSocket'],
    live: { label: 'Open the live app', url: 'https://riptide-production-d8c4.up.railway.app' },
    context: 'Hackathon project (Software & AI track).',
    image: '/shots/riptide.webp',
  },
  {
    id: 'ragforge',
    name: 'RAGForge',
    repo: 'Rag-forge-ai',
    category: 'ai',
    tagline: 'Multi-tenant retrieval-augmented generation with cited answers.',
    summary:
      'A LangGraph pipeline with query rewriting, hybrid dense and BM25 retrieval on Qdrant, optional reranking and citation checking, behind organization and workspace isolation. An offline harness compares dense, BM25 and reciprocal-rank fusion with MRR and nDCG.',
    highlights: ['Celery ingestion workers for PDF, DOCX and OCR', 'Integration tests against real Postgres, Redis and Qdrant in CI'],
    stack: ['FastAPI', 'LangGraph', 'Qdrant', 'Celery', 'Next.js'],
  },
  {
    id: 'deepresearch',
    name: 'DeepResearch',
    repo: 'deep-research-ai',
    category: 'ai',
    tagline: 'A team of agents that researches, checks and cites.',
    summary:
      'A ten-agent LangGraph pipeline (planner, researcher, retriever, fact-checker, writer, reviewer, citation and others) that produces cited research reports, with swappable local or hosted models.',
    highlights: ['Evaluation harness with a grounding benchmark', 'Runs fully locally with Ollama'],
    stack: ['Python', 'LangGraph', 'FastAPI', 'pgvector', 'Next.js'],
    image: '/shots/deepresearch.webp',
  },
  {
    id: 'sentrix',
    name: 'SENTRIX',
    repo: 'sentrix',
    category: 'ai',
    tagline: 'A valid token is not valid behaviour.',
    summary:
      'Binds each AI agent to a signed role contract (Ed25519 owner and security signatures, tamper detection, versioned change requests) and routes tool calls through a gateway that fails closed.',
    highlights: ['Contract compiler that records the evidence for each inference', 'Separate approver required for every contract change'],
    stack: ['Python', 'FastAPI', 'ONNX Runtime', 'React'],
    live: { label: 'Open the live app', url: 'https://sentrix-production.up.railway.app', note: 'Demo login: priya / sentrix-demo' },
    context: 'D3COY 2026, Round 0.',
    limits: 'The graduated trust-ladder policy engine is not built yet, so every tool call is denied.',
    image: '/shots/sentrix.webp',
  },
  {
    id: 'rakshacall',
    name: 'RakshaCall',
    repo: 'RakshaCall',
    category: 'hackathon',
    tagline: 'Spots a scam while the call is still happening.',
    summary:
      'A privacy-first, browser-only assistant that recognises social-engineering tactics in a live or pasted call transcript in English, Hinglish, Hindi and Marathi, then gives clear safety steps and helplines.',
    highlights: ['Runs entirely on the device; nothing is sent anywhere', 'Runtime observatory shows each detection step as it executes'],
    stack: ['React', 'TypeScript', 'Vite', 'React Flow'],
    live: { label: 'Open the live app', url: 'https://daanialmirza5.github.io/RakshaCall/' },
    context: 'Hackathon project.',
    image: '/shots/rakshacall.webp',
  },
  {
    id: 'coolgrid',
    name: 'CoolGrid',
    repo: 'Coolgrid-Webverse',
    category: 'research',
    tagline: 'Urban heat, explained and simulated.',
    summary:
      'Urban heat-island analysis on a synthetic demo city: XGBoost predictions with SHAP explanations, a physics-informed neural network, what-if interventions and an optimiser for cooling measures.',
    highlights: ['PostGIS-backed spatial API', 'Baseline vs intervention delta analytics'],
    stack: ['PyTorch', 'XGBoost', 'SHAP', 'FastAPI', 'Next.js'],
    context: 'Webverse 2026.',
    limits: 'Uses a clearly labelled synthetic dataset, not satellite data.',
    image: '/shots/coolgrid.webp',
  },
  {
    id: 'ecosynapse',
    name: 'EcoSynapse',
    repo: 'EcoSynapse-AI',
    category: 'ai',
    tagline: 'Ecological decisions grounded in evidence.',
    summary:
      'A deterministic reasoning pipeline over a typed ecological knowledge graph and pgvector retrieval of scientific sources, producing constraint-aware biodiversity interventions with transparent reasoning chains.',
    highlights: ['Red-team tests against hallucinated numbers', 'Claim verification against retrieved excerpts'],
    stack: ['FastAPI', 'NetworkX', 'pgvector', 'React'],
    live: { label: 'Open the live demo', url: 'https://ecosynapse-ai-1.onrender.com', note: 'Free hosting: the first load can take about a minute while the server wakes.' },
    context: 'Darukaa.Earth AI Biodiversity Intelligence Chatbot Challenge.',
    image: '/shots/ecosynapse.webp',
  },
  {
    id: 'agrisentinel',
    name: 'AgriSentinel',
    repo: 'AgriSentinel',
    category: 'robotics',
    tagline: 'Field inspection with a simulated rover.',
    summary:
      'A crop-monitoring dashboard with a YOLO vision lab, field map and telemetry from a software-in-the-loop inspection rover that targets treatment instead of broadcast spraying.',
    highlights: ['Rover localisation and actuator simulation', 'Vision pipeline exportable to ONNX'],
    stack: ['FastAPI', 'Ultralytics YOLO', 'OpenCV', 'React'],
    limits: 'Simulation only; no physical rover is connected.',
    image: '/shots/agrisentinel.webp',
  },
  {
    id: 'inspectedge',
    name: 'InspectEdge',
    repo: 'InspectEdge',
    category: 'robotics',
    tagline: 'Visual inspection with a transparent accept/reject policy.',
    summary:
      'An inspection workflow around a YOLO inference wrapper: image and video preprocessing, bounding-box evidence, a configurable multi-tier decision policy, history and analytics, plus training and export tooling.',
    highlights: ['Decision policy is explicit and configurable', 'pytest and Vitest suites'],
    stack: ['FastAPI', 'Ultralytics YOLO', 'OpenCV', 'React'],
    limits: 'Ships a COCO-pretrained placeholder model; a defect dataset is needed for real defect detection.',
    image: '/shots/inspectedge.webp',
  },
  {
    id: 'lifeline',
    name: 'Lifeline OS',
    repo: 'lifeline-os',
    category: 'fullstack',
    tagline: 'What has to happen next in a patient’s care, and who owns it.',
    summary:
      'A healthcare continuity prototype that tracks referrals, tests and follow-ups as one journey, with an offline operation queue and version-based conflict detection.',
    highlights: ['Audit events recorded for clinical changes', 'Integration tests for authorization and audit coverage'],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'IndexedDB'],
    limits: 'Research prototype on synthetic data; not a medical device.',
    image: '/shots/lifeline.webp',
  },
  {
    id: 'skillgraph',
    name: 'SkillGraph',
    repo: 'SkillGraph',
    category: 'ai',
    tagline: 'Turn what you can prove into what you can become.',
    summary:
      'Scores skills from evidence with recency weighting, walks prerequisite chains to find the gaps for a target role, and runs what-if career simulations.',
    highlights: ['Grounded AI analyst limited to database facts', 'Prompt-injection defences with tests'],
    stack: ['FastAPI', 'SQLAlchemy', 'Next.js', 'React Flow'],
    image: '/shots/skillgraph.webp',
  },
  {
    id: 'gridmind',
    name: 'GridMind',
    repo: 'gridmind',
    category: 'research',
    tagline: 'See where energy is wasted before you spend.',
    summary: 'Building energy analytics on synthetic data: demand forecasting, anomaly and waste detection, and a what-if optimisation lab with human approval.',
    highlights: ['Statistical and rule-based anomaly engines', 'Audit trail for approved recommendations'],
    stack: ['FastAPI', 'statsmodels', 'scikit-learn', 'Next.js'],
    image: '/shots/gridmind.webp',
  },
  {
    id: 'trustledger',
    name: 'TrustLedger',
    repo: 'trustledger',
    category: 'fullstack',
    tagline: 'Cash-flow intelligence for small businesses.',
    summary: 'Turns transactions, invoices and expenses into a cash-flow and runway forecast, with a what-if simulator and stress lab, on synthetic data.',
    highlights: ['Role-based access with HTTP-level authorization tests'],
    stack: ['Next.js', 'TypeScript', 'Prisma'],
  },
  {
    id: 'foodloop',
    name: 'FoodLoop',
    repo: 'foodloop',
    category: 'fullstack',
    tagline: 'Rescue food. Feed communities.',
    summary: 'Connects surplus food from restaurants and events with NGOs and volunteers, with food-safety screening at each step and role dashboards. Runs on demo data with simulated payments.',
    highlights: ['Separate dashboards for donors, NGOs, volunteers and admins'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Leaflet'],
    image: '/shots/foodloop.webp',
  },
  {
    id: 'ecolens',
    name: 'EcoLens',
    repo: 'EcoLens',
    category: 'research',
    tagline: 'Map, measure and explain environmental sites.',
    summary: 'Draw site boundaries on a map, log carbon, biodiversity and vegetation measurements over time, and surface trends and statistical anomalies with PostGIS queries.',
    highlights: ['Spatial queries in PostGIS', 'Transparent EcoScore formula'],
    stack: ['FastAPI', 'PostGIS', 'Mapbox', 'React'],
    image: '/shots/ecolens.webp',
  },
  {
    id: 'bidfactory',
    name: 'BidFactory',
    repo: 'bid-factory-app',
    category: 'hackathon',
    tagline: 'RFP responses that never invent a capability.',
    summary: 'Extracts requirements from an RFP with an LLM, searches the company’s own documents for evidence, drafts answers only from that evidence and flags anything unproven for a person to decide.',
    highlights: ['Measured on 50 labelled requirements: 0 of 20 unsupported ones marked Covered, 25 of 25 Covered labels correct', 'Schema-validated extraction and a check that rejects drafts with unsupported figures'],
    stack: ['FastAPI', 'Groq', 'ONNX', 'React'],
    live: { label: 'Open the live app', url: 'https://bid-factory.onrender.com', note: 'Free hosting: the first request can take about a minute.' },
    context: '1st Prize, RocketRide Buildathon, Mumbai (team entry).',
    image: '/shots/bidfactory.webp',
  },
  {
    id: 'cricketauction',
    name: 'Cricket Auction',
    repo: 'cricket-auction',
    category: 'fullstack',
    tagline: 'A live player auction room.',
    summary: 'Real-time synchronised bidding with purse and squad-slot constraints for organisers and team owners, through Firebase Realtime Database.',
    highlights: ['Concurrent bid conflict resolution with unit tests'],
    stack: ['React', 'Vite', 'Firebase'],
    live: { label: 'Open the live app', url: 'https://cricket-auction-cyan.vercel.app' },
  },
  {
    id: 'aura',
    name: 'Aura',
    repo: 'AuraAI',
    category: 'ai',
    tagline: 'An on-device assistant platform for Android.',
    summary: 'A Kotlin and Jetpack Compose assistant split into 18 Gradle modules, with a deterministic constraint engine that checks tools, permissions, network, battery and AI availability before acting, and pluggable cloud or local LLM providers.',
    highlights: ['Clean-architecture module boundaries', 'ktlint and detekt in CI'],
    stack: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Room'],
  },
  {
    id: 'maai',
    name: 'MaAI',
    repo: 'IQOO-MAA-AI',
    category: 'robotics',
    tagline: 'Maternal risk screening that works offline.',
    summary: 'An offline-first Expo app for frontline health workers: caseload tracking, on-device OCR of lab reports, a camera pallor heuristic and an explainable risk triage.',
    highlights: ['Offline priority sync queue with conflict resolution'],
    stack: ['Expo', 'React Native', 'SQLite', 'Tesseract'],
    limits: 'The pallor heuristic is not clinically validated.',
  },
];

export const projectById = (id: string) => PROJECTS.find((p) => p.id === id);
