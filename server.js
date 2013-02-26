var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {

	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.html';
console.log(filePath);
	var extname = path.extname(filePath);
	var contentType;
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.html':
			contentType = 'text/html';
			break;
		case '.woff' :
			contentType = 'font/opentype';
			break;
		default :
			contentType = 'text/plain';
			break;
	}

	path.exists(filePath, function(exists) {
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				} else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		} else {
			response.writeHead(404);
			response.end();
		}
	});
}).listen(80);

console.log('Server running at http://rpi.dtdns.net/');
