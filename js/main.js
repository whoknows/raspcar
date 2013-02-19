/*var util = require("util");
var odb = require("odb2.js");*/

$(document).ready(function(){
	$('#app1').load('template/gauge.html', null, function(){
		//var obd2 = new obdCommunicator();
		//gaugeInit(obd2);
		gaugeInit(null);
	});

	$(".app-fullscreen").click(function(){
		var appX = $(this).parent().data('parent-app');
		var appY = appX == 'app2' ? 'app1' : 'app2';
		var container = $(this).parent();

		$('#'+appX).toggleClass('fullscreenApp');
		$('#'+appY).toggleClass('hidden').removeClass('fullscreenApp');

		$('#app2').toggleClass('app2border');
		container.children(".app-toggle").toggleClass('hidden');
		container.css('left', $('#'+appX).width()-70+'px');
	});

	$(".app-toggle").click(function(){
		var appX = $(this).parent().data('parent-app');
		var appY = appX == 'app2' ? 'app1' : 'app2';
		var action = $(this).data('action');
		var toggle = action == 'smaller' ? 150 : -150;

		$('#'+appX).css("width", $('#'+appX).width()-toggle+"px");
		$('#'+appY).css("width", $('#'+appY).width()+toggle+"px");

		$('#'+appX).width()!=$('#'+appY).width()&&$(this).hide();
		$(this).parent().children(".app-toggle[data-action="+(action=='bigger'?'smaller':'bigger')+"]").show();
		$(this).parent().css('left',$('#'+appX).width()-70+'px');
	});

	//Horloge
	myTimer();
	setInterval(function(){myTimer()},1000);
});

function myTimer() {
	d = new Date;
	document.getElementById("clock").innerHTML = d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '')+d.getMinutes();
}

function gaugeInit(obd2) {
	/*var gauges = {
		"speed":{
			opts : {
				id: "speedGauge",
				value: obd2.getCarSpeed(),
				min: 0,
				max: 200,
				title: "Speed"
			}
		},
		"rpm":{
			opts : {
				id: "rpm",
				value: obd2.getEngineRPM(),
				min: 0,
				max: 6e3,
				title: "RPM"
			}
		},
		"stconso":{
			opts : {
				id: "stconso",
				value: obd2.getShortTermConso(),
				min: 0,
				max: 100,
				title: "Shot Term Consomation"
			}
		}
	};
	$.each(gauges, function(k,v){
		k.gauge = new JustGage(k.opts);
	});

	return gauges;
	*/

	var g = new JustGage({
		id: "speedGauge",
		value: 66,
		min: 0,
		max: 200,
		title: "Speed",
		levelColorsGradient : false,
	});

	var g1 = new JustGage({
		id: "rpmGauge",
		value: 2865,
		min: 0,
		max: 6000,
		title: "RPM",
		levelColorsGradient : false,
	});
	//g.refresh(value);
}