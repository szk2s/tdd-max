const globalVars: any = global;
export const defineGlobalVars = (suiteCollection, maxAPI, Test, BeforeEach) => {
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
