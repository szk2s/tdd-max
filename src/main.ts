import { MaxAPIFacade } from './MaxAPIFacade';
import { SuiteCollection } from './SuiteCollection';
import { Suite } from './Suite';
import { TestLoader } from './TestLoader';
import { Test } from './Test';
import { BeforeEach } from './BeforeEach';
import { ConfigLoader } from './ConfigLoader';
import { defineGlobalVars } from './global';

export const main = async (maxAPI) => {
  const maxAPIFacade = new MaxAPIFacade(maxAPI);
  const configLoader = ConfigLoader(maxAPIFacade);
  const suiteCollection = new SuiteCollection();
  const testLoader = new TestLoader(suiteCollection, Suite);
  defineGlobalVars(suiteCollection, maxAPI, Test, BeforeEach);
  try {
    console.log('Starting');
    const config = await configLoader.run();
    await testLoader.requireTestFiles(config);
    await suiteCollection.run();
  } catch (e) {
    console.error(e);
  }
};
