import assert from 'assert'
import {keymap} from '../..'

xdescribe('keymap({key: listener})', function() {
  it('fires for certain keys', function(done) {
    const listener = keymap({
      PageUp: function(e) {
        done()
      },
    })
    const target = document.body
    target.addEventListener('keydown', listener)
    target.dispatchEvent(new KeyboardEvent('keydown', {key: 'PageUp'}))
    target.removeEventListener('keydown', listener)
  })

  it('ignores other keys', function(done) {
    const listener = keymap({
      PageUp: function(e) {
        assert.ok(false, 'should not match PageUp')
      },
    })
    const target = document.body
    target.addEventListener('keydown', listener)
    target.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: ' ',
      })
    )
    target.removeEventListener('keydown', listener)
    done()
  })

  it('respects modifiers', function(done) {
    const listener = keymap({
      PageUp: function(e) {
        assert.ok(false, 'modifier-free callback should not fire here')
      },
      'Shift+PageUp': function(e) {
        done()
      },
    })
    const target = document.body
    target.addEventListener('keydown', listener)
    target.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'PageUp',
        shiftKey: true,
      })
    )
    target.removeEventListener('keydown', listener)
  })

  it('ignores modifiers if none are provided', function(done) {
    const listener = keymap({
      PageUp: function(e) {
        done()
      },
    })
    const target = document.body
    target.addEventListener('keydown', listener)
    target.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'PageUp',
        shiftKey: true,
      })
    )
    target.removeEventListener('keydown', listener)
  })
})
