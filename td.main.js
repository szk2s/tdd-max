const testSuites = [
  require('./example/add1.test'),
  require('./example/sum.test'),
  require('./example/classify.test')
];
const maxAPI = require('max-api');

const runTest = ({ generatorName, target, testGenerator }) => {
  return new Promise((resolve) => {
    const testFunc = testGenerator(maxAPI);
    maxAPI.addHandler(target, (actual) => {
      let done;
      try {
        done = testFunc.next(actual).done;
      } catch (err) {
        console.log(err);
        resolve();
      } finally {
        if (done) {
          console.log('Passed:', generatorName);
          resolve();
        }
      }
    });
    testFunc.next();
  });
};

const runSuite = (testSuite) => {
  return new Promise(async (resolve) => {
    const target = testSuite.target;
    const testGeneratorNames = Object.keys(testSuite).filter((key) =>
      key.startsWith('test')
    );
    console.log('Running test for `' + target + '` patcher');
    for (let i = 0; i < testGeneratorNames.length; i++) {
      const generatorName = testGeneratorNames[i];
      const testGenerator = testSuite[generatorName];
      await runTest({ generatorName, target, testGenerator });
      maxAPI.removeHandlers(target);
    }
    resolve();
  });
};

const main = async () => {
  for (let i = 0; i < testSuites.length; i++) {
    await runSuite(testSuites[i]);
  }
  console.log('Total', testSuites.length, 'test suites have finished.');
};

main();
