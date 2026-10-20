# CLAUDE.md

Project context for AI coding agents working on the IFFTU.dev website.

## Project Overview

IFFTU ("I Fight For The Users") is an open source collective building technology that serves humanity. This repository is the organization's website at ifftu.dev.

## Stack Constraints

The framework, language and build target are in `package.json`, `astro.config.mjs`
and `tsconfig.json`. What those files can't tell you:

- **No CSS framework**: All styles are hand-written. Do not add Tailwind, Bootstrap, or similar.
- **No JS framework**: Pure Astro components. No React, Vue, or Svelte unless explicitly approved.

Always run `npm run build` after making changes to verify the site compiles without errors.

## Architecture Conventions

- **Layout**: All pages use `Base.astro` which provides `<Nav />`, `<main>`, `<Footer />`, the scroll-triggered animation observer, and global CSS imports.
- **Routing**: Astro file-based routing, with `trailingSlash: 'always'` (link to `/path/`, not `/path`). Blog routes are generated from the `blog` content collection (see Blog Posts).
- **Styling**: Each page/component uses `<style>` blocks for scoped CSS. Global tokens and animation classes live in `global.css`.
- **Animations**: Elements use `animate-reveal` / `animate-reveal-left` classes with `delay-N` modifiers. An IntersectionObserver in `Base.astro` adds the `is-visible` class on scroll to trigger CSS animations.

## Design System

The site uses a brutalist raw aesthetic. Maintain these design constraints:

### Colors (CSS custom properties in `:root`)
- `--black: #0a0a0a` (background)
- `--white: #f0ece4` (bone white text)
- `--accent: #ff2200` (electric red, used sparingly)
- `--accent-dim: #ff220033` (translucent accent)
- `--gray: #666`, `--gray-light: #999` (secondary text)
- `--border: #2a2a2a` (borders, muted elements)

### Typography
- `--font-display`: Bebas Neue (headlines, large display text, always uppercase)
- `--font-serif`: Fraunces Variable (italic body quotes, descriptions)
- `--font-mono`: JetBrains Mono (UI labels, navigation, metadata; the `body` default)

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

Posts are Markdown files in `src/content/blog/`, loaded as the `blog` content collection defined in `src/content.config.ts`. Frontmatter requires `title`, `date`, `excerpt`, `tags`, `readTime` and `author`; `draft` is optional and defaults to `false`. Drafts are left out of every route below.

- `src/pages/blog/[...slug].astro` renders each post through the `BlogPost.astro` layout; the slug comes from the file name.
- `src/pages/blog/index.astro` lists posts from `getCollection`; there is no hand-maintained list.
- `src/pages/blog/author/[slug].astro` builds one archive per `author` value (slugified).
- `src/pages/rss.xml.ts` builds the RSS feed.

## Adding a New Page

1. Create `src/pages/your-page.astro`
2. Import and wrap content with `Base` layout: `import Base from '../layouts/Base.astro';`
3. Add navigation entry in `src/components/Nav.astro` (update the `links` array; hrefs end in `/`)
4. Use established page header pattern (`.page-header` with ghost letter, pre-label, title, description)
5. Run `npm run build` to verify

## Adding a New Blog Post

1. Create `src/content/blog/your-slug.md` with the frontmatter above
2. Run `npm run build` to verify
