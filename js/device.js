var onlineForLife = window.onlineForLife || {}; onlineForLife.Feed = onlineForLife.Feed || {};
onlineForLife.Feed = {
	init: function(){
		onlineForLife.Feed.writeDeviceInfo();
	},
	
	writeDeviceInfo:function(){
		console.log('writeDeviceInfo');
		var $info = $('#device-info');
		var html = '';
		html += navigator.userAgent + '<br>';
		html += 'width: ' + $(window).width() + '<br>';
		html += 'height: ' + $(window).height() + '<br>';
		$info.append(html);
		
		var deviceId = Redcurb.Helpers.getParameterByName('device');
		console.log('deviceId:' + deviceId);
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
	}
	


};
$(function() {
	onlineForLife.Feed.init();
});


