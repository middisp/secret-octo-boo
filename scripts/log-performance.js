var con = (function (module, opts) {

	if (window.performance.getEntries) {
		opts = opts || {};
		var output = document.createElement('div'),
			css = '#perf{background:' + (opts.background || '#FFF') + ';position:fixed;bottom:0;color:' + (opts.color || '#639') + ';left:0;padding:10px;overflow:auto;height:300px;z-index:1000;width:100%;line-height:20px;font-weight:bold}' +
				'#perf .dr{width:100%; padding:5px;text-align:right}' +
				'#perf div{padding:5px;border-top:solid 1px}' +
				'#perf div:nth-child(even){background-color:' + (opts.rowColor || '#eee') + '}' +
				'#perf span{display:inline-block;width:24.9%}' +
				'#perf .n {width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;}',
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
		document.body.appendChild(output);
	}


	module.perf = function () {
		if (window.performance.getEntries) {
			var e = performance.getEntries(),
				elem = document.querySelector('#perf'),
				output = '', perfData = performance.timing,
				domReady = perfData.loadEventEnd - perfData.navigationStart,
				connectTime = perfData.responseEnd - perfData.requestStart;

			// Sort the results on start time;
			e = e.sort(function (a, b) {
				return parseFloat(a.responseStart) - parseFloat(b.responseStart);
			});

			console.info(connectTime + 'ms');
			output += '<span class="dr">DOM Ready: ' + domReady + 'ms</span>';

			for (var i = 0; i < e.length; i++) {
				output += '<div>';
				output += '<span class="n">' + e[i].name + '</span>';
				output += '<span>' + e[i].responseStart.toFixed(2) /* Download Starts */ + 'ms</span>';
				output += '<span>' + e[i].responseEnd.toFixed(2) /* Download Ends */ + 'ms</span>';
				output += '<span>' + (e[i].responseEnd - e[i].responseStart).toFixed(2) /* Total Download Time */ + 'ms</span>';
				output += '<span>' + e[i].duration.toFixed(2) /* End to End */ + 'ms</span>';
				output += '</div>';
			}

			elem.innerHTML = output;
		}
	};

	return module;
} (con || {}));

con.perf();