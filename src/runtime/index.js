function loadJs(jsUrl) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = function () {
      resolve(true)
    }
    script.onerror = function (err) {
      reject(err)
    }
    script.src = jsUrl
    document.body.appendChild(script)
  })
};
function loadModel(jsUrl, jsonUrl) {
  return {
    load: function (el, options) {
      var load = !!window.UnityLoader || loadJs(jsUrl);
      return Promise.resolve(load).then(function () {
        return UnityLoader.instantiate(el, jsonUrl, options)
      })
    }
  };
}

module.exports = loadModel;