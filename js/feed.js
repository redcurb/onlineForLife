var onlineForLife = window.onlineForLife || {}; onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Feed = {
	version: 1,
	
	prayersToday: 93432,
	
	states: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
	
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
		onlineForLife.Feed.showRandomStates();
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
	
	animateArcs: function(){
		var $impact = $('.section-your-impact');
		var $logo = $('.stats-logo');
		var $called = $logo.find('.step-called');
		var $scheduled = $logo.find('.step-scheduled');
		var $visitedPrc = $logo.find('.step-visited-prc');
		var $choseLife = $logo.find('.step-chose-life');
		
		var $textCalled = $impact.find('.impact-step.step-called span');
		var $textScheduled = $impact.find('.impact-step.step-scheduled span');
		var $textVisitedPrc = $impact.find('.impact-step.step-visited-prc span');
		var $textChoseLife = $impact.find('.impact-step.step-chose-life span');
		
		$called.fadeIn(500, function(){
			$textCalled.fadeIn(500);
			
			//step 2
			$scheduled.fadeIn(500, function(){
				$textScheduled.fadeIn(500);

				//step 3
				$visitedPrc.fadeIn(500, function(){
					$textVisitedPrc.fadeIn(500);

					//step 4
					$choseLife.fadeIn(500, function(){
						$textChoseLife.fadeIn(500);
					});

				});

			});
			
			
			
		});
		
	},

	showRandomStates: function(){
		var todayCount = $( ".main-refresh .refresh-count");
		console.log('showRandomStates');
		var showStatesInterval = setInterval(function(){
			var currentCount = onlineForLife.Feed.prayersToday;
			console.log('currentCount',currentCount);
			onlineForLife.USMap.toggleState(onlineForLife.Feed.getRandomState());
			var newCount = currentCount + 1;
			onlineForLife.Feed.prayersToday = newCount;
			todayCount.text(newCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
			
		}, 3000);
	},
	
	getRandomState: function(){
		var states = onlineForLife.Feed.states;
		var length = states.length;
		var lower = 0;
		var upper = length - 1;
		var randomState = Math.floor(Math.random() * upper) + 1;
		//console.log('randomState: ',states[randomState]);
		return states[randomState];
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
		onlineForLife.Feed.setupDraggable();
		onlineForLife.Feed.centerFeedItemText();
	},
	
	nothing: function(){
		return false;
	},
	
	centerFeedItemText: function(){
		$('#version').text('test version');
		
	},
	
	handleFeedDataError: function(data){
		console.log('handleFeedDataError: ' + data);
		
	},

	setBgVersion: function(){
		var lower = 1;
		var upper = 5;
		var bgVersion = Math.floor(Math.random() * upper) + 1;
		if(bgVersion==onlineForLife.Feed.feedBgVersion){
			if(bgVersion==upper){
				bgVersion = lower;
			}
			else{
				bgVersion = bgVersion + 1;
			}
		}
		onlineForLife.Feed.feedBgVersion = bgVersion;
		return bgVersion;
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

		$( "#mypanel-right").on( "panelopen", function( event, ui ) {
			setTimeout(function() {
				onlineForLife.Feed.animateArcs();
			},500);
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
		
		//console.log(
		//'total height: ' + totalHeight + ' ' +
		//'totalPx: ' + totalPx + ' ' +
		//'visibleHeight : ' + visibleHeight + ' ' +
		//'currentScroll:' + currentScroll);
		var isAtBottom = totalHeight <= (totalPx + 200);
		//console.log('isAtBottom', isAtBottom);
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


