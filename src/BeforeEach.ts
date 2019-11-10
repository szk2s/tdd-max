import { BEFORE_EACH } from './constants/class-names';
import { Test } from './Test';

export class BeforeEach extends Test {
  type: string = BEFORE_EACH;
  constructor(maxAPI, { name, target, fn }) {
    super(maxAPI, { name, fn, target });
  }
}
