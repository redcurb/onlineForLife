var onlineForLife = window.onlineForLife || {}; onlineForLife.Footer = onlineForLife.Footer || {};
onlineForLife.Footer = {
	version: 1,
	
	init: function(){
		console.log('footer init');
		onlineForLife.Footer.setupHandlers();
	},

	setupHandlers: function(){
		console.log('footer init');
		$('.feed-share-sms').on('click',function(){
			window.location.href = "sms:6268647084?body=TESTMESSAGE";
		});
		$('.feed-share-fb').on('click',function(){
			window.location.href = "https://www.facebook.com/sharer/sharer.php?u=www.onlineforlife.org/2-1app/share.html";
		});
		$('.feed-share-twitter').on('click',function(){
			window.location.href = "https://twitter.com/intent/tweet?text=Sign%20up%20to%20connect%20with%20me%20on%20Online%20For%20Life&url=http%3A%2F%2Fwww.onlineforlife.org/2-1app/share.html?id=2123";
		});
		
		
	}
	
	


};
$(function() {
	onlineForLife.Footer.init();
});

