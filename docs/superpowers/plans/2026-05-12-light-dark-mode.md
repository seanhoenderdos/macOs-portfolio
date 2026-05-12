# Light And Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add persisted light and dark modes across the desktop and mobile portfolio UI.

**Architecture:** Centralize theme state in a small Zustand store backed by pure theme helpers. Apply the selected theme to `document.documentElement.dataset.theme`, then migrate the existing Tailwind-heavy CSS in `src/index.css` to semantic CSS tokens so desktop windows, mobile screens, wallpaper overlays, text, borders, and controls all respond consistently.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, Zustand, Node test runner, lucide-react.

---

## File Structure

- Create: `src/theme/theme.js`
  - Pure helpers for validating, reading, writing, toggling, and applying theme values.
- Create: `src/theme/theme.test.mjs`
  - Node tests for the pure theme helpers.
- Create: `src/store/theme.js`
  - Zustand theme store used by React components.
- Modify: `src/components/Navbar.jsx`
  - Wire the desktop mode icon to `toggleTheme()`.
- Modify: `src/mobile/MobileStatusBar.jsx`
  - Add a compact mobile theme toggle.
- Modify: `src/windows/Finder.jsx`
  - Remove the hard-coded inner `bg-white` surface so Finder follows tokens.
- Modify: `src/windows/Terminal.jsx`
  - Replace hard-coded black footnote styling with theme-aware classes and fix the `Flag` icon size prop.
- Modify: `src/windows/text.jsx`
  - Replace hard-coded gray metadata styles with reusable theme-aware classes.
- Modify: `src/index.css`
  - Add theme tokens and replace hard-coded theme colors with semantic variables.
- Modify: `package.json`
  - Add a `test` script that runs existing Node tests plus the new theme tests.

## Theme Tokens

Use these token names across `src/index.css`:

```css
:root,
:root[data-theme='dark'] {
  color-scheme: dark;
  --desktop-wallpaper: url('/images/wallpaper.png');
  --app-text: #f5f5f7;
  --app-text-muted: rgb(255 255 255 / 0.72);
  --menu-bg: rgb(255 255 255 / 0.5);
  --menu-text: #0f172a;
  --menu-icon-hover: rgb(229 231 235 / 0.95);
  --dock-bg: rgb(255 255 255 / 0.2);
  --dock-shadow: rgb(0 0 0 / 0.24);
  --window-bg: #ffffff;
  --window-elevated: #f9fafb;
  --window-muted: #f3f4f6;
  --window-text: #111827;
  --window-text-muted: #6b7280;
  --window-border: #e5e7eb;
  --window-hover: #e5e7eb;
  --accent: #2563eb;
  --accent-soft: #dbeafe;
  --accent-strong: #1d4ed8;
  --brand-pink: #db2777;
  --terminal-accent: #00a154;
  --terminal-bg: #ffffff;
  --terminal-text: #111827;
  --resume-bg: #000417;
  --preview-bg: #e5e7eb;
  --desktop-icon-text: #ffffff;
  --desktop-icon-hover: rgb(3 7 18 / 0.1);
  --mobile-bg: #1d1d1f;
  --mobile-bg-translucent: rgb(29 29 31 / 0.95);
  --mobile-panel: rgb(255 255 255 / 0.1);
  --mobile-panel-strong: rgb(255 255 255 / 0.2);
  --mobile-border: rgb(255 255 255 / 0.1);
  --mobile-text: #ffffff;
  --mobile-text-muted: rgb(255 255 255 / 0.75);
  --mobile-text-faint: rgb(255 255 255 / 0.5);
}

:root[data-theme='light'] {
  color-scheme: light;
  --desktop-wallpaper: url('/images/wallpaper.jpg');
  --app-text: #111827;
  --app-text-muted: rgb(15 23 42 / 0.72);
  --menu-bg: rgb(255 255 255 / 0.72);
  --menu-text: #111827;
  --menu-icon-hover: rgb(15 23 42 / 0.08);
  --dock-bg: rgb(255 255 255 / 0.55);
  --dock-shadow: rgb(15 23 42 / 0.18);
  --window-bg: #ffffff;
  --window-elevated: #f8fafc;
  --window-muted: #e5e7eb;
  --window-text: #111827;
  --window-text-muted: #64748b;
  --window-border: #d1d5db;
  --window-hover: #e5e7eb;
  --accent: #2563eb;
  --accent-soft: #dbeafe;
  --accent-strong: #1d4ed8;
  --brand-pink: #db2777;
  --terminal-accent: #008f4a;
  --terminal-bg: #ffffff;
  --terminal-text: #111827;
  --resume-bg: #f1f5f9;
  --preview-bg: #e5e7eb;
  --desktop-icon-text: #ffffff;
  --desktop-icon-hover: rgb(3 7 18 / 0.1);
  --mobile-bg: #f5f5f7;
  --mobile-bg-translucent: rgb(245 245 247 / 0.95);
  --mobile-panel: rgb(0 0 0 / 0.06);
  --mobile-panel-strong: rgb(255 255 255 / 0.7);
  --mobile-border: rgb(15 23 42 / 0.12);
  --mobile-text: #111827;
  --mobile-text-muted: rgb(15 23 42 / 0.72);
  --mobile-text-faint: rgb(15 23 42 / 0.5);
}
```

