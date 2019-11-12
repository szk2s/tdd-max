import JSONValue = Max.JSONValue;

export class MaxAPIFacade {
  maxAPI: Max.API;
  constructor(maxAPI: Max.API) {
    this.maxAPI = maxAPI;
  }
  request(
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
      this.maxAPI.addHandler(handler, (res: JSONValue) => {
        clearTimeout(timeout);
        resolve(res);
      });
      this.maxAPI.outlet(req);
    });
  }
  async patcherDir() {
    const res = await this.request('get_path', 'path');
    if (typeof res !== 'string') throw new Error('Invalid response');
    const removeHDDName = (str: string) => str.split(':')[1];
    return removeHDDName(res);
  }
}
