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
        <img src="/images/logo.svg" alt="logo" className="nav-logo" />
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
                  className="nav-icon-button theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${nextTheme} mode`}
                  aria-pressed={theme === 'dark'}
                >
                  <img src={img} alt="" />
                </button>
              ) : (
                <span className="nav-icon-button" aria-hidden="true">
                  <img src={img} alt="" />
                </span>
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
