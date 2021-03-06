import assert from 'assert'
import {delegateAll} from '../..'

describe('delegateAll({selector: function})', function() {
  it('delegates to the target', function(done) {
    document.body.innerHTML = '<div><a>foo</a></div>'
    const link = document.querySelector('a')
    const listener = delegateAll({
      a: function() {
        assert.strictEqual(this, link)
      },
      b: function() {
        assert.ok(false, 'this listener should not fire')
      }
    })
    document.body.addEventListener('click', listener)
    link.click()
    document.body.removeEventListener('click', listener)
    setTimeout(done, 0)
  })
})

describe('delegateAll() with multiple selectors', function() {
  it('delegates to multiple callbacks', function(done) {
    document.body.innerHTML = '<div><a>foo <b>bar</b></a></div>'
    const values = []
    const listener = delegateAll({
      a: function() {
        values.push(this.nodeName)
      },
      b: function() {
        values.push(this.nodeName)
      }
    })
    document.body.addEventListener('click', listener)
    document.querySelector('b').click()
    document.body.removeEventListener('click', listener)
    setTimeout(() => {
      assert.deepEqual(values, ['A', 'B'])
      done()
    }, 0)
  })

  it('short-circuits when one callback returns false', function(done) {
    document.body.innerHTML = '<div><a>foo <b>bar</b></a></div>'
    const values = []
    const listener = delegateAll({
      a: function() {
        values.push(this.nodeName)
        return false
      },
      b: function() {
        values.push(this.nodeName)
      }
    })
    document.body.addEventListener('click', listener)
    document.querySelector('b').click()
    document.body.removeEventListener('click', listener)
    setTimeout(() => {
      assert.deepEqual(values, ['A'])
      done()
    }, 0)
  })
})
