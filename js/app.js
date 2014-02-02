var onlineForLife = window.onlineForLife || {};
onlineForLife.App = onlineForLife.App || {};
onlineForLife.Templates = onlineForLife.Templates || {};
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
		Redcurb.Helpers.createPrototypeItems();
		onlineForLife.App.getConfigData();
		onlineForLife.App.createTemplates();
		onlineForLife.App.runOverrides();
	},	

	runOverrides: function(){
		onlineForLife.App.updateSwipePlugin();
		//onlineForLife.App.addTabletMap();
		//console.log('app init');
		//onlineForLife.App.getConfigData();
		//$totalPrayers = $('.main-refresh .refresh-label');
		//$totalPrayers.text('Total Prayers').css('visibility','visible');
	},
	
	addTabletMap:function(){
		$('#feed .content-main.ui-content').prepend('<div id="map-tablet"></div>');
	},
	
	updateSwipePlugin:function(id,html){
		Swipe.prototype.handleEvent = function(e) {
			switch (e.type) {
				case 'touchstart': this.onTouchStart(e); break;
				case 'touchmove': this.onTouchMove(e); break;
				case 'touchcancel' :
				case 'touchend': this.onTouchEnd(e); break;
				case 'webkitTransitionEnd':
				case 'msTransitionEnd':
				case 'oTransitionEnd':
				case 'transitionend': this.transitionEnd(e); break;
				case 'resize': return false; break;
			}
		}
	},
	
	createTemplates:function(id,html){		
		var feedItemData = onlineForLife.Templates.feed.feedItem;
		var tutorialItemData = onlineForLife.Templates.feed.tutorialItem;
		var updateItemData = onlineForLife.Templates.feed.updateItem;
		var step4ItemData = onlineForLife.Templates.feed.step4Item;
		var eventItemData = onlineForLife.Templates.event.eventItem;
		onlineForLife.App.createTemplateElement(feedItemData.id,feedItemData.html);
		onlineForLife.App.createTemplateElement(tutorialItemData.id,tutorialItemData.html);
		onlineForLife.App.createTemplateElement(updateItemData.id,updateItemData.html);
		onlineForLife.App.createTemplateElement(step4ItemData.id,step4ItemData.html);
		onlineForLife.App.createTemplateElement(eventItemData.id,eventItemData.html);
	},
	
	createTemplateElement:function(id,html){
		var s = document.createElement("script");
		s.type = "text/x-handlebars-template";
		s.id=id;
		s.innerHTML=html;
		$("body").append(s);
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
		onlineForLife.Feed.onFeedLoaded();
		onlineForLife.Feed.setupFeedItemLookup();
		if($.mobile.activePage.is('#feed') && AppData.config.push.enabled){
			onlineForLife.Push.setupPush();
		}
		
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
		//onlineForLife.USMap.init();
		onlineForLife.Feed.init();
		
	}	
};
$(function() {
	onlineForLife.App.init();
});

onlineForLife.Templates = {
	feed:{
		feedItem:{
			id:'template-feed-item-ajax',
			html:'<li class="feed-item drag-setup-false center-text-false action-step-{{step}} {{liClass}} version-{{BgVersion}}" data-id="{{itemId}}" data-step="{{step}}" data-stateCode="{{stateCode}}" data-stateName="{{stateName}}" data-city="{{city}}" data-table-key="{{key}}"><i class="feed-prayer-confirmation">Prayed!</i><i class="feed-prayer-instruction"></i><div class="feed-content" id="content-item-{{itemId}}" data-state="{{stateCode}}" style="overflow:hidden;"><ul class="feed-content-container"><li class="feed-content-placeholder feed-content-left" data-direction="right"></li><li class="feed-content-main" data-direction="none">{{#if stateName }}{{#equal step "1" }}<p class="action-text body-step-1">Someone considering abortion in {{city}}, {{stateName}} just contacted a PRC</p>{{/equal}}{{#equal step "2" }}<p class="action-text body-step-2">Someone considering abortion in {{city}}, {{stateName}} just scheduled an appointment with a PRC</p>{{/equal}}{{#equal step "3" }}<p class="action-text body-step-3">Someone considering abortion in {{city}}, {{stateName}} kept her appointment at the PRC</p>{{/equal}}{{/if}}<i class="action-step step-{{step}}"></i></li><li class="feed-content-placeholder feed-content-right" data-direction="left"></li></ul></div></li>'
		},
		tutorialItem:{
			id:'template-tutorial-item-ajax',
			html:'<div class="tutorial-item auto-open-{{autoOpen}}" id="tutorial-{{id}}"><i class="fa fa-question-circle tutorial-cta"></i><p class="tutorial-text align-{{align}}"><span>{{text}}</span></p></div>'
		},
		updateItem:{
			id:'template-updates-item-ajax',
			html:'<li class="{{#if popup }}popup-true{{/if}}{{#unless popup }}popup-false{{/unless}}" data-popup="{{popup}}">{{#if imgUrl }}<img src="{{imgUrl}}" width="104" height="104" />{{/if}}<span class="text-update">{{title}}</span></li>'
		},
		step4Item:{
			id:'template-updates-step4-item-ajax',
			html:'<li class="item-step-4" data-id="{{id}}"><span class="text-update">{{text}}</span></li>'
		}
	},
	
	event:{
		eventItem:{
			id:'template-event-item-ajax',
			html:'<li class="item-init" data-event-id="{{eventId}}"><div class="event-title"><p class="event-description">{{eventTitle}}</p><i class="fa fa-chevron-down"></i><i class="fa fa-chevron-right"></i></div><div class="event-details"><h3>{{eventMonth}} {{eventDay}}, {{eventYear}}</h3><h6>{{eventStartHour}}:{{eventStartMinute}} {{eventStartAmpm}} - {{eventEndHour}}:{{eventEndMinute}} {{eventEndAmpm}}</h6><h4>{{eventLocation}}</h4><p>{{eventDescription}} <br><a href="{{eventUrl}}">{{eventUrl}}</a></p></div></li>'
		}
	}
}

