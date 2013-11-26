var onlineForLife = window.onlineForLife || {}; onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Feed = {
	init: function(){
		console.log('feed init');
		onlineForLife.Feed.setupHandlers();
	},

	setupHandlers: function(){
		console.log('feed setupHandlers');
		$('#panel-left').on('click',function(){
			//alert('panel-left');
			$( "#mypanel-left" ).panel( "open" , {
					display:'reveal'
			} );
		});
		$('#panel-right').on('click',function(){
			//alert('panel-right');
			$( "#mypanel-right" ).panel( "open" , {} );
		});

		$( ".feed-share" ).on( "click", function(){
			alert($(window).width() + ' x ' + $(window).height());
		});

		$( "li.feed-item" ).on( "swiperight", function(){
			onlineForLife.Feed.handleSwipe($(this));
		});

	},

	handleSwipe: function($this){
		console.log('handleSwipe', $this.attr('class'));
		var $prayerText = $this.find('.action-text em');
		$prayerText.text('Thank you for your prayer!');
	}
	


};
$(function() {
	onlineForLife.Feed.init();
	
});


