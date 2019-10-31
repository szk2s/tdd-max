const assert = require('chai').assert;

//TODO: move the first two lines into `beforeEach`

describe(
  'Sum Two Numbers',
  function*() {
    maxAPI.outlet({ sum: { inlet0: 0.0, inlet1: 0.0 } });
    assert.notEqual(yield, null, 'isOk');
    maxAPI.outlet({ sum: { inlet0: 1, inlet1: 2 } });
    assert.equal(yield, 3, 'ordinary int');
    maxAPI.outlet({ sum: { inlet0: 0.1, inlet1: 0.2 } });
    assert.equal(yield, 0.3, 'float val');
  },
  'sum'
);

describe(
  'Without Right Inlet',
  function*() {
    maxAPI.outlet({ sum: { inlet0: 0.0, inlet1: 0.0 } });
    assert.notEqual(yield, null, 'isOk');
    maxAPI.outlet({ sum: { inlet0: -1.2 } });
    assert.equal(yield, -1.2, 'ordinary int');
  },
  'sum'
);
