var Redcurb = window.Redcurb || {}; Redcurb.Helpers = Redcurb.Helpers || {};
Redcurb.Helpers = {
	init:function(){
		Redcurb.Helpers.createPrototypes();
	},

	getParameterByName: function(name){
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		var results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	
	createPrototypes: function(){
		console.log('createPrototypes');
		if (!String.prototype.trim) {
		  String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g, '');
		  };
		}
		String.prototype.toProperCase = function(){
		  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
			  function($1) { return $1.toUpperCase(); });
		}
	},

	addDevConsoleLog: function(options){
		console.log(options);
		var name = options.name;
		var tempFunction = console.log;
		console[name] = tempFunction;
		Redcurb.Helpers.createDevConsole(options.element);
	},
	
	addDevConsole: function(options){
		console.log(options);
		var name = options.name;
		console[name] = function(key,value){
			Redcurb.Helpers.addDevConsoleItem(options.element,key,value);
		}
		Redcurb.Helpers.createDevConsole(options.element);
	},
	
	createDevConsole: function($element){
		console.log('createDevConsole');
		var consoleHtml = '<ul class="dev-console" style="text-shadow: none;color: #0f0;"></ul>';
		$element.append(consoleHtml);
	},
	
	addDevConsoleItem: function($parent,key,value){
		console.log('addDevConsoleItem',key);
		var $console = $parent.find('.dev-console');
		
		var itemHtml = '<li>';
		itemHtml += key;
		if(value){
			itemHtml += ': ' + value;
		}
		itemHtml += '</li>';
		$console.append(itemHtml);
	},

	setupConsole: function(parentLookup,key,value){
		console.log('setupConsole');
		var $parent = $(parentLookup);
		var consoleHtml = '<ul class="dev-console" style="text-shadow: none;color: #0f0;"></ul>';
		$parent.append(consoleHtml);
		Redcurb.Helpers.addConsoleItem(parentLookup,key,value);
	},
	
	addConsoleItem: function(parentLookup,key,value){
		//console.log('addConsoleItem');
		var $parent = $(parentLookup);
		var $console = $parent.find('.dev-console');
		
		var itemHtml = '<li>';
		itemHtml += key;
		if(value){
			itemHtml += ': ' + value;
		}
		itemHtml += '</li>';
		$console.append(itemHtml);
	},
	
	setupDev: function(){
		var isDev = false;
		if(AppData.UserId==1){
			Redcurb.Helpers.createDevItems();
		}
	},
	
	createDevNavItems: function(){
		var $nav = $('.nav-primary');
		var html = '';
		html += '<li class="test-link1 nav-settings"><a href="dev.html" data-ajax="false"><i class="fa fa-gear"></i><span>Dev Links</span></a></li>';
		html += '<li class="test-link1 nav-settings"><a href="#" data-ajax="false" id="dev-navigator"><i class="fa fa-gear"></i><span>Show Navigator</span></a></li>';
		$nav.append(html);
	},
	
	showNavigatorInfo: function(){
		var $device = $('ul#device-info');

		var navigatorInfoHtml = '';
		navigatorInfoHtml += '<li>NAVIGATOR INFO</li>';
		navigatorInfoHtml += '<li>--------------------------------------</li>';
		$.each(navigator,function(key,value){
			navigatorInfoHtml += '<li>' + key + ': ' + value + '</li>';
		});
		navigatorInfoHtml += '<li>=====================================</li>';
		navigatorInfoHtml += '<li>&nbsp;</li>';
		$device.append(navigatorInfoHtml);
		
		$('#dev-navigator').on('click',function(){
			if($device.is(':visible')){
				$device.hide();
			}
			else{
				$device.show();
			}
		});
	},
	
	createDevItems: function(){
		Redcurb.Helpers.createDevNavItems();
		Redcurb.Helpers.showNavigatorInfo();

		
	},
	
	setupConsoleItem: function(){
		
	},
	
	createConsoleItem: function(text,data){
		
	},
	
	getNavigatorData: function(){
		$.each(navigator,function(key, value){
			console.log(key + ': ' + value);
		});
	},
	
	getDeviceInfoObject: function(device){
		//console.log('getDeviceInfoObject');
		//console.log(device);
		var deviceData = {};
		
		
		var modelName = '';
		var modelFamilyName = '';
		var platformName = '';
		var versionText = '';
		
		if(device==''){
			deviceModel = null;
			modelFamilyName = null;
			devicePlatform = null;
			if(navigator.platform.indexOf("iPod") != -1){
				modelName = 'ipad';
				modelFamilyName = 'ipad';
				platformName = 'ios';
			}
			if(navigator.platform.indexOf("iPhone") != -1){
				modelName = 'iphone';
				modelFamilyName = 'iphone';
				platformName = 'ios';
			}
			versionText = null;
		}
		else{
			modelName = null;
			modelFamilyName = null;
			platformName = null;
			versionText = null;
			
			//GET MODEL & FAMILY
			var deviceModel = device.model.toLowerCase();
			if(deviceModel.indexOf('iphone')>=0){
				modelName = 'iphone';
			}
			else if(deviceModelVal.indexOf('ipad')>=0){
				modelName = 'ipad';
			}
			modelFamilyName = deviceModel;

			//GET PLATFORM
			var devicePlatform = device.platform.toLowerCase();
			if(devicePlatform.indexOf('ios')>=0){
				platformName = 'ios';
			}
			else if(devicePlatformVal.indexOf('android')>=0){
				platformName = 'android';
			}
			
			
		}
		//SAMPLE CODE ios = /iphone|ipod|ipad/.test( userAgent );
		// http://theiphonewiki.com/wiki/Models
		
		deviceData.modelName = modelName;
		deviceData.modelFamilyName = modelFamilyName;
		deviceData.platformName = platformName;
		deviceData.versionText = versionText;

		var $device = $('ul#device-info');

		var deviceInfoHtml = '';
		
		deviceInfoHtml += '<li>DEVICE INFO</li>';
		deviceInfoHtml += '<li>--------------------------------------</li>';
		deviceInfoHtml += '<li>modelName: ' + modelName + '</li>';
		deviceInfoHtml += '<li>modelFamilyName: ' + modelFamilyName + '</li>';
		deviceInfoHtml += '<li>platformName: ' + platformName + '</li>';
		deviceInfoHtml += '<li>versionText: ' + versionText + '</li>';
		deviceInfoHtml += '<li>=====================================</li>';
		deviceInfoHtml += '<li>&nbsp;</li>';
		
		$device.prepend(deviceInfoHtml);

		
		return deviceData;
	},
	
	getDeviceInfo: function(device,type){
		value = 'other';
		if(type=='MODEL_NAME'){
			var deviceModel = device.model.toLowerCase();
			if(deviceModel.indexOf('iphone')>=0){
				value = 'iphone';
			}
			else if(deviceModel.indexOf('ipad')>=0){
				value = 'ipad';
			}
		}
		if(type=='MODEL_FAMILY_NAME'){
			var deviceModel = device.model.toLowerCase();
			if(deviceModel.indexOf('iphone5c')>=0){
				value = 'iphone5c';
			}
			else if(deviceModel.indexOf('iphone5s')>=0){
				value = 'iphone5s';
			}
			else if(deviceModel.indexOf('iphone5')>=0){
				value = 'iphone5';
			}
			else if(deviceModel.indexOf('iphone4s')>=0){
				value = 'iphone4s';
			}
			else if(deviceModel.indexOf('iphone4')>=0){
				value = 'iphone4';
			}
			else if(deviceModel.indexOf('ipad')>=0){
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
	},
	
	getCookie: function(name){
		var name = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++){
			var c = ca[i].trim();
			if (c.indexOf(name)==0){
				return c.substring(name.length,c.length);
			}
		}
		return "";
	},
	
	setCookie: function(name,value,expiration){
		console.log('==========================================================');
		console.log('setCookie: ' + name);
		console.log(value);
		console.log('setCookie: ' + expiration);
		console.log('==========================================================');
		var d = new Date();
		d.setTime(d.getTime()+(expiration*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = name + "=" + value + "; " + expires;
	}


};
$(function() {
	Redcurb.Helpers.init();
});
