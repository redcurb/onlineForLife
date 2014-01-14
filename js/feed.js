var onlineForLife = window.onlineForLife || {}; onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Feed = {
	version: 1,
	
	userData: {
		id:null
	},
	
	userPrayersDaily: 0,
	
	showFooterOnCount: 3,
	
	addFirebaseChild: true,
	
	showNudgeTutorial:true,
	
	nudgeTutorialCount:0,
	
	nudgeTutorialMax:3,
	
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
	
	deviceStatus:{
	},
	
	init: function(){
		onlineForLife.Feed.setupPlatform();
		onlineForLife.Feed.updateUserPrayerCount();
		onlineForLife.Feed.checkLoginStatus();
		onlineForLife.Feed.setVersion();
		onlineForLife.Feed.setupHandlers();
		onlineForLife.Feed.updateUserPrayerCount();
		onlineForLife.Feed.getLinks();
	},
	
	getLinks: function(){
		var dbUrl = 'https://ofl.firebaseio.com/links';
		var linksData = new Firebase(dbUrl);
		onlineForLife.Data = {};
		linksData.once('value', function(linksText) {
			var linksTextData = linksText.val();
			onlineForLife.Data.Links = linksTextData;
		});
	},
	
	setupPlatform: function(){
		console.log('setupPlatform');
		onlineForLife.Feed.setOrientation();
	},
	
	setOrientation: function(){
		var orientation = Redcurb.Helpers.getOrientation();
		var orientationClass = 'orientation-' + orientation;
		onlineForLife.Feed.deviceStatus.orientation = orientation;
		console.log('orientationClass: ' + orientationClass);
		$('body').removeClass('orientation-portrait').removeClass('orientation-landscape').addClass(orientationClass);
		onlineForLife.Feed.setDevice();
	},
	
	setDevice: function(){
		console.log('setDevice');
		var device = {"platform" : "iOS","available" : true,"model" : "iPhone5,1","cordova" : "3.0.0","version" : "7.0.3","uuid" : "3B96DA31-CD1B-45C9-8A1B-D9E72192B1FC"};
		if(typeof(device)!='undefined'){
			//$('.refresh-subtext').text($('.refresh-subtext').text() + ': ' + device.model);
			var modelName = Redcurb.Helpers.getDeviceInfo(device, 'MODEL_NAME');
			var modelFamilyName = Redcurb.Helpers.getDeviceInfo(device, 'MODEL_FAMILY_NAME');
			var platformName = Redcurb.Helpers.getDeviceInfo(device, 'PLATFORM_NAME');
			var versionText = Redcurb.Helpers.getDeviceInfo(device, 'OS_VERSION');
			console.log('modelName: ' + modelName);
			console.log('modelFamilyName: ' + modelFamilyName);
			console.log('platformName: ' + platformName);
			console.log('versionText: ' + versionText);
			onlineForLife.Feed.deviceStatus.model = modelName;
			onlineForLife.Feed.deviceStatus.modelFamily = modelFamilyName;
			onlineForLife.Feed.deviceStatus.platform = platformName;
			onlineForLife.Feed.deviceStatus.version = versionText;
			

			var platformClass = 'platform-' + platformName;
			var modelClass = 'model-' + modelName;
			var modelFamilyClass = 'model-family-' + modelFamilyName;
			var versionClass = 'os-version-' + versionText;
			console.log('platformClass: ' + platformClass);
			console.log('modelClass: ' + modelClass);
			console.log('modelFamilyClass: ' + modelFamilyClass);
			console.log('versionClass: ' + versionClass);
			$('body').addClass(platformClass).addClass(modelFamilyClass).addClass(modelClass).addClass(versionClass);
		}
	},
	
	handleOrientationChange:function(){
		if(onlineForLife.Feed.deviceStatus.model=='ipad'){
			if(onlineForLife.Feed.deviceStatus.orientation=='landscape'){
				onlineForLife.Feed.setupTabletLayout();
			}
			else{
				onlineForLife.Feed.undoTabletLayout();
			}
		}
		else{
			onlineForLife.Feed.rebuildFeed();
		}
	},
	
	rebuildFeed: function(){
		var spinnerHtml = '<li class="default-content spinner"><i class="fa fa-refresh fa-spin"></i></li>';
		$('ul.feed').addClass('status-loading').empty().append(spinnerHtml);
		setTimeout(function(){
				onlineForLife.Feed.setupFirebaseFeedItem();
		}, 200);
	},

	setupTabletLayout: function(){
		$('body').addClass('orientation-landscape platform-tablet');
		var windowWidth = $(window).width();
		var leftPanelWidth = $('.mypanel-left.ui-panel').width();
		var rightPanelWidth = $('.mypanel-right.ui-panel').width();
		var panelWidth =  leftPanelWidth + rightPanelWidth;
		var rightScrollWidth = 15;
		var contentWidth = windowWidth - panelWidth - rightScrollWidth;
		console.log('windowWidth: ' + windowWidth);
		console.log('leftPanelWidth: ' + leftPanelWidth);
		console.log('rightPanelWidth: ' + rightPanelWidth);
		console.log('panelWidth: ' + panelWidth);
		console.log('contentWidth: ' + contentWidth);
		console.log('header-primary' + $('.ui-header.header-primary').width());
		console.log('.content-main.ui-content' + $('.content-main.ui-content').width());
		
		$('.ui-header.header-primary, .content-main.ui-content').css('width',contentWidth);
		
		onlineForLife.Panels.setupIpad();
		onlineForLife.Feed.rebuildFeed();
		
	},
	
	undoTabletLayout: function(){
		
	},
	
	checkLoginStatus: function(){
		console.log('checkLoginStatus');
		
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				//console.log('error');
				console.log(error);
				return;
			}
			if (user) {
				//console.log('log');
				// User is already logged in.
				//console.log(user);
				//console.log(user.id);
				onlineForLife.Feed.setUserData(user);
				onlineForLife.Feed.setupFirebase();
			} else {
				// User is logged out.
				//console.log('no user');
				document.location = 'home.html';
			}
		});
	},

	setUserData:function(user){
		console.log(user);
		var userId = user.id;
		onlineForLife.Feed.userData.id = userId;
		
		var usersRef = new Firebase('https://ofl.firebaseio.com/users/' + userId);
		usersRef.once('value', function(snapshot) {
			var userName = snapshot.name()
			var userData = snapshot.val();
			onlineForLife.Feed.userData.userInfo = userData.userInfo;
		});
	},

	onFeedLoaded:function(){
		console.log('onFeedLoaded');
		onlineForLife.Footer.init();
		onlineForLife.Settings.init();
	},

	trackUser:function(event, data, stateCode){
		if(event=='feed-loaded'){
			
		}
		if(event=='prayer'){
			onlineForLife.Feed.trackPrayer(data, stateCode);
		}
	},

	trackPrayer:function(data, stateCode){
		var eventId = data.eventId;
		console.log('trackPrayer: ' + stateCode + ' - ' + eventId);
		console.log(data);
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
		
		var prayersUrl = 'https://ofl.firebaseio.com/prayers/' + eventId;
		var prayersData = new Firebase(prayersUrl);
		prayersData.push({ userId: onlineForLife.Feed.userData.id });
		
	},

	setupFirebase:function(){
		console.log('setupFirebase');
		onlineForLife.Feed.getPastPrayers();
		onlineForLife.Feed.setupFirebasePrayers();
		/*setTimeout(function() {
			console.log('addFirebaseChild TRUE');
			onlineForLife.Feed.addFirebaseChild = true;
		},5000);
		*/
	},
	
	getPastPrayers:function(){
		var dbUrl = 'https://ofl.firebaseio.com/users/' + onlineForLife.Feed.userData.id + '/prayers';
		var myDataRef = new Firebase(dbUrl);
		
		myDataRef.once('value', function(snapshot) {
			var prayerId = snapshot.val();
			if(prayerId!="{}" && prayerId!=null){
				$.each(prayerId,function(i,v){
					onlineForLife.Feed.itemsPrayedFor.push(v.toString());
				});
			}
			onlineForLife.Feed.setupFirebaseFeedItem();
		});
	},
	
	toggleFeedMessage:function(type){
		//console.log('toggleFeedMessage');
		var $feed = $('ul.feed');
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
		$feed.removeClass('status-loading').addClass('status-complete');
		
	},
	
	statesData:{
		"AL":"Alabama",
		"AK":"Alaska",
		"AZ":"Arizona",
		"AR":"Arkansas",
		"CA":"California",
		"CO":"Colorado",
		"CT":"Connecticut",
		"DE":"Delaware",
		"FL":"Florida",
		"GA":"Georgia",
		"HI":"Hawaii",
		"ID":"Idaho",
		"IL":"Illinois",
		"IN":"Indiana",
		"IA":"Iowa",
		"KS":"Kansas",
		"KY":"Kentucky",
		"LA":"Louisiana",
		"ME":"Maine",
		"MD":"Maryland",
		"MA":"Massachusetts",
		"MI":"Michigan",
		"MN":"Minnesota",
		"MS":"Mississippi",
		"MO":"Missouri",
		"MT":"Montana",
		"NE":"Nebraska",
		"NV":"Nevada",
		"NH":"New Hampshire",
		"NJ":"New Jersey",
		"NM":"New Mexico",
		"NY":"New York",
		"NC":"North Carolina",
		"ND":"North Dakota",
		"OH":"Ohio",
		"OK":"Oklahoma",
		"OR":"Oregon",
		"PA":"Pennsylvania",
		"RI":"Rhode Island",
		"SC":"South Carolina",
		"SD":"South Dakota",
		"TN":"Tennessee",
		"TX":"Texas",
		"UT":"Utah",
		"VT":"Vermont",
		"VA":"Virginia",
		"WA":"Washington",
		"WV":"West Virginia",
		"WI":"Wisconsin",
		"WY":"Wyoming"
	},
	
	getStateFriendlyName:function(stateCode){
		stateName = '';
		if(typeof(stateCode)!='undefined'){
			stateName = onlineForLife.Feed.statesData[stateCode]
		}
		return stateName;
	},
	
	getCurrentStepData:function(data){
		var stepNumber = "";
		if(typeof(data['OFL_Life_Decision_Number'])!='undefined'){
			stepNumber="4";
		}
		else if(data['Appt_Kept']=='Yes'){
			stepNumber="3";
		}
		else if(data['Appt_Made']=='Referred'){
			stepNumber="";
		}
		else if(data['Appt_Made']=='Yes'){
			stepNumber="2";
		}
		else{
			stepNumber="1";
		}
		return stepNumber;
	},
	
	createFeedDataObject:function(data){
		var oData = {};
		
		var stateCode = data.State;
		var stateName = onlineForLife.Feed.getStateFriendlyName(data.State);
		var cityName = data.City;
		var stepNumber = onlineForLife.Feed.getCurrentStepData(data);
		var listClass = 'first';

		oData.id = data.Id[0];
		oData.state = stateCode;
		oData.stateName = stateName;
		oData.city = cityName;
		oData.step = stepNumber;
		oData.liClass = listClass;
		
		return oData;
	},
	
	setupFirebaseFeedItem:function(){
		//console.log('setupFirebaseFeedItem');
		var dbUrl = 'https://ofl.firebaseio.com/feed';
		var dbUrl = 'https://ofl.firebaseio.com/feedData';
		var myDataRef = new Firebase(dbUrl);
		myDataRef.once('value', function(snapshot) {
			var feedData = snapshot.val();
			var feedName = snapshot.name();
			//console.log('feedName: ' + feedName);
			if(feedData === null) {
				onlineForLife.Feed.toggleFeedMessage('NO_ITEMS');
			}
			else{
				var html = '';
				var itemCount = 0;
				var itemBuildCount = 0;
				$.each(feedData,function(i,feedItem){
					//console.log(i);
					//console.log(feedItem.Id);
					itemCount += 1;
					var messageId = feedItem.Id.toString();
					var buildItem = false;
					if(onlineForLife.Feed.itemsPrayedFor.indexOf(messageId)<0){
						buildItem = true;
					}
					var itemData = onlineForLife.Feed.createFeedDataObject(feedItem);
					
					var id = itemData.id;
					var state = itemData.state;
					var city = itemData.city;
					var step = itemData.step;
					var stateName = itemData.stateName;
					var liClass = itemData.liClass;

					if(step==""){
						buildItem = false;
					}
					else if(step=="4"){
						buildItem = false;
						onlineForLife.Panels.step4Items[id] = feedItem;
					}
					if(buildItem){
						itemBuildCount += 1;
						var newHtml = onlineForLife.Feed.buildFeedItem(id, city, state, step, stateName, liClass);
						$('ul.feed').prepend(newHtml);
						
						onlineForLife.Feed.centerFeedItemText('firebase', $('ul.feed li:first'));
						onlineForLife.Feed.setupDraggableEach($('ul.feed li:first'));
					}
				});
				onlineForLife.Feed.toggleFeedMessage('LOADED');
				console.log('itemCount',itemCount);
				console.log('itemBuildCount',itemBuildCount);
				
			}
			if(itemBuildCount<onlineForLife.Feed.showFooterOnCount){
				onlineForLife.Feed.showFooterOnCount=itemBuildCount;
			}
			if(itemBuildCount==0){
				onlineForLife.Feed.toggleFeedMessage('PRAYED_ALL');
			}
			setTimeout(function() {
				onlineForLife.Feed.animatePraySwipe();
			},5000);

		});
		onlineForLife.Feed.onFeedLoaded();
	},
	
	setupFirebasePrayers:function(){
		var dbUrl = 'https://ofl.firebaseio.com/prayers';
		var myDataRef = new Firebase(dbUrl);		
		myDataRef.on('child_added', function(snapshot) {
			var message = snapshot.val();
			var itemName = snapshot.name();
			window.test = {};
			window.test.message = snapshot.val();
			window.test.name = snapshot.name();
			var stateCode = onlineForLife.Feed.userData.userInfo.state || '';
			if(onlineForLife.Feed.addFirebaseChild && stateCode !=''){
				onlineForLife.USMap.toggleState(stateCode);
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
		version = parseInt(version);
		onlineForLife.Feed.version = version;
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
	
	buildFeedItem: function(itemId, city, stateCode, step, stateName, liClass){
		var source   = $("#template-feed-item").html();
		var template = Handlebars.compile(source);
		var BgVersion = onlineForLife.Feed.setBgVersion;
		var context = {itemId: itemId, city: city, stateCode: stateCode, step: step, stateName: stateName, liClass: liClass, BgVersion: BgVersion}
		var html = template(context);
		return html;
	},
	
	setupHandlers: function(){
		$( "1.feed-share" ).on( "click", function(){
			alert($(window).width() + ' x ' + $(window).height());
		});
		
	},

	setupDraggableEach: function($li){
		var $this = $li;
		var id = $this.find('.feed-content').attr('id');
		var elementId = '#'+id;
		var $content = $(elementId).get(0);
		new Swipe($content,{
			startSlide:1,
			speed: 400, // Speed of prev and next transitions in milliseconds. (default:300)
			callback: function(event, index, elem) {
				var $this = $(elem);
				var $div = $this.parents('div.feed-content');
				var direction = $this.data('direction');
				if(direction!='none'){
					onlineForLife.Feed.handleSwipe($div,direction);
				}
			}
		});
	},

	handleSwipe: function($this, swipeDir){
		onlineForLife.Feed.showNudgeTutorial=false;
		var $parentLi = $this.parents('li');
		if(swipeDir=='right'){
			posLeft = '100%';
			var animClass = 'swipeLeftToRight';
		}
		else{
			posLeft = '-100%';
			var animClass = 'swipeRightToLeft';
		}
		var stateCode = $parentLi.find('.feed-content').data('state');
		console.log('stateCode: ' + stateCode);
		var eventId = $parentLi.data('id');
		onlineForLife.Feed.trackUser('prayer', {eventId:eventId}, stateCode);
		onlineForLife.Feed.itemsPrayedFor.push(eventId.toString());
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
		//onlineForLife.USMap.toggleState('TX');
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
		if(onlineForLife.Feed.showNudgeTutorial){
			var $listItem = $('ul.feed li.feed-item:eq(0)');
			var $listItemContent = $listItem.find('.feed-content');
			if(onlineForLife.Feed.nudgeTutorialCount<onlineForLife.Feed.nudgeTutorialMax){
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
				onlineForLife.Feed.nudgeTutorialCount=onlineForLife.Feed.nudgeTutorialCount+1;
			}
			else{
				$listItem.removeClass('show-tutorial');
			}
		}
	},
	
	handleRefreshMain: function($this){
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
		$( "body" ).addClass('feed-loaded');
		$( ".main-refresh .fa-refresh" ).remove();
		var $noMoreText = $('p.no-more-items');
		$noMoreText.show();
	}
};
$(function() {
	onlineForLife.USMap.init();
	onlineForLife.Feed.init();
});


