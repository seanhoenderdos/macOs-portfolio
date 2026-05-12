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
