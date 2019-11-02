#! /usr/bin/env node
const init = require('./init');
const opts = process.argv.slice(2);
const main = () => {
  if (opts[0] === '--init' || opts[0] === 'init') {
    init(opts[1]);
    return;
  }
  console.error('There is no option `' + opts[0] + '`');
};
main();
