# TDD-Max
> Utility library which helps Test Driven Development in Cycling '74 Max

## What is TDD?
- Test Driven Development
- “Test-First” approach in which unit tests are written before code or patcher
- See [Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)
## Why TDD is important?
- TDD means fewer bugs, higher quality software, and a razor focus.  
- TDD allows problems to be detected as early as possible  
- See [this article](https://medium.com/@gondy/the-importance-of-test-driven-development-f80b0d02edd8)

## Install
1. Download zip file from [release page](https://github.com/spectral-lab/TDD-Max/releases)
1. Unzip
1. Copy all the contents into a folder which is listed in your File Preference, such as `/Users/Username/Documents/Max 8/Library`
1. Restart Max application if it is running.
1. See the help patcher, `tdd.maxhelp`. This also serves as a template of your test patcher.

## Usage
To use TDD-Max, you need to prepare two things, "test patcher" and "test code"
### Test patcher  
You can make your test patcher as shown below. If you would like to use this as your template, this is accessible in the help patcher.  
  
<img width="1440" alt="Screen Shot 2019-05-29 at 18 11 32" src="https://user-images.githubusercontent.com/31060964/58545345-054c9900-823e-11e9-952e-21e33690fa07.png">  

### Test codes
Here is an example of how you can write your test codes.  
```js
const assert = require('chai').assert;

module.exports = {
  // Name of the patcher which you want to test
  target: 'sum',

  // `initPatcher` will be executed just before each test function.
  initPatcher: function*(maxAPI) {
    maxAPI.outlet({ sum: { inlet0: 0.0, inlet1: 0.0 } });
    assert.notEqual(yield, null, 'isOk');
  },

  // The key of each test generator function should start with 'test'
  testSumTwoNumbers: function*(maxAPI) {
    maxAPI.outlet({ sum: { inlet0: 1, inlet1: 2 } });
    assert.equal(yield, 3, 'ordinary int');
    maxAPI.outlet({ sum: { inlet0: 0.1, inlet1: 0.2 } });
    assert.equal(yield, 0.3, 'float val');
  },
  testWithoutRightInlet: function*(maxAPI) {
    maxAPI.outlet({ sum: { inlet0: -1.2 } });
    assert.equal(yield, -1.2, 'ordinary int');
  }
};

```
More example codes can be found at [example folder](https://github.com/spectral-lab/TDD-Max/tree/master/example)  
  
#### Notes
- Test codes should be named as `*.test.js`.
- Test codes sould be placed in the same folder as your test patcher. You can also use subfolders.
-  - `tdd` will search those folders and load your codes automatically even if you have multiple test files.  

#### Dependencies of your test codes  
If you'd like to use some assertion library such as 'chai', please be aware those libraries should be installed to your project root, not to the folder where the TDD-Max is installed. Sending `npm install chai` message to `tdd` patcher will not work, so please use the command line.  

#### Generator function
If you are not familiar to `generator function`, please see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).  

## PR is welcome!
Though you can file an issue, PR is much more appreciated. The code is simple enough to modify quickly.