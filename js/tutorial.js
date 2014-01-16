onlineForLife.Tutorial = {
	init: function(){
		onlineForLife.Tutorial.getTutorialData();
	},
	
	tutorialData:{
		
	},
	
	getTutorialData: function(){
		console.log('getTutorialData');
		var dbUrl = 'https://ofl.firebaseio.com/tutorial/';
		var tutorialData = new Firebase(dbUrl);
		var $tutorial = $('#tutorial-content');

		onlineForLife.Tutorial.tutorialData = {};
		tutorialData.child('config').once('value', function(tutorialConfig) {
			var configData = tutorialConfig.val();
			console.log(configData);
			onlineForLife.Tutorial.tutorialData.config = configData;
			var showTutorial = onlineForLife.Tutorial.tutorialData.config.status == 'on';
			if(showTutorial){
				tutorialData.child('text').once('value', function(tutorialText) {
					var itemHtml = '';
					var autoOpenText = onlineForLife.Tutorial.tutorialData.config.autoOpenText=="true";
					console.log('autoOpenText: ',autoOpenText);
					tutorialText.forEach(function(textSnap) {
						var textData = textSnap.val();
						var tutorialId = textSnap.name();
						var tutorialText = textData.text;
						var tutorialTextAlignment = textData.align;
						itemHtml += onlineForLife.Tutorial.buildTutorialItem(tutorialId, tutorialText, tutorialTextAlignment, autoOpenText);
						//console.log('align: ',tutorialTextAlignment);
					});
					//console.log(itemHtml);
					var $tutorial = $('#tutorial-content');
					$tutorial.append(itemHtml);
					onlineForLife.Tutorial.setupTutorial();
				});
			}
		});
	},
	
	getTutorialText: function(tutorialData){
	},
	
	setupTutorial: function(){
		onlineForLife.Tutorial.setupTutorialState();
		onlineForLife.Tutorial.setupHandlers();
	},
	
	setupTutorialState: function(){
		var tutorialStatus = true;
		var showNudge = true;
		var tutorialClass = '';
		var nudgeClass = '';
		if(showNudge){
			nudgeClass = 'show-nudge';
			onlineForLife.Tutorial.handleTutorialShow();
		}
		if(tutorialStatus){
			tutorialClass = 'tutorial-enabled';
		}
		var tutorialClass = tutorialClass + ' ' + nudgeClass;
		$('#content-tutorial').addClass(tutorialClass);
	},
	
	buildTutorialItem: function(id, text, align, autoOpen){
		var source   = $("#template-tutorial-item").html();
		var template = Handlebars.compile(source);
		var context = {id:id, text:text, align: align, autoOpen: autoOpen}
		var html = template(context);
		return html;
	},
	
	handleTutorialShow: function(){
		$('#modal-screen').addClass('screen-tutorial').show();
		$('#content-tutorial').addClass('tutorial-open').removeClass('tutorial-closed');
		$('.tutorial-item .tutorial-cta').on('click', function(){
			//console.log('cta');
			onlineForLife.Tutorial.handleItemToggle($(this));
		});
		$(window).on('scroll',function() {
			$('a.tutorial-hide').click();
		});
	},
	
	handleTutorialHide: function(){
		$('#modal-screen').removeClass('screen-tutorial').hide();
		$('#content-tutorial').addClass('tutorial-closed').removeClass('tutorial-open');
		$('.tutorial-item .tutorial-cta').off('click');
		$(window).off('scroll');
	},
	
	setupHandlers: function(){
		$('a.tutorial-show').on('click', function(){
			onlineForLife.Tutorial.handleTutorialShow();
		});
		
		$('a.tutorial-hide').on('click', function(){
			onlineForLife.Tutorial.handleTutorialHide();
		});
	},
	
	handleItemToggle: function($i){
		var $item = $i.parents('.tutorial-item');
		$('#content-tutorial').removeClass('show-nudge');
		if($item.hasClass('item-open')){
			$item.removeClass('item-open');
		}
		else{
			$item.addClass('item-open');
		}
	}
};
$(function() {
	
});


