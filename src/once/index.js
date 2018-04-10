export default function once(listener, options) {
  return function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrappedOnce, options)
    return listener.call(this, e)
  }
}
