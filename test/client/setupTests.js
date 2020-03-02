const Enzyme = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')

// const jsdom = require('jsdom')

// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

// global.document = doc
// global.window = doc.defaultView

Enzyme.configure({ adapter: new EnzymeAdapter() })