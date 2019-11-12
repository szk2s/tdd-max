import { BEFORE_EACH } from './constants/class-names';
import { Test } from './Test';

export class BeforeEach extends Test {
  type: string = BEFORE_EACH;
  constructor(maxAPI: Max.API, { name, target, fn }: TddMax.testArgs) {
    super(maxAPI, { name, target, fn });
  }
}
