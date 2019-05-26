const { testAdd1Generator } = require('./add1.test');
const maxAPI = require('max-api');

const main = () => {
  const testAdd1 = testAdd1Generator(maxAPI);
  maxAPI.addHandler('add1', (actual) => {
    let done;
    try {
      done = testAdd1.next(actual).done;
    } catch (err) {
      console.log(err);
    } finally {
      if (done) {
        console.log('passed', 'testAdd1');
      }
    }
  });
  testAdd1.next();
};

main();
