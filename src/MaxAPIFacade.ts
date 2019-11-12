export class MaxAPIFacade {
  maxAPI: Max.API;
  constructor(maxAPI: Max.API) {
    this.maxAPI = maxAPI;
  }
  patcherDir() {
    return new Promise<string>((resolve, reject) => {
      this.maxAPI.addHandler('path', (patcherPath: string) => {
        resolve(patcherPath.split(':')[1]);
      });
      this.maxAPI.outlet('get_path');
      setTimeout(() => {
        reject(new Error('Cannot get patcher path: session time out'));
      }, 1000);
    });
  }
}
