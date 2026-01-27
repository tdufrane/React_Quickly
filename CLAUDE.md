# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Source code examples for **React Quickly, 2nd Edition** (Manning Publications). Each chapter folder contains standalone Create React App projects demonstrating progressive React concepts.

## Repository Structure

- **ch01/**: Plain HTML with React via CDN (no build tooling)
- **ch02/ - ch13/**: CRA-based projects using React 18.2, each subfolder (e.g., `ch04/rq04-state`) is an independent app
- **ch02p/ - ch08p/**: Practice/extended versions using React 19.2
- **publisher/**: Node utility for publishing chapter templates to npm as CRA templates

## Build & Development Commands

Each chapter subfolder is an independent CRA project. Commands must be run from within a specific project directory (e.g., `cd ch04/rq04-state`):

```bash
npm install          # Install dependencies (required first time)
npm start            # Start dev server (react-scripts start)
npm test             # Run tests with Jest + Testing Library
npm run build        # Production build
```

Chapter 1 (`ch01/hello-world/`) has no build step — open `index.html` directly in a browser.

## Tech Stack

- **React 18.2** (main chapters) / **React 19.2** (practice chapters, ch*p/)
- **Create React App** with react-scripts 5.0.1 (webpack, Babel, ESLint bundled)
- **JavaScript only** — no TypeScript
- **ESLint**: `extends: "react-app"` (configured in each package.json)
- **Prettier**: present as dependency with default config
- **Testing**: Jest + @testing-library/react

## Code Patterns

- Functional components with hooks throughout (no class components)
- Each project is self-contained with its own `package.json` and `node_modules`
- Entry point is always `src/index.js` rendering into `public/index.html`
