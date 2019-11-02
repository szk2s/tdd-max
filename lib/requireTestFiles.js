const glob = require('glob');

const requireTestFiles = (maxAPI, suiteCollection, Suite) => () => {
  return new Promise((resolve) => {
    maxAPI.addHandler('path', (patcherPath) => {
      const testDir = patcherPath.split(':')[1];
      const files = glob.sync('!(node_modules)/**/*.test.js', {
        cwd: testDir,
        absolute: true
      });
      console.log('Loading:', files.length, 'files');
      files.forEach((file) => {
        suiteCollection.push(new Suite());
        require(file);
      });
      resolve();
    });
    maxAPI.outlet('get_path');
  });
};
module.exports = requireTestFiles;
