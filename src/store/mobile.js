import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
  createInitialMobileState,
  mobileBack,
  mobileOpenApp,
  mobileOpenFile,
  mobileOpenLocation,
} from '../mobile/navigation'

const replaceState = (state, nextState) => {
  state.screen = nextState.screen
  state.title = nextState.title
  state.location = nextState.location
  state.file = nextState.file
  state.history = nextState.history
}

const useMobileStore = create(
  immer((set) => ({
    ...createInitialMobileState(),

    openApp: (screen, title, options) =>
      set((state) => {
        replaceState(state, mobileOpenApp(state, screen, title, options))
      }),

    openLocation: (location) =>
      set((state) => {
        replaceState(state, mobileOpenLocation(state, location))
      }),

    openFile: (file) =>
      set((state) => {
        replaceState(state, mobileOpenFile(state, file))
      }),

    goBack: () =>
      set((state) => {
        replaceState(state, mobileBack(state))
      }),

    goHome: () =>
      set((state) => {
        replaceState(state, createInitialMobileState())
      }),
  })),
)

export default useMobileStore
