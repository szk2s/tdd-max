#! /usr/bin/env node
const path = require('path');
const fs = require('fs-extra');

const opts = process.argv.slice(2);

if (opts[0] === '--init' || opts[0] === 'init') {
  const dest = path.resolve(opts[1] || './test');
  fs.copy(path.join(__dirname, '../boilerplate/test'), dest)
    .then(() =>
      console.log('Success: test boilerplate has been generated into', dest)
    )
    .catch((err) => console.error(err));
} else {
  console.error('There is no option `' + opts[0] + '`');
}
