var onlineForLife = window.onlineForLife || {};
onlineForLife.App = onlineForLife.App || {};
onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Panels = onlineForLife.Panels || {};
onlineForLife.Footer = onlineForLife.Footer || {};
onlineForLife.Events = onlineForLife.Events || {};
onlineForLife.USMap = onlineForLife.USMap || {};
onlineForLife.Tracking = onlineForLife.Tracking || {};
onlineForLife.Tutorial = onlineForLife.Tutorial || {};
onlineForLife.App = {
	init: function(){
		console.log('app init');
		onlineForLife.App.getConfigData();
	},	

	onFeedLoaded:function(){
		console.log('onFeedLoaded');
		onlineForLife.Tutorial.init();
		onlineForLife.Footer.init();
		onlineForLife.Panels.init();
		onlineForLife.Settings.init();
		setTimeout(function() {
			onlineForLife.Feed.animatePraySwipe();
		},AppData.config.feed.nudge.nudgeDelayToStart);
	},

	getConfigData: function(){
		console.log('app getConfigData');


		var dbUrl = 'https://ofl.firebaseio.com/app/config';
		var configData = new Firebase(dbUrl);
		
		configData.once('value', function(configValue) {
			onlineForLife.App.config = configValue.val();

			console.log(onlineForLife.App.config);
	
			onlineForLife.App.getAppData();
		});
	},	

	getAppData: function(){
		console.log('app getAppData');
		var dbUrl = 'https://ofl.firebaseio.com/app';
		var appData = new Firebase(dbUrl);
		
		appData.once('value', function(appValue) {
			onlineForLife.App.AppData = appValue.val();
			window.AppData = onlineForLife.App.AppData;
			console.log(onlineForLife.AppData);
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


