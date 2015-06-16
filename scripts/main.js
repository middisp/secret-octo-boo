function jsDetect() {
    var b = document.body || document.getElementsByTagName('body')[0];
    b.classList.add('js');
}

var breakpoint = {};
breakpoint.refreshValue = function () {
  this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/"/g, '');
};

// JavaScript source code
(function (w) {
    jsDetect();
})(window);