import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CATEGORIES, PROJECTS } from './projects';

// Public repositories on github.com/daanialmirza5 that the site may link to.
const PUBLIC_REPOS = new Set([
  'SafarSathi', 'ghosttrace', 'datasentinel', 'agentvault', 'SafeJourney', 'followthrough-agent', 'riptide',
  'Rag-forge-ai', 'deep-research-ai', 'sentrix', 'RakshaCall', 'Coolgrid-Webverse', 'EcoSynapse-AI', 'AgriSentinel',
  'InspectEdge', 'lifeline-os', 'SkillGraph', 'gridmind', 'trustledger', 'foodloop', 'EcoLens', 'bid-factory-app',
  'cricket-auction', 'AuraAI', 'IQOO-MAA-AI', 'civicflow', 'FinShield', 'Turfmate',
]);

describe('project data', () => {
  it('has unique ids', () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('links only to public repositories', () => {
    for (const p of PROJECTS) expect(PUBLIC_REPOS, p.id).toContain(p.repo);
  });

  it('ships every referenced screenshot', () => {
    for (const p of PROJECTS.filter((x) => x.image)) {
      expect(existsSync(resolve(__dirname, '../../public', p.image!.slice(1))), p.id).toBe(true);
    }
  });

  it('uses https for every live link and a known category', () => {
    for (const p of PROJECTS) {
      if (p.live) expect(p.live.url.startsWith('https://'), p.id).toBe(true);
      expect(CATEGORIES[p.category], p.id).toBeDefined();
    }
  });

  it('features exactly six projects', () => {
    expect(PROJECTS.filter((p) => p.featured)).toHaveLength(6);
  });
});
