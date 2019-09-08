const { spawn } = require('child_process');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = 8080;

function sailLs() {
	return new Promise(function (resolve) {

		const child = spawn('sail', ['ls']);

		let data = '';

		child.stdout.on('data', function (buffer) {
			data = data + buffer;
		});

		function map(values) {
			let services = values.split('\n');

			const nameIndex = services[0].indexOf('name');
			const urlIndex = services[0].indexOf('url');
			const statusIndex = services[0].indexOf('status');

			services = services.map(function (service) {
				const endNameIndex = service.indexOf(' ', nameIndex);
				const endUrlIndex = service.indexOf(' ', urlIndex);
				const endStatusIndex = service.indexOf(' ', statusIndex);
				return {
					name: service.substring(nameIndex, endNameIndex),
					url: service.substring(urlIndex, endUrlIndex),
					status: service.substring(statusIndex, endStatusIndex)
				};
			});

			services = services.filter(function (service) { return service.name && service.name !== 'name'; })
			return services;
		}

		child.on('exit', function (code, signal) {
			resolve(map(data));
		});

	});

}

function sailRun(url) {
	return new Promise(function (resolve) {
		const child = spawn('sail', ['run', url]);
		child.stdout.on('data', function(buffer) {
			console.log(''+buffer);
		});
		child.on('exit', function (code, signal) {
			console.log(code, signal);
			resolve(code);
		});

	});
}

function sailRm(repo) {
	return new Promise(function (resolve) {
		const child = spawn('sail', ['rm', repo, '--with-data']);
		child.stdout.on('data', function(buffer) {
			console.log(''+buffer);
		});
		child.on('exit', function (code, signal) {
			console.log(code, signal);
			resolve(code);
		});

	});
}

app.get('/sail', function (req, res) {
	sailLs().then(function (services) {
		res.json(services);
	});
});

app.post('/sail', function(req, res) {
	console.log('body', req.body);
	sailRun(req.body.githubUrl).then(function (result) {
		res.status(result === 0 ? '200' : '400');
		res.send();
	});
});

app.delete('/sail', function(req, res) {
	console.log('rm', req.query.repo);
	sailRm(req.query.repo).then(function (result) {
		res.status(result === 0 ? '200' : '400');
		res.send();
	});
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
	console.log('Sail hub listening on port ' + PORT);
});
