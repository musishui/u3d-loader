"use strict";

function loadJs(jsUrl) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    script.onload = () => {
      resolve(true);
    };

    script.onerror = err => {
      reject(err);
    };

    script.src = jsUrl;
    document.body.appendChild(script);
  });
}

function loadModel(jsUrl, jsonUrl) {
  return {
    load: async function (el, options) {
      if (!window.UnityLoader) {
        await loadJs(jsUrl);
      }

      return UnityLoader.instantiate(el, jsonUrl, options);
    }
  };
}

module.exports = loadModel;