import { SUITE } from './constants/class-names';
import { BeforeEach } from './BeforeEach';

export class Suite extends Array {
  type: string = SUITE;
  beforeEach: BeforeEach | null = null;
  constructor() {
    super();
    this.beforeEach = null;
  }
  async run() {
    console.log('Running: new Test Suite');
    for (let i = 0; i < this.length; i++) {
      if (this.beforeEach) await this.beforeEach.run();
      const test = this[i];
      await test.run();
    }
  }
}
