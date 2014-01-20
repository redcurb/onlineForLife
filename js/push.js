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
	}
	

};

