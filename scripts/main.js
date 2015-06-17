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
  console.log(breakpoint.value);
})(window);