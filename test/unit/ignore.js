import assert from 'assert'
import {ignore} from '../..'
import ticker from '../ticker'

describe('ignore(element, function)', function() {
  it('ignores the target', function() {
    document.body.innerHTML = '<button>hi</button><div><a>foo</a></div>'
    const target = document.querySelector('div')
    const tick = ticker()
    const listener = ignore(target, tick)
    document.body.addEventListener('click', listener)
    for (const selector of ['body', 'button', 'a', 'div']) {
      document.querySelector(selector).click()
    }
    assert.equal(tick.times, 2)
    document.body.removeEventListener('click', listener)
  })
})
