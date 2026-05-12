import assert from 'node:assert/strict'

import {
  createInitialMobileState,
  mobileBack,
  mobileOpenApp,
  mobileOpenFile,
  mobileOpenLocation,
} from './navigation.js'

const workLocation = {
  id: 1,
  type: 'work',
  name: 'Work',
  kind: 'folder',
}

const projectLocation = {
  id: 5,
  type: 'project',
  name: 'Nike Ecommerce Website Application',
  kind: 'folder',
}

const imageFile = {
  id: 4,
  name: 'nike.png',
  kind: 'file',
  fileType: 'img',
  imageUrl: '/images/project-1.png',
}

const initial = createInitialMobileState()
assert.deepEqual(initial, {
  screen: 'home',
  title: 'Home',
  location: null,
  file: null,
  history: [],
})

const portfolio = mobileOpenApp(initial, 'finder', 'Portfolio')
assert.equal(portfolio.screen, 'finder')
assert.equal(portfolio.title, 'Portfolio')
assert.equal(portfolio.history.length, 1)
assert.equal(portfolio.history[0].screen, 'home')

const work = mobileOpenLocation(portfolio, workLocation)
assert.equal(work.screen, 'finder')
assert.equal(work.title, 'Work')
assert.equal(work.location, workLocation)
assert.equal(work.history.length, 2)

const project = mobileOpenLocation(work, projectLocation)
assert.equal(project.title, 'Nike Ecommerce Website Application')
assert.equal(project.location, projectLocation)
assert.equal(project.history.length, 3)

const preview = mobileOpenFile(project, imageFile)
assert.equal(preview.screen, 'preview')
assert.equal(preview.title, 'Preview')
assert.equal(preview.file, imageFile)
assert.equal(preview.location, projectLocation)

const backToProject = mobileBack(preview)
assert.equal(backToProject.screen, 'finder')
assert.equal(backToProject.title, 'Nike Ecommerce Website Application')
assert.equal(backToProject.location, projectLocation)

const backToWork = mobileBack(backToProject)
assert.equal(backToWork.title, 'Work')
assert.equal(backToWork.location, workLocation)

const backToPortfolio = mobileBack(backToWork)
assert.equal(backToPortfolio.title, 'Portfolio')
assert.equal(backToPortfolio.location, null)

const backHome = mobileBack(backToPortfolio)
assert.equal(backHome.screen, 'home')
assert.equal(backHome.history.length, 0)

const staysHome = mobileBack(backHome)
assert.deepEqual(staysHome, backHome)
