const { spawn } = require('child_process');
const express = require('express');

const app = express();

function sailLs() {

return new Promise(function(resolve) {

const child = spawn('sail', ['ls']);

let data = '';

child.stdout.on('data', function(buffer) {
	data = data + buffer;
});

function map(values) {
	console.log(values);

	let services = values.split('\n');

	const nameIndex = services[0].indexOf('name');
	const urlIndex = services[0].indexOf('url');

	services = services.map(function(service) {
		const endNameIndex = service.indexOf(' ', nameIndex);
		const endUrlIndex = service.indexOf(' ', urlIndex);
		return {
			name: service.substring(nameIndex, endNameIndex),
			url: service.substring(urlIndex, endUrlIndex)
		};
	});
	services = services.filter(function(service) { return service.name && service.name !== 'name' ; })
	console.log(services);
	return services;
}

child.on('exit', function(code, signal) {
	console.log('child process exited with code ' + code + ' and signal ' + signal );

	resolve(map(data));
});

});

}

app.get('/sail', function(req, res) {
	sailLs().then(function(services) {
		res.json(services);
	});
});

app.listen(5000, function() {
	console.log('Sail hub listening on port 5000');
});
