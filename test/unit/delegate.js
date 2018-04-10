import assert from 'assert'
import {delegate} from '../..'

describe('delegate(selector, function)', function() {
  it('delegates to the target', function(done) {
    document.body.innerHTML = '<div><a>foo</a></div>'
    const link = document.querySelector('a')
    const listener = delegate('a', function() {
      assert.strictEqual(this, link)
      done()
    })
    document.body.addEventListener('click', listener)
    link.click()
    document.body.removeEventListener('click', listener)
  })

  it('delegates to the ancestor', function(done) {
    document.body.innerHTML = '<div><a>foo <b>bar</b></a></div>'
    const link = document.querySelector('a')
    const listener = delegate('a', function() {
      assert.strictEqual(this, link)
      done()
    })
    document.body.addEventListener('click', listener)
    document.querySelector('b').click()
    document.body.removeEventListener('click', listener)
  })

  it('does not call the handler if no match is found', function(done) {
    document.body.innerHTML = '<div><a>foo <b>bar</b></a></div>'
    const listener = delegate('section', () => {
      assert.ok(false, 'this should not happen')
    })
    document.body.addEventListener('click', listener)
    document.querySelector('b').click()
    document.body.removeEventListener('click', listener)
    setTimeout(done, 0)
  })
})
