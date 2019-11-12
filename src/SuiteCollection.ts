import { Suite } from './Suite';

export interface ISuiteCollection {
  head: Suite;
  run: CallableFunction;
}
export class SuiteCollection extends Array<Suite> implements ISuiteCollection {
  constructor() {
    super();
  }
  get head() {
    if (!this.length) throw new Error('This collection has no suite');
    return this[this.length - 1];
  }
  async run() {
    console.log('Launching: total test suites', this.length);
    for (let i = 0; i < this.length; i++) {
      const suite = this[i];
      await suite.run();
    }
    console.log('Finished: Total', this.length, 'test suites have run.');
  }
}
