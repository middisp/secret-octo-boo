var pm = pm || {};

pm.alert = function () {
    // Settings
    var klass, btnID, btnText, customJS, parent,
    init = function (options) {
        var opts = options || {};
        klass = opts.klass || 'alert-box';
        btnID = opts.btnID || 'dismiss';
        btnText = opts.btnText || 'OK';
        customJS = opts.customJS || false;
        if(opts.parent){
          if(typeof opts.parent === 'string'){
            parent = document.querySelector(opts.parent);
          } else {
            parent = opts.parent;
          }
        } else {
          parent = document.querySelector('body');
        }
    },

    dismiss = function () {
        this.removeEventListener('click', dismiss);
        var container = document.querySelector('.' + klass);
        container.parentNode.removeChild(container);
    },

    customAlert = function (args) {
        var container = document.createElement('div'),
            btn = document.createElement('a');

        if (container.setAttribute) {
            btn.setAttribute('id', btnID);
        } else {
            btn.id = btnID;
        }
        container.classList.add(klass);
        container.innerHTML = Array.prototype.join.call(args, '');
        btn.innerHTML = btnText;
        container.appendChild(btn);
        parent.appendChild(container);

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