Dark remains the default because the current portfolio is visually designed around a dark wallpaper and iOS-style mobile shell.

---

### Task 1: Theme Helper Module

**Files:**

- Create: `src/theme/theme.js`
- Test: `src/theme/theme.test.mjs`

- [ ] **Step 1: Create the failing helper tests**

Create `src/theme/theme.test.mjs`:

```js
import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DARK_THEME,
  LIGHT_THEME,
  THEME_STORAGE_KEY,
  applyThemeToDocument,
  getNextTheme,
  getSystemTheme,
  isTheme,
  readStoredTheme,
  resolveInitialTheme,
  writeStoredTheme,
} from './theme.js'

const createStorage = (initial = {}) => {
  const data = new Map(Object.entries(initial))

  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  }
}

test('validates supported theme names', () => {
  assert.equal(isTheme(LIGHT_THEME), true)
  assert.equal(isTheme(DARK_THEME), true)
  assert.equal(isTheme('system'), false)
  assert.equal(isTheme(null), false)
})

test('reads only supported themes from storage', () => {
  assert.equal(
    readStoredTheme(createStorage({ [THEME_STORAGE_KEY]: LIGHT_THEME })),
    LIGHT_THEME,
  )
  assert.equal(
    readStoredTheme(createStorage({ [THEME_STORAGE_KEY]: 'sepia' })),
    null,
  )
})

test('falls back to the system preference when storage is empty', () => {
  const lightWindow = {
    matchMedia: (query) => ({
      matches: query === '(prefers-color-scheme: light)',
    }),
  }

  assert.equal(
    resolveInitialTheme({ storage: createStorage(), win: lightWindow }),
    LIGHT_THEME,
  )
})

test('prefers stored theme over system preference', () => {
  const darkWindow = {
    matchMedia: () => ({ matches: false }),
  }

  assert.equal(
    resolveInitialTheme({
      storage: createStorage({ [THEME_STORAGE_KEY]: LIGHT_THEME }),
      win: darkWindow,
    }),
    LIGHT_THEME,
  )
})

test('defaults to dark when matchMedia is not available', () => {
  assert.equal(getSystemTheme({}), DARK_THEME)
})

test('returns the opposite theme', () => {
  assert.equal(getNextTheme(DARK_THEME), LIGHT_THEME)
  assert.equal(getNextTheme(LIGHT_THEME), DARK_THEME)
})

test('writes supported themes to storage', () => {
  const writes = []
  const storage = {
    setItem: (key, value) => writes.push([key, value]),
  }

  writeStoredTheme(LIGHT_THEME, storage)

  assert.deepEqual(writes, [[THEME_STORAGE_KEY, LIGHT_THEME]])
})

test('applies the theme to the root element', () => {
  const root = {
    dataset: {},
    style: {},
  }

  applyThemeToDocument(DARK_THEME, root)

  assert.equal(root.dataset.theme, DARK_THEME)
  assert.equal(root.style.colorScheme, DARK_THEME)
})
```

- [ ] **Step 2: Run the new helper tests and verify they fail**

Run:

```bash
node --test src/theme/theme.test.mjs
```

Expected: FAIL with an import error because `src/theme/theme.js` does not exist yet.

- [ ] **Step 3: Implement the helper module**

Create `src/theme/theme.js`:

