export const normalizeDescriptionSections = (description = []) => {
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
