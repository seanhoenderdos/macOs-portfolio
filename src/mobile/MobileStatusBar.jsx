import dayjs from 'dayjs'
import { Battery, Moon, Sun, Wifi } from 'lucide-react'

import useThemeStore from '#store/theme'

const MobileStatusBar = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const Icon = theme === 'dark' ? Moon : Sun

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
