import { ChevronLeft } from 'lucide-react'

import useMobileStore from '#store/mobile'

const MobileTopBar = ({ title }) => {
  const goBack = useMobileStore((state) => state.goBack)

  return (
    <header className="mobile-top-bar">
      <button type="button" onClick={goBack} aria-label="Go back">
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>
      <h1>{title}</h1>
      <div aria-hidden="true" />
    </header>
  )
}

export default MobileTopBar
