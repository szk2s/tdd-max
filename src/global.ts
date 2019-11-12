import { ISuiteCollection } from './SuiteCollection';
import { Test } from './Test';

interface GlobalVars extends NodeJS.Global {
  test?: (name: string, fn: Function, target: string) => void;
  beforeEach?: (name: string, fn: Function, target: string) => void;
  maxAPI?: TddMax.TODO_ANNOTATE;
}

const globalVars: GlobalVars = global;

type DefineGlobalVars = (
  suiteCollection: ISuiteCollection,
  maxAPI: TddMax.TODO_ANNOTATE,
  BeforeEach: TddMax.TODO_ANNOTATE
) => void;

export const defineGlobalVars: DefineGlobalVars = (
  suiteCollection,
  maxAPI,
  BeforeEach
) => {
  globalVars.test = (name, fn, target) => {
    suiteCollection.head.push(new Test(maxAPI, { name, fn, target }));
  };
  globalVars.beforeEach = (name, fn, target) => {
    suiteCollection.head.beforeEach = new BeforeEach(maxAPI, {
      name,
      fn,
      target
    });
  };
  globalVars.maxAPI = maxAPI;
};
