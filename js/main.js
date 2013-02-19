$(document).ready(function(){
	$(".app-fullscreen").click(function(){
		var container = $(this).parent();
        var appX = container.data('parent-app');
		var appY = appX == 'app2' ? 'app1' : 'app2';

		$('#'+appX).toggleClass('fullscreenApp');
		$('#'+appY).toggleClass('hidden').removeClass('fullscreenApp');

		$('#app2').toggleClass('app2border');
		container.children(".app-toggle").toggleClass('hidden');
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
	});

	//Horloge
	myTimer();
	setInterval(function(){myTimer()},1000);
});

function loadHome() {
    $('#app1').removeClass('fullscreenApp hidden');
    $('#app2').removeClass('fullscreenApp hidden').addClass('app2border');
    loadTemplate('gauge.html', '#app1', function(){gaugeInit(null);});
    //loadTemplate('gauge.html', '#app2', function(){gaugeInit(null);});
}

function loadSettings() {
    if(!$('#app1').hasClass('fullscreenApp')){
        $('#app1').children('.resize-container').children('.icon-fullscreen').click();
    }
    loadTemplate('settings.html', '#app1', null);
}

function loadTemplate(template, receiver, callback) {
    $(receiver).children('.template-container').remove();

    $('#divdemerde').load('template/'+template, null, function(){
        $(receiver).prepend($('#divdemerde').html());
        $('#divdemerde').empty();

        if(callback){
            callback();
        }
	});
}

function toggleDayNight() {
    $('body').toggleClass('night-mode');
    $('.app2border').toggleClass('night-mode');
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
    var colorVal = "#232323";
    var colorTit = "#898989";

    var g0 = new JustGage({
        id: "speedGauge",
        value: 66,
        min: 0,
        max: 200,
        title: "Speed",
        //levelColorsGradient : false,
        titleFontColor:colorTit,
        valueFontColor:colorVal,
        labelFontColor:colorTit,
    });

    var g1 = new JustGage({
        id: "rpmGauge",
        value: 2865,
        min: 0,
        max: 6000,
        title: "RPM",
        //levelColorsGradient : false,
        titleFontColor:colorTit,
        valueFontColor:colorVal,
        labelFontColor:colorTit,
    });

    var g2 = new JustGage({
        id: "tmpGauge",
        value: 150,
        min: 0,
        max: 180,
        title: "Temp",
        //levelColorsGradient : false,
        titleFontColor:colorTit,
        valueFontColor:colorVal,
        labelFontColor:colorTit,
    });

	//g.refresh(value);
}