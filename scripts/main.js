function jsDetect() {
    var b = document.body || document.getElementsByTagName('body')[0];
    b.classList.add('js');
}

// JavaScript source code

(function (w) {
    jsDetect();    
})(window);