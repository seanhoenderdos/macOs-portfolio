import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

import { Navbar, Welcome, Dock, Home } from '#components'
import {
  Finder,
  Image,
  Photos,
  Resume,
  Safari,
  Terminal,
  Text,
} from '#windows/index.jsx'
import { Contact } from '#windows'
import MobileApp from './mobile/MobileApp'

gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
      <div className="desktop-app">
        <Navbar />
        <Welcome />
        <Dock />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Photos />
        <Text />
        <Image />
        <Contact />

        <Home />
      </div>

      <MobileApp />
    </main>
  )
}

export default App
