var onlineForLife = window.onlineForLife || {}; onlineForLife.Settings = onlineForLife.Settings || {};
onlineForLife.Settings = {
	version: 1,

	init: function(){
		onlineForLife.Settings.setupHandlers();
	},
	
	setupHandlers: function(){
		
		$('.settings-list li').on('click',function(){
			$this = $(this);
			var $content = $this.find('.settings-content');
			var isOpen = $content.hasClass('content-open');
			console.log('isOpen:' + isOpen);
			if(isOpen){
				$content.hide('blind',{},500,function(){
					console.log('done');
					$content.toggleClass('content-open');
				});
			}
			else{
				$content.show('blind',{},500,function(){
					console.log('done');
					$content.toggleClass('content-open');
				});
			}
			//$('.mypanel-left h2.logo').animate({'top':'0'}, 300);
		});
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
		
		
	},
};
$(function() {
	onlineForLife.Settings.init();
});


