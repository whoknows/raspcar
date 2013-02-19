/*var util = require("util");
var odb = require("odb2.js");*/

$(document).ready(function(){
	loadTemplate('gauge.html', '#app1', function(){gaugeInit(null);});

    $("#settings").click(function(){
        loadTemplate('settings.html', '#app1', function(){ 
            $('#app1').children('.resize-container').children('.icon-fullscreen').click();
        });
    });
    
    $("#home").click(function(){
        window.location.reload();
    });

	$(".app-fullscreen").click(function(){
		var container = $(this).parent();
        var appX = container.data('parent-app');
		var appY = appX == 'app2' ? 'app1' : 'app2';

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
        $('#'+appY).children('.resize-container').css('left', $('#'+appY).width()-70+'px');
	});

	//Horloge
	myTimer();
	setInterval(function(){myTimer()},1000);
});

function loadTemplate(template, receiver, callback) {
    $('#divdemerde').load('template/'+template, null, function(){
        $(receiver).append($('#divdemerde').html());
        $('#divdemerde').empty();
		callback();
	});
}

function myTimer() {
	var d = new Date();
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