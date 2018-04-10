// polyfill Element.prototype.closest
import 'element-closest'

export default function delegate(selector, fn) {
  return event => {
    const target = event.target.closest(selector)
    if (target) {
      return fn.call(target, event)
    }
  }
}
