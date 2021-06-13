
### Event Emitter

An event emitter is a pattern that listens to a named event, fires a callback, then emits that event with a value. Sometimes this is referred to as a "pub/sub" model, or listener. It's referring to the same thing.

```js
// Basic Example
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on("event", () => {
  console.log("an event occurred!");
});
myEmitter.emit("event");
```

##### Passing arguments and this to listeners

The standard <code>this</code> keyword is intentionally set to reference the <code>EventEmitter</code> instance to which the listener is attached.

```js
const myEmitter = new MyEmitter();
myEmitter.on("event", function (a, b) {
  console.log(a, b, this, this === myEmitter);
  // Prints:
  // a, b, MyEmitter {...}, true
});
myEmitter.emit("event", "a", "b");

// With ES6 Arrow function, the this keyword will no longer
// reference the EventEmitter instace
const myEmitter = new MyEmitter();
myEmitter.on("event", (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});
myEmitter.emit("event", "a", "b");
```

##### Asynchronous vs synchronous

The <code>EventEmitter</code> calls all listeners synchronously in the order in which they were registered. This ensures the proper sequencing of events and helps avoid race conditions and logic errors. When appropriate, listeners function can switch to an asynchronous mode of operation using the <code>setImmediate()</code> or <code>process-nextTick()</code> methods:

```js
const myEmitter = new MyEmitter();
myEmitter.on("event", (a, b) => {
  setImmediate(() => {
    console.log("this happens asynchronously");
  });
});
myEmitter.emit("event", "a", "b");
```
