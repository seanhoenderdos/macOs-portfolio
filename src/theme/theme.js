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
    // Restricted storage should not prevent the portfolio from rendering.
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
