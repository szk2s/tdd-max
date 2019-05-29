const assert = require('chai').assert;

module.exports = {
  // Name of the patcher which you want to test
  target: 'add1',

  // The key of each test generator function should start with 'test'
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
