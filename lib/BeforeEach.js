const { BEFORE_EACH } = require('./constants/class-names');

const Test = require('./Test');
class BeforeEach extends Test {
  constructor(name, fn, target) {
    super(name, fn, target);
    this.type = BEFORE_EACH;
  }
}

module.exports = BeforeEach;
