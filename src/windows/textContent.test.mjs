import assert from 'node:assert/strict'
import test from 'node:test'

import { normalizeDescriptionSections } from './textContent.js'

test('groups plain description paragraphs into an Intro section', () => {
  assert.deepEqual(normalizeDescriptionSections(['One.', 'Two.']), [
    {
      title: 'Intro',
      paragraphs: ['One.', 'Two.'],
    },
  ])
})

test('preserves titled description sections', () => {
  assert.deepEqual(
    normalizeDescriptionSections([
      {
        title: 'My approach',
        paragraphs: ['Research first.', 'Prototype quickly.'],
      },
    ]),
    [
      {
        title: 'My approach',
        paragraphs: ['Research first.', 'Prototype quickly.'],
      },
    ],
  )
})
