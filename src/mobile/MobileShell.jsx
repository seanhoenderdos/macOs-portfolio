import clsx from 'clsx'

import MobileStatusBar from './MobileStatusBar'
import MobileTopBar from './MobileTopBar'

const MobileShell = ({
  children,
  title,
  showTopBar = true,
  showDock = false,
  className,
}) => {
  return (
    <section className={clsx('mobile-shell', className)}>
      <MobileStatusBar />
      {showTopBar && <MobileTopBar title={title} />}
      <div
        className={clsx('mobile-body', {
          'has-dock': showDock,
          'has-top-bar': showTopBar,
        })}
      >
        {children}
      </div>
    </section>
  )
}

export default MobileShell
