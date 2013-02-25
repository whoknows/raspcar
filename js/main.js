var gauges = {};
var gaugesCfg = {};
var appCfg = {};

$.ajax({
    dataType: "json",
    url: 'conf/gauge_conf.json',
    async:false,
    success: function(data){ gaugesCfg = data }
});

$.ajax({
    dataType: "json",
    url: 'conf/app_conf.json',
    async:false,
    success: function(data){ appCfg = data }
});

$(document).ready(function(){
    loadHome();
    $('#home').click(function(){ loadHome() });

    $('#settings').click(function(){
        if(!$('#app1').hasClass('fullscreenApp')){
            $('#app1').children('.resize-container').children('span').click();
        }
        loadTemplate('settings.html', '#app1', null);
    });

    /*
    $('#day-night').click(function(){
        //TODO
    });
    */

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
    // App1 init
    $('#app1').css({
        'background-color': appCfg.app1.color,
        'width' : appCfg.app1.size
    }).removeClass('fullscreenApp hidden');

    loadTemplate(appCfg.app1.app+'.html', '#app1', function(){
        $.each(gaugesCfg, function(k,v){
            gauges[k] = new JustGage(v);
        });
    });

    // App2 init
    $('#app2').css({
        'background-color': appCfg.app2.color,
        'width' : appCfg.app2.size
    }).removeClass('fullscreenApp hidden');

    loadTemplate(appCfg.app2.app+'.html', '#app2', null);
}

function loadTemplate(template, receiver, callback) {
    $(receiver+' > *:not(.resize-container)').remove();

    $('#divdemerde').load('template/'+template, null, function(){
        $(receiver).prepend($('#divdemerde').html());
        $('#divdemerde').empty();

        if(callback) callback();
	});
}

function myTimer() {
	var d = new Date();
	document.getElementById("clock").innerHTML = d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '')+d.getMinutes();
}