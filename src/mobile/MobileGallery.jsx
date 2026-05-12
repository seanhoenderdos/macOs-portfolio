import { gallery } from '#constants'

const MobileGallery = () => {
  return (
    <ul className="mobile-gallery">
      {gallery.map(({ id, img }) => (
        <li key={id}>
          <img src={img} alt="" />
        </li>
      ))}
    </ul>
  )
}

export default MobileGallery
