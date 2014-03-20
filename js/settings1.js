var onlineForLife = window.onlineForLife || {}; onlineForLife.Settings = onlineForLife.Settings || {};
onlineForLife.Settings = {
	version: 1,

	init: function(){
		onlineForLife.Settings.setupOverrides();
	},
	
	initPostOverrides: function(){
		//console.log('settings init');
		if($.mobile.activePage.is('#settings')){
			onlineForLife.Settings.setSavedSettingsOnSettingsPage();
		}
		else{
			onlineForLife.Settings.setSavedSettings();
		}
		onlineForLife.Settings.setupHandlers();

	},
	
	setupOverrides: function(){
		var logoutHtml = '<li class="link-settings-logout" data-event-id="3"><span>Log Out</span><i class="fa fa-arrow-circle-right"></i></li>';
		$('ul.settings-list').append(logoutHtml);
		onlineForLife.Settings.initPostOverrides();
	},
	
	setSavedSettings: function(){
		//console.log('++++++++++++++++++++++++++++++ setSavedSettings');
		//console.log(AppData.User.config.push);
		
		var $daily= $('#checkbox-push-daily');
		var $life = $('#checkbox-push-life');
		var $special = $('#checkbox-push-special');
		var $none = $('#checkbox-push-none');
		
		var pushSettings = AppData.User.config.push;
		$daily.attr("checked",pushSettings.dailySummary);
		$life.attr("checked",pushSettings.everyLifeChoice);
		$special.attr("checked",pushSettings.specialUpdates);
		$none.attr("checked",pushSettings.none);
		if(pushSettings.dailySummary=='' && pushSettings.everyLifeChoice=='' && pushSettings.specialUpdates=='' && pushSettings.none==''){
			$daily.attr("checked",true);
			$life.attr("checked",false);
			$special.attr("checked",true);
			$none.attr("checked",false);
		}
		
	},
	
	setDefaultPushSettings: function(){
		
	},
	
	setSavedSettingsOnSettingsPage: function(){
		//console.log('++++++++++++++++++++++++++++++ setSavedSettingsOnSettingsPage');
		//console.log(AppData.User.config.push);
		
		var $daily= $('#checkbox-push-daily');
		var $life = $('#checkbox-push-life');
		var $special = $('#checkbox-push-special');
		var $none = $('#checkbox-push-none');
		
		var pushSettings = AppData.User.config.push;
		$daily.attr("checked",pushSettings.dailySummary).checkboxradio("refresh");
		$life.attr("checked",pushSettings.everyLifeChoice).checkboxradio("refresh");
		$special.attr("checked",pushSettings.specialUpdates).checkboxradio("refresh");
		$none.attr("checked",pushSettings.none).checkboxradio("refresh");
		if(pushSettings.dailySummary=='' && pushSettings.everyLifeChoice=='' && pushSettings.specialUpdates=='' && pushSettings.none==''){
			$daily.attr("checked",true).checkboxradio("refresh");
			$life.attr("checked",false).checkboxradio("refresh");
			$special.attr("checked",true).checkboxradio("refresh");
			$none.attr("checked",false).checkboxradio("refresh");
		}
		
	},
	
	getSelectedValues: function(){
		var dailyValue = $('#checkbox-push-daily').prop('checked');
		var lifeValue = $('#checkbox-push-life').prop('checked');
		var specialValue = $('#checkbox-push-special').prop('checked');
		var noneValue = $('#checkbox-push-none').prop('checked');
		
		var pushSettingsData = {};
		
		pushSettingsData.dailySummary = dailyValue;
		pushSettingsData.everyLifeChoice = lifeValue;
		pushSettingsData.specialUpdates = specialValue;
		pushSettingsData.none = noneValue;

		AppData.User.config.push.dailySummary = dailyValue;
		AppData.User.config.push.everyLifeChoice = lifeValue;
		AppData.User.config.push.specialUpdates = specialValue;
		
		AppData.User.config.push.settingsData = pushSettingsData;
		onlineForLife.Push.updatePushSettingsToFirebase();
	},
	
	handleLogout: function(){
		console.log('handleLogout');
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {});
		auth.logout();
		Redcurb.Helpers.setCookie('userFirebaseToken','',30);
		Redcurb.Helpers.setCookie('userFirebaseLoggedOut','true',30);
		var indexUrl = "home.html";
		setTimeout(function(){
			document.location=indexUrl;
		}, 1000);
	},
	
	setupHandlers: function(){
		$(".checkbox-push input[type='checkbox']").bind( "change", function(event, ui) {
			var $this = $(this);
			var val = $this.val();
			
			/*
			//console.log(val, $('#checkbox-push-none').prop('checked'));
			//console.log('daily: ' + $('#checkbox-push-daily').prop('checked'));
			//console.log('life: ' + $('#checkbox-push-life').prop('checked'));
			//console.log('special: ' + $('#checkbox-push-special').prop('checked'));
			//console.log('none: ' + $('#checkbox-push-none').prop('checked'));
			//*/
			if(val=='push-none' && $('#checkbox-push-none').prop('checked')){
				$('#checkbox-push-daily, #checkbox-push-special, #checkbox-push-life').attr("checked",false).checkboxradio("refresh");
			}
			
			if($('#checkbox-push-daily').prop('checked') || $('#checkbox-push-life').prop('checked') || $('#checkbox-push-special').prop('checked')){
				$('#checkbox-push-none').attr("checked",false).checkboxradio("refresh");
			}
			onlineForLife.Settings.getSelectedValues();
		});
		
		$('.link-settings-ofl span,.link-settings-ofl i').on('click',function(){
			var url = AppData.config.settings.ofl;
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
		});
		$('.link-settings-privacy span,.link-settings-privacy i').on('click',function(){
			var url = AppData.config.settings.privacy;
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});
		
		$('.link-settings-terms span,.link-settings-terms i').on('click',function(){
			var url = AppData.config.settings.terms;
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});

		$('.link-settings-logout span,.link-settings-logout i').on('click',function(){
			onlineForLife.Settings.handleLogout();
		});

		$('.link-settings-contact span,.link-settings-contact i').on('click',function(){
			var url = AppData.config.settings.contact;
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
		});
	},
};
$(function() {
	
});


