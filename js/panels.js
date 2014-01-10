var onlineForLife = window.onlineForLife || {}; onlineForLife.Panels = onlineForLife.Panels || {};
onlineForLife.Panels = {
	addFirebaseChild:true,
	
	init: function(){
		onlineForLife.Panels.setupHandlers();
		onlineForLife.Panels.setupIpad();
		onlineForLife.Panels.setupUpdates();
	},
	
	refreshed:false,
	
	tempData:{
		stats:{
			user:{
				chooseLife:{
					user:3,
					friends:27
				},
				visitedPrc:{
					user:17,
					friends:193
				},
				called:{
					friends:7132
				},
				scheduled:{
					user:35,
					friends:492
				}
			},
			refresh:{
				chooseLife:{
					user:11,
					friends:47
				},
				visitedPrc:{
					user:73,
					friends:472
				},
				called:{
					friends:15231
				},
				scheduled:{
					user:95,
					friends:936
				}
			},
			friends:{
				chooseLife:{
					user:46,
					friends:241
				},
				visitedPrc:{
					user:203,
					friends:1138
				},
				called:{
					friends:23548
				},
				scheduled:{
					user:355,
					friends:3842
				}
			}
		}
	},

	hideArcs: function($panel){
		//console.log('hideArcs');
		//$panel.css('outline','5px solid yellow');
		var $impact = $panel.find('.section-your-impact');
		var $logo = $panel.find('.stats-logo');
		var $arcs = $logo.find('.stats-logo-arc');
		var $textSpans = $impact.find('.impact-step span');
		
		$arcs.hide();
		$textSpans.hide();
	},
	
	setupIpad: function(){
		if($('body').data('device')=='ipad'){
			setTimeout(function() {
				onlineForLife.Panels.animateArcs();
			},1000);
		}
	},
	
	setupHandlers: function(){
		var $panelRight = $( ".mypanel-right");
		var $panelLeft = $( ".mypanel-left");
		var $panels = $( ".mypanel-right, .mypanel-left");
		$panels.on( "panelbeforeopen", function( event, ui ) {
			var $this = $(this);
			var $page = $this.parents('.ui-page');
			$page.addClass('panel-opening');
		} );
		$panels.on( "panelbeforeclose", function( event, ui ) {
			var $this = $(this);
			var $page = $this.parents('.ui-page');
			$page.addClass('panel-closing');
		} );
		
		$panelRight.on( "panelopen", function( event, ui ) {
			var $panel = $(this);
			var $page = $panel.parents('.ui-page');
			$page.removeClass('panel-opening');
			setTimeout(function() {
				onlineForLife.Panels.animateArcs($panel);
			},250);
		});
		$panelRight.on( "panelclose", function( event, ui ) {
			var $panel = $(this);
			var $page = $panel.parents('.ui-page');
			$page.removeClass('panel-closing');
			onlineForLife.Panels.hideArcs($panel);
		});

		$panelLeft.on( "panelopen", function( event, ui ) {
			var $panel = $(this);
			var $page = $panel.parents('.ui-page');
			$page.removeClass('panel-opening');
			onlineForLife.Panels.animateLogo($panel);
		});
		$panelLeft.on( "panelclose", function( event, ui ) {
			var $panel = $(this);
			var $page = $panel.parents('.ui-page');
			$page.removeClass('panel-closing');
			onlineForLife.Panels.resetLogo($panel);
		});
		
		
		$( ".mypanel-right .fa-refresh" ).on( "click", function(){
			var $panel = $(this).parents('.mypanel-right');
			onlineForLife.Panels.handleRefreshStats($panel);
		});

		$( ".mypanel-right .toggle-stats li a" ).on( "click", function(){
			var $this = $(this);
			var $panel = $(this).parents('.mypanel-right');
			var $li = $this.parents('li');
			var type = $li.data('type');
			$panel.find('.toggle-stats li').removeClass('selected');
			$li.addClass('selected');
			onlineForLife.Panels.handleFriendsToggle(type,$panel);
		});
	},
	
	animateLogo: function($panel){
		//console.log('animateLogo');
		setTimeout(function() {
			$('.mypanel-left h2.logo').animate({'top':'0'}, 300);
		},50);
	},
	
	resetLogo: function($panel){
		//console.log('resetLogo');
		$('.mypanel-left h2.logo').css({'top':'-260px'});
	},
		
	animateArcs: function($panel){
		//console.log('animateArcs');
		var $impact = $panel.find('.section-your-impact');
		var $logo = $panel.find('.stats-logo');
		var $called = $logo.find('.step-called');
		var $scheduled = $logo.find('.step-scheduled');
		var $visitedPrc = $logo.find('.step-visited-prc');
		var $choseLife = $logo.find('.step-chose-life');
		
		var $textCalled = $impact.find('.impact-step.step-called span');
		var $textScheduled = $impact.find('.impact-step.step-scheduled span');
		var $textVisitedPrc = $impact.find('.impact-step.step-visited-prc span');
		var $textChoseLife = $impact.find('.impact-step.step-chose-life span');

		var arcSpeed = 130;
		var textDelay = 130;
		
		$called.fadeIn(arcSpeed, function(){
			$textCalled.fadeIn(textDelay);
			
			//step 2
			$scheduled.fadeIn(arcSpeed, function(){
				$textScheduled.fadeIn(textDelay);

				//step 3
				$visitedPrc.fadeIn(arcSpeed, function(){
					$textVisitedPrc.fadeIn(textDelay);

					//step 4
					$choseLife.fadeIn(arcSpeed, function(){
						$textChoseLife.fadeIn(textDelay);
					});

				});
			});
		});
		
	},
	
	handleRefreshStats: function($panel){
		//console.log('handleRefreshStats');
		onlineForLife.Panels.toggleStatsRefresh('start');
		var data = onlineForLife.Panels.tempData.stats;
		var userData = data.refresh;
		var chooseLifeUser = userData.chooseLife.user.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var chooseLifeFriends = userData.chooseLife.friends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var visitedPrcUser = userData.visitedPrc.user.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var visitedPrcFriends = userData.visitedPrc.friends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var calledFriends = userData.called.friends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var scheduledUser = userData.scheduled.user.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var scheduledFriends = userData.scheduled.friends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		var $chooseLifeUser = $panel.find('.section-your-impact .step-chose-life .user-count');
		var $chooseLifeFriends = $panel.find('.section-your-impact .step-chose-life .total-user-count');
		var $visitedPrcUser = $panel.find('.section-your-impact .step-visited-prc .user-count');
		var $visitedPrcFriends = $panel.find('.section-your-impact .step-visited-prc .total-user-count');
		var $calledFriends = $panel.find('.section-your-impact .step-called .total-user-count');
		var $scheduledUser = $panel.find('.section-your-impact .step-scheduled .user-count');
		var $scheduledFriends = $panel.find('.section-your-impact .step-scheduled .total-user-count');
		var $sinceCount = $panel.find('.section-refresh .refresh-count-value');
		
		setTimeout(function() {
			onlineForLife.Panels.hideArcs($panel);
			$('.toggle-stats li.selected').removeClass('selected').end().find('.your-impact').addClass('selected');
			$chooseLifeUser.text('+' + chooseLifeUser);
			$chooseLifeFriends.text('+' + chooseLifeFriends);
			$visitedPrcUser.text('+' + visitedPrcUser);
			$visitedPrcFriends.text('+' + visitedPrcFriends);
			$calledFriends.text('+' + calledFriends);
			$scheduledUser.text('+' + scheduledUser);
			$scheduledFriends.text('+' + scheduledFriends);
			$sinceCount.text(0);
						
			onlineForLife.Panels.toggleStatsRefresh('stop');
			onlineForLife.Panels.animateArcs($panel);
		}, 2500);
		
		var output = '';
		output += 'chooseLifeUser: ' + chooseLifeUser + '\n';
		output += 'chooseLifeFriends: ' + chooseLifeFriends + '\n';
		output += 'visitedPrcUser: ' + visitedPrcUser + '\n';
		output += 'visitedPrcFriends: ' + visitedPrcFriends + '\n';
		output += 'calledFriends: ' + calledFriends + '\n';
		output += 'scheduledUser: ' + scheduledUser + '\n';
		output += 'scheduledFriends: ' + scheduledFriends + '\n';
		//console.log(output);
		onlineForLife.Panels.refreshed = true;
		
		
	},
	
	toggleStatsRefresh:function(action){
		var $parent = $('.section-refresh');
		var $icon = $parent.find('.fa-refresh');
		var $since = $parent.find('.refresh-count-since');
		var $sinceCount = $parent.find('.refresh-count-value');
		var $refreshing = $parent.find('.refresh-count-refreshing');
		
		if(action=='start'){
			$icon.addClass('fa-spin');
			$since.hide();
			$refreshing.show();
		}
		if(action=='stop'){
			$icon.removeClass('fa-spin');
			$since.show();
			$refreshing.hide();
		}
		
	},
	
	handleFriendsToggle: function(type,$panel){
		//console.log('handleRefreshStats');
		
		onlineForLife.Panels.animateArcs($panel);
		if(onlineForLife.Panels.refreshed&&type=='user'){
			type='refresh';
		}
		var data = onlineForLife.Panels.tempData.stats;
		var userData = data[type];
		var chooseLifeUser = userData.chooseLife.user.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var chooseLifeFriends = userData.chooseLife.friends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var visitedPrcUser = userData.visitedPrc.user.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var visitedPrcFriends = userData.visitedPrc.friends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var calledFriends = userData.called.friends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var scheduledUser = userData.scheduled.user.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var scheduledFriends = userData.scheduled.friends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		var $chooseLifeUser = $('.section-your-impact .step-chose-life .user-count');
		var $chooseLifeFriends = $('.section-your-impact .step-chose-life .total-user-count');
		var $visitedPrcUser = $('.section-your-impact .step-visited-prc .user-count');
		var $visitedPrcFriends = $('.section-your-impact .step-visited-prc .total-user-count');
		var $calledFriends = $('.section-your-impact .step-called .total-user-count');
		var $scheduledUser = $('.section-your-impact .step-scheduled .user-count');
		var $scheduledFriends = $('.section-your-impact .step-scheduled .total-user-count');
		var $sinceCount = $('.section-refresh .refresh-count-value');
		
		onlineForLife.Panels.hideArcs($panel);
		$chooseLifeUser.text('+' + chooseLifeUser);
		$chooseLifeFriends.text('+' + chooseLifeFriends);
		$visitedPrcUser.text('+' + visitedPrcUser);
		$visitedPrcFriends.text('+' + visitedPrcFriends);
		$calledFriends.text('+' + calledFriends);
		$scheduledUser.text('+' + scheduledUser);
		$scheduledFriends.text('+' + scheduledFriends);
		$sinceCount.text(0);
		
		onlineForLife.Panels.animateArcs($panel);
		
		var output = '';
		output += 'chooseLifeUser: ' + chooseLifeUser + '\n';
		output += 'chooseLifeFriends: ' + chooseLifeFriends + '\n';
		output += 'visitedPrcUser: ' + visitedPrcUser + '\n';
		output += 'visitedPrcFriends: ' + visitedPrcFriends + '\n';
		output += 'calledFriends: ' + calledFriends + '\n';
		output += 'scheduledUser: ' + scheduledUser + '\n';
		output += 'scheduledFriends: ' + scheduledFriends + '\n';
		//console.log(output);
		
		
		
	},
	
	setupUpdatesOld: function(){
		//console.log('setupUpdates');
		var updatesUrl = 'https://ofl.firebaseio.com/updates';
		var updatesData = new Firebase(updatesUrl);
		
		updatesData.on('child_added', function(snapshot) {
			var message = snapshot.val();
			//console.log(message);
			//displayChatMessage(message.name, message.state, message.step);
			if(onlineForLife.Panels.addFirebaseChild){
				//console.log('onlineForLife.Feed.addFirebaseChild TRUE');
				var newHtml = onlineForLife.Panels.buildUpdateItem(message.id, message.state, message.step, message.stateName);
				$('ul.stats-updates').prepend(newHtml);
			}
		});
		onlineForLife.Panels.setupUpdatesWindow();

	},
	
	doesPopupContentExist: function(dataHtml){
		console.log('doesPopupContentExist: ' + dataHtml);
		var exists = true;
		if (typeof(dataHtml)=="undefined" || dataHtml==""){
			exists = false;
		}
		return exists
	},
	
	setupUpdates: function(){
		console.clear();
		console.log('setupUpdates');
		var updatesUrl = 'https://ofl.firebaseio.com/updates';
		var updatesData = new Firebase(updatesUrl);
		var $updates = $('ul.stats-updates');
		updatesData.once('value', function(snapshot) {
			var update = snapshot.val();
			if(update === null) {
				var $updates = $('ul.stats-updates');
				//$updates.removeClass('status-loading').addClass('status-no-updates');
				var $spinner = $updates.find('li.spinner');
				var $noRecords = $updates.find('li.no-records');
				var $updates = $('ul.stats-updates');
				$noRecords.fadeIn(200);
				$spinner.fadeOut(200);
			}
			else{
				console.log('================setupUpdates VALUE update: ');
				console.log(update);
				console.log(' ');
	
				var html = '';
				
				$.each(update,function(i,updateItem){
					var dataHtml = updateItem.html;
					var dataTitle = updateItem.title;
					console.log('dataHtml',dataHtml);
					var addPopup = onlineForLife.Panels.doesPopupContentExist(dataHtml);
					if(addPopup){
						dataHtml = dataHtml.substr(0, (dataHtml.length)-1).slice(1);
					}
					else{
						dataHtml = "";
					}
					var dataId = updateItem.id;
					console.log('addPopup: ' + addPopup);
					//console.log(updateItem);
					window.popupHtml = dataHtml;
					var newHtml = onlineForLife.Panels.buildUpdateItem(dataId, dataHtml, dataTitle);
					html += newHtml;
					console.log('newHtml');
					console.log(newHtml);
					console.log(' ');
				});
				$('ul.stats-updates').html(html).removeClass('status-loading').addClass('status-loaded');
				/*
				if(prayerId!="{}" && prayerId!=null){
					$.each(prayerId,function(i,v){
						console.log(v);
						onlineForLife.Feed.itemsPrayedFor.push(v.toString());
					});
				}
				*/
				console.log('UPDATES AFTER');
				onlineForLife.Panels.setupUpdatesWindow();
			}
		});
		console.log(' ');
	},
	
	setupUpdatesWindow: function(){
		console.log('setupUpdatesWindow');
		$('#modalUpdates').dialog({
			autoOpen: false,
			resizable:false,
			draggable:false,
			close:'none',
			dialogClass:'dialog-updates',
			closeText:'x',
			corners: false,
			modal:true
		});
		
		$('#modalUpdates .btn-modal-close').on('click',function(){
			$('#modalUpdates').dialog('close');
		});
		$('ul.stats-updates li.popup-true').on('click',function(){
			var $this = $(this);
			console.log($this);
			var html = $this.data('popup');
			var modalWidth = $(window).width()*.9;
			var modalHeight = $(window).height()*.9;
			$('#modalUpdates .modal-title').text($this.find('.text-update').text());
			$('#modalUpdates .modal-content').html(html);
			$('#modalUpdates .modal-content').find('a').attr('data-ajax',false).attr('data-role','none');
			$('#modalUpdates').dialog("open");
			$('#modalUpdates').dialog({
				autoOpen:true,
				open:function(){
					onlineForLife.Panels.toggleScreen('open');
				},
				close:function(){
					onlineForLife.Panels.toggleScreen('close');
				},
				width:modalWidth,
				height:modalHeight
			});
		});
	},

	toggleScreen: function(method){
		if(method=='open'){
			$('#modal-screen').show();
		}
		if(method=='close'){
			$('#modal-screen').hide();
		}
	},

	buildUpdateItem: function(itemId, popupContent, dataTitle){
		//console.log('buildUpdateItem');
		var source   = $("#template-updates-item").html();
		var template = Handlebars.compile(source);
		var id = itemId.toString();
		//console.log('imgSuffix',imgSuffix);
		var context = {itemId: itemId, popup: popupContent, title: dataTitle}
		var html = template(context);
		//console.log(html);
		return html;
	}
	
};
$(function() {
	onlineForLife.Panels.init();
	//$('#panel-left').click();
	//$('#feed-panel-right').click();
});