```js
export const LIGHT_THEME = 'light'
export const DARK_THEME = 'dark'
export const THEME_STORAGE_KEY = 'sean-portfolio-theme'

const THEMES = [LIGHT_THEME, DARK_THEME]

export const isTheme = (value) => THEMES.includes(value)

export const getSystemTheme = (win = globalThis.window) => {
  if (!win?.matchMedia) return DARK_THEME

  return win.matchMedia('(prefers-color-scheme: light)').matches
    ? LIGHT_THEME
    : DARK_THEME
}

export const readStoredTheme = (storage = globalThis.localStorage) => {
  try {
    const value = storage?.getItem?.(THEME_STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

export const writeStoredTheme = (theme, storage = globalThis.localStorage) => {
  if (!isTheme(theme)) return

  try {
    storage?.setItem?.(THEME_STORAGE_KEY, theme)
  } catch {
    // Private browsing and restricted storage should not break rendering.
  }
}

export const resolveInitialTheme = ({
  storage = globalThis.localStorage,
  win = globalThis.window,
} = {}) => readStoredTheme(storage) ?? getSystemTheme(win)

export const getNextTheme = (theme) =>
  theme === DARK_THEME ? LIGHT_THEME : DARK_THEME

export const applyThemeToDocument = (
  theme,
  root = globalThis.document?.documentElement,
) => {
  if (!root || !isTheme(theme)) return

  root.dataset.theme = theme
  root.style.colorScheme = theme
}
```

- [ ] **Step 4: Run the helper tests and verify they pass**

Run:

```bash
node --test src/theme/theme.test.mjs
```

Expected: PASS for all `src/theme/theme.test.mjs` tests.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/theme/theme.js src/theme/theme.test.mjs
git commit -m "feat: add theme helpers"
```

---

### Task 2: Theme Store And Test Script

**Files:**

- Create: `src/store/theme.js`
- Modify: `package.json`

- [ ] **Step 1: Add the theme store**

Create `src/store/theme.js`:

```js
import { create } from 'zustand'

import {
  applyThemeToDocument,
  getNextTheme,
  isTheme,
  resolveInitialTheme,
  writeStoredTheme,
} from '../theme/theme'

const persistTheme = (theme) => {
  applyThemeToDocument(theme)
  writeStoredTheme(theme)
}

const useThemeStore = create((set, get) => ({
  theme: resolveInitialTheme(),

  setTheme: (theme) => {
    if (!isTheme(theme)) return

    persistTheme(theme)
    set({ theme })
  },

  toggleTheme: () => {
    get().setTheme(getNextTheme(get().theme))
  },
}))

persistTheme(useThemeStore.getState().theme)

export default useThemeStore
```

- [ ] **Step 2: Add a test script**

In `package.json`, replace the `scripts` block with this exact block:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "test": "node --test src/**/*.test.mjs",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "preview": "vite preview"
}
```

- [ ] **Step 3: Run all Node tests**

Run:

```bash
npm test
```

Expected: PASS for `src/theme/theme.test.mjs`, `src/windows/textContent.test.mjs`, and `src/mobile/navigation.test.mjs`.

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS without new lint errors.

- [ ] **Step 5: Commit**

Run:

```bash
git add package.json package-lock.json src/store/theme.js
git commit -m "feat: add persisted theme store"
```

---

### Task 3: Desktop And Mobile Theme Toggles

**Files:**

- Modify: `src/components/Navbar.jsx`
- Modify: `src/mobile/MobileStatusBar.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Wire the desktop navbar mode icon**

Replace `src/components/Navbar.jsx` with:

```jsx
import dayjs from 'dayjs'

import { navLinks, navIcons } from '#constants'
import useThemeStore from '#store/theme'
import useWindowStore from '#store/window'

