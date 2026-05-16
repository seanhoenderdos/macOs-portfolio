# Internal Blog Post Windows Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the three markdown blog posts open inside the portfolio as internal text-file windows from the Safari blog list, instead of linking away to placeholder/external pages.

**Architecture:** Keep the blog markdown files in `constants/` and import them with Vite's `?raw` query from `constants/index.js`. Reuse the existing desktop `txtfile` window and mobile `text` screen by giving each blog post the same file-shaped data used by existing text files, then parse markdown strings into text-file sections in `src/windows/textContent.js`.

**Tech Stack:** React, Vite raw asset imports, Zustand window/mobile stores, Node test runner.

---

## File Structure

- Modify `constants/index.js`: import the three `.md` files as raw strings and replace placeholder blog metadata with the real article titles, slugs, file metadata, and markdown descriptions.
- Modify `src/windows/textContent.js`: extend `normalizeDescriptionSections` so it accepts markdown strings, skips the top-level `#` title, turns `##` headings into sections, and preserves paragraphs/list lines as readable text.
- Modify `src/windows/textContent.test.mjs`: add tests for markdown parsing behavior.
- Modify `src/windows/Safari.jsx`: replace external anchor links with a button that calls `openWindow('txtfile', post)`.
- Modify `src/mobile/MobileSafari.jsx`: replace external anchor links with a button that calls `openFile(post)`.
- Modify `src/index.css`: style Safari blog buttons the same as the old links on desktop and mobile, and make the text window comfortable for longer blog posts.

---

## Tasks

### Task 1: Markdown Parsing

**Files:**
- Modify: `src/windows/textContent.js`
- Modify: `src/windows/textContent.test.mjs`

- [ ] Add a failing test that passes a markdown string with `#`, `##`, paragraphs, and list items into `normalizeDescriptionSections`.
- [ ] Run `npm test` and confirm the new markdown test fails.
- [ ] Implement markdown string parsing in `normalizeDescriptionSections`.
- [ ] Run `npm test` and confirm all tests pass.

### Task 2: Blog Post Data

**Files:**
- Modify: `constants/index.js`

- [ ] Import the three blog markdown files with `?raw`.
- [ ] Replace the existing placeholder `blogPosts` entries with the real article titles from the markdown files.
- [ ] Add file-window fields to each post: `name`, `kind: 'file'`, `fileType: 'txt'`, `subtitle`, `description`, and a stable `slug`.
- [ ] Keep the image paths unless new images are provided.

### Task 3: Desktop Internal Opening

**Files:**
- Modify: `src/windows/Safari.jsx`
- Modify: `src/index.css`

- [ ] Read `openWindow` from `#store/window`.
- [ ] Replace each external blog `<a>` with a `<button type="button">`.
- [ ] On click, call `openWindow('txtfile', post)`.
- [ ] Update desktop Safari CSS so the button has the same visual behavior as the current link.

### Task 4: Mobile Internal Opening

**Files:**
- Modify: `src/mobile/MobileSafari.jsx`
- Modify: `src/index.css`

- [ ] Read `openFile` from `#store/mobile`.
- [ ] Replace each mobile external blog `<a>` with a `<button type="button">`.
- [ ] On click, call `openFile(post)`.
- [ ] Update mobile Safari CSS so the button matches the existing link style.

### Task 5: Verification

**Files:**
- Read/verify: app runtime only

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Start the Vite dev server.
- [ ] Open the app in a browser and verify desktop Safari: each Read more button opens the text-file window with the correct article.
- [ ] Verify mobile width: each blog button opens the mobile text screen and Back returns to Safari.
