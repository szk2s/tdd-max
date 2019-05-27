const assert = require('chai').assert;

module.exports = {
  target: 'classify',
  testInteger: function*(maxAPI) {
    maxAPI.outlet({ classify: 2 });
    let actual = yield;
    assert.equal(actual[0], 2, 'natural number');
    maxAPI.outlet({ classify: -10 });
    actual = yield;
    assert.equal(actual[0], -10, 'negative');
    maxAPI.outlet({ classify: '-1' });
    actual = yield;
    assert.equal(actual[1], '-1', 'stringified int');
    maxAPI.outlet({ classify: [0, 1, 2] });
    actual = yield;
    assert.deepEqual(actual[1], [0, 1, 2], 'list of int');
  },
  testFloat: function*(maxAPI) {
    maxAPI.outlet({ classify: 0.2 });
    let actual = yield;
    assert.equal(actual[0], 0.2, 'positive float');
    maxAPI.outlet({ classify: -10.123456789 });
    actual = yield;
    assert.equal(actual[0], -10.123456789, 'negative');
    maxAPI.outlet({ classify: '-0.1' });
    actual = yield;
    assert.equal(actual[1], '-0.1', 'stringified float');
    maxAPI.outlet({ classify: [0, 1.65, 0.2] });
    actual = yield;
    assert.deepEqual(actual[1], [0, 1.65, 0.2], 'list of float');
  },
  testSymbol: function*(maxAPI) {
    maxAPI.outlet({ classify: 'Hi' });
    let actual = yield;
    assert.equal(actual[1], 'Hi', 'Hi');
    maxAPI.outlet({ classify: 'hello world' });
    actual = yield;
    assert.equal(actual[1], 'hello world', 'hello world');
    maxAPI.outlet({ classify: '-1' });
    actual = yield;
    assert.equal(actual[1], '-1', 'stringified int');
  }
};
