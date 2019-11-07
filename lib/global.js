module.exports = (suiteCollection, maxAPI, Test, BeforeEach) => ({
  defineGlobalVars: () => {
    global.test = (name, fn, target) => {
      suiteCollection.head.push(new Test(maxAPI, { name, fn, target }));
    };
    global.beforeEach = (name, fn, target) => {
      suiteCollection.head.beforeEach = new BeforeEach(maxAPI, {
        name,
        fn,
        target
      });
    };
    global.maxAPI = maxAPI;
  }
});
