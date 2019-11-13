# Getting Started
## How to write your first test code
### First example
In the most straight way, you can write as shown below.
Notice that maxAPI and test function are available as global variables.
In this case, `done` callback is used to wait the response from Max.
```js
const { expect } = require('chai');
test('adds 1 to input number', (done) => {
  maxAPI.addHandler('add1', (actual) => {
    expect(actual).to.equal(4);
    done()
  })
  maxAPI.outlet({add1: 3});
});
```

### Fetch API example
Previous example is a bit redundant because of the `addHandler`. You can write in more procedural way with our `fetch` api which is also available as global variable. 
```js
const { expect } = require('chai');
test('adds 1 to input number', (done) => {
  // First argument is the handler name. The second is the message to Max.
  fetch('add1', { add1: 3 }).then((actual) => {
    expect(actual).to.equal(4);
    done();
  })
});
```

### Async/await syntax
You can use async/await syntax to make your code even simpler.
If your callback, the second argument of `test` function, returns Promise, the test will be continued until the promise is resolved. 
```js
const { expect } = require('chai');
test('adds 1 to input number', async () => {
  expect(await fetch('add1', { add1: 3 })).to.equal(4);
});
```

### See more
In [boilerplate/test/code](https://github.com/spectral-lab/TDD-Max/tree/master/boilerplate/test/code), you can find more example codes. 