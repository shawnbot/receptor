const delegate = require('./delegate');
const delegateAll = require('./delegateAll');

const DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/;

var getListener = function(type, handler) {
  var match = type.match(DELEGATE_PATTERN);
  var selector;
  if (match) {
    type = match[1];
    selector = match[2];
  }

  var options;
  if (typeof handler === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    };
  }

  var delegate = (typeof handler === 'object')
    ? delegateAll(handler)
    : selector ? delegate(selector, handler) : handler;
  return {
    type: type,
    selector: selector,
    delegate: delegate,
    options: options
  };
};

var popKey = function(obj, key) {
  var value = obj[key];
  delete obj[key];
  return value;
};

module.exports = function behavior(events) {
  const listeners = Object.keys(events)
    .reduce(function(memo, type) {
      var listener = getListener(type, events[type]);
      memo.push(listener);
      return memo;
    });
  return {
    on: function(element) {
      listeners.forEach(function(listener) {
        element.addEventListener(
          listener.type,
          listener.delegate,
          listener.options
        );
      });
    },
    off: function(element) {
      listeners.forEach(function(listener) {
        element.removeEventListener(
          listener.type,
          listener.delegate,
          listener.options
        );
      });
    }
  };
};
