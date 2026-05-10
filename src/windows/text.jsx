import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'

const Text = () => {
  const data = useWindowStore((state) => state.windows.txtfile.data)

  if (!data) return null

  const { name, image, imageUrl, subtitle, description = [] } = data
  const previewImage = image || imageUrl

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <article className="p-5 space-y-6">
        {previewImage && (
          <img
            src={previewImage}
            alt={name}
            className="w-full h-auto rounded-lg"
          />
        )}

        {subtitle && (
          <p className="text-sm font-semibold text-gray-500">{subtitle}</p>
        )}

        <div className="space-y-3">
          {description.map((paragraph, index) => (
            <p key={index} className="text-sm leading-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </>
  )
}

const TextWindow = WindowWrapper(Text, 'txtfile')

export default TextWindow
