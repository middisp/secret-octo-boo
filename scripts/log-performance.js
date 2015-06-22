/*
 * Options
 */
/*var opts = {
  background: '#fff',
  color: '#639',
	rowColor: '#eee'
};
*/
var con = (function (module, opts) {

	if (window.performance.getEntries) {
		opts = opts || {};
		var data = performance.getEntries(),
			output = document.createElement('div'),
			elem, perfInit = 0,
			css = '#perf{box-sizing:border-box;background:' + (opts.background || '#FFF') + ';position:fixed;bottom:0;color:' + (opts.color || '#639') + ';left:0;padding:10px;overflow:auto;height:200px;z-index:1000;width:100%;line-height:20px;font-weight:bold}' +
				'#perf div{padding:5px;border-top:solid 1px}' +
				'#perf div:nth-child(even){background:' + (opts.rowColor || '#eee') + '}' +
				'#perf span{display:block;width:100%;}' +
				'#perf .n{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;}' +
				'#perf .dr{padding:0 0 5px;text-align:right}',
			head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

		style.type = 'text/css';

		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
		output.setAttribute('id', 'perf');
		output.setAttribute('data-action', 'micro');
		document.body.appendChild(output);
		elem = document.querySelector('#perf');
	}

	function display (e) {
		var target = e.target, id, action = this.getAttribute('data-action');
		elem.innerHTML = '';
		while (target.nodeName !== 'DIV') {
			target = target.parentNode;
		}
		id = parseInt(target.getAttribute('data-id'));
		if (action === 'micro') {
			detail(id);
			elem.setAttribute('data-action', 'macro');
		} else {
			module.perf();
			elem.setAttribute('data-action', 'micro');
		}
	};
	
	function detail (idx) {
			var item = data[idx],
				elem = document.querySelector('#perf'),
				output = '<div>';

			output += '<span class="n">' + item.name + '</span>';
			output += '<span>Type: ' + item.initiatorType + '</span>';
			output += '<span>Network: ';
			if (item.requestStart === 0) {
				output += (item.fetchStart - item.startTime).toFixed(3);
			} else {
				output += (item.requestStart - item.startTime).toFixed(3);
			}
			output +=  'ms</span>';
			output += '<span>Request: ' + (item.responseStart - item.startTime).toFixed(3) + 'ms</span>';
			output += '<span>Response: ' + (item.responseEnd - item.responseStart).toFixed(3) + 'ms</span>';

			output += '</div>';
			elem.innerHTML = output;
		};


	module.perf = function () {
		if (window.performance.getEntries) {
			var output = '', perfData = performance.timing,
				domComplete = perfData.domComplete - perfData.navigationStart;

			// Sort the results on startTime;
			if (!perfInit) {
				data = data.sort(function (a, b) {
					return parseFloat(a.startTime) - parseFloat(b.startTime);
				});
			}

			output += '<span class="dr">Reqs: ' + data.length + ', Redirects: ' + performance.navigation.redirectCount + ', DOM Ready: ' + domComplete + 'ms</span>';

			for (var i = 0; i < data.length; i++) {
				output += '<div data-id="' + i + '">';
				output += '<span class="n">' + data[i].name.substr(data[i].name.lastIndexOf('/') + 1) + '</span>';
				output += '</div>';
			}

			elem.innerHTML = output;
			if (!perfInit) {
				elem.addEventListener('click', display);
				perfInit = 1;
			}
		};
	};

	return module;
} (con || {}));