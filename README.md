# macOS Portfolio

macOS Portfolio is an interactive personal portfolio built as a desktop-inspired web experience. It recreates familiar operating-system patterns like a dock, draggable windows, file previews, folders, contact panels, a resume window, gallery views, and mobile-specific navigation.

## Overview

The project is designed to make a portfolio feel exploratory instead of static. Visitors can open windows, browse project folders, read case-study style project notes, view images and PDFs, open contact links, and explore skills through a terminal-style window.

The app also includes a dedicated mobile interface so the experience remains usable on smaller screens rather than simply shrinking the desktop layout.

## Features

- macOS-inspired desktop interface
- Animated dock interactions with GSAP
- Window state management with Zustand
- Draggable and layered window UI
- Finder-style project folders and files
- Resume PDF viewer with React PDF
- Safari/articles, gallery, contact, terminal, and text-file windows
- Mobile-specific shell and navigation components
- Theme and navigation utility tests
- Portfolio content stored as structured constants

## Tech Stack

- React 19
- Vite
- JavaScript
- GSAP
- Zustand
- Tailwind CSS
- React PDF
- Lucide React
- Day.js
- Node test runner

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Quality Checks

```bash
npm run lint
npm run test
npm run format:check
npm run build
```

## Project Notes

This project highlights frontend craft: motion, interaction design, state management, responsive adaptation, and a portfolio structure that feels more like a product than a flat page.

## Author

Built by [Sean Hoenderdos](https://github.com/seanhoenderdos).
