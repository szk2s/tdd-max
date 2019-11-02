const { SUITE } = require('./constants/class-names');

class Suite extends Array {
  constructor() {
    super();
    this.type = SUITE;
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

module.exports = Suite;
