import JSONValue = Max.JSONValue;

// Do not export singleton class
class MaxAPIFacade {
  fetch(
    req: JSONValue,
    handler: string,
    reqName?: string,
    timeLimit: ms = 1000
  ) {
    if (!reqName) {
      if (typeof req === 'string') reqName = req;
      reqName = '';
    }
    return new Promise<JSONValue>((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.log('timeout');
        reject(new Error(`Session timeout: ${reqName} cannot get ${handler}`));
      }, timeLimit);
      maxAPI.addHandler(handler, (res: JSONValue) => {
        clearTimeout(timeout);
        maxAPI.removeHandlers(handler);
        resolve(res);
      });
      maxAPI.outlet(req);
    });
  }
  async patcherDir() {
    const res = await this.fetch('get_path', 'path');
    if (typeof res !== 'string') throw new Error('Invalid response');
    const removeHDDName = (str: string) => str.split(':')[1];
    return removeHDDName(res);
  }
}

export const maxAPIFacade = new MaxAPIFacade();
