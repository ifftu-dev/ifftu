# CLAUDE.md

Project context for AI coding agents working on the IFFTU.dev website.

## Project Overview

IFFTU ("I Fight For The Users") is an open source collective building technology that serves humanity. This repository is the organization's website at ifftu.dev.

## Tech Stack

- **Framework**: Astro 5 (static site generator)
- **Language**: TypeScript (strict mode)
- **Styling**: Scoped CSS in Astro components + `src/styles/global.css`
- **Build output**: Static HTML to `dist/`
- **No CSS framework**: All styles are hand-written. Do not add Tailwind, Bootstrap, or similar.
- **No JS framework**: Pure Astro components. No React, Vue, or Svelte unless explicitly approved.

## Commands

```sh
npm run dev       # Start dev server on localhost:4321
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

Always run `npm run build` after making changes to verify the site compiles without errors.

## Project Structure

```
src/
  components/     # Reusable Astro components (Nav, Footer)
  layouts/        # Page layouts (Base.astro wraps all pages)
  pages/          # File-based routing
    blog/         # Blog index + individual post pages
    contact.astro
    index.astro   # Homepage
    projects.astro
  styles/
    global.css    # Design tokens, reset, animations, utilities
public/
  favicon.svg
```

## Architecture Conventions

- **Layout**: All pages use `Base.astro` which provides `<Nav />`, `<main>`, `<Footer />`, the scroll-triggered animation observer, and global CSS imports.
- **Routing**: Astro file-based routing. `/blog/[slug]` pages are currently individual `.astro` files, not dynamic routes.
- **Styling**: Each page/component uses `<style>` blocks for scoped CSS. Global tokens and animation classes live in `global.css`.
- **Animations**: Elements use `animate-reveal` / `animate-reveal-left` classes with `delay-N` modifiers. An IntersectionObserver in `Base.astro` adds the `is-visible` class on scroll to trigger CSS animations.

## Design System

The site uses a brutalist raw aesthetic. Maintain these design constraints:

### Colors (CSS custom properties in `:root`)
- `--black: #0a0a0a` (background)
- `--white: #f0ece4` (bone white text)
- `--accent: #ff2200` (electric red, used sparingly)
- `--gray: #666`, `--gray-light: #999` (secondary text)
- `--border: #2a2a2a` (borders, muted elements)

### Typography
- `--font-display`: Bebas Neue (headlines, large display text, always uppercase)
- `--font-serif`: Instrument Serif (italic body quotes, descriptions)
- `--font-mono`: JetBrains Mono (UI labels, navigation, metadata, body text)

### Utility Classes
- `.text-display`, `.text-serif`, `.text-mono` for font application
- `.container` for max-width centered layout
- `.animate-reveal` + `.delay-N` for scroll-triggered entrance animations

### Principles
- No emojis in the UI
- Monospace index numbers (e.g., `01`, `02`) precede navigation and list items
- Section labels follow the pattern: `// LABEL` with red `//` prefix
- Large ghost watermark characters behind sections using `-webkit-text-stroke`
- Film grain overlay on `body::after` (do not remove)
- Red accent used for: active states, status indicators, border accents, hover fills

## Blog Posts

Blog posts are currently individual `.astro` files in `src/pages/blog/`. Each post page includes its own `<style>` block using the shared post styling pattern (`.post`, `.post__header`, `.post__body`, etc.). The blog index at `src/pages/blog/index.astro` has a hardcoded `posts` array that must be updated when adding new posts.

## Adding a New Page

1. Create `src/pages/your-page.astro`
2. Import and wrap content with `Base` layout: `import Base from '../layouts/Base.astro';`
3. Add navigation entry in `src/components/Nav.astro` (update the `links` array)
4. Use established page header pattern (`.page-header` with ghost letter, pre-label, title, description)
5. Run `npm run build` to verify

## Adding a New Blog Post

1. Create `src/pages/blog/your-slug.astro` following the pattern of existing posts
2. Add the post metadata to the `posts` array in `src/pages/blog/index.astro`
3. Run `npm run build` to verify
