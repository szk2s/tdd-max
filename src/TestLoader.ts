import * as glob from 'glob';
import { SuiteCollection } from './SuiteCollection';
import { Suite } from './Suite';

interface RequireTestFiles {
  testCodeDir: string;
}

export class TestLoader {
  suiteCollection: SuiteCollection;
  constructor(suiteCollection: SuiteCollection) {
    this.suiteCollection = suiteCollection;
  }
  async requireTestFiles({ testCodeDir }: RequireTestFiles) {
    const files = glob.sync('{,!(node_modules)/**/}*.js', {
      cwd: testCodeDir,
      absolute: true
    });
    if (files.length === 0) {
      throw new Error(`No test code found in ${testCodeDir}`);
    }
    console.log('Loading:', files.length, 'files');
    files.forEach((file) => {
      this.suiteCollection.push(new Suite());
      require(file);
    });
  }
}
