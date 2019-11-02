const path = require('path');
const fs = require('fs-extra');

const insertSearchPath = (maxprojPath) => {
  if (!fs.existsSync(maxprojPath)) throw new Error('invalid maxproj file path');
  const maxproj = fs.readJsonSync(maxprojPath);
  const tddPackagePath = path.join(process.cwd(), '/node_modules/tdd-max');
  if (!fs.existsSync(tddPackagePath))
    throw new Error('Cannot find `node_modules/tdd-max`');
  Object.assign(maxproj.searchpath, {
    '0': {
      bootpath: tddPackagePath,
      projectrelativepath: path.relative(
        path.dirname(maxprojPath),
        tddPackagePath
      ),
      label: 'node_modules/tdd-max',
      recursive: 1,
      enabled: 1,
      includeincollective: 0
    }
  });
  fs.writeJsonSync(maxprojPath, maxproj, { spaces: 2 });
};

const init = (relativeDestPath) => {
  const dest = path.resolve(relativeDestPath || './test');
  fs.copy(path.join(__dirname, '../boilerplate/test'), dest)
    .then(() => {
      insertSearchPath(path.join(dest, '/test.maxproj'));
      console.log('Success: test boilerplate has been generated into', dest);
    })
    .catch((err) => console.error(err));
};

module.exports = init;