const Navbar = () => {
  const { openWindow } = useWindowStore()
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Sean's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              {id === 4 ? (
                <button
                  type="button"
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${nextTheme} mode`}
                  aria-pressed={theme === 'dark'}
                >
                  <img src={img} className="icon-hover" alt="" />
                </button>
              ) : (
                <img src={img} className="icon-hover" alt={`icon-${id}`} />
              )}
            </li>
          ))}
        </ul>

        <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  )
}

export default Navbar
```

- [ ] **Step 2: Wire the mobile status bar theme toggle**

Replace `src/mobile/MobileStatusBar.jsx` with:

```jsx
import dayjs from 'dayjs'
import { Battery, Moon, Sun, Wifi } from 'lucide-react'

import useThemeStore from '#store/theme'

const MobileStatusBar = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <div className="mobile-status-bar">
      <time aria-hidden="true">{dayjs().format('h:mm A')}</time>
      <div className="mobile-dynamic-island" aria-hidden="true" />
      <div className="mobile-status-icons">
        <Wifi size={17} strokeWidth={2.5} aria-hidden="true" />
        <Battery size={18} strokeWidth={2.5} aria-hidden="true" />
        <button
          type="button"
          className="mobile-theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${nextTheme} mode`}
          aria-pressed={theme === 'dark'}
        >
          <Icon size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

export default MobileStatusBar
```

- [ ] **Step 3: Add toggle reset styles**

In `src/index.css`, inside the existing `@layer components` block, add:

```css
.theme-toggle,
.mobile-theme-toggle {
  @apply flex items-center justify-center rounded border-0 bg-transparent p-0 text-inherit;
}

.theme-toggle {
  @apply size-6;
}

.mobile-theme-toggle {
  @apply size-7;
  color: var(--mobile-text);
}
```

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS without accessibility or hooks errors.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/components/Navbar.jsx src/mobile/MobileStatusBar.jsx src/index.css
git commit -m "feat: add theme toggles"
```

---

### Task 4: CSS Theme Tokens

**Files:**

- Modify: `src/index.css`

- [ ] **Step 1: Add root token definitions**

In `src/index.css`, replace the current `html, body` rule:

```css
html,
body {
  width: 100dvw;
  overflow: hidden;
  height: 100dvh;
  background-image: url('/images/wallpaper.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
```

with:

```css
:root,
:root[data-theme='dark'] {
  color-scheme: dark;
  --desktop-wallpaper: url('/images/wallpaper.png');
  --app-text: #f5f5f7;
  --app-text-muted: rgb(255 255 255 / 0.72);
  --menu-bg: rgb(255 255 255 / 0.5);
  --menu-text: #0f172a;
  --menu-icon-hover: rgb(229 231 235 / 0.95);
  --dock-bg: rgb(255 255 255 / 0.2);
  --dock-shadow: rgb(0 0 0 / 0.24);
  --window-bg: #ffffff;
  --window-elevated: #f9fafb;
  --window-muted: #f3f4f6;
  --window-text: #111827;
  --window-text-muted: #6b7280;
  --window-border: #e5e7eb;
  --window-hover: #e5e7eb;
  --accent: #2563eb;
  --accent-soft: #dbeafe;
  --accent-strong: #1d4ed8;
  --brand-pink: #db2777;
  --terminal-accent: #00a154;
  --terminal-bg: #ffffff;
  --terminal-text: #111827;
  --resume-bg: #000417;
  --preview-bg: #e5e7eb;
  --desktop-icon-text: #ffffff;
  --desktop-icon-hover: rgb(3 7 18 / 0.1);
  --mobile-bg: #1d1d1f;
  --mobile-bg-translucent: rgb(29 29 31 / 0.95);
  --mobile-panel: rgb(255 255 255 / 0.1);
  --mobile-panel-strong: rgb(255 255 255 / 0.2);
  --mobile-border: rgb(255 255 255 / 0.1);
  --mobile-text: #ffffff;
  --mobile-text-muted: rgb(255 255 255 / 0.75);
  --mobile-text-faint: rgb(255 255 255 / 0.5);
}

:root[data-theme='light'] {
  color-scheme: light;
  --desktop-wallpaper: url('/images/wallpaper.jpg');
  --app-text: #111827;
  --app-text-muted: rgb(15 23 42 / 0.72);
  --menu-bg: rgb(255 255 255 / 0.72);
  --menu-text: #111827;
  --menu-icon-hover: rgb(15 23 42 / 0.08);
  --dock-bg: rgb(255 255 255 / 0.55);
  --dock-shadow: rgb(15 23 42 / 0.18);
  --window-bg: #ffffff;
  --window-elevated: #f8fafc;
  --window-muted: #e5e7eb;
  --window-text: #111827;
  --window-text-muted: #64748b;
  --window-border: #d1d5db;
  --window-hover: #e5e7eb;
  --accent: #2563eb;
  --accent-soft: #dbeafe;
  --accent-strong: #1d4ed8;
  --brand-pink: #db2777;
  --terminal-accent: #008f4a;
  --terminal-bg: #ffffff;
  --terminal-text: #111827;
  --resume-bg: #f1f5f9;
  --preview-bg: #e5e7eb;
  --desktop-icon-text: #ffffff;
  --desktop-icon-hover: rgb(3 7 18 / 0.1);
  --mobile-bg: #f5f5f7;
  --mobile-bg-translucent: rgb(245 245 247 / 0.95);
  --mobile-panel: rgb(0 0 0 / 0.06);
  --mobile-panel-strong: rgb(255 255 255 / 0.7);
  --mobile-border: rgb(15 23 42 / 0.12);
  --mobile-text: #111827;
  --mobile-text-muted: rgb(15 23 42 / 0.72);
  --mobile-text-faint: rgb(15 23 42 / 0.5);
}

html,
body {
  width: 100dvw;
  overflow: hidden;
  height: 100dvh;
  background-image: var(--desktop-wallpaper);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: var(--app-text);
}
```

