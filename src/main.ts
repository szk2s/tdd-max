import { MaxAPIFacade } from './MaxAPIFacade';
import { SuiteCollection } from './SuiteCollection';
import { TestLoader } from './TestLoader';
import { ConfigLoader } from './ConfigLoader';

export const main = async () => {
  const maxAPIFacade = new MaxAPIFacade(maxAPI);
  const configLoader = ConfigLoader(maxAPIFacade);
  const suiteCollection = new SuiteCollection();
  const testLoader = new TestLoader(suiteCollection);
  try {
    console.log('Starting');
    const config = await configLoader.run();
    await testLoader.execTestFiles(config);
    await suiteCollection.run();
  } catch (e) {
    console.error(e);
  }
};

main();
