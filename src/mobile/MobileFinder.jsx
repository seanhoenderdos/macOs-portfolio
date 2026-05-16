import clsx from 'clsx'

import { locations } from '#constants'
import useMobileStore from '#store/mobile'

const rootItems = Object.values(locations)

const findLocationPath = (target, items = rootItems, parents = []) => {
  if (!target) return []

  for (const item of items) {
    const path = [...parents, item]
    if (item.id === target.id && item.name === target.name) return path

    if (item.children) {
      const childPath = findLocationPath(target, item.children, path)
      if (childPath.length) return childPath
    }
  }

  return []
}

const MobileFinder = () => {
  const location = useMobileStore((state) => state.location)
  const openLocation = useMobileStore((state) => state.openLocation)
  const openBreadcrumb = useMobileStore((state) => state.openBreadcrumb)
  const openFile = useMobileStore((state) => state.openFile)
  const items = location?.children ?? rootItems
  const breadcrumbs = [
    { name: 'Portfolio', location: null },
    ...findLocationPath(location).map((item) => ({
      name: item.name,
      location: item,
    })),
  ]

  const openItem = (item) => {
    if (item.kind === 'folder') {
      openLocation(item)
      return
    }

    if (['fig', 'url'].includes(item.fileType) && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
      return
    }

    openFile(item)
  }

  const getMobileIcon = (item) => {
    if (item.kind === 'folder') return '/images/folder.png'
    return item.icon
  }

  return (
    <>
      <div className="mobile-breadcrumbs" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <span key={`${crumb.name}-${index}`}>
            {index < breadcrumbs.length - 1 ? (
              <button
                type="button"
                onClick={() => openBreadcrumb(crumb.location)}
              >
                {crumb.name}
              </button>
            ) : (
              <span aria-current="page">{crumb.name}</span>
            )}
            {index < breadcrumbs.length - 1 && <b>/</b>}
          </span>
        ))}
      </div>

      <ul className={clsx('mobile-file-grid', { root: !location })}>
        {items.map((item) => (
          <li key={`${item.kind}-${item.id}-${item.name}`}>
            <button type="button" onClick={() => openItem(item)}>
              <img src={getMobileIcon(item)} alt="" />
              <span>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default MobileFinder
