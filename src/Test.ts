export interface ITest {
  testArgs: TddMax.testArgs;
  run: () => Promise<void>;
}

export class Test implements ITest {
  testArgs: TddMax.testArgs;

  constructor(testArgs: TddMax.testArgs) {
    this.testArgs = testArgs;
  }
  get fn() {
    return this.testArgs.fn;
  }
  public async run() {
    try {
      this.fn.constructor.name === 'GeneratorFunction'
        ? await this.runGeneratorFn()
        : await this.runFn();
      console.log('Passed: ', this.testArgs.name);
    } catch (e) {
      console.error('Failed:', this.testArgs.name);
      console.error(e);
    }
  }
  async runFn() {
    if (this.fn.length === 0) return this.fn();
    await this.runFnWithDone();
  }
  runFnWithDone() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Failed: timeout'));
      }, 1000);
      const done = () => {
        clearTimeout(timeout);
        resolve();
      };
      this.fn(done);
    });
  }
  // Deprecated: support for generator function will be removed in v4.0.0
  runGeneratorFn() {
    console.error('Deprecated: support for generator function will be removed in v4.0.0');
    return new Promise((resolve, reject) => {
      const gen: Generator = this.fn();
      maxAPI.addHandler(this.testArgs.target, (actual) => {
        let done;
        try {
          done = gen.next(actual).done;
        } catch (e) {
          maxAPI.removeHandlers(this.testArgs.target);
          reject(e);
        } finally {
          if (done) {
            maxAPI.removeHandlers(this.testArgs.target);
            resolve();
          }
        }
      });
      gen.next();
    });
  }
}
