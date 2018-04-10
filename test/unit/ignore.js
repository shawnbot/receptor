import assert from 'assert'
import ignore from '../../ignore'

const SELECTORS = ['body', 'button', 'a', 'div']

describe('ignore(element, function)', function() {
  it('ignores the target', function() {
    document.body.innerHTML = '<button>hi</button><div><a>foo</a></div>'
    var target = document.querySelector('div')
    var times = 0
    var listener = ignore(target, function(e) {
      times++
    })
    document.body.addEventListener('click', listener)
    for (const selector of SELECTORS) {
      document.querySelector(selector).click()
    }
    assert.equal(times, 2)
    document.body.removeEventListener('click', listener)
  })
})
