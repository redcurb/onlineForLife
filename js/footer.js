var onlineForLife = window.onlineForLife || {}; onlineForLife.Footer = onlineForLife.Footer || {};
onlineForLife.Footer = {
	version: 1,
	
	init: function(){
		onlineForLife.Footer.getText();
	},
	
	getText:function(){
		var dbUrl = 'https://ofl.firebaseio.com/text/';
		var textData = new Firebase(dbUrl);
		onlineForLife.GlobalData = {};
		textData.once('value', function(textValue) {
			onlineForLife.GlobalData.Text = textValue.val();
			onlineForLife.Footer.getFooterText();
			onlineForLife.Panels.setText();
		});
	},
	
	getFooterText:function(){
		onlineForLife.Footer.footerData = {};
		
		var footerTextData = onlineForLife.GlobalData.Text.footer;
		onlineForLife.Footer.footerData.text = footerTextData;
		var emailText = footerTextData.email;
		console.log('emailText',emailText);
		onlineForLife.Footer.setupHandlers();
	},
	
	buildPrayerSet: function(){
		var prayerSet = onlineForLife.Feed.feedItemLists.prayerSet;
		
	},
	
	resetPrayerSet: function(){
		console.log('resetPrayerSet');
		
	},
	
	pushPrayerSetData: function(userId, shareId){
		console.log('pushPrayerSetData: ' + userId + ' - ' + shareId);
		var prayers = onlineForLife.Feed.feedItemLists.prayerSets.prayers;
		console.log(prayers);
		
		var prayersUrl = 'https://ofl.firebaseio.com/prayersets/' + shareId;
		var prayerData = new Firebase(prayersUrl);
		prayerData.set({ user:userId, prayers:prayers });
		
	},
	
	handleShare: function(linkId){
		console.log('handleShare: ' + linkId);
		var shareUrl = onlineForLife.Footer.footerData.text.shareUrl;
		var userId = onlineForLife.Feed.userData.id;
		var timeStamp = new Date().getTime().toString();
		
		onlineForLife.Feed.feedItemLists.prayerSets.timestamp = timeStamp;
		var shareId = userId + timeStamp;
		
		onlineForLife.Footer.pushPrayerSetData(userId, shareId);
		
		if(linkId=='twitter'){
			var textData = onlineForLife.Footer.footerData.text.twitter;
			var shareText = textData.body1;
			var url = 'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + shareUrl + '?shareId='+shareId;;
			window.open(url, '_blank', 'location=yes');
		}
		else if(linkId=='facebook'){
			var url = 'http://m.facebook.com/sharer.php?u=' + shareUrl + '?shareId='+shareId;
			window.open(url, '_blank', 'location=yes');
		}
		else if(linkId=='email'){
			var textData = onlineForLife.Footer.footerData.text.email;
			var subjectText = textData.subject;
			var bodyText = textData.body1;
			var url = 'mailto:?subject=' + subjectText + '&body=' + bodyText + ' ' + shareUrl + '?shareId='+shareId;
			console.log('email: ' + url);
			window.location.href = url;
		}
		
		/*
		$('.feed-share-sms').on('click',function(){
			onlineForLife.Footer.buildPrayerSet();
			var textData = onlineForLife.Footer.footerData.text.email;
			var timeStamp = new Date().getTime().toString();
			
			var subjectText = textData.subject;
			var bodyText = textData.body1;
			var url = 'mailto:?subject=' + subjectText + '&body=' + bodyText + ' ' + shareUrl + '?shareId='+shareId;
			window.location.href = url;
		});
		$('.feed-share-fb').on('click',function(){
			onlineForLife.Footer.buildPrayerSet();
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
		*/
	},
	
	setupHandlers: function(){
		console.log('footer handlers');
		$('ul.feed-share-list li').on('click',function(){
			var $this = $(this);
			var linkId = $this.data('id');
			console.log('linkId: ' + linkId);
			onlineForLife.Footer.handleShare(linkId);
		});
	}
};
$(function() {
	//onlineForLife.Footer.init();
});

