import dayjs from 'dayjs'
import { Battery, Wifi } from 'lucide-react'

const MobileStatusBar = () => {
  return (
    <div className="mobile-status-bar" aria-hidden="true">
      <time>{dayjs().format('h:mm A')}</time>
      <div className="mobile-dynamic-island" />
      <div className="mobile-status-icons">
        <Wifi size={17} strokeWidth={2.5} />
        <Battery size={18} strokeWidth={2.5} />
      </div>
    </div>
  )
}

export default MobileStatusBar
