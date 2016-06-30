# receptor
Yes, it's another DOM event delegation toolkit! But this one is
different, _I swear_. Check it out:

## `receptor.delegate(selector, fn)`
Returns a delegated function that only calls the `fn` callback if
the event target matches the given CSS `selector`, _or if it is
contained by an element that does_. The callback is called with the
matching element as `this`.

**Why?** Because most event delegators only handle the case in which
the event's `target` matches the given selector, which breaks down
as soon as you want to delegate to elements that have child
elements.

```html
<button>hi</button>
<button>hi <i>there</i></button>
<script>
document.body.addEventListener(
  'click',
  receptor.delegate('button', function(event) {
    console.log('clicked button:', this);
  })
);
</script>
```

## `receptor.delegateAll(selectors)`
Returns a delegated function that treats each key in the `selectors`
map as a CSS selector to match _a la_ `receptor.delegate()`, and can either
delegate events to multiple callbacks with matching selectors or
short-circuit delegation to later selectors by returning `false`:

```html
<button>some button</button>
<button aria-controls="other">another button</button>
<script>
document.body.addEventListener(
  'click',
  receptor.delegateAll({
    'button[aria-controls]': function(event) {
      console.log('clicked controller:', this);
      return false; // no other delegates will be called
    },
    'button': function(event) {
      console.log('clicked other button:', this);
    }
  })
);
```

## `receptor.ignore(element, callback)`
Returns a delegated function that only calls the `callback` if the
event's `target` isn't _contained_ by the provided `element`. This
is useful for creating event handlers that only fire if the user
interacts with something outside of a given UI element.

## `receptor.once(callback)`
Returns a wrapped function that removes itself as an event listener
as soon as it's called, then calls the `callback` function with the
same arugments.

## `receptor.keymap(keys)`
Returns a delegated function in which each key in the `keys` object
is treated as a [key name] or _combination_ with modifier keys:

```js
document.body.addEventListener('keydown', receptor.keymap({
  'ArrowLeft':        moveLeft,
  'ArrowRight':       moveRight,
  'Shift+ArrowLeft':  moveLeftMore,
  'Shift+ArrowRight': moveRightMore
}));
```

In other words, this is a more declarative alternative to a single
event handler with potentially messy key detection logic. Supported
modifier keys are <kbd>Alt</kbd>, <kbd>Control</kbd> (or
<kbd>Ctrl</kbd>), and <kbd>Shift</kbd>.

## `receptor.behavior(listeners [, properties])`
Returns a _behavior_ object defined by one or more delegated
listeners, which exposes `add()` and `remove()` methods for
attaching and removing all delegates. Other `properties` will be
merged if provided.

Each key in `listeners` should be one of either:

1. One or more event types, such as `click`, `keydown`, or
   `mousedown touchstart` (multiple types are separated by spaces),
   in which case the value can either be a function or an object
   suitable for `receptor.delegateAll()`; or
1. A string in the form `types:delegate(selector)`, where `types` can
   be one or more event types separated with spaces, and `selector`
   is a CSS selector.

This is the primary building block for developing rich, declarative
interactions:

```html
<button role="menubutton" aria-controls="menu">toggle menu</button>
<menu id="menu" aria-hidden="true">
  <!-- stuff -->
</menu>
<script>
var MenuButton = receptor.behavior({
  'click': {
    '[role=menubutton]': function(event) {
      MenuButton.toggle(this);
      var off = MenuButton.getCloseListener(this);
      window.addEventListener('click', off);
    }
  }
}, {
  toggle: function(button, pressed) {
    if (typeof pressed !== 'boolean') {
      pressed = button.getAttribute('aria-pressed') !== 'true';
    }
    button.setAttribute('aria-pressed', pressed);
    MenuButton.getMenu(button)
      .setAttribute('aria-hidden', !pressed);
  },

  getMenu: function(button) {
    var id = button.getAttribute('aria-controls');
    return document.getElementById(id);
  },

  getCloseListener: function(button) {
    return receptor.ignore(button, receptor.once(function() {
      MenuButton.toggle(button, false);
    }));
  }
});

// enable the interaction on any [role=menubutton]
MenuButton.add(document.body);
// later...
// MenuButton.remove(document.body);
</script>
```

[key name]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
