// @ts-ignore
/***
 * For `node.scrpit` object
 */
const maxAPI = require('max-api');
const SuiteCollection = require('./lib/SuiteCollection');
const Suite = require('./lib/Suite');
const suiteCollection = new SuiteCollection();
const { requireTestFiles } = require('./lib/processTestCode')(
  maxAPI,
  suiteCollection,
  Suite
);
const Test = require('./lib/Test');
const BeforeEach = require('./lib/BeforeEach');
const { defineGlobalVars } = require('./lib/global')(
  suiteCollection,
  maxAPI,
  Test,
  BeforeEach
);

const main = async () => {
  console.log('Starting');
  defineGlobalVars();
  await requireTestFiles();
  await suiteCollection.run();
};

main();