- [ ] **Step 2: Replace base desktop shell colors**

In `src/index.css`, make these exact replacements:

```css
nav {
  @apply flex justify-between items-center backdrop-blur-3xl p-2 px-5 select-none;
  background: var(--menu-bg);
  color: var(--menu-text);
}
```

```css
nav time {
  color: var(--menu-text);
}
```

```css
.icon {
  @apply p-1 rounded hover:cursor-default;
}

.icon:hover {
  background: var(--menu-icon-hover);
}
```

```css
#welcome {
  @apply flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none max-sm:h-screen max-sm:w-full max-sm:px-10;
  color: var(--app-text);
}
```

```css
#welcome .small-screen p {
  @apply flex-1 text-[16px] text-center font-roboto;
  color: var(--app-text-muted);
}
```

```css
#dock .dock-container {
  @apply backdrop-blur-md justify-between rounded-2xl p-1.5 flex items-end gap-1.5;
  background: var(--dock-bg);
  box-shadow: 0 18px 60px var(--dock-shadow);
}
```

- [ ] **Step 3: Run format check**

Run:

```bash
npm run format:check
```

Expected: PASS or a Prettier warning listing only files that need formatting.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/index.css
git commit -m "feat: add theme tokens"
```

---

### Task 5: Desktop Windows Markup And CSS Migration

**Files:**

- Modify: `src/index.css`
- Modify: `src/windows/Finder.jsx`
- Modify: `src/windows/Terminal.jsx`
- Modify: `src/windows/text.jsx`

- [ ] **Step 1: Remove hard-coded window colors from JSX**

In `src/windows/Finder.jsx`, replace:

```jsx
<div className="bg-white flex h-full">
```

with:

```jsx
<div className="finder-layout">
```

In `src/windows/Terminal.jsx`, replace:

```jsx
<p className="text-black">
  <Flag szie={15} fill="black" />
  Render time: 5.0023s
</p>
```

with:

```jsx
<p className="render-time">
  <Flag size={15} />
  Render time: 5.0023s
</p>
```

In `src/windows/text.jsx`, replace:

```jsx
<article className="p-5 space-y-6 overflow-y-auto max-h-[calc(100dvh-12rem)]">
```

with:

```jsx
<article className="text-file-content">
```

Replace:

```jsx
<p className="text-sm font-semibold text-gray-500">{subtitle}</p>
```

with:

```jsx
<p className="text-file-subtitle">{subtitle}</p>
```

Replace:

```jsx
<h3 className="text-xs font-bold uppercase tracking-[0.08em] text-gray-500">
```

with:

```jsx
<h3 className="text-file-section-title">
```

Replace:

```jsx
<p key={paragraphIndex} className="text-sm leading-6">
```

with:

```jsx
<p key={paragraphIndex} className="text-file-paragraph">
```

- [ ] **Step 2: Replace shared window chrome**

In `src/index.css`, replace `#window-header` with:

```css
#window-header {
  @apply flex items-center justify-between px-4 py-3 rounded-t-lg select-none text-sm;
  background: var(--window-elevated);
  border-bottom: 1px solid var(--window-border);
  color: var(--window-text-muted);
}
```

- [ ] **Step 3: Replace window surface rules**

