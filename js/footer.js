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
			var title = encodeURIComponent('Online For Life');
			var description = encodeURIComponent('So Every Child Makes Their Mark. Our Mission: Providing comprehensive care to abortion-determined women and men in their deepest time of need.');
			var imageUrl = encodeURIComponent('http://onlineforlife.org/2-1app/olf-logo.png');
			var shareUrl = encodeURIComponent('http://onlineforlife.org/2-1app/share.html');
			var fbLink = 'http://www.facebook.com/sharer.php?s=100&p[title]='+ title + '&p[summary]=' + description + '&p[url]=' + shareUrl + '&p[images][0]=' + imageUrl;
			//window.location.href = "https://www.facebook.com/sharer/sharer.php?u=www.onlineforlife.org/2-1app/share.html?id=2123";
			window.location.href = fbLink;
		});
		$('.feed-share-twitter').on('click',function(){
			window.location.href = "https://twitter.com/intent/tweet?text=Sign%20up%20to%20connect%20with%20me%20on%20Online%20For%20Life&url=http%3A%2F%2Fwww.onlineforlife.org/2-1app/share.html?id=2123";
		});


		
		
	}
	
	


};
$(function() {
	onlineForLife.Footer.init();
});

