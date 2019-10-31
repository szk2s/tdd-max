// @ts-ignore
/***
 * For `node.scrpit` object
 */
const maxAPI = require('max-api');
const TestRunner = require('./lib/testRunner');
const testRunner = new TestRunner(maxAPI);
require('./lib/global')(testRunner, maxAPI);
const loadTestFiles = require('./lib/loadTestFiles')(maxAPI);

const main = async () => {
  await loadTestFiles();
  await testRunner.run();
  // console.log('Finished: Total', testSuites.length, 'test suites have run.');
};

main();
