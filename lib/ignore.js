module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (!element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};
