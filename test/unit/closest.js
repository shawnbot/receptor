import assert from 'assert'
import {closest} from '../..'

describe('closest(element, selector)', function() {
  it('matches the target', function() {
    document.body.innerHTML = '<div><a>foo</a></div>'
    const target = document.querySelector('a')
    assert.strictEqual(closest(target, 'a'), target)
  })

  it('matches an ancestor', function() {
    document.body.innerHTML = '<div><a>foo</a></div>'
    const target = document.querySelector('a')
    const div = document.querySelector('div')
    assert.strictEqual(closest(target, 'div'), div)
  })

  it('bails when it reaches the Document', function() {
    document.body.innerHTML = '<div><a>foo</a></div>'
    const target = document.querySelector('a')
    assert.strictEqual(closest(target, '[hidden]'), undefined)
  })
})
