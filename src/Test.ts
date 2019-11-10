import { TEST } from './constants/class-names';

export class Test {
  maxAPI: any;
  name: string;
  fn: CallableFunction;
  target: string;
  type: string = TEST;
  constructor(maxAPI, { name, fn, target }) {
    this.maxAPI = maxAPI;
    this.name = name;
    this.fn = fn;
    this.target = target;
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
