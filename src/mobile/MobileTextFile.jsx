import useMobileStore from '#store/mobile'
import { normalizeDescriptionSections } from '#windows/textContent'

const MobileTextFile = () => {
  const file = useMobileStore((state) => state.file)

  if (!file) return null

  const previewImage = file.image || file.imageUrl
  const sections = normalizeDescriptionSections(file.description)

  return (
    <article className="mobile-text-file">
      {previewImage && <img src={previewImage} alt={file.name} />}
      {file.subtitle && <h2>{file.subtitle}</h2>}
      {sections.map((section, sectionIndex) => (
        <section key={section.title ?? sectionIndex} className="space-y-3">
          {section.title && <h3>{section.title}</h3>}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </section>
      ))}
    </article>
  )
}

export default MobileTextFile
