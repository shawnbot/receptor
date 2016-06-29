module.exports = function once(listener) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped);
    return listener.call(this, e);
  };
  return wrapped;
};

