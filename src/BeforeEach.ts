import { Test } from './Test';

export class BeforeEach extends Test {
  constructor(maxAPI: Max.API, { name, target, fn }: TddMax.testArgs) {
    super(maxAPI, { name, target, fn });
  }
}
