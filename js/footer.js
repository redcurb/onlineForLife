var onlineForLife = window.onlineForLife || {}; onlineForLife.Footer = onlineForLife.Footer || {};
onlineForLife.Footer = {
	version: 1,
	
	init: function(){
		//console.log('footer init');
		onlineForLife.Footer.setupHandlers();
	},

	setupHandlers: function(){
		//console.log('footer setupHandlers');
		$('.feed-share-sms').on('click',function(){
			window.location.href = "sms:6268647084?body=TESTMESSAGE";

		});
		$('.feed-share-fb').on('click',function(){
			var title = 'Online For Life';
			var description = 'So Every Child Makes Their Mark. Our Mission: Providing comprehensive care to abortion-determined women and men in their deepest time of need.';
			var imageUrl = 'http://onlineforlife.org/2-1app/olf-logo.png';
			var userId = onlineForLife.Feed.userData.id;
			var shareUrl = 'http://onlineforlife.org/2-1app/share.html?shareId='+userId;
			//https://m.facebook.com/sharer.php?u=http://onlineforlife.org/2-1app/share.html?shareId=2313&_rdr&p=
			
			var tempUrl = 'https://m.facebook.com/sharer.php?u=http://onlineforlife.org/2-1app/share.html?shareId=2313&_rdr&p=';
			var url2 = 'http://m.facebook.com/sharer.php?p[url]=' + tempUrl;
			var newUrl = 'http://m.facebook.com/sharer.php?u=http://onlineforlife.org/2-1app/share.html?id=' + userId;
			url = newUrl;
			console.log(url);
			
			//https://m.facebook.com/sharer.php?p%5Btitle%5D=Online+For+Life&p%5Bsummary%5D=
			//So+Every+Child+Makes+Their+Mark.+Our+Mission%3A+Providing+comprehensive+care+to+abortion-determined+women+and+men+in+their+deepest+time+of+need.&p%5Burl%5D=
			//http%3A%2F%2Fonlineforlife.org%2F2-1app%2Fshare.html%3FshareId%3D%5Bobject+Object%5D&p%5Bimages%5D%5B0%5D=http%3A%2F%2Fonlineforlife.org%2F2-1app%2Folf-logo.png&_rdr
			
			//window.location.href = "https://www.facebook.com/sharer/sharer.php?m2w&u=www.onlineforlife.org/2-1app/share.html?id=2123";
			//window.location.href = fbLink;
			
			
			window.open(url, '_blank', 'location=yes');
		});
		$('.feed-share-twitter').on('click',function(){
			//window.location.href = "https://twitter.com/intent/tweet?text=Sign%20up%20to%20connect%20with%20me%20on%20Online%20For%20Life&url=http%3A%2F%2Fwww.onlineforlife.org/2-1app/share.html?id=2123";
			var userId = onlineForLife.Feed.userData.id;
			var shareUrl = encodeURIComponent('http://onlineforlife.org/2-1app/share.html?shareId='+userId);
			var url = "https://twitter.com/intent/tweet?text=Sign%20up%20to%20connect%20with%20me%20on%20Online%20For%20Life&url=" + shareUrl;
			window.open(url, '_blank', 'location=yes');
		});


		
		
	}
	
	


};
$(function() {
	onlineForLife.Footer.init();
});

