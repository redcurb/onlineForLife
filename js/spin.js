var onlineForLife = window.onlineForLife || {}; onlineForLife.Spin = onlineForLife.Spin || {};
onlineForLife.Spin = {
	version: 1,
	
	elements:{
		$status: $('.status'),
		$camera: $('li.icon-cog'),
		$spinner: $('li.icon-spinner'),
		$refresh: $('li.icon-refresh'),
		$cog: $('li.icon-cog')
	},
	
	pageText:{
		pageLoading: 'Page Loading',
		pageLoaded: 'Page Loaded',
		gettingContent: 'Getting Content',
		dataLoaded: 'Data Loaded',
	},
	
	init: function(){
		console.log('spin init');
		onlineForLife.Spin.setPageStatus('pageLoaded','#0f0');
		onlineForLife.Spin.setupHandlers();
	},

	setPageStatus: function(text,color){
		
		console.log('setPageStatus',color);
		console.log('typeof',typeof(color));
		var highlightColor = (typeof(color)=='undefined') ? 'yellow' : color;
		console.log(highlightColor);
		var oText = onlineForLife.Spin.pageText[text];
		console.log(oText);
		$('.status').effect("highlight", {'color':color}, 3000).text(oText);
	},

	setupHandlers: function(){
		console.log('spin init');
		var $elements = onlineForLife.Spin.elements;
		var $camera = $elements.$camera;
		var $status = $elements.$status;
		var $spinner = $elements.$spinner;
		var $refresh = $elements.$refresh;
		var $cog = $elements.$cog;
		
		$refresh.on('click',function(e){
			onlineForLife.Spin.refreshData($refresh);
		});
		
	},

	refreshData: function($element){
		console.log('refresh');
		onlineForLife.Spin.setPageStatus('gettingContent');
		$element.find('i').addClass('fa-spin');
		
		setTimeout(function() {
			onlineForLife.Spin.loadData($element);
		}, 2500);

	},

	loadData: function($element){
		$element.find('i.fa-spin').removeClass('fa-spin');
		onlineForLife.Spin.setPageStatus('dataLoaded','green');
	}


};
$(function() {
	onlineForLife.Spin.setPageStatus('pageLoading');
	setTimeout(function() {
		onlineForLife.Spin.init();
	}, 3000);
});


