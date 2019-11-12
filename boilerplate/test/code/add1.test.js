const { expect } = require('chai');
const TARGET = 'add1';
test('adds 1 to input number', async () => {
  expect(await fetch(TARGET, { add1: 3 })).to.equal(4);
  expect(await fetch(TARGET, { add1: 0.1 })).to.equal(1.1);
  expect(await fetch(TARGET, { add1: 100000 })).to.equal(100001);
  expect(await fetch(TARGET, { add1: -2.1 })).to.equal(-1.1);
});
