"use strict";

function loadJs(jsUrl, jsonUrl) {
  return {
    load: el => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';

        script.onload = () => {
          let instance = UnityLoader.instantiate(el, jsonUrl);
          resolve(instance);
        };

        script.onerror = err => {
          reject(err);
        };

        script.src = jsUrl;
        document.body.appendChild(script);
      });
    }
  };
}

module.exports = loadJs;