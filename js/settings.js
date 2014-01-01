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
		$('.link-settings-privacy').on('click',function(){
			var url = 'http://onlineforlife.org/privacy-policy/';
			//window.location.href = 'events.html';
			//window.plugins.childBrowser.showWebPage('http://www.google.com', { showLocationBar: true });
			
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});
		
		$('.link-settings-ofl-2').on('click',function(){
			$('h2 p').text('test text');
		});
		$('#blank-loc-tool-back').on('click',function(){
			//does NOT work - confirmed
			var id = $(this).attr('id');
			$('h2 p').text(id);
			var url = 'http://www.onlineforlife.org';
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes,toolbar=yes', 'closebuttoncaption=back'); 
		});
		$('#self-yes-back').on('click',function(){
			//does NOT work - confirmed
			var id = $(this).attr('id');
			$('h2 p').text(id);
			var url = 'http://www.onlineforlife.org';
			myURL = encodeURI(url);
			window.open(url, '_self', 'location=yes', 'closebuttoncaption=back'); 
		});
		$('#self-yes').on('click',function(){
			//does NOT work - confirmed
			var id = $(this).attr('id');
			$('h2 p').text(id);
			var url = 'http://www.onlineforlife.org';
			myURL = encodeURI(url);
			window.open(url, '_self', 'location=yes'); 
		});
		$('#loadUrl').on('click',function(){
			//does NOT work
			var id = $(this).attr('id');
			$('h2 p').text(id);
			var url = 'http://www.onlineforlife.org';
			myURL = encodeURI(url);
			navigator.app.loadUrl(url, { openExternal:true });
		});
		
		
	},
};
$(function() {
	onlineForLife.Settings.init();
});


