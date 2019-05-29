// @ts-ignore
const maxAPI = require('max-api');
const path = require('path');
const glob = require('glob');

const loadTestFiles = () => {
  return new Promise((resolve) => {
    const handlePath = (patcherPath) => {
      const tmp = patcherPath.split(':');
      const testDir = path.dirname(tmp[tmp.length - 1]);
      const files = glob.sync('!(node_modules)/**/*.test.js', {
        cwd: testDir,
        absolute: true
      });
      resolve(files.map((file) => require(file)));
    };
    maxAPI.addHandler('path', handlePath);
    maxAPI.outlet('get_path');
  });
};

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
    console.log(
      'Running',
      testGeneratorNames.length,
      'tests for `' + target + '` patcher'
    );
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
  const testSuites = await loadTestFiles();
  for (let i = 0; i < testSuites.length; i++) {
    await runSuite(testSuites[i]);
  }
  console.log('Finished: Total', testSuites.length, 'test suites have run.');
};

main();
