onlineForLife.Push = {
	init: function(){
		//console.log('push init');
		onlineForLife.Push.getCurrentSettings();
	},

	getCurrentSettings: function(){
		//console.log('push getCurrent');
		var pushData = AppData.User.config.push;
		//console.log(pushData);
	},

	updatePushSettingsToFirebase: function(){
		//console.log('updatePushSettingsToFirebase');
		var data = AppData.User.config.push.settingsData;
		//console.log(data);
		var pushDataUrl = 'https://ofl.firebaseio.com/users/' + AppData.User.id + '/config/push';
		var pushDataRef = new Firebase(pushDataUrl);
		var settingsData = AppData.User.config.push.settingsData;
		pushDataRef.child('dailySummary').set(settingsData.dailySummary);
		pushDataRef.child('everyLifeChoice').set(settingsData.everyLifeChoice);
		pushDataRef.child('specialUpdates').set(settingsData.specialUpdates);
		pushDataRef.child('none').set(settingsData.none);
		
		onlineForLife.Push.requestPush('update');
	},

	setupPush: function(){
		console.log('setupPush');
		var isDevUser = onlineForLife.App.isDevUser(AppData.config.push.testUsers);
		if(AppData.config.push.enabled || isDevUser){
			console.log('setupPush ENABLED');
			if(!window.plugins) {
				window.plugins = {};
			}
			if (!window.plugins.pushNotification) {
				window.plugins.pushNotification = new PushNotification();
			}
			onlineForLife.Push.requestPush('init');
		}
	},
	
	addPushDom: function(){
		$('#feed').prepend('<div id="debug"></div>');
	},

	
	requestPush: function(type){
		var server = AppData.config.push.server;
		onlineForLife.Push.addPushDom();
		var $debug = $('#debug');
		console.log('$debug length: ' + $debug.length);
		console.log('requestPush: ' + server);
		
		var settings = {dailySummary:true,every:false,special:true};
		if(AppData.User.config.push.dailySummary!=""){
			settings.dailySummary = AppData.User.config.push.dailySummary;
		}
		if(AppData.User.config.push.everyLifeChoice!=""){
			settings.every = AppData.User.config.push.everyLifeChoice;
		}
		if(AppData.User.config.push.specialUpdates!=""){
			settings.special = AppData.User.config.push.specialUpdates;
		}
		
		if(type=='update'){
			settings.dailySummary = AppData.User.config.push.dailySummary;
			settings.every = AppData.User.config.push.everyLifeChoice;
			settings.special = AppData.User.config.push.specialUpdates;
		}
		
		
		var sendTokenToServer = function sendTokenToServer(token) {
			$debug.append("###sendTokenToServer");
			$.ajax(server + "/registerDevice", {
				type: "post",
				dataType: 'json',
				data: JSON.stringify({ //JSON object with token and the device platform
					token: token,
					platform: 'IOS',
					project_id: 'rc-ofl',
					user_id:AppData.UserId,
					settings:settings
				}),
				success: function(response) {
					$debug.append('<li>Successfully registered device: ' + token + '</li>');
					$debug.append("###Successfully registered device.");
				}
			});
		}
		
		var addCallback = function addCallback(key, callback) {
			$debug.append("###addCallback");
			if (window.pushCallbacks === undefined) {
				window.pushCallbacks = {}
			}
			window.pushCallbacks[key] = callback;
		};
		var pushNotification = window.plugins.pushNotification;
		var apnSuccessfulRegistration = function(token) {
			$debug.append("###apnSuccessfulRegistration");
			var tokenVal = token.toString(16);
			$debug.append('<li>Success: ' + tokenVal + '</li>');
			sendTokenToServer(tokenVal);
			addCallback('onNotificationAPN', onNotificationAPN);
		}
		var apnFailedRegistration = function(error) {
			$debug.append("###apnFailedRegistration");
			alert("Error: " + error.toString());
		}
	
		//the function is a callback when we receive notification from APN
		var onNotificationAPN = function(e) {
			$debug.append("###onNotificationAPN");
			if( navigator.notification ){
				console.log(e);
				$debug.append('<li>Message Content</li>');
				$debug.append('<li>' + e + '</li>');
				navigator.notification.alert(e.body, null, 'Online4Life', 'Close');
			}
			else {
				alert( e.body );
			}
		};
		//alert(device.platform);
		//device = {platform:'iOS'};
		if(typeof(device)!='undefined'){
			$debug.append("###device exists");
			if(typeof(device.platform)!='undefined'){
				$debug.append("###device.platform exists");
				if (device.platform == 'android' || device.platform == 'Android') {
					
					$debug.append('<li>registering android</li>');
					pushNotification.register(successHandler, errorHandler, {
						"senderID":"661780372179",
						"ecb":"onNotificationGCM"
					});		// required!
				}
				else {
					$debug.append('<li>registering iOS</li>');
					pushNotification.register(apnSuccessfulRegistration, apnFailedRegistration,{
						"badge": "true",
						"sound": "true",
						"alert": "true",
						"ecb": "onNotificationAPN"
					});
				}
			}
		}
		else{
			$debug.append("###device DOES NOT exist");
		}
	}
	

};
$(function() {
});




var PushNotification = function() {};


	// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
	PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    	if (errorCallback == null) { errorCallback = function() {}}

		if (typeof errorCallback != "function")  {
			console.log("PushNotification.register failure: failure parameter not a function");
			return;
		}

		if (typeof successCallback != "function") {
			console.log("PushNotification.register failure: success callback parameter must be a function");
			return;
		}

		cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
	};

    // Call this to unregister for push notifications
    PushNotification.prototype.unregister = function(successCallback, errorCallback) {
		if (errorCallback == null) { errorCallback = function() {}}

		if (typeof errorCallback != "function")  {
			console.log("PushNotification.unregister failure: failure parameter not a function");
			return;
		}

		if (typeof successCallback != "function") {
			console.log("PushNotification.unregister failure: success callback parameter must be a function");
			return;
		}

		cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
    };
 
 
    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, badge) {
		if (errorCallback == null) { errorCallback = function() {}}

		if (typeof errorCallback != "function")  {
			console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
			return;
		}

		if (typeof successCallback != "function") {
			console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
			return;
		}

		cordova.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
    };

//-------------------------------------------------------------------

