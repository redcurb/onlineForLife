var onlineForLife = window.onlineForLife || {}; onlineForLife.Panels = onlineForLife.Panels || {};
onlineForLife.Panels = {
	init: function(){
		onlineForLife.Panels.setupHandlers();
		onlineForLife.Panels.setupIpad();
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
		console.log('hideArcs');
		$panel.css('outline','5px solid yellow');
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
		$( ".mypanel-right").on( "panelopen", function( event, ui ) {
			var $panel = $(this);
			setTimeout(function() {
				onlineForLife.Panels.animateArcs($panel);
			},500);
		});
		
		$( ".mypanel-right").on( "panelclose", function( event, ui ) {
			var $panel = $(this);
			onlineForLife.Panels.hideArcs($panel);
		});
		
		$( ".mypanel-right .fa-refresh" ).on( "click", function(){
			var $panel = $(this).parents('.mypanel-right');
			onlineForLife.Panels.handleRefreshStats($panel);
		});

		$( "#feed-mypanel-right .toggle-stats li a" ).on( "click", function(){
			var $this = $(this);
			var $li = $this.parents('li');
			var type = $li.data('type');
			var $panel = $(this).parents('.mypanel-right');
			$('.toggle-stats li').removeClass('selected');
			$li.addClass('selected');
			onlineForLife.Panels.handleFriendsToggle(type,$panel);
		});
	},
	
	animateArcs: function($panel){
		console.log('animateArcs');
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
		
		$called.fadeIn(150, function(){
			$textCalled.fadeIn(150);
			
			//step 2
			$scheduled.fadeIn(150, function(){
				$textScheduled.fadeIn(150);

				//step 3
				$visitedPrc.fadeIn(150, function(){
					$textVisitedPrc.fadeIn(150);

					//step 4
					$choseLife.fadeIn(150, function(){
						$textChoseLife.fadeIn(150);
					});

				});
			});
		});
		
	},
	
	handleRefreshStats: function($panel){
		console.log('handleRefreshStats');
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
		console.log(output);
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
		console.log('handleRefreshStats');
		
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
		console.log(output);
		
		
		
	}
	


};
$(function() {
	onlineForLife.Panels.init();
	//$('#panel-left').click();
	//$('#panel-right').click();
});


