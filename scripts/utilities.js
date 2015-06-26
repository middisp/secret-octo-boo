(function (window, document) {
  "use strict";

  function slice(nodeList) {
    return nodeList && Array.prototype.slice.call(nodeList);
  }

  function assignProps(obj, stuff) {
    if (obj && stuff) Object.keys(stuff).forEach(function (key) {
      obj[key] = stuff[key];
    });
  }

  var $ = window.$ = function (elem, parent) {
    return (parent || document).querySelector(elem);
  };

  var $$ = window.$$ = function (elem, parent) {
    return slice((parent || document).querySelectorAll(elem));
  };

  $.attr = function (elem, attribute, value) {
    if (value) {
      elem.setAttribute(attribute, value);
    } else {
      return elem.getAttribute(attribute);
    }
    return elem;
  };

  $.removeAttr = function (elem, attribute) {
    elem.removeAttribute(attribute);
    return elem;
  };

  $.append = function (elem, refElem, position) {
    position = (position || "bottom").toLowerCase();

    if (position === "top") {
      if (!refElem.childNodes.length) {
        return refElem.appendChild(elem);
      } else {
        return refElem.insertBefore(elem, refElem.firstChild);
      }
    } else if (position === "bottom") {
      return refElem.appendChild(elem);
    } else if (position === "before") {
      return refElem.parentNode.insertBefore(elem, refElem);
    } else if (position === "after") {
      if (!refElem.nextElementSibling) {
        return refElem.parentNode.appendChild(elem);
      } else {
        return refElem.parentNode.insertBefore(elem, refElem.nextElementSibling);
      }
    } else if (position === "replace") {
      return refElem.parentNode.replaceChild(elem, refElem);
    } else {
      throw new Error('Unknown position specified. Expected "top", "bottom", "before", "after" or "replace".');
    }
  };

  $.make = function (elem, opts) {

    if (elem === '#text') {
      return document.createTextNode(opts);
    }

    var el = document.createElement(elem);
    if (!opts) {
      return el;
    }

    if (opts.id) {
      el.setAttribute('id', opts.id);
    }

    if (opts.dataset) {
      assignProps(el.dataset, opts.dataset);
    }

    if (opts.innerHTML) {
      el.innerHTML = opts.innerHTML;
    }

    if (opts.classList) {
      opts.classList.forEach(function (cl) {
        $.addClass(el, cl);
      });
    }

    return el;
  };

  $.clone = function (elem, deep) {
    var prime = $(elem),
      clone = prime.cloneNode(deep);
    return clone;
  };

  $.remove = function (node) {
    if (typeof node === 'string') {
      node = $(node);
    }
    if (node) {
      node.parentNode.removeChild(node);
    }
  };
  
  /* Classes */
  $.toggleClass = function (elem, cls) {
    cls = cls.split(' ');
    if (elem.classList) {
      if (cls[1]) {
        if (elem.classList.contains(cls[0])) {
          elem.classList.remove(cls[0]);
          elem.classList.add(cls[1]);
        } else {
          elem.classList.add(cls[0]);
          elem.classList.remove(cls[1]);
        }
      } else {
        elem.classList.toggle(cls[0]);
      }
    } else {
      var classes = elem.getAttribute('class');
      if (cls[1]) {
        if (classes.indexOf(cls[0]) !== -1) {
          elem.className = elem.className.replace(cls[0], cls[1]);
        } else {
          elem.className = elem.className.replace(cls[1], cls[0]);
        }
      } else {
        if (classes.indexOf(cls[0]) !== -1) {
          elem.className = elem.className.replace(cls, '');
        } else {
          elem.className += ' ' + cls;
        }
      }
    }
  };

  $.addClass = function (elem, cls) {
    cls = cls.split(' ');
    for (var i = 0; i < cls.length; i++) {
      if (elem.classList) {
        elem.classList.add(cls[i]);
      } else if (!$.hasClass(elem, cls[i])) {
        elem.className += ' ' + cls[i];
      }
    }
  };

  $.removeClass = function (elem, cls) {
    cls = cls.split(' ');
    for (var i = 0; i < cls.length; i++) {
      if (elem.classList) {
        elem.classList.remove(cls[i]);
      } else {
        elem.className = elem.className.replace(new RegExp('\\b' + cls[i] + '\\b', 'g'), '');
      }
    }
  };

  $.hasClass = function (elem, cls) {
    return elem.classList ? elem.classList.contains(cls) : new RegExp('\\b' + cls + '\\b').test(elem.cls);
  };
  /* /Classes */
  
  /* Events */
  Node.prototype.on = window.on = function (evt, func) {
    this.addEventListener(evt, func);
  };

  Node.prototype.off = window.off = function (evt, func) {
    this.removeEventListener(evt, func);
  };

  NodeList.prototype.__proto__ = Array.prototype;

  NodeList.prototype.on = NodeList.prototype.addEventListener = function (evt, func) {
    this.forEach(function (elem, i) {
      elem.on(evt, func);
    });
  };
  /* /Events */
  
  /* AJAX */
  /*
    obj = {
      method: 'GET',
      url: 'http://google.com',
      data: {},
      type: JSON,
      callback: function(rsp) {}
    }
  */
  $.ajax = function (obj) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          if(obj.callback){
            obj.callback(xhr.responseText);
          } else {
           return xhr.responseText; 
          }          
        } else if (xhr.status == 400) {
          console.error('There was an error 400');
        } else {
          console.error('something else other than 200 was returned');
        }
      }
    };

    xhr.open((obj.method || 'POST'), obj.url , true);
    xhr.responseType = obj.type || 'json';
    xhr.send(obj.data || null);
  };
  /* /AJAX */

})(window, document);