var onlineForLife = window.onlineForLife || {}; onlineForLife.Footer = onlineForLife.Footer || {};
onlineForLife.Footer = {
	version: 1,
	
	init: function(){
		onlineForLife.Footer.getFooterText();
	},
	
	getFooterText:function(){
		var dbUrl = 'https://ofl.firebaseio.com/text/footer/';
		var footerData = new Firebase(dbUrl);
		onlineForLife.Footer.footerData = {};
		footerData.once('value', function(footerText) {
			var footerTextData = footerText.val();
			onlineForLife.Footer.footerData.text = footerTextData;
			var emailText = footerTextData.email;
			onlineForLife.Footer.setupHandlers();
		});
	},
	
	setupHandlers: function(){
		var shareUrl = onlineForLife.Footer.footerData.text.shareUrl;
		var userId = onlineForLife.Feed.userData.id;

		$('.feed-share-sms').on('click',function(){
			var textData = onlineForLife.Footer.footerData.text.email;
			var timeStamp = new Date().getTime().toString();
			var shareId = userId + timeStamp;
			var subjectText = textData.subject;
			var bodyText = textData.body1;
			var url = 'mailto:?subject=' + subjectText + '&body=' + bodyText + ' ' + shareUrl + '?shareId='+shareId;
			window.location.href = url;
		});
		$('.feed-share-fb').on('click',function(){
			var timeStamp = new Date().getTime().toString();
			var shareId = userId + timeStamp;
			var url = 'http://m.facebook.com/sharer.php?u=' + shareUrl + '?shareId='+shareId;
			window.open(url, '_blank', 'location=yes');
		});
		$('.feed-share-twitter').on('click',function(){
			var textData = onlineForLife.Footer.footerData.text.twitter;
			var timeStamp = new Date().getTime().toString();
			var shareId = userId + timeStamp;
			var userId = onlineForLife.Feed.userData.id;
			var shareUrl = encodeURIComponent(shareUrl + '?shareId='+shareId);
			var shareText = textData.body1;

			var url = 'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + shareUrl;
			window.open(url, '_blank', 'location=yes');
		});
	}
};
$(function() {
	//onlineForLife.Footer.init();
});

