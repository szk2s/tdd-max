import { configLoader } from './ConfigLoader';
import { suiteCollection } from './SuiteCollection';
import { testLoader } from './TestLoader';

export const main = async () => {
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
