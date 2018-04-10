import assert from 'assert'
import {behavior} from '../..'
import ticker from '../ticker'

describe('behavior({event: function})', function() {
  it('adds and removes', function() {
    const target = document.body
    target.innerHTML = '<button>hi</button>'
    const tick = ticker()
    const b = behavior({
      click: tick
    })
    b.add(target)
    target.click()
    b.remove(target)
    target.click()
    b.add(target)
    target.click()
    b.remove(target)
    target.click()
    assert.equal(tick.times, 2)
  })
})

describe('behavior({"event1 event2": function})', function() {
  it('adds multiple event type listeners', function() {
    document.body.innerHTML = '<button>hi</button>'
    const target = document.querySelector('button')
    const tick = ticker()
    const b = behavior({
      'click focus': tick,
    })
    b.add(target)
    target.click()
    target.focus()
    b.remove(target)
    target.click()
    target.focus()
    b.add(target)
    target.click()
    target.focus()
    b.remove(target)
    target.click()
    target.focus()
    assert.equal(tick.times, 4)
  })
})

describe('behavior({event: {selector: function}})', function() {
  it('adds and removes', function() {
    const target = document.body
    target.innerHTML = '<h1>yo</h1> <button>hi <i>there</i></button>'
    const tick = ticker()
    const b = behavior({
      click: {
        button: tick,
      },
    })
    b.add(target)
    target.click()
    target.querySelector('button').click()
    target.querySelector('i').click()
    b.remove(target)
    target.click()
    assert.equal(tick.times, 2)
  })
})

describe('behavior({"event:delegate(selector)": callback}', function() {
  it('adds and removes', function() {
    const target = document.body
    target.innerHTML = '<h1>yo</h1> <button>hi <i>there</i></button>'
    const tick = ticker()
    const b = behavior({
      'click:delegate(button)': tick,
    })
    b.add(target)
    target.click()
    target.querySelector('button').click()
    target.querySelector('i').click()
    b.remove(target)
    target.click()
    assert.equal(tick.times, 2)
  })

  it('adds and removes multiple event type listeners', function() {
    document.body.innerHTML = '<h1>yo</h1> <button>hi <i>there</i></button>'
    const target = document.querySelector('button')
    const tick = ticker()
    const b = behavior({
      'click focus:delegate(button)': tick,
    })
    b.add(target)
    target.click()
    target.focus()
    b.remove(target)
    target.click()
    target.focus()
    assert.equal(tick.times, 2)
  })
})

xdescribe('behavior options', function() {
  describe('behavior({event: {"*": function, ...options}})', function() {
    it('obeys the "capture" option', function() {})

    it('obeys the "passive" option', function() {})
  })

  describe('behavior({"event:delegate(selector)": {"*": callback, ...options})', function() {
    it('obeys the "capture" option', function() {})

    it('obeys the "passive" option', function() {})
  })
})
