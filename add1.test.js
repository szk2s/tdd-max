const assert = require('chai').assert;

function* testAdd1Generator(maxAPI) {
  maxAPI.outlet({ add1: 3 });
  assert.equal(yield, 4, 'ordinary int');
  maxAPI.outlet({ add1: 1000000 });
  assert.equal(yield, 1000001, 'big int');
  maxAPI.outlet({ add1: -1 });
  assert.equal(yield, 0, 'negative int');
  maxAPI.outlet({ add1: 0.1 });
  assert.equal(yield, 1.1, 'float val');
}

module.exports = { testAdd1Generator };
