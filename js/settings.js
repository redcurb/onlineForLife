var onlineForLife = window.onlineForLife || {}; onlineForLife.Settings = onlineForLife.Settings || {};
onlineForLife.Settings = {
	version: 1,

	init: function(){
		//console.log('settings init');
		if($.mobile.activePage.is('#settings')){
			onlineForLife.Settings.setSavedSettingsOnSettingsPage();
		}
		else{
			onlineForLife.Settings.setSavedSettings();
		}
		onlineForLife.Settings.setupHandlers();
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

		AppData.User.config.push.settingsData = pushSettingsData;
		onlineForLife.Push.updatePushSettingsToFirebase();
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
		
		$('.link-settings-ofl').on('click',function(){
			var url = onlineForLife.Data.Links.settings.ofl;
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
		});
		$('.link-settings-privacy').on('click',function(){
			var url = onlineForLife.Data.Links.settings.privacy;
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});
		
		$('.link-settings-terms').on('click',function(){
			var url = onlineForLife.Data.Links.settings.terms;
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});

		$('.link-settings-contact').on('click',function(){
			var url = onlineForLife.Data.Links.settings.contact;
			myURL = encodeURI(url);
			window.open(url, '_blank', 'location=yes'); 
			
		});
	},
};
$(function() {
	
});


