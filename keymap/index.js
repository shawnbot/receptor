import 'keyboardevent-key-polyfill'

// these are the only relevant modifiers supported on all platforms,
// according to MDN:
// <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState>
const MODIFIERS = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Ctrl: 'ctrlKey',
  Shift: 'shiftKey',
}

const MODIFIER_SEPARATOR = '+'

const getEventKey = function(event, hasModifiers) {
  var key = event.key
  if (hasModifiers) {
    for (var modifier in MODIFIERS) {
      if (event[MODIFIERS[modifier]] === true) {
        key = [modifier, key].join(MODIFIER_SEPARATOR)
      }
    }
  }
  return key
}

export default function keymap(keys) {
  const hasModifiers = Object.keys(keys).some(key => {
    return key.indexOf(MODIFIER_SEPARATOR) > -1
  })
  return function keymapper(event) {
    var key = getEventKey(event, hasModifiers)
    return [key, key.toLowerCase()].reduce((result, _key) => {
      if (_key in keys) {
        return keys[key].call(this, event)
      }
      return result
    })
  }
}

export {MODIFIERS}