In `src/index.css`, update these selectors by removing `bg-white` from `@apply` and adding `background: var(--window-bg); color: var(--window-text);`:

```css
#safari
#terminal
#contact
#photos
#txtfile
#imgfile
```

For `#finder`, add the same background and color declarations to the existing selector:

```css
#finder {
  @apply absolute w-3xl left-40 top-20 shadow-2xl drop-shadow-2xl overflow-hidden rounded-xl;
  background: var(--window-bg);
  color: var(--window-text);
}
```

- [ ] **Step 4: Add Finder layout styles**

In `src/index.css`, add this inside the `#finder` component rules:

```css
#finder .finder-layout {
  @apply flex h-full;
  background: var(--window-bg);
  color: var(--window-text);
}
```

- [ ] **Step 5: Replace Safari-specific colors**

In `src/index.css`, update the Safari nested rules:

```css
#safari .search {
  @apply flex items-center gap-3 w-2/3 rounded-lg px-3 py-2;
  background: var(--window-bg);
  border: 1px solid var(--window-border);
}

#safari .search input {
  color: var(--window-text);
}

#safari .search input::placeholder {
  color: var(--window-text-muted);
}

#safari .blog {
  @apply p-10 max-w-3xl mx-auto;
  background: var(--window-bg);
}

#safari .blog h2 {
  @apply text-xl font-bold mb-10;
  color: var(--brand-pink);
}

#safari .blog .blog-post .content p {
  @apply text-xs;
  color: var(--window-text-muted);
}

#safari .blog .blog-post .content h3 {
  @apply font-semibold text-base;
  color: var(--window-text);
}

#safari .blog .blog-post .content a {
  @apply text-xs hover:underline flex items-center gap-3;
  color: var(--accent);
}
```

- [ ] **Step 6: Replace Terminal-specific colors**

In `src/index.css`, update the Terminal nested rules:

```css
#terminal .techstack {
  @apply text-sm font-roboto p-5;
  background: var(--terminal-bg);
  color: var(--terminal-text);
}

#terminal .techstack .content {
  @apply py-5 my-5 border-y border-dashed space-y-1;
  border-color: var(--window-border);
}

#terminal .techstack .content li .check,
#terminal .techstack .content li h3,
#terminal .techstack .footnote {
  color: var(--terminal-accent);
}

#terminal .techstack .footnote .render-time {
  color: var(--terminal-text);
}

#terminal .techstack .footnote .render-time svg {
  fill: currentColor;
}
```

- [ ] **Step 7: Replace text file content colors**

In `src/index.css`, add:

```css
#txtfile .text-file-content {
  @apply p-5 space-y-6 overflow-y-auto max-h-[calc(100dvh-12rem)];
  background: var(--window-bg);
  color: var(--window-text);
}

#txtfile .text-file-subtitle {
  @apply text-sm font-semibold;
  color: var(--window-text-muted);
}

#txtfile .text-file-section-title {
  @apply text-xs font-bold uppercase tracking-[0.08em];
  color: var(--window-text-muted);
}

#txtfile .text-file-paragraph {
  @apply text-sm leading-6;
  color: var(--window-text);
}
```

- [ ] **Step 8: Replace Photos and Finder sidebars**

In `src/index.css`, update both `#photos .sidebar` and `#finder .sidebar`:

```css
background: var(--window-elevated);
border-color: var(--window-border);
color: var(--window-text);
```

Update active and inactive item styles:

```css
#photos .sidebar ul li:first-child,
#finder .sidebar ul .active {
  background: var(--accent-soft);
  color: var(--accent-strong);
}

#finder .sidebar ul .not-active {
  color: var(--window-text);
}

#finder .sidebar ul .not-active:hover {
  background: var(--window-hover);
}
```

Update Finder content:

```css
#finder .content {
  @apply flex-1 p-8 max-w-2xl min-h-[30rem] max-h-[70vh] overflow-auto relative;
  background: var(--window-bg);
  color: var(--window-text);
}
```

- [ ] **Step 9: Replace Resume, image preview, and desktop icon colors**

In `src/index.css`, update:

