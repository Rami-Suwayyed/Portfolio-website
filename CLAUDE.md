# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build to dist/
npm run preview  # Serve the production build locally
npm run lint     # ESLint over src/**/*.{js,jsx} (fails on any warning: --max-warnings 0)
```

There is no test framework configured.

## Architecture

Single-page portfolio site built with Vite + React 18 (plain JS, no TypeScript). `src/main.jsx` mounts `App.jsx`, which renders the page as a fixed vertical sequence of sections. Navigation is **anchor-scroll only** — there is no client-side router. Section anchors (`#top`, `#about`, `#work`, `#experience`, `#contact`) live on the section elements; `scroll-padding-top` in `base.css` offsets them under the fixed nav.

The design follows an **engineered / blueprint** visual system. Everything is driven by CSS custom properties — never hardcode colors, spacing, or type; use the tokens.

### Layout of `src/`

- `styles/tokens.css` — the design system's single source of truth: color (dark default + `.light` overrides), fluid type scale, spacing, radius, motion. **Change the look here.**
- `styles/base.css` — reset, base typography, and shared primitives: `.container`, `.section`, `.grid-bg` (blueprint backdrop), `.eyebrow` (code-comment `// label`), `.btn`, `.tag`, `.status` (the `● live` production dot), reduced-motion handling.
- `src/index.css` — only `@import`s the two files above (kept so `main.jsx`'s existing import works).
- `data/` — **all content lives here, not in components.**
  - `profile.js` — identity, socials, nav links, resume URL, email, Formspree ID.
  - `projects.js` — the projects array plus derived helpers (`platformsOf`, `isLive`, `hasMobile`, `matchesFilter`, `stats`, `stackLabels`, `workFilters`). To add a project: append an entry and drop its image in `public/images/`. Empty (`""`) links are hidden automatically.
  - `experience.js` — timeline entries (⚠️ contains placeholder `20XX` dates to replace).
  - `skills.js` — skill groups for the About section.
- `components/layout/` — `Nav`, `Footer`.
- `components/sections/` — `Hero`, `About`, `Experience`, `Work`, `Contact` (one per page section).
- `components/ui/` — reusable pieces: `SectionHeader`, `ProjectCard`, `ThemeToggle`, `ScrollTop`.
- `hooks/useTheme.js` — light/dark state, persisted to `localStorage["currentMode"]`, applied as a class on `document.body`.

Each component imports its own co-located lowercase `.css` file. Class names are component-scoped (BEM-ish `block__element`) to avoid specificity collisions.

### Key mechanisms & conventions

- **Content is data-driven.** Sections map over the arrays in `data/`. Edit content there, not in JSX.
- **The "shipped" signature.** The hero's instrument readout numbers come from `stats` in `projects.js` (computed live from the array), and every `ProjectCard` shows a `● Live`/`Source` badge plus platform tags (Web / iOS / Android / Code) derived via `platformsOf`. This encodes the real differentiator — production software across web + mobile — so keep it accurate to the data.
- **Theming.** Two class scopes in `tokens.css`: `:root, .dark` (default) and `.light`. `<body>` starts with `class="dark"` in `index.html`; `useTheme` swaps the class.
- **Icon font.** All `icon-*` classes are icomoon glyphs defined in `public/style.css`, linked directly from `index.html` — **not** processed by Vite. Icons break if that link or `public/fonts/` is removed. Available glyph names are in `public/style.css` / `public/icomoon/selection.json`.
- **Animation** uses `framer-motion` (hero load reveal, `Work` filter transitions via `AnimatePresence`). Respect `prefers-reduced-motion` (handled globally in `base.css`).
- **Contact form** uses `@formspree/react` `useForm(profile.formspreeId)`.
- **ESLint:** `react/prop-types` is intentionally off (plain-JS project; components are shaped by the `data/` files). `no-unused-vars` and `react-refresh` are warnings, but `--max-warnings 0` makes any warning fail `npm run lint`.

### Static assets

`public/` is served at the web root. Project images (`public/images/N.png`, referenced as `./images/N.png`), the resume PDF, favicon, and the icomoon stylesheet/fonts all live here and are referenced by root-relative or `./`-relative paths, not bundler imports.
