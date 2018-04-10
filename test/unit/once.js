import assert from 'assert'
import {once} from '../..'
import ticker from '../ticker'

describe('once(function)', function() {
  it('cleans up after itself', function() {
    document.body.innerHTML = '<div><a>foo</a></div>'
    const tick = ticker()
    const listener = once(tick)
    document.body.addEventListener('click', listener)
    const link = document.querySelector('a')
    link.click()
    link.click()
    document.body.click()
    assert.equal(tick.times, 1)
  })
})
