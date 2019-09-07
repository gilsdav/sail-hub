const express = require('express');
const app = express();
const httpProxy = require('http-proxy');

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('proxyReq', function(proxyReq, req, res, options) {
	proxyReq.setHeader('origin', 'http://localhost:41915');
});

app.all('/editor/*', function(req, res) {
	const url = req.originalUrl;
	const port = url.substr(8);
	const target = 'http://127.0.0.1:' + port;
	console.log(target);
	apiProxy.web(req, res, {target: target, ws: true})
});

app.listen(3000);
