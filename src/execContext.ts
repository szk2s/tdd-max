import { ISuiteCollection } from './SuiteCollection';
import { Test } from './Test';
import { BeforeEach } from './BeforeEach';
export type testFn = (name: string, fn: Function, target: string) => void;
export type beforeEachFn = (name: string, fn: Function, target: string) => void;
export interface execContext {
  test: testFn;
  beforeEach: beforeEachFn;
}

export const generateExecContext = (
  suiteCollection: ISuiteCollection
): execContext => ({
  test: (name, fn, target) => {
    suiteCollection.head.push(new Test(maxAPI, { name, fn, target }));
  },
  beforeEach: (name, fn, target) => {
    suiteCollection.head.beforeEach = new BeforeEach(maxAPI, {
      name,
      fn,
      target
    });
  }
});
