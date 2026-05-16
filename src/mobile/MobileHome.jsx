import useMobileStore from '#store/mobile'

import MobileDock from './MobileDock'
import MobileShell from './MobileShell'

const homeApps = [
  {
    id: 'resume',
    label: 'Resume',
    title: 'Resume',
    screen: 'resume',
    icon: '/images/pages.webp',
  },
  {
    id: 'terminal',
    label: 'Skills',
    title: 'Terminal',
    screen: 'terminal',
    icon: '/images/terminal.webp',
  },
]

const MobileHome = () => {
  const openApp = useMobileStore((state) => state.openApp)

  return (
    <MobileShell showTopBar={false} showDock className="mobile-home">
      <div className="mobile-home-icons">
        {homeApps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => openApp(app.screen, app.title)}
          >
            <img src={app.icon} alt="" />
            <span>{app.label}</span>
          </button>
        ))}
      </div>

      <div className="mobile-welcome">
        <p>Hey, I'm Sean! welcome to my</p>
        <h1>portfolio.</h1>
      </div>

      <MobileDock />
    </MobileShell>
  )
}

export default MobileHome
