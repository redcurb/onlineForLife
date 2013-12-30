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
	}
	
	


};
$(function() {
	onlineForLife.Footer.init();
});