```css
#resume .resume-document {
  background: var(--resume-bg);
}

#imgfile #window-header p {
  font-weight: 700;
  color: var(--window-text-muted);
}

#imgfile .preview {
  @apply p-2 max-h-[70vh];
  background: var(--preview-bg);
}

#home ul li img {
  @apply p-1 rounded-md;
}

#home ul li img:hover,
#home ul li.group:hover img {
  background: var(--desktop-icon-hover);
}

#home ul li p {
  @apply text-sm text-center px-1 rounded-md transition-colors max-w-40;
  color: var(--desktop-icon-text);
}

#home ul li:hover p {
  background: var(--accent);
}
```

- [ ] **Step 10: Run lint and build**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands PASS and `dist/` is generated.

- [ ] **Step 11: Commit**

Run:

```bash
git add src/index.css src/windows/Finder.jsx src/windows/Terminal.jsx src/windows/text.jsx
git commit -m "feat: theme desktop windows"
```

---

### Task 6: Mobile CSS Migration

**Files:**

- Modify: `src/index.css`

- [ ] **Step 1: Replace mobile shell and home colors**

In the `@media (max-width: 639px)` block, update:

```css
.mobile-shell {
  @apply block fixed inset-0 z-[2000] h-dvh w-dvw overflow-hidden font-georama;
  background: var(--mobile-bg);
  color: var(--mobile-text);
}

.mobile-status-bar {
  @apply relative z-30 flex h-16 items-center justify-between px-7 text-sm font-semibold;
  color: var(--mobile-text);
  text-shadow: 0 1px 12px rgb(0 0 0 / 0.35);
}

.mobile-top-bar {
  @apply relative z-20 grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5;
  background: var(--mobile-bg);
}

.mobile-top-bar button {
  @apply flex min-w-0 items-center gap-1 text-[15px] font-medium;
  color: var(--accent);
}

.mobile-top-bar h1 {
  @apply max-w-[48vw] truncate text-center text-xl font-semibold;
  color: var(--mobile-text);
}

.mobile-home-icons button,
.mobile-welcome {
  color: var(--mobile-text);
}

.mobile-welcome p {
  @apply text-[24px] font-thin leading-tight;
  color: var(--mobile-text-muted);
}

.mobile-dock {
  @apply fixed bottom-9 left-1/2 z-40 flex w-[calc(100%-4rem)] max-w-[360px] -translate-x-1/2 items-center justify-between rounded-[26px] px-5 py-3 backdrop-blur-md;
  background: var(--mobile-panel-strong);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18);
}
```

- [ ] **Step 2: Replace mobile Finder and file grid colors**

Update:

```css
.mobile-breadcrumbs {
  @apply -mx-5 mb-7 flex h-12 items-center gap-2 overflow-x-auto px-5 text-base font-medium;
  background: var(--mobile-panel);
  color: var(--accent);
  scrollbar-width: none;
}

.mobile-breadcrumbs b {
  color: var(--mobile-text-faint);
}

.mobile-file-grid span {
  @apply line-clamp-2 min-h-10 max-w-24 break-words text-sm font-bold leading-tight;
  color: var(--mobile-text);
}
```

- [ ] **Step 3: Replace mobile content screen colors**

Update:

```css
.mobile-terminal,
.mobile-contact,
.mobile-blog-list,
.mobile-preview,
.mobile-resume,
.mobile-text-file,
.mobile-gallery {
  background: var(--mobile-bg);
  color: var(--mobile-text);
}

.mobile-terminal h2 {
  @apply mb-2 flex items-center gap-3 text-base font-bold;
  color: var(--terminal-accent);
}

.mobile-contact a {
  @apply flex h-full flex-col justify-between p-4;
  color: #ffffff;
}

.mobile-blog-list h2 {
  @apply mb-10 text-2xl font-bold;
  color: var(--brand-pink);
}

.mobile-blog-list p {
  @apply text-sm font-semibold;
  color: var(--mobile-text-muted);
}

.mobile-blog-list h3 {
  @apply mt-4 text-lg font-bold leading-7;
  color: var(--mobile-text);
}

.mobile-blog-list a {
  @apply mt-4 flex items-center gap-4 text-base font-semibold;
  color: var(--accent);
}

.mobile-safari-bar {
  @apply fixed bottom-0 left-0 right-0 z-40 px-5 pb-8 pt-4 backdrop-blur-lg;
  background: var(--mobile-bg-translucent);
  border-top: 1px solid var(--mobile-border);
}

.mobile-safari-bar label {
  @apply mb-5 flex h-12 items-center gap-3 rounded-xl px-4;
  background: var(--mobile-panel);
  border: 1px solid var(--mobile-border);
  color: var(--mobile-text-faint);
}

.mobile-safari-bar input {
  @apply min-w-0 flex-1 bg-transparent text-base font-medium outline-none;
  color: var(--mobile-text);
}

.mobile-safari-bar input::placeholder {
  color: var(--mobile-text-faint);
}

.mobile-safari-bar div {
  @apply flex items-center justify-between;
  color: var(--accent);
}

.mobile-resume a {
  @apply mb-4 ml-auto flex w-fit items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold;
  background: var(--mobile-panel);
  color: var(--accent);
}

.mobile-text-file {
  @apply min-h-full space-y-5 py-6 text-base leading-7;
  color: var(--mobile-text-muted);
}

.mobile-text-file h2 {
  @apply text-xl font-bold;
  color: var(--mobile-text);
}

.mobile-text-file h3 {
  @apply text-xs font-bold uppercase tracking-[0.08em];
  color: var(--mobile-text-faint);
}
```

