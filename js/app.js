var onlineForLife = window.onlineForLife || {};
onlineForLife.App = onlineForLife.App || {};
onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Panels = onlineForLife.Panels || {};
onlineForLife.Footer = onlineForLife.Footer || {};
onlineForLife.Events = onlineForLife.Events || {};
onlineForLife.USMap = onlineForLife.USMap || {};
onlineForLife.Tracking = onlineForLife.Tracking || {};
onlineForLife.Tutorial = onlineForLife.Tutorial || {};
onlineForLife.Push = onlineForLife.Push || {};
onlineForLife.App = {
	init: function(){
		//console.log('app init');
		onlineForLife.App.getConfigData();
		onlineForLife.App.runOverrides();
	},	

	runOverrides: function(){
		//console.log('app init');
		//onlineForLife.App.getConfigData();
		//$totalPrayers = $('.main-refresh .refresh-label');
		//$totalPrayers.text('Total Prayers').css('visibility','visible');
	},	
	
	
	
	onFeedLoaded:function(){
		//console.log('onFeedLoaded');
		Redcurb.Helpers.setupDev();
		AppData.FeedLoaded=true;
		onlineForLife.Tutorial.init();
		onlineForLife.Footer.init();
		onlineForLife.Panels.init();
		onlineForLife.Push.init();
		onlineForLife.Settings.init();
		setTimeout(function() {
			onlineForLife.Feed.animatePraySwipe();
		},AppData.config.feed.nudge.nudgeDelayToStart);
		onlineForLife.Feed.setupFeedItemLookup();
	},

	getConfigData: function(){
		//console.log('app getConfigData');


		var dbUrl = 'https://ofl.firebaseio.com/app/config';
		var configData = new Firebase(dbUrl);
		
		configData.once('value', function(configValue) {
			onlineForLife.App.config = configValue.val();

			//console.log(onlineForLife.App.config);
			onlineForLife.App.getAppData();
			
		});
	},	

	getUserData: function(){
		var userId = AppData.UserId;
		var dbUrl = 'https://ofl.firebaseio.com/users/' + userId;
		var userDataRef = new Firebase(dbUrl);
		
		userDataRef.once('value', function(userData) {
			//console.log('++++++++++++++++++++++++++++++++++++++userDataRef');
			userDataValue = userData.val();
			AppData.User = userDataValue;
			//console.log(userDataValue);
		});

	},	

	getAppData: function(){
		//console.log('app getAppData');
		var dbUrl = 'https://ofl.firebaseio.com/app';
		var appData = new Firebase(dbUrl);
		appData.once('value', function(appValue) {
			onlineForLife.App.AppData = appValue.val();
			window.AppData = onlineForLife.App.AppData;
			//console.log(onlineForLife.App.AppData);
			onlineForLife.App.appDataReady();
		});
	},	

	appDataReady: function(){
		onlineForLife.USMap.init();
		onlineForLife.Feed.init();
		
	}	
};
$(function() {
	onlineForLife.App.init();
});


