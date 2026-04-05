# IFFTU.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/d4be194b-9583-4190-b8a4-0e21a118dad2/deploy-status)](https://app.netlify.com/projects/ifftu/deploys)

**"I Fight For The Users"**

Website for IFFTU, an open source collective using cutting-edge technology to solve humanity's biggest problems. Open. Transparent. Uncompromising.

**Live at [ifftu.dev](https://www.ifftu.dev)**

## Stack

- [Astro](https://astro.build) 5 — static site generator
- TypeScript (strict)
- Hand-written CSS (no frameworks)
- Zero client-side JS frameworks

## Getting Started

```sh
npm install
npm run dev
```

The dev server starts at `http://localhost:4321`.

## Commands

| Command             | Description                              |
| :------------------ | :--------------------------------------- |
| `npm run dev`       | Start dev server at `localhost:4321`     |
| `npm run build`     | Build production site to `./dist/`       |
| `npm run preview`   | Preview the production build locally     |

## Project Structure

```
src/
  components/
    Nav.astro              # Fixed navigation bar
    Footer.astro           # Site footer
  layouts/
    Base.astro             # Root layout (head, nav, footer, scroll observer)
  pages/
    index.astro            # Homepage
    projects.astro         # Projects listing
    contact.astro          # Contact information
    blog/
      index.astro          # Blog index
      why-we-fight.astro   # Blog post
      introducing-alexandria.astro
      transparency-report-001.astro
  styles/
    global.css             # Design tokens, reset, animations, utilities
public/
  favicon.svg
```

## Design

The site uses a **brutalist raw** aesthetic:

- **Background**: Near-black `#0a0a0a`
- **Text**: Bone white `#f0ece4`
- **Accent**: Electric red `#ff2200`
- **Display font**: Bebas Neue
- **Body serif**: Instrument Serif (italic)
- **Mono/UI font**: JetBrains Mono

Animations are scroll-triggered via IntersectionObserver. A film grain overlay adds texture across all pages.

## Projects

### Alexandria
*Status: In Development*

A decentralized, censorship-resistant knowledge preservation system. The library that never burns.

- **App**: [github.com/ifftu-dev/alexandria](https://github.com/ifftu-dev/alexandria)
- **Website**: [alexandria.ifftu.dev](https://alexandria.ifftu.dev) ([repo](https://github.com/ifftu-dev/alexandria-website))

## License

All rights reserved. See LICENSE for details.
