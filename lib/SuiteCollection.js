class SuiteCollection extends Array {
  constructor() {
    super();
  }
  get head() {
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

module.exports = SuiteCollection;
