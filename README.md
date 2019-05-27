# TDD-Max
> Utility library which helps Test Driven Development in Cycling '74 Max

## What is TDD?
  See [Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)
## Why TDD is important?
  The importance of TDD cannot be overemphasized.  
  TDD means fewer bugs, higher quality software, and a razor focus, but it can slow development down and the test suites can be tedious to manage and maintain.  
  All in all, it is a recommended approach as the Pros far outweighs the Cons.  
  See [this article](https://medium.com/@gondy/the-importance-of-test-driven-development-f80b0d02edd8)

## Install
1. Download zip file from [release page](https://github.com/spectral-lab/TDD-Max/releases)
1. Unzip
1. Copy all the contents into a folder which is listed in your File Preference, such as `/Users/Username/Documents/Max 8/Library`
1. See the help patcher, `tdd.maxhelp`. This also serves as a template of your test patcher.

## Usage
To use TDD-Max, you need to prepare two things, "test patcher" and "test code"
### Test patcher  
You can make your test patcher as shown below. If you would like to use this as your template, this is accessible from the help patcher.
<img width="993" alt="Screen Shot 2019-05-28 at 1 37 50" src="https://user-images.githubusercontent.com/31060964/58431536-48e1be80-80e9-11e9-9463-e0abc1d4493d.png">  

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
Be careful that all your test codes should be named as `*.test.js`.
In addition, you must place your test code in the same folder as your test patcher. Or, the subfolder can be used.
`tdd` will search those folders and load your codes automatically even if you have multiple test files.  
  
If you are not familiar to `generator function`, please see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
## PR is welcome!
You can file issue, but PR is greatly appreciated. The code is simple enough to modify quickly.