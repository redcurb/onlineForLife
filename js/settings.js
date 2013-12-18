var onlineForLife = window.onlineForLife || {}; onlineForLife.Settings = onlineForLife.Settings || {};
onlineForLife.Settings = {
	version: 1,

	init: function(){
		onlineForLife.Settings.setupHandlers();
	},
	
	setupHandlers: function(){
		$('.link-settings-ofl').on('click',function(){
			var url = 'http://www.onlineforlife.org';
			//window.location.href = 'events.html';
			//window.plugins.childBrowser.showWebPage('http://www.google.com', { showLocationBar: true });
			
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});
		$('.link-settings-ofl-2').on('click',function(){
			$('h2 p').text('test text');
		});
		
	},
};
$(function() {
	onlineForLife.Settings.init();
});


