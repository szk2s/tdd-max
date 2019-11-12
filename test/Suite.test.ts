import { Suite } from '../src/Suite';

test('instanciates', () => {
  const suite = new Suite();
  expect(suite).not.toBe(undefined);
  expect(suite).toBeInstanceOf(Suite);
});
