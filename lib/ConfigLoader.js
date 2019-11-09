const path = require('path');
const glob = require('glob');
const DEFAULT_CONFIG = require('./constants/default-config');

module.exports = (maxAPIFacade) => {
  const resolvePath = (config, patcherDir) => {
    const ret = { ...config };
    if (config.testCodeDir) {
      ret.testCodeDir = path.resolve(patcherDir || '', config.testCodeDir);
    }
    return ret;
  };
  const load = (fileName) => {
    switch (path.extname(fileName)) {
      case '.js':
      case '.json':
        return require(fileName);
      default:
        throw new Error('invalid config file type');
    }
  };
  return {
    async run() {
      const patcherDir = await maxAPIFacade.patcherDir().catch((e) => {
        console.error(e);
        return null;
      });
      const configFiles = glob.sync(path.join(patcherDir, 'tddmaxrc.*'));
      const inputConfig = configFiles.length ? load(configFiles[0]) : {};
      return Object.assign(
        {},
        DEFAULT_CONFIG,
        patcherDir && {
          testCodeDir: patcherDir
        },
        resolvePath(inputConfig, patcherDir)
      );
    }
  };
};
