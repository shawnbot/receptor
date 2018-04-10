import matches from 'matches-selector'

export default function closest(element, selector) {
  do {
    if (matches(element, selector)) {
      return element
    }
  } while ((element = element.parentNode) && element.nodeType === 1)
}
