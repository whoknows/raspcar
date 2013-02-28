var gauges = {};
var gaugesCfg = {};
var appCfg = {};

resetAppConf();

$(document).ready(function(){
    loadHome();
    $('#home').click(function(){ loadHome() });

    $('#settings').click(function(){
        if(!$('#app1').hasClass('fullscreenApp')){
            $('#app1').children('.resize-container').children('span').click();
        }
        $('#app1').removeClass('hidden');
        loadTemplate('settings.html', '#app1', null);
    });

    $(".app-fullscreen").click(function(){
		var container = $(this).parent();
        var appX = container.data('parent-app');
		var appY = appX == 'app2' ? 'app1' : 'app2';

		$('#'+appX).toggleClass('fullscreenApp');
		$('#'+appY).toggleClass('hidden').removeClass('fullscreenApp');

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

	myTimer(); //Horloge
	setInterval(function(){myTimer()},1000);
});

function loadHome(){
    $('#app1 > .resize-container').removeClass('hidden');

    if(appCfg.app1.size != appCfg.app2.size){
        $('.app-toggle').addClass('hidden');
    }

    if(appCfg.app1.size === 0 || appCfg.app2.size === 0){
        $('.resize-container').addClass('hidden');
    }

    if(appCfg.app1.size !== 0){
        // App1 init
        $('#app1').css({
            'background-color': appCfg.app1.color,
            'width' : appCfg.app1.size
        }).removeClass('fullscreenApp hidden');

        var app1 = appCfg.app1.app[0];
        loadTemplate(app1.name+'.html', '#app1', app1.callback);
    } else {
        $('#app1').addClass('hidden');
    }

    if(appCfg.app2.size !== 0){
        // App2 init
        $('#app2').css({
            'background-color': appCfg.app2.color,
            'width' : appCfg.app2.size
        }).removeClass('fullscreenApp hidden');

        var app2 = appCfg.app2.app[0];
        loadTemplate(app2.name+'.html', '#app2', app2.callback);
    } else {
        $('#app2').addClass('hidden');
    }
}

function loadTemplate(template, receiver, callback) {
    $(receiver+' > *:not(.resize-container)').remove();

    $('#divdemerde').load('template/'+template, null, function(){
        $(receiver).prepend($('#divdemerde').html());
        $('#divdemerde').empty();

        if(callback && window[callback]) window[callback]();
	});
}

function gaugesInit(){
    $.each(gaugesCfg, function(k,v){
        gauges[k] = new JustGage(v);
    });
}

function myTimer() {
	var d = new Date();
	document.getElementById("clock").innerHTML = d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '')+d.getMinutes();
}

function resetGaugeConf(){
    $.ajax({
        dataType: "json",
        url: 'conf/gauge_conf.json',
        async:false,
        success: function(data){ gaugesCfg = data }
    });
}

function resetAppConf(callback){
    $.ajax({
        dataType: "json",
        url: 'conf/app_conf.json',
        async:false,
        success: function(data){
            appCfg = data;
            if(callback) callback();
        }
    });
}
