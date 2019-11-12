import JSONValue = Max.JSONValue;

export type fetch = (
  handler: string,
  req: JSONValue,
  timeLimit?: ms,
  reqName?: string
) => Promise<JSONValue>;

export interface IMaxAPIFacade {
  fetch: fetch;
  patcherDir: () => Promise<string>;
}

export class MaxAPIFacade implements IMaxAPIFacade {
  fetch(
    handler: string,
    req: JSONValue,
    timeLimit: ms = 1000,
    reqName?: string
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
    const res = await this.fetch('path', 'get_path');
    if (typeof res !== 'string') throw new Error('Invalid response');
    const removeHDDName = (str: string) => str.split(':')[1];
    return removeHDDName(res);
  }
}

export const maxAPIFacade = new MaxAPIFacade();
