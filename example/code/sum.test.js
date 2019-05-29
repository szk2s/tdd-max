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
