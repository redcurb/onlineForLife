var onlineForLife = window.onlineForLife || {}; onlineForLife.Settings = onlineForLife.Settings || {};
onlineForLife.Settings = {
	version: 1,

	init: function(){
		onlineForLife.Settings.setupHandlers();
	},
	
	setupHandlers: function(){
		$('.link-settings-ofl i.fa').on('click',function(){
			window.location.href = 'http://www.onlineforlife.org';
		});
	},
};
$(function() {
	onlineForLife.Settings.init();
});


