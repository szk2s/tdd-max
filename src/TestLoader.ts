import glob from 'glob';
import { SuiteCollection } from './SuiteCollection';

export class TestLoader {
  suiteCollection: SuiteCollection;
  Suite: ObjectConstructor;
  constructor(suiteCollection, Suite) {
    this.suiteCollection = suiteCollection;
    this.Suite = Suite;
  }
  async requireTestFiles({ testCodeDir }) {
    const files = glob.sync('{,!(node_modules)/**/}*.js', {
      cwd: testCodeDir,
      absolute: true
    });
    if (files.length === 0) {
      throw new Error(`No test code found in ${testCodeDir}`);
    }
    console.log('Loading:', files.length, 'files');
    files.forEach((file) => {
      this.suiteCollection.push(new this.Suite());
      require(file);
    });
  }
}
