class MaxAPIFacade {
  constructor(maxAPI) {
    this.maxAPI = maxAPI;
  }
  patcherDir() {
    return new Promise((resolve, reject) => {
      this.maxAPI.addHandler('path', (patcherPath) => {
        resolve(patcherPath.split(':')[1]);
      });
      this.maxAPI.outlet('get_path');
      setTimeout(() => {
        reject(new Error('Cannot get patcher path: session time out'));
      }, 1000);
    });
  }
}

module.exports = MaxAPIFacade;
