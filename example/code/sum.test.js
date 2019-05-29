const assert = require('chai').assert;

module.exports = {
  target: 'sum',
  testSum: function*(maxAPI) {
    maxAPI.outlet({ sum: { inlet0: 1, inlet1: 2 } });
    assert.equal(yield, 3, 'ordinary int');
    maxAPI.outlet({ sum: { inlet0: 0.1, inlet1: 0.2 } });
    assert.equal(yield, 0.3, 'float val');
    maxAPI.outlet({ sum: { inlet0: 5000, inlet1: 8000 } });
    assert.equal(yield, 13000, 'big int');
    maxAPI.outlet({ sum: { inlet0: -1, inlet1: -4 } });
    assert.equal(yield, -5, 'negative int');
  }
};
