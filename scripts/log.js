var debug = true;
//var debug = false;


var con = (function (opts) {
  if (debug) {
    var opts = opts || {},
      output = document.createElement('pre'),
      css = '#log{background:' + (opts.background || '#FFF') + ';position:fixed;top:200px;color:' + (opts.color || '#639') + ';right:0;padding:10px;height:300px;overflow:auto;z-index:1000;width:50%;line-height:20px;font-weight:bold}',
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
  }

  var log = function () {
    if (!debug) {
      return false;
    } else {
      var elem = document.querySelector('#log'),
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
    }
  };
  console.info("Pete's mini logger enabled!");

  return {
    log: log
  };
} ());

con.log('hello world');
var obj = {
  id: 0,
  name: 'test',
  desc: 'test object'
}, arr = [0, 1, 2, 3];
con.log('test', obj, arr);