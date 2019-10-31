const glob = require('glob');

const loadTestFiles = (maxAPI) => () => {
  return new Promise((resolve) => {
    maxAPI.addHandler('path', (patcherPath) => {
      const testDir = patcherPath.split(':')[1];
      const files = glob.sync('!(node_modules)/**/*.test.js', {
        cwd: testDir,
        absolute: true
      });
      resolve(files.map((file) => require(file)));
    });
    maxAPI.outlet('get_path');
  });
};
module.exports = loadTestFiles;
