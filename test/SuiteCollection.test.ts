import { Suite } from '../src/Suite';
import { ISuiteCollection, SuiteCollection } from '../src/SuiteCollection';

let suiteCollection: ISuiteCollection;

beforeEach(() => {
  suiteCollection = new SuiteCollection();
});

test('does not reproduce undefined error', () => {
  suiteCollection.push(new Suite());
  expect(suiteCollection).toHaveLength(1);
  expect(suiteCollection.head).not.toBe(undefined);
  expect(suiteCollection.head).toBeInstanceOf(Suite);
  expect(suiteCollection.head).toHaveProperty('push');
});
