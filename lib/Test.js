const { TEST } = require('./constants/class-names');

class Test {
  constructor(maxAPI, { name, fn, target }) {
    this.maxAPI = maxAPI;
    this.name = name;
    this.fn = fn;
    this.target = target;
    this.type = TEST;
  }
  async run() {
    this.fn.constructor.name === 'GeneratorFunction'
      ? await this.runGeneratorFn()
      : this.fn();
  }
  runGeneratorFn() {
    return new Promise((resolve) => {
      const gen = this.fn();
      this.maxAPI.addHandler(this.target, (actual) => {
        let done;
        try {
          done = gen.next(actual).done;
        } catch (err) {
          console.error('Failed:', this.name);
          console.error(err);
          this.maxAPI.removeHandlers(this.target);
          resolve();
        } finally {
          if (done) {
            console.log('Passed: ', this.name);
            this.maxAPI.removeHandlers(this.target);
            resolve();
          }
        }
      });
      gen.next();
    });
  }
}
module.exports = Test;
