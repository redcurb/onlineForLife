onlineForLife.Feed = {
	init: function(){
		onlineForLife.Feed.setupPage();
	},
	
	resizeend: function(type,delay){
		var newTime = new Date().getTime();
		var rtime = onlineForLife.Feed.resize.rtime;
		var delta = onlineForLife.Feed.resize.delta;
		console.log('resizeend: ' + type);
		console.log('rtime: ' + rtime);
		console.log('newTime: ' + newTime);
		if ( ((newTime - rtime) < delta) && window.resize) {
			console.log('IF');
			setTimeout(function(){
				onlineForLife.Feed.resizeend(22,delay);
			}, delay);
		} else {
			console.log('ELSE');
			onlineForLife.Feed.timeout = false;
			console.log('RESIZE END');
		}               
		console.log("   ");
	},
	setupBodyPage: function(){
		$('body').removeClass('page-feed').removeClass('page-events').removeClass('page-settings');
		if($.mobile.activePage.is('#feed')){
			$('body').addClass('page-feed');
		}
		else if($.mobile.activePage.is('#events')){
			$('body').addClass('page-events');
		}
		else if($.mobile.activePage.is('#settings')){
			$('body').addClass('page-settings');
			onlineForLife.Settings.setSavedSettingsOnSettingsPage();
		}
	},
	
	setupPage: function(){
		onlineForLife.Feed.setupBodyPage();
		onlineForLife.Feed.checkPageParam();
		onlineForLife.Feed.setupWidescreenLayout('setup');
		$(document).on("pagechange", function(e, data) {
			onlineForLife.Feed.setupBodyPage();
		});
	},
	
	setupWidescreenLayout: function(type){
		var windowWidth = $(window).width();
		var panelWidthLeft = 408;
		var panelWidthRight = 552;
		var minContentWidth = 600;
		var totalNeeded = panelWidthLeft + panelWidthRight + minContentWidth;
		if(windowWidth>=totalNeeded){
			onlineForLife.Feed.setupTabletLayout();
		}
		else{
			onlineForLife.Feed.setupMapLayout($(window).width());
		}
		if(type=='resize'){
			if($('body').hasClass('platform-tablet')){
				if(windowWidth<totalNeeded){
					onlineForLife.Feed.undoTabletLayout();
				}
				else{
					onlineForLife.Feed.rebuildFeed();
				}
			}
			else{
				onlineForLife.Feed.rebuildFeed();
			}
		}
	},
	
	setupMapLayout: function(contentWidth){
		var $map = $('#map');
		var mapWidth = contentWidth;
		var mapMultiplier1 = 0.6774193548387097;
		var mapMultiplier2 = 1.476190476190476;
		var mapHeight = mapWidth*mapMultiplier1;
		var maxHeight = 500;
		if(mapHeight>maxHeight){
			mapHeight=maxHeight;
			mapWidth=mapHeight*mapMultiplier2;
		}
		$map.css('width',mapWidth+'px');
		$map.css('height',mapHeight+'px');
		onlineForLife.USMap.init();
	},
	
	checkPageParam: function(){
		var testVal = Redcurb.Helpers.getParameterByName('test');
		if(testVal=="true"){
			onlineForLife.Feed.testMode = true;
			$('body').addClass('test-mode-enabled');
		}
		var modelVal = Redcurb.Helpers.getParameterByName('model');
		if(modelVal!=""){
			modelVal = modelVal.toLowerCase();
			AppData.device = AppData.device || {friendly: {model:modelVal} };
		}
		
		onlineForLife.Feed.setupPlatform();
		onlineForLife.Feed.checkLoginStatus();
		onlineForLife.Feed.setupHandlers();
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
		onlineForLife.Feed.setOrientation();
	},
	
	setOrientation: function(){
		var orientation = Redcurb.Helpers.getOrientation();
		var orientationClass = 'orientation-' + orientation;
		onlineForLife.Feed.deviceStatus = {};
		onlineForLife.Feed.deviceStatus.orientation = orientation;
		$('body').removeClass('orientation-portrait').removeClass('orientation-landscape').addClass(orientationClass);
		onlineForLife.Feed.setDevice();
	},
	
	overrideiPad: function(orientation){
		window.orientation = 0;
		if(orientation=='land'){
			window.orientation = 90;
		}
	},
	
	setDevice: function(){
		if(onlineForLife.Feed.testMode){
			//var device = {"platform" : "iOS","available" : true,"model" : "iPhone5,1","cordova" : "3.0.0","version" : "7.0.3","uuid" : "3B96DA31-CD1B-45C9-8A1B-D9E72192B1FC"};
			//var device = {"platform" : "android","available" : true,"model" : "galaxy3,1","cordova" : "3.0.0","version" : "12.0.3","uuid" : "3B96DA31-CD1B-45C9-8A1B-D9E72192B1FC"};
		}
		var deviceDataInfo = '';
		AppData.device = {};
		if(typeof(device)!='undefined'){
			AppData.device = device;
		}
		var deviceData = Redcurb.Helpers.getDeviceInfoObject(deviceDataInfo);
		
		var modelName = deviceData.modelName;
		var modelFamilyName = deviceData.modelFamilyName;
		var platformName = deviceData.platformName;
		var versionText = deviceData.versionText;
		
		
		onlineForLife.Feed.deviceStatus.model = modelName;
		onlineForLife.Feed.deviceStatus.modelFamily = modelFamilyName;
		onlineForLife.Feed.deviceStatus.platform = platformName;
		onlineForLife.Feed.deviceStatus.version = versionText;
		AppData.device.friendly = onlineForLife.Feed.deviceStatus;
		var platformClass = 'platform-' + platformName;
		var modelClass = 'model-' + modelName;
		var modelFamilyClass = 'model-family-' + modelFamilyName;
		var versionClass = 'os-version-' + versionText;
		$('body').addClass(platformClass).addClass(modelFamilyClass).addClass(modelClass).addClass(versionClass);
	},	

	handleOrientationChange:function(){
		//alert('handleOrientationChange');
	},
	
	handleResize:function(type){
		onlineForLife.Feed.setupWidescreenLayout(type);
	},	
	
	rebuildFeed: function(){
		if(AppData.FeedLoaded){
			var spinnerHtml = '<li class="default-content spinner"><i class="fa fa-refresh fa-spin"></i></li>';
			$('ul.feed').addClass('status-loading').empty().append(spinnerHtml);
			setTimeout(function(){
				onlineForLife.Feed.buildNextList(onlineForLife.Feed.feedItemLists.currentListId);
			}, 200);
		}
	},

	setupTabletLayout: function(){
		console.log('}}}}}}}}}}}}}}}} setupTabletLayout');
		$('body').addClass('orientation-landscape platform-tablet');
		$('.section-total-saved .total-user-count').html('&nbsp;');
		var windowWidth = $(window).width();
		var leftPanelWidth = $('.mypanel-left.ui-panel').width();
		var rightPanelWidth = $('.mypanel-right.ui-panel').width();
		var panelWidth = leftPanelWidth + rightPanelWidth;
		var rightScrollWidth = 15;
		rightScrollWidth = 0;

		var contentPaddingLeft = $('.content-main.ui-content').css('paddingLeft');
		contentPaddingLeft = parseInt(contentPaddingLeft.replace('px',''));
		var contentPaddingRight = $('.content-main.ui-content').css('paddingRight');
		contentPaddingRight = parseInt(contentPaddingRight.replace('px',''));
		var contentPaddingWidth = contentPaddingLeft + contentPaddingRight;

		var contentWidth = windowWidth - panelWidth - rightScrollWidth - contentPaddingWidth;
		var headerWidth = contentWidth - rightScrollWidth;
		
		onlineForLife.Feed.setupMapLayout(contentWidth);
		
		//console.log('contentPaddingLeft: ' + contentPaddingLeft);
		//console.log('contentPaddingRight: ' + contentPaddingRight);
		//console.log('windowWidth: ' + windowWidth);
		//console.log('leftPanelWidth: ' + leftPanelWidth);
		//console.log('rightPanelWidth: ' + rightPanelWidth);
		//console.log('panelWidth: ' + panelWidth);
		//console.log('contentWidth: ' + contentWidth);
		//console.log('mapHeight: ' + mapHeight);
		//console.log('header-primary' + $('.ui-header.header-primary').width());
		//console.log('.content-main.ui-content' + $('.content-main.ui-content').width());
		
		$('.ui-header.header-primary,.header-primary').css('width',headerWidth).data('width',headerWidth);
		$('.content-main.ui-content,.content-main').css('width',contentWidth).data('width',contentWidth);
		onlineForLife.Feed.setupFeedItemWidth(contentWidth);
		onlineForLife.Panels.setupIpad();
		onlineForLife.Feed.rebuildFeed();
		
	},
	
	undoTabletLayout: function(){
		console.log('++++++++++++++++ undoTabletLayout');
		$('body').removeClass('orientation-landscape').removeClass('platform-tablet');
		$('.section-total-saved .total-user-count').html('&nbsp;');

		
		$('.ui-header.header-primary,.header-primary').css('width','inherit').data('width','inherit');
		$('.content-main.ui-content,.content-main').css('width','inherit').data('width','inherit');

		
		
		onlineForLife.Feed.rebuildFeed();
	},
	
	setupFeedItemWidth: function(contentWidth){
		var listPaddingWidth = (30);
		var listWidth = (contentWidth + listPaddingWidth);
		var listMarginLeft = -listPaddingWidth/2;
		
		//console.log('contentWidth: ' + contentWidth);
		//console.log('listPaddingWidth: ' + listPaddingWidth);
		//console.log('listWidth: ' + listWidth);
		//console.log('listMarginLeft: ' + listMarginLeft);
		cssData = {width:listWidth+'px',marginLeft:listMarginLeft+'px'};
		$('ul.feed').css(cssData);
	},
	
	checkLoginStatus: function(){
		//console.log('checkLoginStatus');
		
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				return;
			}
			if (user) {
				onlineForLife.Feed.setUserData(user);
				onlineForLife.Feed.setupFirebase();
			} else {
				onlineForLife.Feed.setUserData();
				onlineForLife.Feed.setupFirebase();
			}
		});
	},

	setUserData:function(user){
		var userId = Redcurb.Helpers.getParameterByName('userId');
		onlineForLife.Feed.userData = {id:userId};
		AppData.UserId = userId;
		onlineForLife.App.getUserData();
		var usersRef = new Firebase('https://ofl.firebaseio.com/users/' + userId);
		usersRef.once('value', function(snapshot) {
			var userName = snapshot.name()
			var userData = snapshot.val();
			onlineForLife.Feed.userData.userInfo = userData.userInfo;
		});
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
		var trackingData =  new Firebase('https://ofl.firebaseio.com/tracking');
		var prayerTrackingData = new Firebase('https://ofl.firebaseio.com/tracking/events/prayers');
		var timeStamp = new Date().getTime();
		var trackingId = prayerTrackingData.push({itemId: eventId, timestamp: timeStamp, userId: onlineForLife.Feed.userData.id}).name();
		//console.log('trackingId: ' + trackingId);
		
		var feedItemTrackingData = new Firebase('https://ofl.firebaseio.com/tracking/events/feedItems/' + eventId);
		feedItemTrackingData.push({trackingId:trackingId, timestamp: timeStamp, userId: onlineForLife.Feed.userData.id});
		
		var userPrayerUrl = 'https://ofl.firebaseio.com/users/'+ onlineForLife.Feed.userData.id + '/prayers';
		var userPrayerData = new Firebase(userPrayerUrl);
		userPrayerData.push(eventId);
		
		var stepIdVal = 'step' + data.step;
		var stepRef = userPrayerData.child(stepIdVal);
		var allStepsRef = userPrayerData.child('allSteps');
		
		
		var currentUserPrayerCount = 0;
		stepRef.once('value', function(stepData) {
			stepDataVal = stepData.val();
			var newUserPrayerCount = 1;
			if(stepDataVal !== null) {
				//console.log('NO data object');
				newUserPrayerCount = stepDataVal.userPrayerCount + 1;
			}
			stepRef.child('events').push(eventId);
			stepRef.child('userPrayerCount').set(newUserPrayerCount);
		});
		
		var currentUserPrayerCountTotal = 0;
		allStepsRef.once('value', function(allStepsData) {
			allStepsDataVal = allStepsData.val();

			var newUserPrayerCountTotal = 1;
			if(allStepsDataVal !== null) {
				newUserPrayerCountTotal = allStepsDataVal.userPrayerCount+1;
			}
			allStepsRef.child('userPrayerCount').set(newUserPrayerCountTotal);
		});
		
		var prayersUrl = 'https://ofl.firebaseio.com/prayers/' + eventId;
		var prayersData = new Firebase(prayersUrl);
		prayersData.push({ userId: onlineForLife.Feed.userData.id,userState:onlineForLife.Feed.userData.userInfo.state });

		var mostRecentPrayerUrl = 'https://ofl.firebaseio.com/prayers/mostRecentPrayer';
		var mostRecentPrayerData = new Firebase(mostRecentPrayerUrl);
		var mostRecentPrayerDataObject = { id: eventId, userId: onlineForLife.Feed.userData.id,userState:onlineForLife.Feed.userData.userInfo.state };
		mostRecentPrayerData.set(mostRecentPrayerDataObject);
		
		
		
		var prayerTotalUrl = 'https://ofl.firebaseio.com/app/text/dailyPrayerTotal/total';
		var prayerTotalData = new Firebase(prayerTotalUrl);
		
		prayerTotalData.once('value', function(prayerTotalValue) {
			var newValue = prayerTotalValue.val() + 1;
			prayerTotalData.set(newValue);
		});
		
	},

	setupFirebase:function(){
		//console.log('setupFirebase');
		onlineForLife.Feed.getPastPrayers();
		onlineForLife.Feed.setupFirebasePrayers();
	},
	
	getPastPrayers:function(){
		var dbUrl = 'https://ofl.firebaseio.com/users/' + onlineForLife.Feed.userData.id + '/prayers';
		var myDataRef = new Firebase(dbUrl);
		
		onlineForLife.Feed.itemsPrayedFor = [];
		myDataRef.once('value', function(snapshot) {
			var prayerId = snapshot.val();
			if(prayerId!="{}" && prayerId!=null){
				$.each(prayerId,function(i,v){
					onlineForLife.Feed.itemsPrayedFor.push(v.toString());
				});
			}
			onlineForLife.Feed.getFirebaseFeedData();
		});
	},
	
	toggleFeedMessage:function(type){
		var $feed = $('ul.feed');
		var $spinner = $feed.find('li.spinner');
		var $noRecords = $feed.find('li.no-records');
		var $prayedAll = $feed.find('li.prayed-all');
		
		if(type=='LOADED'){
			$spinner.fadeOut(200);
		}
		if(type=='LOADING'){
			$spinner.fadeIn(200);
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
		var stateCode = "";
		var stateName = "";
		var cityName = "";
		if(typeof(data.State)!='undefined'){
			stateCode = data.State.toString();
			stateName = onlineForLife.Feed.getStateFriendlyName(data.State);
		}
		if(typeof(data.City)!='undefined'){
			cityName = data.City.toString();
		}
		
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
	
	feedItemsPerLoad:20,
	
	feedItemsRemainingFetchCount:5,
	
	getFirebaseFeedData:function(){
		//console.time('feed');
		//console.log('getFirebaseFeedData');
		var dbUrl = 'https://ofl.firebaseio.com/feedData';
		var myDataRef = new Firebase(dbUrl);
		myDataRefQuery = myDataRef;
		//myDataRefQuery = myDataRef.endAt().limit(100);
		myDataRefQuery.once('value', function(snapshot) {
			var feedData = snapshot.val();
			onlineForLife.Feed.feedData = feedData;
			onlineForLife.Feed.feedDataSteps = {};
			if(feedData === null) {
				onlineForLife.Feed.toggleFeedMessage('NO_ITEMS');
			}
			else{
				onlineForLife.Feed.setupFeedItemLists();
			}
			//console.timeEnd('feed');
		});
	},
	
	feedItemLists:{
		prayerSets:{
			prayers:{}
		},
		currentListItemCount:0,
		currentListId: 0,
		nextListId: 0,
		current:{
			lower:0,
			upper:0
		},
		counts:{
			all:0,
			prayed:0,
			toLoad:0
		},
		feedSets:{
			count:0,
			toLoad:{}
		},
		all:[],
		prayed:[],
		toLoad:[]
	},
	
	updatePrayerSet: function(tableKey){
		//console.log(tableKey);
		var city = tableKey.city;
		var id = tableKey.id;
		var stateCode = tableKey.statecode;
		var stateName = tableKey.statename;
		var step = tableKey.step;
		var tableKey = tableKey.tableKey;
		var prayerData = {
			city: city,	
			id: id,	
			stateCode: stateCode,	
			stateName: stateName,	
			step: step,	
			tableKey: tableKey
		}
		onlineForLife.Feed.feedItemLists.prayerSets.prayers[tableKey] = prayerData;
	},

	checkRemainingItems: function(){
		var currentListItemCount = onlineForLife.Feed.feedItemLists.currentListItemCount;
		var feedItemsRemainingFetchCount = onlineForLife.Feed.feedItemsRemainingFetchCount;
		console.log('++++++++++++++++++++ checkRemainingItems');
		console.log('currentListItemCount: ' + currentListItemCount);
		console.log('feedItemsRemainingFetchCount: ' + feedItemsRemainingFetchCount);
		
		if(currentListItemCount<=feedItemsRemainingFetchCount){
			onlineForLife.Feed.handleEmptyFeedList();
		}
	},
	
	handleEmptyFeedList:function(){
		var currentListId = onlineForLife.Feed.feedItemLists.currentListId;
		var feedSetCount = onlineForLife.Feed.feedItemLists.feedSets.count;
		if(currentListId<feedSetCount){
			onlineForLife.Feed.buildNextList();
		}
		else{
			onlineForLife.Feed.toggleFeedMessage('PRAYED_ALL');
		}
	},
	
	buildNextList:function(listOverrideId){
		onlineForLife.Feed.toggleFeedMessage('LOADING');
		var oFeed = onlineForLife.Feed;
		var listId = oFeed.feedItemLists.nextListId;
		var currentListId = oFeed.feedItemLists.currentListId;
		if(typeof(listOverrideId)!='undefined'){
			//listId = oFeed.feedItemLists.currentListId;
			listId = listOverrideId;
		}
		oFeed.feedItemLists.currentListId = listId;
		var feedSets = oFeed.feedItemLists.feedSets.toLoad;
		var setList = onlineForLife.Feed.feedItemLists.feedSets.toLoad[listId];
		var itemBuildCount = 0;
		onlineForLife.Feed.ListHtml = '';
		$.each(setList,function(i,key){
			var feedItemData = onlineForLife.Feed.feedData[key];
			var messageId = feedItemData.Id.toString();
			var itemData = onlineForLife.Feed.createFeedDataObject(feedItemData);
			var id = itemData.id;
			var state = itemData.state;
			var city = itemData.city;
			var step = itemData.step;
			var stateName = itemData.stateName;
			var liClass = itemData.liClass;
			buildItem = true;
			
			if(step=="" || state==""){
				buildItem = false;
			}
			if(step=="4"){
				buildItem = false;
				onlineForLife.Panels.step4Items[id] = feedItemData;
			}
			//console.log(key + ': ' + buildItem);
			if(buildItem){
				itemBuildCount += 1;
				var newHtml = onlineForLife.Feed.buildFeedItem(id, city, state, step, stateName, liClass, key);
				$('ul.feed').append(newHtml);
			}
		});
		$('ul.feed').append($('ul.feed .default-content').remove());
		onlineForLife.Feed.centerFeedItemText();
		onlineForLife.Feed.setupDraggable();
		
		onlineForLife.Feed.toggleFeedMessage('LOADED');
		onlineForLife.Feed.feedItemLists.currentListItemCount = $('ul.feed li.feed-item').length;
			
		//console.timeEnd('buildFeed');
		if(itemBuildCount<AppData.config.feed.footer.showFooterOnCount){
			AppData.config.feed.footer.showFooterOnCount=itemBuildCount;
		}
		oFeed.feedItemLists.nextListId += 1;


		if(itemBuildCount==0){
			if(currentListId!=oFeed.feedItemLists.nextListId){
				onlineForLife.Feed.buildNextList(oFeed.feedItemLists.nextListId);
			}
			else{
				onlineForLife.Feed.toggleFeedMessage('PRAYED_ALL');
			}
		}
		//console.log('DONE');
	},

	centerFeedItemText: function(index, $this){
		var $feed = $('ul.feed');
		var $items = $feed.find('li.feed-item');
		$items.each(function(){
			var $this = $(this);
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
			$this.removeClass('center-text-false');
		});
	},
	
	setupDraggable: function($li){
		var $feed = $('ul.feed');
		var $items = $feed.find('li.feed-item.drag-setup-false');
		$contentItems = $items.find('.feed-content');
		$items.each(function(){
			var $this = $(this);
			var $content = $this.find('.feed-content').get(0);
			//$this.removeClass('drag-setup-false').addClass('drag-setup-true');
			//$this.css('color','red');
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
			$this.removeClass('drag-setup-false');
		});
	},

	setupFeedDataSets:function(){
		var feedItemsPerLoad = onlineForLife.Feed.feedItemsPerLoad;
		var feedItemLists = onlineForLife.Feed.feedItemLists;
		var currentIndex = feedItemLists.current;
		currentIndex.upper = feedItemsPerLoad-1;
		var toLoadCount = feedItemLists.counts.toLoad;
		var setCount = Math.floor(toLoadCount/feedItemsPerLoad);
		setCountMod = toLoadCount%feedItemsPerLoad;
		
		var toLoadData = feedItemLists.toLoad;
		if(setCountMod>0){
			setCount += 1;
		}
		var toLoadIndex = 0;
		var feedSetCount = 1;
		var pageUpper = setCount;
		for(i=0;i<pageUpper;i++){
			feedItemLists.feedSets.toLoad[i] = [];
			for(l=0;l<feedItemsPerLoad;l++){
				var currentLoadIndex = toLoadIndex;
				if(currentLoadIndex<toLoadCount){
					var itemId = feedItemLists.toLoad[currentLoadIndex];
					feedItemLists.feedSets.toLoad[i].push(itemId);
					toLoadIndex += 1;
				}
			}
			feedSetCount += 1;
		}
		onlineForLife.Feed.feedItemLists.feedSets.count = feedSetCount;
		onlineForLife.Feed.buildNextList();
	},
	
	setupFeedItemLists:function(){
		var feedItemsPerLoad = onlineForLife.Feed.feedItemsPerLoad;
		var feedData = onlineForLife.Feed.feedData;
		var totalItemsCount = 0;
		var itemBuildCount = 0;
		var feedItemLists = onlineForLife.Feed.feedItemLists;
		$.each(feedData,function(key,feedItem){
			var messageId = feedItem.Id.toString();
			var buildItem = false;
			if(onlineForLife.Feed.itemsPrayedFor.indexOf(messageId)<0){
				buildItem = true;
			}
			feedItemLists.all.push(messageId);
			if(buildItem){
				feedItemLists.toLoad.push(key);
			}
			else{
				feedItemLists.prayed.push(messageId);
			}
		});
		feedItemLists.counts.all = feedItemLists.all.length;
		feedItemLists.counts.prayed = feedItemLists.prayed.length;
		feedItemLists.counts.toLoad = feedItemLists.toLoad.length;
		onlineForLife.Feed.setupFeedDataSets();
		onlineForLife.App.onFeedLoaded();
	},
	
	onFeedLoaded:function(){
		setTimeout(function() {
			onlineForLife.Feed.animatePraySwipe();
		},AppData.config.feed.nudge.nudgeDelayToStart);
	},

	setupFirebasePrayers:function(){
		var dbUrl = 'https://ofl.firebaseio.com/prayers/mostRecentPrayer';
		var myDataRef = new Firebase(dbUrl);
		myDataRef.on('value', function(snapshot) {
			if(snapshot.val()!=null){
				var key = snapshot.name();
				var prayerData = snapshot.val();
				var id = prayerData.id;
				var userId = prayerData.userId;
				var stateCode = prayerData.userState;
				if(typeof(stateCode)!='undefined' && stateCode !=''){
					onlineForLife.USMap.toggleState(stateCode);
				}
			}
		});
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

	setBgVersion: function(){
		var lower = 1;
		var upper = 5;
		var bgVersion = Math.floor(Math.random() * upper) + 1;
		currentFeedBgVersion = onlineForLife.Feed.currentFeedBgVersion || 1;
		if(bgVersion==currentFeedBgVersion){
			if(bgVersion==upper){
				bgVersion = lower;
			}
			else{
				bgVersion = bgVersion + 1;
			}
		}
		onlineForLife.Feed.currentFeedBgVersion = bgVersion;
		return bgVersion;
	},	
	
	buildFeedItem: function(itemId, city, stateCode, step, stateName, liClass, key){
		var templateHtml = 2;
		var source = $("#template-feed-item-ajax").html();
		var template = Handlebars.compile(source);
		var BgVersion = onlineForLife.Feed.setBgVersion;
		var context = {itemId: itemId, city: city, stateCode: stateCode, step: step, stateName: stateName, liClass: liClass, BgVersion: BgVersion, key: key}
		var html = template(context);
		return html;
	},
	
	setupHandlers: function(){
		onlineForLife.Feed.setupTotalPrayerCount('animate');
		$(window).resize(function() {
			onlineForLife.Feed.handleResize('resize');
		});
	},

	handleSwipe: function($this, swipeDir){
		console.log('SWIPED: '+swipeDir);
		AppData.config.feed.nudge.showNudge=false;
		var $parentLi = $this.parents('li');
		if(swipeDir=='right'){
			posLeft = '100%';
			var animClass = 'swipeLeftToRight';
		}
		else{
			posLeft = '-100%';
			var animClass = 'swipeRightToLeft';
		}
		var tableKey = $parentLi.data();
		var stateCode = $parentLi.find('.feed-content').data('state');
		var stepNumber = $parentLi.data('step');
		//console.log('stateCode: ' + stateCode);
		//console.log('tableKey: ' + tableKey);
		var eventId = $parentLi.data('id');
		var trackData = {};
		trackData.eventId = eventId;
		trackData.step = stepNumber;
		
		onlineForLife.Feed.trackUser('prayer', trackData, stateCode);
		onlineForLife.Feed.itemsPrayedFor.push(eventId.toString());
		$parentLi.find('.feed-content').animate({left:posLeft},200,function(){
			setTimeout(function(){
				$parentLi.addClass('hideFeedItem');
				setTimeout(function() {
					$parentLi.remove();

					onlineForLife.Feed.userPrayersDaily = onlineForLife.Feed.userPrayersDaily + 1 || 1;
					onlineForLife.Feed.updatePrayerSet(tableKey);
					onlineForLife.Feed.updateUserPrayerCount();


				},700);
			}, 500);
		});
		
	},

	setupAnimateDailyPrayerTotal: function(prayerTotal){
		var start = 0;
		var max = prayerTotal;
		var step = AppData.config.feed.dailyPrayers.step || 10;
		var $element = $('.main-refresh .refresh-count');
		onlineForLife.Feed.animateDailyPrayerTotal($element,start,max,step);
	},

	animateDailyPrayerTotal: function($element,current,max,step){
		onlineForLife.Feed.animateItem($element,current,max,step);
	},
	
	animateItem: function($element,current,max,step){
		var next = current + step;
		if(next>max){
			next=max;
		}
		$element.text(current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		if(current<max){
			setTimeout(function() {
				onlineForLife.Feed.animateItem($element,next,max,step);
			},0);
		}
		else{
			onlineForLife.Feed.setupTotalPrayerCount('update');
		}
	},
	
	updateUserPrayerCount: function(){
		console.log('KKKKKKKKKKKKKKKKKKKK updateUserPrayerCount');
		onlineForLife.Feed.feedItemLists.currentListItemCount = $('ul.feed li.feed-item').length;
		console.log('currentListItemCount');
		var currentCount = onlineForLife.Feed.userPrayersDaily;
		$('.prayer-count').text(currentCount);
		var footerHeight = 232;
		footerHeight = 182;
		if($(window).width()<631){
			footerHeight = 122;
		}
		footerHeight += 'px';
		if(currentCount>=AppData.config.feed.footer.showFooterOnCount){
			$('.footer-primary').animate({height: footerHeight}, 500)
		}
		onlineForLife.Feed.checkRemainingItems();
		console.log('KKKKKKKKKKKKKKKKKKKK');
	},
	
	animatePraySwipe: function(){
		var nudgeCount = AppData.config.feed.nudge.nudgeCount || 0;
		if(AppData.config.feed.nudge.showNudge){
			var $listItem = $('ul.feed li.feed-item:eq(0)');
			var $listItemContent = $listItem.find('.feed-content');
			if(nudgeCount<AppData.config.feed.nudge.showNudgeCount){
				nudgeCount++;
				$listItem.addClass('show-tutorial');
				var bump1 = '-14%';
				var bump2 = '-11%';
				var bump3 = '-12%';

				if(typeof(AppData.device.friendly)!='undefined'){
					if(AppData.device.friendly.model=='iphone'){
						bump1 = '-140px';
						bump2 = '-110px';
						bump3 = '-120px';
					}
				}
				bump1 = '-150px';
				bump2 = '-120px';
				bump3 = '-130px';
				if($(window).width()<=320){
					bump1 = '-50px';
					bump2 = '-30px';
					bump3 = '-40px';
				}
				else if($(window).width()<=480){
					bump1 = '-55px';
					bump2 = '-35px';
					bump3 = '-45px';
				}
				else if($(window).width()<=630){
					bump1 = '-65px';
					bump2 = '-45px';
					bump3 = '-55px';
				}
				$listItemContent.animate({'left':bump1}, 300, function(){
					$listItemContent.animate({'left':bump2}, 200, function(){
						$listItemContent.animate({'left':bump3}, 100, function(){
						});
					});
				});				
				setTimeout(function() {
					$listItemContent.animate({'left':'0'}, 300, function(){
						if(nudgeCount<AppData.config.feed.nudge.showNudgeCount){
							setTimeout(function() {
								onlineForLife.Feed.animatePraySwipe();
							}, AppData.config.feed.nudge.nudgeDelayBetween);
						}
						else{
							AppData.config.feed.nudge.showNudge=false;
							$listItem.removeClass('show-tutorial');
						}
					});
				}, AppData.config.feed.nudge.nudgeOpenDuration);
				AppData.config.feed.nudge.nudgeCount=nudgeCount;
			}
			else{
				AppData.config.feed.nudge.showNudge=false;
				$listItem.removeClass('show-tutorial');
			}
		}
	},
	
	setupTotalPrayerCount:function(type){
		var prayerTotalUrl = 'https://ofl.firebaseio.com/app/text/dailyPrayerTotal/total';
		var prayerTotalData = new Firebase(prayerTotalUrl);
		var $totalPrayerCount = $('.main-refresh .refresh-count');
		if(type=='animate' && AppData.config.feed.dailyPrayers.animateCount){
			prayerTotalData.once('value', function(configValue) {
				prayerTotal = configValue.val();
				onlineForLife.Feed.setupAnimateDailyPrayerTotal(prayerTotal);
			});
		}
		else{
			prayerTotalData.on('value', function(configValue) {
				prayerTotal = configValue.val().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
				$totalPrayerCount.text(prayerTotal);
			});
		}
	},
	
	outOfFeedItemsMain: function(){
		$( "body" ).addClass('feed-loaded');
		$( ".main-refresh .fa-refresh" ).remove();
		var $noMoreText = $('p.no-more-items');
		$noMoreText.show();
	},

	getCurrentPrayerEvents: function(){
		//console.log('------------------------- getCurrentPrayerEvents');
		var userPrayersUrl = 'https://ofl.firebaseio.com/users/' + AppData.UserId + '/prayers/';
		var userPrayersRef = new Firebase(userPrayersUrl);
		onlineForLife.Feed.feedDataLists.fbPastPrayers = {};
		var step1Ref = userPrayersRef.child('step1');
		var step2Ref = userPrayersRef.child('step2');
		var step3Ref = userPrayersRef.child('step3');
		var step4Ref = userPrayersRef.child('step4');
		step1Ref.once('value', function(step1DataSet) {
			var step1 = step1DataSet.val();
			var step1Data = onlineForLife.Feed.feedDataLists.fbPastPrayers.step1 = step1;
			if(step1Data==null){
				step1Data = {};
			}
			if(typeof(step1Data.progressCount)=='undefined'){
				step1Data.progressCount = 0;
			}
			step2Ref.once('value', function(step2DataSet) {
				var step2 = step2DataSet.val();
				//console.log(step2);
				var step2Data = onlineForLife.Feed.feedDataLists.fbPastPrayers.step2 = step2;
				if(step2Data==null){
					step2Data = {};
				}
				if(typeof(step2Data.progressCount)=='undefined'){
					step2Data.progressCount = 0;
				}
				step3Ref.once('value', function(step3DataSet) {
					var step3 = step3DataSet.val();
					//console.log(step3);
					var step3Data = onlineForLife.Feed.feedDataLists.fbPastPrayers.step3 = step3;
					if(step3Data==null){
						step3Data = {};
					}
					if(typeof(step3Data.progressCount)=='undefined'){
						step3Data.progressCount = 0;
					}
					step4Ref.once('value', function(step4DataSet) {
						var step4 = step4DataSet.val();
						//console.log(step4);
						var step4Data = onlineForLife.Feed.feedDataLists.fbPastPrayers.step4 = step4;
						if(step4Data==null){
							step4Data = {};
						}
						if(typeof(step4Data.progressCount)=='undefined'){
							step4Data.progressCount = 0;
						}
						//console.log('------------------------- getCurrentPrayerEvents END');
						onlineForLife.Feed.findProgress();
					});
				});
			});
		});
	},

	updateGrayText: function(){
		var $scheduledUser = $('.mypanel-right .section-your-impact .step-scheduled .user-count');
		var $visitedPrcUser = $('.mypanel-right .section-your-impact .step-visited-prc .user-count');
		var $chooseLifeUser = $('.mypanel-right .section-your-impact .step-chose-life .user-count');
		var scheduledProgressCount = onlineForLife.Feed.feedDataLists.progressItems.step2.progressCount;
		var visitedProgressCount = onlineForLife.Feed.feedDataLists.progressItems.step3.progressCount;
		var chooseLifeProgressCount = onlineForLife.Feed.feedDataLists.progressItems.step4.progressCount;
		if(scheduledProgressCount>0){
			$scheduledUser.html('+' + scheduledProgressCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		}
		else{
			$scheduledUser.html('&nbsp;');
		}
		if(visitedProgressCount>0){
			$visitedPrcUser.html('+' + visitedProgressCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		}
		else{
			$visitedPrcUser.html('&nbsp;');
		}
		if(chooseLifeProgressCount>0){
			$chooseLifeUser.html('+' + chooseLifeProgressCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		}
		else{
			$chooseLifeUser.html('&nbsp;');
		}
	},
	
	findProgress: function(){
		//console.log('------------------------- findProgress');
		var step1ProgressData = onlineForLife.Feed.feedDataLists.progressItems.step1;
		var step1PastPrayerData = onlineForLife.Feed.feedDataLists.fbPastPrayers.step1;
		if(onlineForLife.Feed.feedDataLists.fbPastPrayers.step1==null){
			onlineForLife.Feed.feedDataLists.fbPastPrayers.step1 = { events:{} };
		}
		var step1PastPrayerEventData = onlineForLife.Feed.feedDataLists.fbPastPrayers.step1.events;

		var step2ProgressData = onlineForLife.Feed.feedDataLists.progressItems.step2;
		var step2PastPrayerData = onlineForLife.Feed.feedDataLists.fbPastPrayers.step2;
		if(onlineForLife.Feed.feedDataLists.fbPastPrayers.step2==null){
			onlineForLife.Feed.feedDataLists.fbPastPrayers.step2 = { events:{} };
		}
		var step2PastPrayerEventData = onlineForLife.Feed.feedDataLists.fbPastPrayers.step2.events;
		onlineForLife.Feed.feedDataLists.progressItems.step2.progressCount = 0;
		
		var step3ProgressData = onlineForLife.Feed.feedDataLists.progressItems.step3;
		var step3PastPrayerData = onlineForLife.Feed.feedDataLists.fbPastPrayers.step3;
		if(onlineForLife.Feed.feedDataLists.fbPastPrayers.step3==null){
			onlineForLife.Feed.feedDataLists.fbPastPrayers.step3 = { events:{} };
		}
		var step3PastPrayerEventData = onlineForLife.Feed.feedDataLists.fbPastPrayers.step3.events;
		onlineForLife.Feed.feedDataLists.progressItems.step3.progressCount = 0;

		var step4ProgressData = onlineForLife.Feed.feedDataLists.progressItems.step4;
		var step4PastPrayerData = onlineForLife.Feed.feedDataLists.fbPastPrayers.step4;
		if(onlineForLife.Feed.feedDataLists.fbPastPrayers.step4==null){
			onlineForLife.Feed.feedDataLists.fbPastPrayers.step4 = { events:{} };
		}
		var step4PastPrayerEventData = onlineForLife.Feed.feedDataLists.fbPastPrayers.step4.events;
		onlineForLife.Feed.feedDataLists.progressItems.step4.progressCount = 0;
		
		//console.log('------------------------- findProgress step2ProgressData.byKeyId BEGIN');
		$.each(step2ProgressData.byKeyId,function(key,data){
			//console.log(key + ': ' + data);
			if(typeof(step1PastPrayerEventData[key])!='undefined'){
				//console.log('PPPPRRRRROOOOOGGGGRRRREEEESSSSSSSS STEP 2');
				onlineForLife.Feed.feedDataLists.progressItems.step2.progressCount = onlineForLife.Feed.feedDataLists.progressItems.step2.progressCount + 1;
			}
		});
		//console.log('------------------------- findProgress step2ProgressData.byKeyId END');
		
		//console.log('------------------------- findProgress step3ProgressData.byKeyId BEGIN');
		$.each(step3ProgressData.byKeyId,function(key,data){
			//console.log(key + ': ' + data);
			if(typeof(step2PastPrayerEventData[key])!='undefined'){
				//console.log('PPPPRRRRROOOOOGGGGRRRREEEESSSSSSSS STEP 3');
				onlineForLife.Feed.feedDataLists.progressItems.step3.progressCount = onlineForLife.Feed.feedDataLists.progressItems.step3.progressCount + 1;
			}
		});
		//console.log('------------------------- findProgress step3ProgressData.byKeyId END');
		
		//console.log('------------------------- findProgress step4ProgressData.byKeyId BEGIN');
		$.each(step4ProgressData.byKeyId,function(key,data){
			//console.log(key + ': ' + data);
			if(typeof(step3PastPrayerEventData[key])!='undefined'){
				//console.log('PPPPRRRRROOOOOGGGGRRRREEEESSSSSSSS STEP 4');
				onlineForLife.Feed.feedDataLists.progressItems.step4.progressCount = onlineForLife.Feed.feedDataLists.progressItems.step4.progressCount + 1;
			}
		});
		//console.log('------------------------- findProgress step4ProgressData.byKeyId END');
		//console.log('------------------------- findProgress END');
		onlineForLife.Feed.updateGrayText();
	},

	setProgressCountData: function(){
		
	},

	setupFeedItemMultiples: function(){
		//console.log('setupFeedItemMultiples');
		var progressItems = onlineForLife.Feed.feedDataLists.progressItems.all;
		var feedData = onlineForLife.Feed.feedData;
		$.each(progressItems,function(key,data){
			$.each(data,function(dataKey,dataData){
				var feedData = onlineForLife.Feed.feedData[dataData];
				var stepNumber = onlineForLife.Feed.getCurrentStepData(feedData);
				if(stepNumber!=''){
					var stepString = 'step' + stepNumber;
					onlineForLife.Feed.feedDataLists.progressItems[stepString]['byEventId'][key] = dataData;
					onlineForLife.Feed.feedDataLists.progressItems[stepString]['byKeyId'][dataData] = key;
				}
			});
		});
		onlineForLife.Feed.getCurrentPrayerEvents();
	},

	setupFeedItemLookup: function(){
		var feedData = onlineForLife.Feed.feedData;
		var feedDataLists = onlineForLife.Feed.feedDataLists = {};
		var itemLookup = feedDataLists.itemLookup = {};
		var progressItems = feedDataLists.progressItems = {all:{},step1:{ byKeyId:{},byEventId:{} },step2:{ byKeyId:{},byEventId:{} },step3:{ byKeyId:{},byEventId:{} },step4:{ byKeyId:{},byEventId:{} }};
		onlineForLife.Feed.feedData['-JCxdiONjhcec7uMxqxD'].Id = ['a0LF000000CwLjSMAV']
		$.each(feedData,function(key,data){
			var indexId = data.Id.toString();
			if(typeof(itemLookup[indexId])=='undefined'){
				itemLookup[indexId] = [key];
			}
			else{
				itemLookup[indexId].push(key);
				if(typeof(progressItems.all[indexId])=='undefined'){
					progressItems.all[indexId] = [key];
				}
				else{
					progressItems.all[indexId].push(key);
				}
			}
		});
		onlineForLife.Feed.setupFeedItemMultiples();
	}
};


