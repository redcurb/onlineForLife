var onlineForLife = window.onlineForLife || {}; onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Feed = {
	version: 1,
	fetchCurrent: 1,
	tempData:{
		stats:{
			chooseLife:{
				user:11,
				friends:47
			},
			visitedPrc:{
				user:73,
				friends:472
			},
			called:{
				friends:15231
			},
			scheduled:{
				user:95,
				friends:936
			}
		}
	},
	
	init: function(){
		onlineForLife.Feed.setVersion();
		onlineForLife.Feed.setupHandlers();
		onlineForLife.Feed.setupScrolling();
	},
	
	highlightMap:function(){
		onlineForLife.USMap.toggleState('CA');
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

		$( ".main-refresh .fa-refresh" ).on( "click", function(){
			onlineForLife.Feed.handleRefreshMain();
		});

		$( ".mypanel-right .fa-refresh" ).on( "click", function(){
			onlineForLife.Feed.handleRefreshStats();
		});
		
		$( ".main-refresh .refresh-count" ).on( "click", function(){
			onlineForLife.Feed.highlightMap();
		});
		
		$( "li.feed-item .feed-content" ).draggable({ 
			axis: "x",
			start: function(e, ui) {
				y1 = ui.position.top;
				x1 = ui.position.left;
				console.log(y1 + ' - ' + x1);
			},
			distance: 50,
			revert:false,
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
		//$parentLi.addClass('swipe-complete');

		if(onlineForLife.Feed.version==2){
			$parentLi.slideUp(50, function() {
				$parentLi.remove();
			});
		}
		else{
			$parentLi.find('.feed-content').animate({left:'100%'},200, function(){
				setTimeout(function() {
					$this.slideUp(50, function() {
						$parentLi.remove();
						$('ul.feed li:first').addClass('first');
					});
				}, 500);
			});
			/*
			*/
		}
		
		
		
		
		
		var state = $this.data('state');
		console.log(state);
		onlineForLife.USMap.toggleState(state);
	},
	
	handleRefreshMain: function($this){
		console.log('handleRefreshMain');
		var $body = $('body');
		$body.addClass('feed-loading');
		var $refreshText = $('p.feed-refresh');
		$refreshText.show();
		setTimeout(function() {
			var newFetch = onlineForLife.Feed.fetchCurrent + 1;
			var $fetchItems = $('.feed-item.fetch-' + newFetch);
			if($fetchItems.length>0){
				$fetchItems.show();
				onlineForLife.Feed.fetchCurrent = newFetch;
			}
			else{
				$refreshText.hide();
				onlineForLife.Feed.outOfFeedItemsMain();
			}
			$refreshText.hide();
			$body.removeClass('feed-loading');
		}, 2500);
		
	},

	outOfFeedItemsMain: function(){
		console.log('outOfFeedItemsMain: ' + onlineForLife.Feed.fetchCurrent);
		$( "body" ).addClass('feed-loaded');
		$( ".main-refresh .fa-refresh" ).remove();
		var $noMoreText = $('p.no-more-items');
		$noMoreText.show();
		
	},

	handleRefreshStats: function($this){
		console.log('handleRefreshStats');
		console.log(onlineForLife.Feed.tempData.stats.visitedPrc);
		onlineForLife.Feed.toggleStatsRefresh('start');
		var data = onlineForLife.Feed.tempData.stats;
		var chooseLifeUser = data.chooseLife.user;
		var chooseLifeFriends = data.chooseLife.friends;
		var visitedPrcUser = data.visitedPrc.user;
		var visitedPrcFriends = data.visitedPrc.friends;
		var calledFriends = data.called.friends;
		var scheduledUser = data.scheduled.user;
		var scheduledFriends = data.scheduled.friends;
		
		var $chooseLifeUser = $('.section-your-impact .step-chose-life .user-count');
		var $chooseLifeFriends = $('.section-your-impact .step-chose-life .total-user-count');
		var $visitedPrcUser = $('.section-your-impact .step-visited-prc .user-count');
		var $visitedPrcFriends = $('.section-your-impact .step-visited-prc .total-user-count');
		var $calledFriends = $('.section-your-impact .step-called .total-user-count');
		var $scheduledUser = $('.section-your-impact .step-scheduled .user-count');
		var $scheduledFriends = $('.section-your-impact .step-scheduled .total-user-count');
		var $sinceCount = $('.section-refresh .refresh-count-value');
		
		setTimeout(function() {
			$chooseLifeUser.text('+' + chooseLifeUser);
			$chooseLifeFriends.text('+' + chooseLifeFriends);
			$visitedPrcUser.text('+' + visitedPrcUser);
			$visitedPrcFriends.text('+' + visitedPrcFriends);
			$calledFriends.text('+' + calledFriends);
			$scheduledUser.text('+' + scheduledUser);
			$scheduledFriends.text('+' + scheduledFriends);
			$sinceCount.text(0);
						
			onlineForLife.Feed.toggleStatsRefresh('stop');
		}, 2500);
		
		var output = '';
		output += 'chooseLifeUser: ' + chooseLifeUser + '\n';
		output += 'chooseLifeFriends: ' + chooseLifeFriends + '\n';
		output += 'visitedPrcUser: ' + visitedPrcUser + '\n';
		output += 'visitedPrcFriends: ' + visitedPrcFriends + '\n';
		output += 'calledFriends: ' + calledFriends + '\n';
		output += 'scheduledUser: ' + scheduledUser + '\n';
		output += 'scheduledFriends: ' + scheduledFriends + '\n';
		console.log(output);
		
		
		
	},
	
	toggleStatsRefresh:function(action){
		var $parent = $('.section-refresh');
		var $icon = $parent.find('.fa-refresh');
		var $since = $parent.find('.refresh-count-since');
		var $sinceCount = $parent.find('.refresh-count-value');
		var $refreshing = $parent.find('.refresh-count-refreshing');
		
		if(action=='start'){
			$icon.addClass('fa-spin');
			$since.hide();
			$refreshing.show();
		}
		if(action=='stop'){
			$icon.removeClass('fa-spin');
			$since.show();
			$refreshing.hide();
		}
		
	},
	
	setupScrolling:function(){
		
		var eventsElement = $('ul.feed');
		$(window).bind('scrollstart', function () {        
			//$('.content-main.ui-content').css('background', 'green');
			var feedLoading = $('body').hasClass('feed-loading') || $('body').hasClass('feed-loaded');
			if(!feedLoading){
				if (onlineForLife.Feed.isAtBottom()){
					console.log("at bottom");
					onlineForLife.Feed.handleRefreshMain();
				}
			}
		});
	
		$(window).bind('scrollstop', function () {        
		   //$('.content-main.ui-content').css('background', 'red');
		   //eventsElement.append('<li><a href="">Stop</a></li>');
		   //eventsElement.listview('refresh');
		});
		
	},
	
	isAtBottom:function(){
		var totalHeight;
		var currentScroll;
		var visibleHeight;
		
		if (document.documentElement.scrollTop){
			currentScroll = document.documentElement.scrollTop;
		}
		else{
			currentScroll = document.body.scrollTop;
		}
		
		totalHeight = $(document).height();
		visibleHeight = document.documentElement.clientHeight;
		totalPx = visibleHeight + currentScroll;
		
		console.log(
		'total height: ' + totalHeight + ' ' +
		'totalPx: ' + totalPx + ' ' +
		'visibleHeight : ' + visibleHeight + ' ' +
		'currentScroll:' + currentScroll);
		var isAtBottom = totalHeight <= (totalPx + 200);
		console.log('isAtBottom', isAtBottom);
		return (isAtBottom)
	},

	handleSwipeThanks: function($this){
		console.log('handleSwipe', $this.attr('class'));
		var $prayerText = $this.find('.action-text em');
		$prayerText.text('Thank you for your prayer!');
		
	}
	


};
$(function() {
	onlineForLife.Feed.init();
	//$('#panel-left').click();
	$('#panel-right').click();
});


