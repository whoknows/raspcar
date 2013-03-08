var io   = require('socket.io').listen(8080);
//var obd2 = require('js/obd2.js');

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    //obd2.connect();
    socket.on('getCarInfo', function (data) {
        setInterval(function(){
            //obd2.getGaugesData();
            var carInfo = {'speedGauge':Math.floor(Math.random()*200)}
            socket.emit('carinfo', { data : carInfo });
        },1000);
    });
});
