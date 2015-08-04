// Default functions
function reply(){
	postMessage(Array.prototype.join.call(arguments, ' '));
}

function terminate(){
	reply('Worker stopped...');
	self.close();
}
// /Default functions

function add(x, y){
	var result = x + y;
	reply('Result:', result);
}

// Error
onerror = function(e) {
	e.preventDefault();
	reply('ERROR', e.message, e.filename, e.lineno);
}

/*
 * e.data = {
 *	cmd: '',
 *  msg: '',
 *  params:{}
 * }
 */
onmessage = function(e) {
	var data = e.data;
	// filter data to choose correct function.
	switch (data.cmd) {
		case 'stop':
			terminate();
			break;
		case 'add':
			add(data.params.x, data.params.y);
			break;
		// Add new cases as required...
		default:
			reply(data);
	}
}