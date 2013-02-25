var obd  = require('obd2.js');
var exec = require('child_process').exec;
var io = require('socket.io').listen(8080);

var gaugesData=0;

io.sockets.on('connection', function (socket) {
    //obd.Connect('id');
    setInterval(function(){
		getGaugesData();
		socket.emit('carinfo', { data : gaugesData });
	},100);
});

function getGaugesData() {
	gaugesData++;
	if(gaugesData >= 200){
		gaugesData = 0;
	}

    //obd.getCarSpeed();
	/*var child;
	child = exec("ma commande", function (error, stdout, stderr) {
		//util.print('stderr: ' + stderr);
		//if (error !== null) {
		//	console.log('exec error: ' + error);
		//}

		gaugesData = stdout;
	});*/
}