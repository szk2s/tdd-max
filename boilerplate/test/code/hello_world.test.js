const { expect } = require('chai');

/**
 *  `hello_world` is a patcher which has 2 inlet and 2 outlets.
 *  When receiving something on its left inlet, it outputs "hello" from the left outlet.
 *  When receiving something on its right inlet, it outputs "world" from the right outlet.
 */

module.exports = {
  target: 'hello_world',
  testHello: function*(maxAPI) {
    maxAPI.outlet({ hello_world: { inlet0: 'Hey' } });
    expect(yield, 'Returns `hello`').to.include({ outlet0: 'hello' });
  },
  testWorld: function*(maxAPI) {
    maxAPI.outlet({ hello_world: { inlet1: 'It is a beautiful' } });
    expect(yield, 'Returns `world`').to.include({ outlet1: 'world' });
  }
};
