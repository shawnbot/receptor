import assign from 'object-assign'
import delegate from './delegate'
import delegateAll from './delegateAll'

const DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/
const SPACE = ' '

const getListeners = (type, handler) => {
  const match = type.match(DELEGATE_PATTERN)
  let selector
  if (match) {
    type = match[1]
    selector = match[2]
  }

  let options
  if (typeof handler === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    }
  }

  const listener = {
    selector,
    options,
    delegate: typeof handler === 'object' ? delegateAll(handler) : selector ? delegate(selector, handler) : handler
  }

  if (type.indexOf(SPACE) > -1) {
    return type.split(SPACE).map(_type => {
      return assign({type: _type}, listener)
    })
  } else {
    listener.type = type
    return [listener]
  }
}

const popKey = (obj, key) => {
  const value = obj[key]
  delete obj[key]
  return value
}

export default function behavior(events, props) {
  const listeners = Object.keys(events).reduce((memo, type) => {
    const listeners = getListeners(type, events[type])
    return memo.concat(listeners)
  }, [])

  return assign(
    {
      add: element => {
        for (const listener of listeners) {
          element.addEventListener(listener.type, listener.delegate, listener.options)
        }
      },
      remove: element => {
        for (const listener of listeners) {
          element.removeEventListener(listener.type, listener.delegate, listener.options)
        }
      }
    },
    props
  )
}
