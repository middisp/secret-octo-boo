var breakpoint = {
  value: '',
  refreshValue: function () {
    this.value = window.getComputedStyle($('body'), ':before').getPropertyValue('content').replace(/"/g, '');
  }
};

function jsDetect() {
  var b = document.body || $('body');
  $.addClass(b, 'js');
}

// JavaScript source code
(function (w) {
  jsDetect();
  breakpoint.refreshValue();

  if(!!window.Worker){
    var worker = new Worker('/scripts/worker.js');
    worker.addEventListener('message', function(e){console.info(e.data)});

    worker.postMessage({cmd: 'add', params: {x: 2, y: 3}});
  }

})(window);