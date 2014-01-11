var onlineForLife = window.onlineForLife || {}; onlineForLife.Settings = onlineForLife.Settings || {};
onlineForLife.Settings = {
	version: 1,

	init: function(){
		onlineForLife.Settings.setupHandlers();
	},
	
	setupHandlers: function(){
		
		$('1.settings-list li').on('click',function(){
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
		
		$(".checkbox-push input[type='checkbox']").bind( "change", function(event, ui) {
			var $this = $(this);
			var val = $this.val();
			
			//console.log(val, $('#checkbox-push-none').prop('checked'));
			if(val=='push-none' && $('#checkbox-push-none').prop('checked')){
				$('#checkbox-push-daily, #checkbox-push-special, #checkbox-push-life').attr("checked",false).checkboxradio("refresh");
			}
			//console.log('daily: ' + $('#checkbox-push-daily').prop('checked'));
			//console.log('life: ' + $('#checkbox-push-life').prop('checked'));
			//console.log('special: ' + $('#checkbox-push-special').prop('checked'));
			//console.log('none: ' + $('#checkbox-push-none').prop('checked'));
			
			if($('#checkbox-push-daily').prop('checked') || $('#checkbox-push-life').prop('checked') || $('#checkbox-push-special').prop('checked')){
				$('#checkbox-push-none').attr("checked",false).checkboxradio("refresh");
			}
			
			//.attr("checked",true).checkboxradio("refresh")
		});
		
		$('.link-settings-ofl').on('click',function(){
			var url = 'http://www.onlineforlife.org';
			//window.location.href = 'events.html';
			//window.plugins.childBrowser.showWebPage('http://www.google.com', { showLocationBar: true });
			
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});
		$('.link-settings-privacy').on('click',function(){
			var url = 'http://onlineforlife.org/privacy-policy';
			//window.location.href = 'events.html';
			//window.plugins.childBrowser.showWebPage('http://www.google.com', { showLocationBar: true });
			
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});
		
		$('.link-settings-terms').on('click',function(){
			var url = 'http://onlineforlife.org/terms-and-conditions';
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


