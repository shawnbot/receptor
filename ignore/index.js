export default function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e)
    }
  }
}
