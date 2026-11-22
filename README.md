# Jana Sakr — The Digital Signature

My personal portfolio. It's built with React 18, Vite, Tailwind CSS, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # serve the production build locally
```

## Before you publish

1. **Add your CV.** Put the PDF at `public/Jana-Sakr-CV.pdf`, then set `profile.cvUrl` to `'/Jana-Sakr-CV.pdf'` in `src/data/content.js`. Until you do, the "Download CV" buttons are hidden.
2. **Add the project links when they're ready.** In `src/data/content.js`, set `links.live` and `links.github` for each project. Until a link is set, the site shows a "Link coming soon" placeholder instead of a broken link.
3. **Add screenshots and case-study details.** Each project accepts optional `image`, `problem`, `features`, `role`, `challenges`, `outcome` and `screenshots` fields (see the comment above `projects` in `content.js`).
4. **Set up sharing tags once you have a domain.** In `index.html`, fill in and uncomment the canonical/`og:image` block, and add a 1200×630 `public/og.png`.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/data/content.js` | All of the site's text: profile, experience, projects, skills and education. Edit text here. |
| `src/index.css` | Design tokens for the dark and light themes, plus the base components |
| `src/components/HeroVisual.jsx` | The isometric "stack" in the hero, drawn with CSS 3D |
| `src/components/ProjectMockup.jsx` | The project previews, drawn in code on a 960×600 canvas that scales to fit |
| `src/components/CaseStudy.jsx` | The case-study dialog, which traps keyboard focus and closes with Esc |
| `src/components/ui/*` | Shared pieces: reveal animations, section headers, the theme toggle and icons |

## Accessibility and motion

- Semantic landmarks, a skip link, visible focus rings, an accessible tablist in the experience timeline and a modal dialog for case studies.
- `prefers-reduced-motion` is respected in two places: Framer Motion's `reducedMotion="user"` setting and a CSS override.
- The theme follows the system setting on the first visit. After that it remembers the visitor's choice and applies it before the first paint, so the page doesn't flash the wrong theme.

## Deploy

The site is static, so `dist/` can go to Vercel, Netlify, GitHub Pages or Cloudflare Pages with no extra configuration.
