var onlineForLife = window.onlineForLife || {}; onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Feed = {
	version: 1,
	
	userData: {
		id:null
	},
	
	userPrayersDaily: 0,
	
	showFooterOnCount: 3,
	
	addFirebaseChild: true,
	
	showTutorial:true,
	
	tutorial:0,
	
	tutorialMax:3,
	
	prayersToday: 93432,
	
	states: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
	
	fetchCurrent: 1,
	
	fetchCountEach: 10,
	
	feedBgVersion:1,
	
	itemsPrayedFor:[],
	
	images:{
		feedBg:{
			count:10,
			filenamePrefix: 'phone-version-',
			filenameExt: '.jpg'
		}
	},
	
	urls:{
		//this will eventually come from salesforce.
		feedBg:'js/json/prayer-feed.js'
	},
	
	tempData:{
	},
	
	init: function(){
		//console.log('feed init');		
		$('1.refresh-count').on('click',function(){
			//onlineForLife.Feed.outputFeedWidth();
			//onlineForLife.Tracking.trackEvent('refresh','click');
		});
		
		//var uiVer = jQuery.ui.version;
		//var uiVer = jQuery.ui.version;
		//$('#debug').append('<li>jQuery.ui.version: ' + uiVer + '</li>');
		//onlineForLife.Feed.writeDeviceInfo();
		onlineForLife.Feed.checkLoginStatus();
		onlineForLife.Feed.setVersion();
		onlineForLife.Feed.setupHandlers();
		onlineForLife.Feed.showRandomStates();
		//onlineForLife.Feed.setupScrolling();
		onlineForLife.Feed.updateUserPrayerCount();
	},
	
	checkLoginStatus: function(){
		//console.log('checkLoginStatus');
		
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				//console.log('error');
				console.log(error);
				return;
			}
			if (user) {
				// User is already logged in.
				//console.log(user);
				//console.log(user.id);
				onlineForLife.Feed.userData.id = user.id;
				onlineForLife.Feed.setupFirebase();
			} else {
				// User is logged out.
				//console.log('no user');
				document.location = 'home.html';
			}
		});
	},

	trackUser:function(event, data){
		//console.log('trackUser',event,data)
		if(event=='feed-loaded'){
			
		}
		if(event=='prayer'){
			var eventId = data.eventId;
			//console.log('trackUser prayer: ' + eventId);
			onlineForLife.Feed.trackPrayer(eventId);
		}
	},

	trackPrayer:function(eventId){
		var trackingData =  new Firebase('https://ofl.firebaseio.com/tracking');
		var prayerTrackingData = new Firebase('https://ofl.firebaseio.com/tracking/events/prayers');
		var timeStamp = new Date().getTime();
		var trackingId = prayerTrackingData.push({itemId: eventId, timestamp: timeStamp, userId: onlineForLife.Feed.userData.id}).name();
		console.log('trackingId: ' + trackingId);
		
		var feedItemTrackingData = new Firebase('https://ofl.firebaseio.com/tracking/events/feedItems/' + eventId);
		feedItemTrackingData.push({trackingId:trackingId, timestamp: timeStamp, userId: onlineForLife.Feed.userData.id});
		
		var usersUrl = 'https://ofl.firebaseio.com/users/'+ onlineForLife.Feed.userData.id + '/prayers';
		var usersData = new Firebase(usersUrl);
		usersData.push(eventId);
		
	},

	writeDeviceInfo:function(){
		//console.log('writeDeviceInfo');
		var $info = $('#device-info');
		var html = '';
		html += navigator.userAgent + '<br>';
		html += 'width: ' + $(window).width() + '<br>';
		html += 'height: ' + $(window).height() + '<br>';
		$info.append(html);
		
		var deviceId = Redcurb.Helpers.getParameterByName('device');
		//console.log('deviceId:' + deviceId);
		var deviceUrl = 'https://ofl.firebaseio.com/devices';
		var deviceData = new Firebase(deviceUrl);
		var data = {
			id: deviceId,
			userAgent: navigator.userAgent
		}
		if(Redcurb.Helpers.getParameterByName('reset')=="1"){
			deviceData.set({});
		}
		else if(!Redcurb.Helpers.getParameterByName('device')==""){
			deviceData.push(data);
		}
	},
	
	highlightMap:function(){
		onlineForLife.USMap.toggleState('CA');
	},
	
	setupFirebase:function(){
		onlineForLife.Feed.getPastPrayers();
		onlineForLife.Feed.setupFirebasePrayers();
		/*setTimeout(function() {
			console.log('addFirebaseChild TRUE');
			onlineForLife.Feed.addFirebaseChild = true;
		},5000);
		*/
	},
	
	getPastPrayers:function(){
		//console.log('getPastPrayers');
		var dbUrl = 'https://ofl.firebaseio.com/users/' + onlineForLife.Feed.userData.id + '/prayers';
		var myDataRef = new Firebase(dbUrl);
		
		//console.log('BEFORE');
		myDataRef.once('value', function(snapshot) {
			var prayerId = snapshot.val();
			//console.log('getPastPrayers VALUE prayerId: ');
			//console.log(prayerId);
			if(prayerId!="{}" && prayerId!=null){
				$.each(prayerId,function(i,v){
					//console.log(v);
					onlineForLife.Feed.itemsPrayedFor.push(v.toString());
				});
			}
			//console.log('AFTER');
			onlineForLife.Feed.setupFirebaseFeedItem();
		});

	},
	
	toggleFeedMessage:function(type){
		console.log('toggleFeedMessage');
		var $feed = $('ul.feed');
		//$feed.removeClass('status-loading').addClass('status-no-updates');
		var $spinner = $feed.find('li.spinner');
		var $noRecords = $feed.find('li.no-records');
		var $prayedAll = $feed.find('li.prayed-all');
		
		if(type=='LOADED'){
			$spinner.fadeOut(200);
		}
		if(type=='NO_ITEMS'){
			$noRecords.fadeIn(200);
			$spinner.fadeOut(200);
		}
		else if(type=='PRAYED_ALL'){
			$prayedAll.fadeIn(200);
			$spinner.fadeOut(200);
		}
		$feed.removeClass('status-complete');
		
	},
	
	setupFirebaseFeedItem:function(){
		//console.log('setupFirebaseFeedItem');
		var dbUrl = 'https://ofl.firebaseio.com/feed';
		var myDataRef = new Firebase(dbUrl);
		
		myDataRef.on('value', function(snapshot) {
			var feedData = snapshot.val();
			if(feedData === null) {
				onlineForLife.Feed.toggleFeedMessage('NO_ITEMS');
			}
			else{
				var html = '';
				var itemCount = 0;
				var itemBuildCount = 0;
				$.each(feedData,function(i,feedItem){
					//console.log(i);
					itemCount += 1;
					var messageId = feedItem.id.toString();
					var buildItem = false;
					if(onlineForLife.Feed.itemsPrayedFor.indexOf(messageId)<0){
						buildItem = true;
					}
					if(buildItem){
						itemBuildCount += 1;
						var newHtml = onlineForLife.Feed.buildFeedItem(feedItem.id, feedItem.state, feedItem.step, feedItem.stateName, 'first');
						$('ul.feed').prepend(newHtml);
						
						onlineForLife.Feed.centerFeedItemText('firebase', $('ul.feed li:first'));
						onlineForLife.Feed.setupDraggableEach($('ul.feed li:first'));
					}
				});
				onlineForLife.Feed.toggleFeedMessage('LOADED');
				console.log('itemCount',itemCount);
				console.log('itemBuildCount',itemBuildCount);
				
			}
			if(itemBuildCount==0){
				onlineForLife.Feed.toggleFeedMessage('PRAYED_ALL');
			}
			
		});

		/*
		
		myDataRef.on('child_added', function(snapshot) {
			var message = snapshot.val();
			//console.log(message);
			//displayChatMessage(message.name, message.state, message.step);
			//console.log('onlineForLife.Feed.addFirebaseChild TRUE');
			var messageId = message.id.toString();
			//console.log('messageId: ' + typeof(messageId) + ' - ' + messageId);
			//console.log('indexOf: ' + onlineForLife.Feed.itemsPrayedFor.indexOf(messageId));
			var buildItem = false;
			if(onlineForLife.Feed.itemsPrayedFor.indexOf(messageId)<0){
				buildItem = true;
			}
			if(buildItem){
				var newHtml = onlineForLife.Feed.buildFeedItem(message.id, message.state, message.step, message.stateName, 'first');
				$('ul.feed').prepend(newHtml);
				
				onlineForLife.Feed.centerFeedItemText('firebase', $('ul.feed li:first'));
				onlineForLife.Feed.setupDraggableEach($('ul.feed li:first'));
			}
			//console.log(' ');
		});
		*/
	},
	
	setupFirebasePrayers:function(){
		//console.log('setupFirebasePrayers');
		var dbUrl = 'https://ofl.firebaseio.com/prayers';
		var myDataRef = new Firebase(dbUrl);
		
		myDataRef.on('child_added', function(snapshot) {
			var message = snapshot.val();
			if(onlineForLife.Feed.addFirebaseChild){
				onlineForLife.USMap.toggleState(message.state);
			}
		});
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
		//console.log(typeof(version));
		version = parseInt(version);
		//console.log(typeof(version));
		onlineForLife.Feed.version = version;
		//console.log('v' + version);
		$('body').addClass('version-' + version);
	},
	
	hideArcs: function(){
		var $impact = $('.section-your-impact');
		var $logo = $('.stats-logo');
		var $arcs = $logo.find('.stats-logo-arc');
		var $textSpans = $impact.find('.impact-step span');
		
		$arcs.hide();
		$textSpans.hide();
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
		
		$called.fadeIn(150, function(){
			$textCalled.fadeIn(150);
			
			//step 2
			$scheduled.fadeIn(150, function(){
				$textScheduled.fadeIn(150);

				//step 3
				$visitedPrc.fadeIn(150, function(){
					$textVisitedPrc.fadeIn(150);

					//step 4
					$choseLife.fadeIn(150, function(){
						$textChoseLife.fadeIn(150);
					});

				});

			});
			
			
			
		});
		
	},

	showRandomStates: function(){
		//console.log('showRandomStates');
		var showStatesInterval = setInterval(function(){
			onlineForLife.USMap.toggleState(onlineForLife.Feed.getRandomState());
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
		//console.log(imageData);
	},
	
	
	getStateName: function(data){
		
	},
	
	centerAllFeedItemText: function(){
		//$('#version').text('test version 3');
		$('ul.feed li').each(function(index,$itemLi){
			var $this = $(this);
			onlineForLife.Feed.centerFeedItemText(index, $this);
		});
		setTimeout(function() {
			onlineForLife.Feed.centerFeedItemText(0, $('ul.feed li:eq(0)'));
		},10);

	},




	
	centerFeedItemText: function(index, $this){
		var $text = $this.find('p.action-text');
		var $icon = $this.find('.action-step');
		var liHeight = $this.outerHeight();
		
		var textHeight = $text.outerHeight();
		var borderHeight = 1;
		var marginTop = 10;
		marginTop = 7;
		var totalPadding = (liHeight - textHeight - borderHeight ) / 2;
		var topPx = totalPadding - marginTop;
		
		var output = '';
		output += 'index: ' + index + '\n';
		output += 'liHeight: ' + liHeight + '\n';
		output += 'textHeight: ' + textHeight + '\n';
		output += 'borderHeight: ' + borderHeight + '\n';
		output += 'marginTop: ' + marginTop + '\n';
		output += 'totalPadding: ' + totalPadding + '\n';
		output += 'topPx: ' + topPx + '\n';
		output += '\n';
		//console.log(output);
		$text.css('top',topPx+'px');
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
		$( ".feed-share" ).on( "click", function(){
			alert($(window).width() + ' x ' + $(window).height());
		});
		
	},

	setupDraggableEach: function($li){
		var $this = $li;
		var id = $this.find('.feed-content').attr('id');
		var elementId = '#'+id;
		var $content = $(elementId).get(0);
		//console.log('elementId: ' + elementId);
		new Swipe($content,{
			startSlide:1,
			speed: 400, // Speed of prev and next transitions in milliseconds. (default:300)
			callback: function(event, index, elem) {
				var $this = $(elem);
				var $div = $this.parents('div.feed-content');
				var direction = $this.data('direction');
				//$('#test-subtext2 span').append(' C-'+direction);
				if(direction!='none'){
					onlineForLife.Feed.handleSwipe($div,direction);
				}
			}
		});
	},

	setupDraggable: function(){
		var $feed = $('ul.feed');
		var $feedItems = $feed.get(0);
		//console.log('setupDraggable');
		
		$('ul.feed li.feed-item').each(function(i,v){
			var $this = $(this);
			var id = $this.find('.feed-content').attr('id');
			var elementId = '#'+id;
			var $content = $(elementId).get(0);
			//console.log('elementId: ' + elementId);
			new Swipe($content,{
				startSlide:1,
				speed: 400, // Speed of prev and next transitions in milliseconds. (default:300)
				callback: function(event, index, elem) {
					var $this = $(elem);
					var $div = $this.parents('div.feed-content');
					var direction = $this.data('direction');
					//$('#test-subtext2 span').append(' C-'+direction);
					if(direction!='none'){
						onlineForLife.Feed.handleSwipe($div,direction);
					}
				}
			});
			/*
			var $contentMain = $this.find('.feed-content-main');
			var contentWidth = $contentMain.width(); 
			var $actionText = $contentMain.find('.action-text');
			var textWidth = $actionText.width(); 
			var $stepText = $contentMain.find('.action-step');
			var stepWidth = $stepText.width(); 
			$actionText.append("<br>contentWidth: " + contentWidth + " textWidth: " + textWidth + " stepWidth: " + stepWidth); 
			*/

		});

		

	},

	outputFeedWidth: function(){
		$('ul.feed li.feed-item').each(function(i,v){
			var $this = $(this);
			var id = $this.find('.feed-content').attr('id');
			var elementId = '#'+id;
			var $content = $(elementId).get(0);

			
			var $contentMain = $this.find('.feed-content-main');
			var contentWidth = $contentMain.width(); 
			var $actionText = $contentMain.find('.action-text');
			var textWidth = $actionText.width(); 
			var $stepText = $contentMain.find('.action-step');
			var stepWidth = $stepText.width(); 
			$actionText.append("<br>contentWidth: " + contentWidth + " textWidth: " + textWidth + " stepWidth: " + stepWidth); 
		});

	},

	handleSwipe: function($this, swipeDir){
		$('#test-subtext span').text('Swipe Occured...');
		$('#test-subtext2 span').append('x');
		//$this.remove();
		onlineForLife.Feed.showTutorial=false;
		var $parentLi = $this.parents('li');
		//$parentLi.addClass('swipe-complete');
		//console.log('handleSwipe: ' + swipeDir);
		if(swipeDir=='right'){
			posLeft = '100%';
			var animClass = 'swipeLeftToRight';
		}
		else{
			posLeft = '-100%';
			var animClass = 'swipeRightToLeft';
		}
//		$parentLi.find('.feed-content').addClass(animClass);
		
		var eventId = $parentLi.data('id');
		//console.log('eventId: ' + eventId);
		onlineForLife.Feed.trackUser('prayer', {eventId:eventId});		
		$parentLi.find('.feed-content').animate({left:posLeft},200,function(){
			setTimeout(function(){
				$parentLi.addClass('hideFeedItem');
				setTimeout(function() {
					$parentLi.remove();
					$('ul.feed li:first').addClass('first');
				},700);
			}, 500);
		});
		
		onlineForLife.Feed.userPrayersDaily = onlineForLife.Feed.userPrayersDaily + 1;
		setTimeout(function() {
			$('#test-subtext span').text(onlineForLife.Feed.userPrayersDaily);
		},700);
		
		onlineForLife.Feed.updateUserPrayerCount();
		var state = $this.data('state');
		//console.log(state);
		onlineForLife.USMap.toggleState('TX');
	},
	
	updateUserPrayerCount: function(){
		var showFooterOnCount = onlineForLife.Feed.showFooterOnCount;
		var currentCount = onlineForLife.Feed.userPrayersDaily;
		$('.prayer-count').text(currentCount);
		if(currentCount==showFooterOnCount){
			$('.footer-primary').animate({height: "232px"}, 500)
		}
	},
	
	animatePraySwipe: function(){
		if(onlineForLife.Feed.showTutorial){
			var $listItem = $('ul.feed li.feed-item:eq(0)');
			var $listItemContent = $listItem.find('.feed-content');
			
			if(onlineForLife.Feed.tutorial<onlineForLife.Feed.tutorialMax){
	
				$listItem.addClass('show-tutorial');
				$listItemContent.animate({'left':'-140px'}, 300, function(){
					$listItemContent.animate({'left':'-110px'}, 200, function(){
						$listItemContent.animate({'left':'-120px'}, 100, function(){
						});
					});
				});
				
				setTimeout(function() {
					$listItemContent.animate({'left':'0'}, 300, function(){
						setTimeout(function() {
							onlineForLife.Feed.animatePraySwipe();
						}, 3000);
					});
				}, 2500);
				onlineForLife.Feed.tutorial=onlineForLife.Feed.tutorial+1;
			}
			else{
				$listItem.removeClass('show-tutorial');
			}
		}
		
		
		
	},
	
	
	handleRefreshMain: function($this){
		//console.log('handleRefreshMain');
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
		//console.log('outOfFeedItemsMain: ' + onlineForLife.Feed.fetchCurrent);
		$( "body" ).addClass('feed-loaded');
		$( ".main-refresh .fa-refresh" ).remove();
		var $noMoreText = $('p.no-more-items');
		$noMoreText.show();
		
	},

	setupScrolling:function(){
		
		var eventsElement = $('ul.feed');
		$(window).bind('scrollstart', function () {        
			//$('.content-main.ui-content').css('background', 'green');
			var feedLoading = $('body').hasClass('feed-loading') || $('body').hasClass('feed-loaded');
			if(!feedLoading){
				if (onlineForLife.Feed.isAtBottom()){
					//console.log("at bottom");
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
		//console.log('handleSwipe', $this.attr('class'));
		var $prayerText = $this.find('.action-text em');
		//$prayerText.text('Thank you for your prayer!');
		
	}
	


};
$(function() {
	onlineForLife.USMap.init();
	onlineForLife.Feed.init();
});