- [ ] **Step 4: Run all checks**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all commands PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/index.css
git commit -m "feat: theme mobile screens"
```

---

### Task 7: Visual Verification

**Files:**

- Verify: `src/index.css`
- Verify: `src/components/Navbar.jsx`
- Verify: `src/mobile/MobileStatusBar.jsx`

- [ ] **Step 1: Start the dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 2: Verify desktop dark mode**

Open `http://127.0.0.1:5173/` at `1440x900`.

Expected:

- `document.documentElement.dataset.theme` is `dark` on first load when no stored theme exists and the system preference is not light.
- The dark wallpaper is visible.
- Navbar, dock, welcome text, desktop icons, all open windows, and window controls remain legible.
- Finder, Safari, Photos, Terminal, Resume, image preview, text file, and Contact windows have coherent surfaces and borders.

- [ ] **Step 3: Verify desktop light mode**

Click the mode icon in the desktop navbar.

Expected:

- `document.documentElement.dataset.theme` changes to `light`.
- `localStorage.getItem('sean-portfolio-theme')` returns `light`.
- The light wallpaper is visible.
- Window surfaces remain readable and desktop icon labels still have sufficient contrast against the wallpaper.

- [ ] **Step 4: Verify mobile dark and light mode**

Open `http://127.0.0.1:5173/` at `390x844`.

Expected:

- Home, status bar, dock, Finder, Gallery, Safari, Resume, Contact, Terminal, text file, and preview screens use the selected theme.
- The mobile status bar theme button toggles the theme.
- The theme persists after reload.
- Text does not overlap controls in either theme.

- [ ] **Step 5: Commit fixes from visual verification**

If visual verification required CSS adjustments, run:

```bash
npm run lint
npm run build
git add src/index.css src/components/Navbar.jsx src/mobile/MobileStatusBar.jsx
git commit -m "fix: polish theme contrast"
```

If visual verification required no CSS adjustments, do not create an empty commit.

---

### Task 8: Final Verification

**Files:**

- Verify all changed files.

- [ ] **Step 1: Run the full validation suite**

Run:

```bash
npm test
npm run lint
npm run build
npm run format:check
```

Expected:

- `npm test`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS.
- `npm run format:check`: PASS.

- [ ] **Step 2: Inspect changed files**

Run:

```bash
git diff --check
git status --short
```

Expected:

- `git diff --check`: no whitespace errors.
- `git status --short`: only intended theme implementation files are modified or newly added.

- [ ] **Step 3: Final commit**

If there are remaining uncommitted theme changes, run:

```bash
git add src/theme/theme.js src/theme/theme.test.mjs src/store/theme.js src/components/Navbar.jsx src/mobile/MobileStatusBar.jsx src/index.css package.json package-lock.json
git commit -m "feat: implement light and dark mode"
```

If every task already committed its changes, do not create another commit.

---

## Self-Review

- Spec coverage: The plan covers theme state, persistence, system fallback, desktop toggle, mobile toggle, desktop CSS, mobile CSS, tests, lint, build, and visual verification.
- Placeholder scan: No task relies on unspecified files, undefined function names, or deferred implementation details.
- Type consistency: Theme values are consistently `light` and `dark`; the storage key is consistently `sean-portfolio-theme`; the store consistently exposes `theme`, `setTheme`, and `toggleTheme`.
