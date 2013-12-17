var onlineForLife = window.onlineForLife || {}; onlineForLife.Settings = onlineForLife.Settings || {};
onlineForLife.Settings = {
	version: 1,

	init: function(){
		onlineForLife.Settings.setupHandlers();
	},
	
	setupHandlers: function(){
		$('.link-settings-ofl').on('click',function(){
			$('h2 p').text('Settings 2');
			window.location.href = 'http://www.onlineforlife.org';
		});
	},
};
$(function() {
	onlineForLife.Settings.init();
});


