import { Test } from './Test';

export class BeforeEach extends Test {
  constructor({ name, target, fn }: TddMax.testArgs) {
    super({ name, target, fn });
  }
}
