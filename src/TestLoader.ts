import * as glob from 'glob';
import { SuiteCollection } from './SuiteCollection';
import { Suite } from './Suite';
import * as fs from 'fs-extra';
import { generateExecContext } from './execContext';
import { exec } from './exec';

interface RequireTestFiles {
  testCodeDir: string;
}

export class TestLoader {
  suiteCollection: SuiteCollection;
  constructor(suiteCollection: SuiteCollection) {
    this.suiteCollection = suiteCollection;
  }
  async execTestFiles({ testCodeDir }: RequireTestFiles) {
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
      const script = fs.readFileSync(file, 'utf-8');
      exec(script, generateExecContext(this.suiteCollection));
    });
  }
}
