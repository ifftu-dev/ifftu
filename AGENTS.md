# AGENTS.md

Guidelines for all AI agents contributing to this repository.

## Identity

IFFTU stands for "I Fight For The Users." This is not a corporation. It is an open source collective that builds technology for humanity. Every agent contribution should reflect this ethos: clarity over cleverness, transparency over abstraction, utility over vanity.

## Code Standards

### General
- Write clean, readable code. No unnecessary abstractions.
- Prefer explicit over implicit. Name things clearly.
- No dead code. No commented-out blocks left behind.
- Run `npm run build` after every change. Fix all errors before considering work complete.

### Astro / HTML
- Use semantic HTML elements (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<aside>`).
- All pages must use the `Base.astro` layout.
- Include appropriate `title` and `description` props for SEO/OG metadata.
- Maintain accessibility: `aria-label` on interactive elements, sufficient color contrast, keyboard navigability.

### CSS
- Use scoped `<style>` blocks in Astro components for page/component-specific styles.
- Use BEM-like naming: `.block__element--modifier`.
- Reference CSS custom properties from `global.css` instead of hardcoding values.
- Do not introduce CSS frameworks or preprocessors.
- Responsive design is required. Test at mobile (375px), tablet (768px), and desktop (1400px+).

### TypeScript
- Strict mode is enabled. Do not use `any` or `@ts-ignore`.
- Type component props using Astro's `interface Props` pattern.

## Design Rules

Agents must preserve the brutalist raw aesthetic. Before making visual changes, read the design system section in `CLAUDE.md`.

Key rules:
- **No emojis** in UI content or code comments.
- **No rounded corners** on cards or containers. Use sharp edges.
- **No gradients** on backgrounds (the only gradient is the scroll indicator line).
- **No stock imagery**. Use typography, spacing, and structure to create visual impact.
- **Red accent (#ff2200)** is used sparingly for emphasis. Do not introduce additional accent colors.
- **Animations** must be scroll-triggered via the existing IntersectionObserver pattern. Do not add JavaScript animation libraries.

## Workflow

1. Read `CLAUDE.md` for project context before starting work.
2. Understand the existing file structure and conventions.
3. Make changes incrementally. One concern per change.
4. Verify with `npm run build` after every meaningful edit.
5. Do not modify the design system (colors, fonts, spacing scale) without explicit approval.
6. Do not add dependencies without explicit approval.

## What Not To Do

- Do not add analytics, tracking, or telemetry of any kind.
- Do not add cookie banners or consent dialogs.
- Do not add third-party scripts beyond Google Fonts.
- Do not introduce client-side JavaScript frameworks (React, Vue, Svelte) without approval.
- Do not push to remote or create PRs without being asked.
- Do not modify `.gitignore`, `tsconfig.json`, or `astro.config.mjs` without explicit need.
