import { dockApps } from '#constants'
import useMobileStore from '#store/mobile'

const dockMap = {
  finder: { screen: 'finder', title: 'Portfolio' },
  safari: { screen: 'safari', title: 'Safari' },
  photos: { screen: 'gallery', title: 'Photos' },
  contact: { screen: 'contact', title: 'Contact' },
}

const MobileDock = () => {
  const openApp = useMobileStore((state) => state.openApp)
  const apps = dockApps.filter((app) => dockMap[app.id])

  return (
    <nav className="mobile-dock" aria-label="Mobile apps">
      {apps.map((app) => (
        <button
          key={app.id}
          type="button"
          aria-label={app.name}
          onClick={() => openApp(dockMap[app.id].screen, dockMap[app.id].title)}
        >
          <img src={`/images/${app.icon}`} alt="" />
        </button>
      ))}
    </nav>
  )
}

export default MobileDock
