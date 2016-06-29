module.exports = function(listener) {
  var wrapped = function (e) {
    e.currentTarget.removeEventListener(e.type, wrapped);
    return listener.call(this, e);
  };
  return wrapped;
};

