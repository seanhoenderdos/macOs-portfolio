import { gallery, photosLinks } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import { WindowControls } from '#components'

const Photos = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2 className="font-bold text-sm text-center flex-1">Gallery</h2>
      </div>

      <div className="flex">
        <aside className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt="" />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </aside>

        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li key={id}>
                <img src={img} alt={`Gallery item ${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

const PhotosWindow = WindowWrapper(Photos, 'photos')

export default PhotosWindow
