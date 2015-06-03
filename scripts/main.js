function jsDetect() {
    var b = document.body || document.getElementsByTagName('body')[0];
    b.classList.add('js');
}

// JavaScript source code

var pm = pm || {};

pm.alert = function () {
    // Settings
    var klass,
        customCSS,
        btnID,
        btnText,
        customJS;

    var init = function (options) {
        var opts = options || {};
        klass = opts.klass || 'alert-box';
        customCSS = opts.customCSS || false;
        btnID = opts.btnID || 'dismiss';
        btnText = opts.btnText || 'OK';
        customJS = opts.customJS || false;

        var elem = document.getElementById('caStyle');
        if (!customCSS && !elem) {
            setUpCSS();
        }
    };

    var setUpCSS = function () {
        var css = '.' + klass + '{background:rgba(255,255,255,0.5);' +
                                'text-align:center;' +
                                'position:absolute;' +
                                'top:100px;' +
                                'left:50%;' +
                                'z-index:1000;' +
                                'padding:20px 30px;' +
                                'color:#000;' +
                                'box-shadow:5px 5px 7px rgba(0,0,0,0.3);' +
                                'transform: translate(-50%, 0);}' +
                            '#' + btnID + '{display:block;' +
                                'margin-top:20px;' +
                                'cursor:pointer;' +
                                'color:inherit;' +
                                'padding:10px;' +
                                'background:#090;' +
                                'border-radius:10%;' +
                                'border:solid 1px transparent;}' +
                            '#' + btnID + ':hover{text-decoration:none;}',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        style.type = 'text/css';
        if (style.setAttribute) {
            style.setAttribute('id', 'caStyle');
        } else {
            style.id = 'caStyle';
        }
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    };

    var dismiss = function () {
        this.removeEventListener('click', dismiss);
        var container = document.querySelector('.' + klass);
        container.parentNode.removeChild(container);
    };

    var customAlert = function (args) {
        var container = document.createElement('div'),
            btn = document.createElement('a'),
            body = document.body;

        if (container.setAttribute) {
            btn.setAttribute('id', btnID);
        } else {
            btn.id = btnID;
        }
        container.classList.add(klass);
        container.innerHTML = Array.prototype.join.call(args, ' ');
        btn.innerHTML = btnText;
        container.appendChild(btn);
        body.appendChild(container);

        if (!customJS) {
            btn.addEventListener('click', dismiss);
        }
    };

    window.alert = function () {
        var args = arguments;
        customAlert(args);
    };

    return {
        init: init,
        customAlert: customAlert
    };
};

(function (w) {
    jsDetect();
})(window);