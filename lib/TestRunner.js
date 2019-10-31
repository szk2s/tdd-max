class TestRunner {
  constructor(maxAPI) {
    this.tests = [];
    this.maxAPI = maxAPI;
  }
  addTest(item) {
    this.tests.push(item);
  }
  async run() {
    for (let i = 0; i < this.tests.length; i++) {
      const test = this.tests[i];
      console.log('Description: ', test.description);
      test.testFn.constructor.name === 'GeneratorFunction'
        ? await this.runGeneratorFn(test)
        : test.testFn();
    }
  }
  runGeneratorFn({ testFn, target }) {
    return new Promise((resolve) => {
      const gen = testFn();
      this.maxAPI.addHandler(target, (actual) => {
        let done;
        try {
          done = gen.next(actual).done;
        } catch (err) {
          console.log(err);
          this.maxAPI.removeHandlers(target);
          resolve();
        } finally {
          if (done) {
            console.log('Passed');
            this.maxAPI.removeHandlers(target);
            resolve();
          }
        }
      });
      gen.next();
    });
  }
}

module.exports = TestRunner;
