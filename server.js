//var http = require('http').createServer(handler),
var io   = require('socket.io').listen(8080);
var fs   = require('fs');
   // path = require('path'),
var exec = require('exec');

/*
http.listen(8080);

function handler (request, response) {

	var filePath = '.' + request.url;
	if (filePath == './') filePath = './index.html';

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
}
*/

var gaugesData = {};
io.sockets.on('connection', function (socket) {
	console.log('Connected');
    socket.emit('news', { hello: 'world' });

    socket.on('startGauges', function (data) {
        //odb.Connect();
        setInterval(function(){
            getGaugesData(data);
            socket.emit('carinfo', { data : gaugesData });
        },100);
    });

    socket.on('saveCfg', function (data) {
        console.log('test');
        saveCfg(data.cfg, data.data);
    });
});


/**************************************************************************/
/*                                Functions                               */
/**************************************************************************/

function getGaugesData() {
    //obd.getCarSpeed();
	var child;
	child = exec("ma commande", function (error, stdout, stderr) {
		gaugesData = stdout;
	});
}

function saveCfg(cfg, data){
    fs.writeFile("conf/"+cfg, JSON.stringify(data), function(err) {
        console.log(err ? err : 'OK');
    });
}
