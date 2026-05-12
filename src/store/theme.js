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
