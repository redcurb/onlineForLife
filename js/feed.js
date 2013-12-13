var onlineForLife = window.onlineForLife || {}; onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Feed = {
	version: 1,
	
	fetchCurrent: 1,
	
	fetchCountEach: 10,
	
	feedBgVersion:1,
	
	images:{
		feedBg:{
			count:10,
			filenamePrefix: 'phone-version-',
			filenameExt: '.jpg'
		}
	},
	
	urls:{
		feedBg:'js/json/prayer-feed.js'
	},
	
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
		onlineForLife.Feed.buildFeed();
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

	setFeedBackgrounds: function(){
		var imageData = onlineForLife.Feed.images.feedBg;
		console.log(imageData);
	},
	
	buildFeed: function(){
		console.log('buildFeed');
		onlineForLife.Feed.getFeedData();
	},
	
	getFeedData: function(){
		var url = onlineForLife.Feed.urls.feedBg;
		console.log('getFeedData: ' + url);
		$.ajax({
			dataType: "json",
			url: url,
			data: {},
			success: function(data){
				onlineForLife.Feed.handleFeedDataSuccess(data);
			},
			error: function(){
				onlineForLife.Feed.handleFeedDataError(data);
			}
		});		
	},
	
	getStateName: function(data){
		
	},
	
	handleFeedDataSuccess: function(data){
		console.log('handleFeedDataSuccess: ' + data);
		var fetchCountEach = onlineForLife.Feed.fetchCountEach;
		var prayers = data.prayers;
		var dataItemCount = prayers.length;
		console.log('fetchCountEach: ' + fetchCountEach);
		console.log('dataItemCount: ' + dataItemCount);

		var feedHtml = '';
		$.each(prayers, function(index,prayer){
			var liClass = (index==0) ? 'first' : '';
			var itemId = prayer.itemId;
			var stateCode = prayer.stateCode;
			var stateName = prayer.stateName;
			var step = prayer.step;
			var output = '';
			feedHtml += onlineForLife.Feed.buildFeedItem(itemId, stateCode, step, stateName, liClass);
		});

		
		var $feed = $('ul.feed');
		$feed.html(feedHtml);
//		onlineForLife.Feed.centerFeedItemText();
	},
	
	centerFeedItemText: function(){
		console.log('centerFeedItemText');
		onlineForLife.Feed.setupDraggable();
		$('ul.feed li').each(function(index,$itemLi){
			var $this = $(this);
			var $text = $this.find('p.action-text');
			var $icon = $this.find('.action-step');
			var liHeight = $this.outerHeight();
			var textHeight = $text.outerHeight();
			var borderHeight = 1;
			var marginTop = 10;
			var totalPadding = (liHeight - textHeight - borderHeight ) / 2;
			var topPx = totalPadding - marginTop;
			
			$text.css('top',topPx+'px');
			$this.css('visibility','visible');
		});
	},
	
	handleFeedDataError: function(data){
		console.log('handleFeedDataError: ' + data);
		
	},

	setBgVersion: function(){
		var bgVersion = Math.floor((Math.random()*10)+1);
		var lower = 1;
		var upper = 10;
		if(bgVersion==onlineForLife.Feed.feedBgVersion){
			if(bgVersion==upper){
				bgVersion = lower;
			}
			else{
				bgVersion = bgVersion + 1;
			}
		}
		return bgVersion;
		return 0;
	},	
	
	buildFeedItem: function(itemId, stateCode, step, stateName, liClass){
		var source   = $("#template-feed-item").html();
		var template = Handlebars.compile(source);
		var BgVersion = onlineForLife.Feed.setBgVersion;
		var context = {itemId: itemId, stateCode: stateCode, step: step, stateName: stateName, liClass: liClass, BgVersion: BgVersion}
		var html = template(context);
		return html;
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
		
	},

	setupDraggable: function(){
		$("li.feed-item .feed-content").swipe( {
			//Generic swipe handler for all directions
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				onlineForLife.Feed.handleSwipe($(this),direction);
			},
			swipeRight:function(event, direction, distance, duration, fingerCount) {
				onlineForLife.Feed.handleSwipe($(this),direction);
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:150
		});
		$( "2li.feed-item .feed-content" ).draggable({ 
			axis: "x",
			start: function(e, ui) {
				var y1 = ui.position.top;
				var x1 = ui.position.left;
				console.log(y1 + ' - ' + x1);
				console.log('START: ' + y1 + ' - ' + x1);
				onlineForLife.Feed.DragXStart = x1;
			},
			distance: 50,
			revert:false,
			stop: function(e, ui) {
				var y1 = ui.position.top;
				var x1 = ui.position.left;
				console.log('STOP: ' + y1 + ' - ' + x1);
				onlineForLife.Feed.DragXEnd = x1;
				console.log(onlineForLife.Feed.DragXStart + ' - ' + onlineForLife.Feed.DragXEnd);
				if(x1>0){
					var swipeDir = 'LeftToRight';
				}
				else{
					var swipeDir = 'RightToLeft';
				}
				
				onlineForLife.Feed.handleSwipe($(this),swipeDir);
			}
			/*
			start: function( event, ui ) {
				console.log(1);
				onlineForLife.Feed.handleSwipe($(this));
			}
			*/
		});

	},

	handleSwipe: function($this, swipeDir){
		//$this.remove();
		var $parentLi = $this.parents('li');
		//$parentLi.addClass('swipe-complete');
		console.log('handleSwipe: ' + swipeDir);
		if(swipeDir=='right'){
			posLeft = '100%';
			var animClass = 'swipeLeftToRight';
		}
		else{
			posLeft = '-100%';
			var animClass = 'swipeRightToLeft';
		}
//		$parentLi.find('.feed-content').addClass(animClass);
				
		$parentLi.find('.feed-content').animate({left:posLeft},200,function(){
				
				
			setTimeout(function(){
				$parentLi.addClass('hideFeedItem');
				setTimeout(function() {
					$parentLi.remove();
					$('ul.feed li:first').addClass('first');
				},700);
				
			}, 500);
		});
		
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
	//$('#panel-right').click();
});


