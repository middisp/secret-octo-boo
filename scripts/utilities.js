(function(window, document){
  "use strict";
  
  function slice (nodeList) {
    return nodeList && Array.prototype.slice.call(nodeList);
  }
  
  var $ = window.$ = function (elem, parent) {
    return (parent || document).querySelector(elem);
  };

  var $$ = window.$$ = function(elem, parent) {
    return slice((parent || document).querySelectorAll(elem));
  };
  
  $.id = function(id, parent) {
    return (parent || document).getElementById(id);
  };
  
  $$.class = function(elem, parent){
    return slice((parent || document).getElementsByClassName(elem));
  };
  
  $.class = function (elem, parent){
    return $$.class(elem, parent)[0];
  };
  
  $.on = function(elem, evt, func) {
    elem.addEventListener(evt, func);
    return elem;
  };

  $.off = function(elem, evt, func) {
    elem.removeEventListener(evt, func);
    return elem;
  };

  $.attr = function(elem, attribute, value) {
    if(value) {
      elem.setAttribute(attribute, value);
    } else {
      elem.getAttribute(attribute);   
    }
    return elem;
  };

  $.removeAttr = function(elem, attribute) {
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
    
  $.remove = function (node) {
    if (typeof node === 'string') {
      node = $(node);
    }
    if (node) {
      node.parentNode.removeChild(node);
    }
  };
  
  $.toggleClass = function(elem, cls) {
    cls = cls.split(' ');
    if (elem.classList) {
      if(cls[1]){
        if(elem.classList.contains(cls[0])) {
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
      if(cls[1]){
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

  $.addClass = function(elem, cls) {
    cls = cls.split(' ');
    for (var i = 0; i < cls.length; i++) {
      if (elem.classList) {
        elem.classList.add(cls[i]);
      } else if (!$.hasClass(elem, cls[i])) {
        elem.className += ' ' + cls[i];
      }
    }
  };

  $.removeClass = function(elem, cls) {
    cls = cls.split(' ');
    for (var i = 0; i < cls.length; i++) {
      if (elem.classList) {
        elem.classList.remove(cls[i]);
      } else {
        elem.className = elem.className.replace(new RegExp('\\b' + cls[i] + '\\b', 'g'), '');
      }
    }
  };

  $.hasClass = function(elem, cls) {
    return elem.classList ? elem.classList.contains(cls) : new RegExp('\\b' + cls + '\\b').test(elem.cls);
  };
  
})(window, document);