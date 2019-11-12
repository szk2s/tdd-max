import { BeforeEach } from './BeforeEach';
import { ITest } from './Test';

export class Suite extends Array<ITest> {
  beforeEach?: BeforeEach;
  async run() {
    console.log('Running: new Test Suite');
    for (let i = 0; i < this.length; i++) {
      if (this.beforeEach) await this.beforeEach.run();
      const test = this[i];
      await test.run();
    }
  }
}
