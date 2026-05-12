export const MOBILE_HOME_STATE = {
  screen: 'home',
  title: 'Home',
  location: null,
  file: null,
  history: [],
}

export const createInitialMobileState = () => ({ ...MOBILE_HOME_STATE })

const snapshot = (state) => ({
  screen: state.screen,
  title: state.title,
  location: state.location,
  file: state.file,
})

const pushState = (state, next) => ({
  ...next,
  history: [...state.history, snapshot(state)],
})

export const mobileOpenApp = (state, screen, title, options = {}) =>
  pushState(state, {
    screen,
    title,
    location: options.location ?? null,
    file: options.file ?? null,
  })

export const mobileOpenLocation = (state, location) =>
  pushState(state, {
    screen: 'finder',
    title: location?.name ?? 'Portfolio',
    location: location ?? null,
    file: null,
  })

export const mobileOpenFile = (state, file) => {
  const screenByType = {
    img: 'preview',
    txt: 'text',
    pdf: 'resume',
  }

  return pushState(state, {
    screen: screenByType[file?.fileType] ?? 'preview',
    title: file?.fileType === 'img' ? 'Preview' : (file?.name ?? 'Preview'),
    location: state.location,
    file: file ?? null,
  })
}

export const mobileBack = (state) => {
  if (!state.history.length) return state

  const previous = state.history[state.history.length - 1]

  return {
    ...previous,
    history: state.history.slice(0, -1),
  }
}
