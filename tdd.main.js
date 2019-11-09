// @ts-ignore
/***
 * For `node.scrpit` object
 */
const maxAPI = require('max-api');
const MaxAPIFacade = require('./lib/MaxAPIFacade');
const maxAPIFacade = new MaxAPIFacade(maxAPI);
const configLoader = require('./lib/ConfigLoader')(maxAPIFacade);
const SuiteCollection = require('./lib/SuiteCollection');
const suiteCollection = new SuiteCollection();
const Suite = require('./lib/Suite');
const TestLoader = require('./lib/TestLoader');
const testLoader = new TestLoader(suiteCollection, Suite);
const Test = require('./lib/Test');
const BeforeEach = require('./lib/BeforeEach');
const { defineGlobalVars } = require('./lib/global')(
  suiteCollection,
  maxAPI,
  Test,
  BeforeEach
);

const main = async () => {
  try {
    console.log('Starting');
    defineGlobalVars();
    const config = await configLoader.run();
    await testLoader.requireTestFiles(config);
    await suiteCollection.run();
  } catch (e) {
    console.error(e);
  }
};

main();
