module.exports = (testRunner, maxAPI) => {
  global.describe = (description, testFn, target) => {
    testRunner.addTest({ description, target, testFn });
  };
  global.maxAPI = maxAPI;
};
