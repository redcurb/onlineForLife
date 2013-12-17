var onlineForLife = window.onlineForLife || {}; onlineForLife.Settings = onlineForLife.Settings || {};
onlineForLife.Settings = {
	version: 1,

	init: function(){
		onlineForLife.Settings.setupHandlers();
	},
	
	setupHandlers: function(){
		$('.link-settings-ofl').on('click',function(){
			//window.location.href = 'http://www.onlineforlife.org';
			window.location.href = 'events.html';
		});
	},
};
$(function() {
	onlineForLife.Settings.init();
});


