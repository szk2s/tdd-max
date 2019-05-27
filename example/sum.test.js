const assert = require('chai').assert;

module.exports = {
  target: 'sum',
  testSum: function*(maxAPI) {
    maxAPI.outlet({ sum: [1, 2] });
    assert.equal(yield, 3, 'ordinary int');
    maxAPI.outlet({ sum: [0.1, 0.2] });
    assert.equal(yield, 0.3, 'float val');
    maxAPI.outlet({ sum: [5000, 8000] });
    assert.equal(yield, 13000, 'big int');
    maxAPI.outlet({ sum: [-1, -4] });
    assert.equal(yield, -5, 'negative int');
  }
};
