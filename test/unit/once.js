import assert from 'assert'
import once from '../../once'

describe('once(function)', function() {
  it('cleans up after itself', function() {
    document.body.innerHTML = '<div><a>foo</a></div>'
    var times = 0
    var listener = once(function(e) {
      times++
    })
    document.body.addEventListener('click', listener)
    var link = document.querySelector('a')
    link.click()
    link.click()
    document.body.click()
    assert.equal(times, 1)
  })
})
