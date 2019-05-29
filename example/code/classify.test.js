const { expect } = require('chai');

module.exports = {
  target: 'classify',
  testInteger: function*(maxAPI) {
    maxAPI.outlet({ classify: 2 });
    expect(yield, 'natural number').to.include({ outlet0: 2 });
    maxAPI.outlet({ classify: -10 });
    expect(yield, 'negative int').to.include({ outlet0: -10 });
  },
  testFloat: function*(maxAPI) {
    maxAPI.outlet({ classify: 0.2 });
    expect(yield, 'positive float').to.include({ outlet0: 0.2 });
    maxAPI.outlet({ classify: [0, 1.65, 0.2] });
    expect(yield, 'list of float').to.deep.include({ outlet1: [0, 1.65, 0.2] });
  },
  testSymbol: function*(maxAPI) {
    maxAPI.outlet({ classify: 'Hello world' });
    expect(yield, 'Hello world').to.include({ outlet1: 'Hello world' });
    maxAPI.outlet({ classify: '-1' });
    expect(yield, 'stringified int').to.include({ outlet1: '-1' });
  }
};
