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
You can make your test patcher as shown below. If you would like to use this as your template, this is accessible from the help patcher.  
  
<img width="1440" alt="Screen Shot 2019-05-29 at 18 11 32" src="https://user-images.githubusercontent.com/31060964/58545345-054c9900-823e-11e9-952e-21e33690fa07.png">  

### Test codes
```js
const assert = require('chai').assert;

module.exports = {
  target: 'add1',
  testAdd1: function*(maxAPI) {
    maxAPI.outlet({ add1: 3 });
    assert.equal(yield, 4, 'ordinary int');
    maxAPI.outlet({ add1: 0.1 });
    assert.equal(yield, 1.1, 'float val');
    maxAPI.outlet({ add1: 100000 });
    assert.equal(yield, 100001, 'big int');
    maxAPI.outlet({ add1: -2.1 });
    assert.equal(yield, -1.1, 'negative float');
  }
};
```
More example codes can be found at https://github.com/spectral-lab/TDD-Max/tree/master/example  
  
Be careful that all your test codes should be named as `*.test.js`.
In addition, you must place your test code in the same folder as your test patcher. Or, the subfolder can be used.
`tdd` will search those folders and load your codes automatically even if you have multiple test files.  
  
If you'd like to use some assertion library such as 'chai', please be aware those libraries should be installed to your project root, not to the folder where the `tdd` patcher is installed. Sending `npm install` message to `tdd` patcher will not work, so please use the command line.  

If you are not familiar to `generator function`, please see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
## PR is welcome!
You can file an issue, but PR is greatly appreciated. The code is simple enough to modify quickly.