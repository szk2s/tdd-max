export interface ITest {
  maxAPI: Max.API;
  testArgs: TddMax.testArgs;
  run: () => Promise<void>;
}

export interface TestConstuctor {
  new (maxAPI: Max.API, testArgs: TddMax.testArgs): ITest;
}

export const Test: TestConstuctor = class Test implements ITest {
  maxAPI: Max.API;
  testArgs: TddMax.testArgs;

  constructor(maxAPI: Max.API, testArgs: TddMax.testArgs) {
    this.maxAPI = maxAPI;
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
      this.maxAPI.addHandler(this.testArgs.target, (actual) => {
        let done;
        try {
          done = gen.next(actual).done;
        } catch (err) {
          console.error('Failed:', this.testArgs.name);
          console.error(err);
          this.maxAPI.removeHandlers(this.testArgs.target);
          resolve();
        } finally {
          if (done) {
            console.log('Passed: ', this.testArgs.name);
            this.maxAPI.removeHandlers(this.testArgs.target);
            resolve();
          }
        }
      });
      gen.next();
    });
  }
};
