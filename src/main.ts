import { MaxAPIFacade } from './MaxAPIFacade';
import { SuiteCollection } from './SuiteCollection';
import { TestLoader } from './TestLoader';
import { BeforeEach } from './BeforeEach';
import { ConfigLoader } from './ConfigLoader';
import { defineGlobalVars } from './global';

export const main = async (maxAPI: Max.API) => {
  const maxAPIFacade = new MaxAPIFacade(maxAPI);
  const configLoader = ConfigLoader(maxAPIFacade);
  const suiteCollection = new SuiteCollection();
  const testLoader = new TestLoader(suiteCollection);
  defineGlobalVars(suiteCollection, maxAPI, BeforeEach);
  try {
    console.log('Starting');
    const config = await configLoader.run();
    await testLoader.requireTestFiles(config);
    await suiteCollection.run();
  } catch (e) {
    console.error(e);
  }
};
