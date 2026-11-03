# daanialmirza5.github.io

Source for my portfolio at **[daanialmirza5.github.io](https://daanialmirza5.github.io/)**.

The opening scene is a mechanical eye built with Three.js: its aperture opens, and every project leaves it to settle on an orbit for its domain (AI, reliability and research, full-stack, hackathons, robotics and vision). Selecting a project opens its details, screenshot, live demo and source.

## How it is built

| Part | Choice |
| --- | --- |
| App | React 18, TypeScript, Vite |
| 3D | Three.js, written directly (no React Three Fiber), loaded as a separate chunk after first paint |
| Styling | Plain CSS with design tokens; light by default, dark when the system asks for it |
| Data | `src/data/*.ts`: every project, honor and skill shown on the page |
| Hosting | GitHub Pages, deployed by GitHub Actions on every push to `main` |

Accessibility and performance:

- Without WebGL the page shows a static SVG version of the eye and a list of the featured projects.
- With `prefers-reduced-motion` the scene renders still, with the aperture already open.
- The render loop pauses when the scene is off-screen or the tab is hidden.
- Featured project labels are real buttons, reachable by keyboard; every project is also listed as a card below the scene.
- Project details open in a native `<dialog>` and each has its own link (`#project-<id>`).

## Run it

```bash
npm ci
npm run dev        # http://localhost:5173
npm test           # data integrity checks
npm run build      # type-check and production build into dist/
```

`npm test` checks that every project links to one of my public repositories, that every screenshot it references exists, and that live links use HTTPS.

## Content rules

Screenshots are taken from each project's own repository and show the running application. A live link is listed only after it has been opened and checked. Limitations are stated the same way the project README states them.

## License

Code: MIT. Project screenshots belong to their respective projects.
