var onlineForLife = window.onlineForLife || {}; onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Feed = {
	version: 1,
	init: function(){
		onlineForLife.Feed.setVersion();
		onlineForLife.Feed.setupHandlers();
	},
	
	setVersion:function(v){
		var version = onlineForLife.Feed.version;
		var paramVersion = Redcurb.Helpers.getParameterByName('ver');
		if(typeof(v)!='undefined'){
			version = v;
		}
		else if(paramVersion!=''){
			version = Redcurb.Helpers.getParameterByName('ver');
		}
		console.log(typeof(version));
		version = parseInt(version);
		console.log(typeof(version));
		onlineForLife.Feed.version = version;
		console.log('v' + version);
		$('body').addClass('version-' + version);
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

		$( "1li.feed-item .feed-content" ).on( "swiperight", function(){
			onlineForLife.Feed.handleSwipe($(this));
		});

		$( "li.feed-item .feed-content" ).draggable({ 
			axis: "x",
			start: function(e, ui) {
				y1 = ui.position.top;
				x1 = ui.position.left;
				console.log(y1 + ' - ' + x1);
			},
			distance: 50,
			revert:true,
			stop: function(e, ui) {
				onlineForLife.Feed.handleSwipe($(this));
			}
			/*
			start: function( event, ui ) {
				console.log(1);
				onlineForLife.Feed.handleSwipe($(this));
			}
			*/
		});

	},

	handleSwipe: function($this){
		//$this.remove();
		var $parentLi = $this.parents('li');
		$parentLi.addClass('swipe-complete');

		if(onlineForLife.Feed.version==2){
			$parentLi.slideUp("slow", function() {
				$parentLi.remove();
			});
		}
		else{
			$this.slideUp("slow", function() {});
		}
		
		
		
		
		var state = $this.data('state');
		console.log(state);
		onlineForLife.USMap.toggleState(state);
	},

	handleSwipeThanks: function($this){
		console.log('handleSwipe', $this.attr('class'));
		var $prayerText = $this.find('.action-text em');
		$prayerText.text('Thank you for your prayer!');
		
	}
	


};
$(function() {
	onlineForLife.Feed.init();
	
});


