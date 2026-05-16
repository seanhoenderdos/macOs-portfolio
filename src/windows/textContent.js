const cleanMarkdownLine = (line) =>
  line
    .replace(/^[-*]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .trim()

const normalizeMarkdownDescription = (description) => {
  const sections = []
  let currentSection = {
    title: 'Intro',
    paragraphs: [],
  }
  let paragraphLines = []

  const pushParagraph = () => {
    if (!paragraphLines.length) return

    currentSection.paragraphs.push(paragraphLines.join(' '))
    paragraphLines = []
  }

  const pushSection = () => {
    pushParagraph()

    if (currentSection.title || currentSection.paragraphs.length > 0) {
      sections.push(currentSection)
    }
  }

  description.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim()

    if (!line) {
      pushParagraph()
      return
    }

    if (line.startsWith('# ')) return

    if (line.startsWith('## ')) {
      pushSection()
      currentSection = {
        title: cleanMarkdownLine(line.replace(/^##\s+/, '')),
        paragraphs: [],
      }
      return
    }

    if (/^([-*]|\d+\.)\s+/.test(line)) {
      pushParagraph()
      currentSection.paragraphs.push(cleanMarkdownLine(line))
      return
    }

    paragraphLines.push(cleanMarkdownLine(line))
  })

  pushSection()

  return sections.filter(
    (section) => section.title || section.paragraphs.length > 0,
  )
}

export const normalizeDescriptionSections = (description = []) => {
  if (typeof description === 'string') {
    return normalizeMarkdownDescription(description)
  }

  if (!Array.isArray(description) || description.length === 0) return []

  if (description.every((item) => typeof item === 'string')) {
    return [
      {
        title: 'Intro',
        paragraphs: description,
      },
    ]
  }

  return description
    .map((section) => ({
      title: section.title,
      paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs : [],
    }))
    .filter((section) => section.title || section.paragraphs.length > 0)
}
