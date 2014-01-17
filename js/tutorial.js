onlineForLife.Tutorial = {
	init: function(){
		onlineForLife.Tutorial.setupTutorialConfig();
	},
	
	tutorialData:{
		
	},
	
	setupTutorialConfig: function(){
		//console.log('setupTutorialConfig');
		var $tutorial = $('#tutorial-content');
		var tutorialConfig = AppData.config.tutorial;
		var tutorialText = AppData.text.tutorial;
		var showTutorial = tutorialConfig.global.status == 'on';
		
		if(AppData.device.friendly.model!='iphone'){
			showTutorial=false;
		}
		
		if(showTutorial){

			var itemHtml = '';
			var autoOpenText = tutorialConfig.global.autoOpenText=="true";
			
			//console.log('autoOpenText: ' + autoOpenText);
			//console.log('tutorialText: ' + tutorialText.items);
			//console.log('?????????????????????????????????????????????????');
			$.each(tutorialText.items,function(key,itemData) {
				if(typeof(itemData)!='undefined'){
					var tutorialText = itemData.text;
					var tutorialId = key;
					var tutorialTextAlignment = itemData.align;
					//console.log('item ' + tutorialId + ': ' + tutorialTextAlignment + ' - ' + itemData.text);
					itemHtml += onlineForLife.Tutorial.buildTutorialItem(tutorialId, tutorialText, tutorialTextAlignment, autoOpenText);
				}
				//console.log(itemHtml);
			});
			$tutorial.append(itemHtml);
			onlineForLife.Tutorial.setupTutorial();
			//console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
		}
	},
	
	setupTutorial: function(){
		onlineForLife.Tutorial.setupTutorialState();
		onlineForLife.Tutorial.setupHandlers();
	},
	
	setupTutorialState: function(){
		var tutorialStatus = AppData.config.tutorial.global.status == 'on';
		var showNudge = AppData.config.tutorial.global.nudge;
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
		var $panelRight = $( ".mypanel-right");
		$panelRight.on( "panelopen", function( event, ui ) {
			$('#content-tutorial').removeClass('tutorial-page-feed').addClass('tutorial-page-stats');
		});
		$panelRight.on( "panelclose", function( event, ui ) {
			$('#content-tutorial').addClass('tutorial-page-feed').removeClass('tutorial-page-stats');
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


