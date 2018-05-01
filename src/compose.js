export default function compose(functions) {
  return function(e) {
    return functions.some(fn => {
      return fn.call(this, e) === false
    })
  }
}
