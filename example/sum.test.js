const { sum } = require('./sum');
const { TestRunner } = require('..');
const { portID } = require('./j4m.config');

test('adds 1 + 2 to equal 3', () => {
  const testRunner = new TestRunner(portID);
  testRunner.load("convert_nn_to_freq");
  const actual = await TestRunner.send(2);
  debugger;
  expect(actual).toBe(3);
});
