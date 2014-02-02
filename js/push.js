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
	},

	setupPush: function(){
		console.log('setupPush');
		if(AppData.UserId==1){
			if(!window.plugins) {
				window.plugins = {};
			}
			if (!window.plugins.pushNotification) {
				window.plugins.pushNotification = new PushNotification();
			}
			onlineForLife.Push.requestPush();
		}
	},
	
	addPushDom: function(){
		$('#feed').prepend('<div id="debug"></div>');
	},

	
	requestPush: function(){
		var server = AppData.config.push.server;
		onlineForLife.Push.addPushDom();
		var $debug = $('#debug');
		console.log('$debug ' + $debug.length);
		console.log('requestPush: ' + server);

		var sendTokenToServer = function sendTokenToServer(token) {
			$.ajax(server + "/registerDevice", {
				type: "post",
				dataType: 'json',
				data: JSON.stringify({ //JSON object with token and the device platform
					token: token,
					platform: 'IOS',
					project_id: 'rc-ofl'
				}),
				success: function(response) {
					$debug.append('<li>Successfully registered device: ' + token + '</li>');
					$debug.append("###Successfully registered device.");
				}
			});
		}

		var addCallback = function addCallback(key, callback) {
			if (window.pushCallbacks === undefined) {
				window.pushCallbacks = {}
			}
			window.pushCallbacks[key] = callback;
		};
		var pushNotification = window.plugins.pushNotification;
		var apnSuccessfulRegistration = function(token) {
			var tokenVal = token.toString(16);
			$debug.append('<li>Success: ' + tokenVal + '</li>');
			sendTokenToServer(tokenVal);
			addCallback('onNotificationAPN', onNotificationAPN);
		}
		var apnFailedRegistration = function(error) {
			alert("Error: " + error.toString());
		}
	
		//the function is a callback when we receive notification from APN
		var onNotificationAPN = function(e) {
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
			if(typeof(device.platform)!='undefined'){
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

