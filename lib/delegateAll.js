const delegate = require('./delegate');

module.exports = function delegateAll(selectors) {
  const delegates = Object.keys(selectors)
    .reduce(function(memo, selector) {
      memo.push(delegate(selector, selectors[selector]));
      return memo;
    }, []);
  return function delegationAll(event) {
    return delegates.some(function(fn) {
      return fn.call(this, event) === false;
    }, this);
  }
}

