var Redcurb = window.Redcurb || {}; Redcurb.Helpers = Redcurb.Helpers || {};
Redcurb.Helpers = {

	getParameterByName: function(name){
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	
	getDeviceInfo: function(device,type){
		value = 'other';
		if(type=='MODEL_NAME'){
			var deviceModel = device.model.toLowerCase();
			if(deviceModel.indexOf('iphone')>=0){
				value = 'iphone';
			}
			else if(deviceModel.indexOf('iPad')>=0){
				value = 'ipad';
			}
		}
		if(type=='PLATFORM_NAME'){
			var devicePlatform = device.platform.toLowerCase();
			if(devicePlatform.indexOf('ios')>=0){
				value = 'ios';
			}
			else if(devicePlatform.indexOf('android')>=0){
				value = 'android';
			}
		}
		if(type=='OS_VERSION'){
			var deviceOSVersion = device.version.toLowerCase();
			value = deviceOSVersion.replace(/\./gi,'');
		}
		
		
		
		return value;
	},
	
	getOrientation: function(){
		var orientationValue='portrait';
		if(window.orientation!=0){
			orientationValue = 'landscape';
		}
		return orientationValue;
	}


};

