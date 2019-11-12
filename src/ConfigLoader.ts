import * as path from 'path';
import * as glob from 'glob';
import { maxAPIFacade } from './MaxAPIFacade';
const DEFAULT_CONFIG = require('./constants/default-config');

// Do not export singleton class
const ConfigLoader = () => {
  const resolvePath = (config: TddMax.TODO_ANNOTATE, patcherDir: string) => {
    const ret = { ...config };
    if (config.testCodeDir) {
      ret.testCodeDir = path.resolve(patcherDir || '', config.testCodeDir);
    }
    return ret;
  };
  const load = (fileName: string) => {
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
      try {
        const patcherDir = await maxAPIFacade.patcherDir();
        const configFiles = glob.sync(path.join(patcherDir, '.tddmaxrc.*'));
        const inputConfig = configFiles.length ? load(configFiles[0]) : {};
        return Object.assign(
          {},
          DEFAULT_CONFIG,
          {
            testCodeDir: patcherDir
          },
          resolvePath(inputConfig, patcherDir)
        );
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
  };
};

export const configLoader = ConfigLoader();
