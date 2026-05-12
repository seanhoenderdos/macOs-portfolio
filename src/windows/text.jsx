import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import { normalizeDescriptionSections } from './textContent'

const Text = () => {
  const data = useWindowStore((state) => state.windows.txtfile.data)

  if (!data) return null

  const { name, image, imageUrl, subtitle, description = [] } = data
  const previewImage = image || imageUrl
  const sections = normalizeDescriptionSections(description)

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <article className="p-5 space-y-6 overflow-y-auto max-h-[calc(100dvh-12rem)]">
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

        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <section key={section.title ?? sectionIndex} className="space-y-3">
              {section.title && (
                <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-gray-500">
                  {section.title}
                </h3>
              )}
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-sm leading-6">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  )
}

const TextWindow = WindowWrapper(Text, 'txtfile')

export default TextWindow
