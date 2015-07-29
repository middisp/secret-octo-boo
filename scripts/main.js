var breakpoint = {
  value: '',
  refreshValue: function () {
    this.value = window.getComputedStyle($('body'), ':before').getPropertyValue('content').replace(/"/g, '');
  }
};

function jsDetect() {
  var b = document.body || $('body');
  b.classList.add('js');
}

// JavaScript source code
(function (w) {
  jsDetect();
  breakpoint.refreshValue();

  var worker = pm.initWorker('/scripts/worker.js');
  worker.addEventListener('message', function(e){console.info(e.data)});

  worker.postMessage({cmd: 'add', params: {x: 2, y: 3}});
  worker.postMessage({cmd: 'add', params: {x: 10, y: 35}});
})(window);