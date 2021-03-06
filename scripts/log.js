/*
 * Options
 */
/*var opts = {
  background: '#fff',
  color: '#639',
  side: 'right',
  width: '50%'
};
*/

var con = (function (module, opts) {
  opts = opts || {};
  var output = document.createElement('pre'),
    css = '#log{background:' + (opts.background || '#FFF') + ';position:fixed;top:' + (opts.top || '200px') + ';color:' + (opts.color || '#639') + ';' + (opts.side || 'right') + ':0;padding:10px;height:300px;overflow:auto;z-index:1000;width:' + (opts.width || '50%') + ';line-height:20px;font-weight:bold} span {color:#C00}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
  output.setAttribute('id', 'log');
  document.body.appendChild(output);

  module.log = function () {
    var elem = document.getElementById('log'),
      msg = '';
    for (var i = 0; i < arguments.length; i++) {
      if (typeof (arguments[i]) == 'object') {
        var obj = arguments[i];
        if (Object.prototype.toString.call(obj) === '[object Array]') {
          msg += '[';
          for (var j = 0; j < obj.length; j++) {
            if (j === 0) {
              msg += obj[j];
            } else {
              msg += ', ' + obj[j];
            }
          }
          msg += ']';
        } else {
          msg += '{' + '<br />';
          for (var key in obj) {
            if (hasOwnProperty) {
              msg += ' ' + key + ': ' + obj[key] + '<br />';
            }
          }
          msg += '}' + '<br />';
        }
      } else {
        msg += arguments[i] + '<br />';
      }
    }
    elem.innerHTML += msg + '<br />';
  };
  
  window.onerror = function(msg, url, line, column, errorObj) {
    url = url.substr(url.lastIndexOf('/'));
    module.log('<span>Error: ' + msg + '</span>', '<span>File: ' + url + '</span>', '<span>Line: ' + line + '</span>', '<span>Col: ' + (column || 'N/A') + '</span>', '<span>Stack: ' + (errorObj || 'N/A') + '</span>');
    return false;
  };

  return module;

} (con || {}));

/*
con.log('hello world');
var obj = {
  id: 0,
  name: 'test',
  desc: 'test object'
}, arr = [0, 1, 2, 3];
con.log('test', obj, arr);
*/