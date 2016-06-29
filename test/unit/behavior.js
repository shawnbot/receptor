const assert = require('assert');
const jsdom = require('jsdom-global');

var cleanup = jsdom();
const behavior = require('../../lib/behavior');
cleanup();

beforeEach(function() {
  cleanup = jsdom();
});

afterEach(function() {
  cleanup();
});

describe('behavior({event: function})', function() {

  it('adds and removes', function() {
    var target = document.body;
    target.innerHTML = '<button>hi</button>';
    var times = 0;
    var b = behavior({'click': function(e) {
      times++;
    }});
    b.add(target);
    target.click();
    b.remove(target);
    target.click();
    b.add(target);
    target.click();
    b.remove(target);
    target.click();
    assert.equal(times, 2);
  });

});

describe('behavior({event: {selector: function}})', function() {

  it('adds and removes', function() {
    var target = document.body;
    target.innerHTML = '<h1>yo</h1> <button>hi <i>there</i></button>';
    var times = 0;
    var b = behavior({
      'click': {
        'button': function(e) {
          times++;
        }
      }
    });
    b.add(target);
    target.click();
    target.querySelector('button').click();
    target.querySelector('i').click();
    b.remove(target);
    target.click();
    assert.equal(times, 2);
  });

});

describe('behavior({"event:delegate(selector)": callback}', function() {

  it('adds and removes', function() {
    var target = document.body;
    target.innerHTML = '<h1>yo</h1> <button>hi <i>there</i></button>';
    var times = 0;
    var b = behavior({
      'click:delegate(button)': function(e) {
        times++;
      }
    });
    b.add(target);
    target.click();
    target.querySelector('button').click();
    target.querySelector('i').click();
    b.remove(target);
    target.click();
    assert.equal(times, 2);
  });

});

xdescribe('behavior() with options', function() {

  describe('behavior({event: {"*": function, ...options}})', function() {

    it('obeys the "capture" option', function() {
    });

    it('obeys the "passive" option', function() {
    });

  });

  describe('behavior({"event:delegate(selector)": {"*": callback, ...options})', function() {

    it('obeys the "capture" option', function() {
    });

    it('obeys the "passive" option', function() {
    });

  });

});
