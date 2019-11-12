export interface ITest {
  testArgs: TddMax.testArgs;
  run: () => Promise<void>;
}

export class Test implements ITest {
  testArgs: TddMax.testArgs;

  constructor(testArgs: TddMax.testArgs) {
    this.testArgs = testArgs;
  }
  public async run() {
    this.testArgs.fn.constructor.name === 'GeneratorFunction'
      ? await this.runGeneratorFn()
      : this.testArgs.fn();
  }
  // TODO: refactor this
  runGeneratorFn() {
    return new Promise((resolve) => {
      const gen: Generator = this.testArgs.fn();
      maxAPI.addHandler(this.testArgs.target, (actual) => {
        let done;
        try {
          done = gen.next(actual).done;
        } catch (err) {
          console.error('Failed:', this.testArgs.name);
          console.error(err);
          maxAPI.removeHandlers(this.testArgs.target);
          resolve();
        } finally {
          if (done) {
            console.log('Passed: ', this.testArgs.name);
            maxAPI.removeHandlers(this.testArgs.target);
            resolve();
          }
        }
      });
      gen.next();
    });
  }
}
