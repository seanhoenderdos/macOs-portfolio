import useMobileStore from '#store/mobile'

import MobileContact from './MobileContact'
import MobileFilePreview from './MobileFilePreview'
import MobileFinder from './MobileFinder'
import MobileGallery from './MobileGallery'
import MobileHome from './MobileHome'
import MobileResume from './MobileResume'
import MobileSafari from './MobileSafari'
import MobileShell from './MobileShell'
import MobileTerminal from './MobileTerminal'
import MobileTextFile from './MobileTextFile'

const mobileScreens = {
  contact: MobileContact,
  finder: MobileFinder,
  gallery: MobileGallery,
  preview: MobileFilePreview,
  resume: MobileResume,
  safari: MobileSafari,
  terminal: MobileTerminal,
  text: MobileTextFile,
}

const MobileApp = () => {
  const screen = useMobileStore((state) => state.screen)
  const title = useMobileStore((state) => state.title)

  if (screen === 'home') return <MobileHome />

  const Screen = mobileScreens[screen] ?? MobileFinder

  return (
    <MobileShell title={title} className={`mobile-screen-${screen}`}>
      <Screen />
    </MobileShell>
  )
}

export default MobileApp
