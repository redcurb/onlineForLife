var onlineForLife = window.onlineForLife || {}; onlineForLife.Tutorial = onlineForLife.Tutorial || {};
onlineForLife.Tutorial = {
	init: function(){
		onlineForLife.Tutorial.getTutorialText();
		onlineForLife.Tutorial.setupHandlers();
	},
	
	getTutorialText: function(){
		var $tutorial = $('#tutorial-content');

		var dbUrl = 'https://ofl.firebaseio.com/tutorial/text/';
		var myDataRef = new Firebase(dbUrl);
		myDataRef.on('child_added', function(snapshot) {
			var tutorialData = snapshot.val();
			console.log(tutorialData);
			var tutorialId = snapshot.name();
			var tutorialText = tutorialData.text;
			var tutorialTextAlignment = tutorialData.align;
			console.log(tutorialId + ' - ' + tutorialText + ' - ' + tutorialTextAlignment);
			var itemHtml = onlineForLife.Tutorial.buildTutorialItem(tutorialId, tutorialText, tutorialTextAlignment);
			console.log(itemHtml);
			$tutorial.append(itemHtml);
		});
		
	},
	
	buildTutorialItem: function(id, text, align){
		var source   = $("#template-tutorial-item").html();
		var template = Handlebars.compile(source);
		var context = {id:id, text:text, align: align}
		var html = template(context);
		return html;
	},
	
	setupHandlers: function(){
		$('a.tutorial-show').on('click', function(){
			$('#modal-screen').addClass('screen-tutorial').show();
			$('#content-tutorial').addClass('tutorial-open').removeClass('tutorial-closed');
			$('.tutorial-item .tutorial-cta').on('click', function(){
				console.log('cta');
				onlineForLife.Tutorial.handleItemToggle($(this));
			});
			$(window).on('scroll',function() {
				$('a.tutorial-hide').click();
			});
		});
		/*
		$('#content-tutorial').not('.tutorial-item').on('click', function(event){
			event.stopPropagation();
		});
		*/
		
		
		$('a.tutorial-hide').on('click', function(){
			$('#modal-screen').removeClass('screen-tutorial').hide();
			$('#content-tutorial').addClass('tutorial-closed').removeClass('tutorial-open');
			$('.tutorial-item .tutorial-cta').off('click');
			$(window).off('scroll');
		});
	},
	
	handleItemToggle: function($i){
		var $item = $i.parents('.tutorial-item');
		
		if($item.hasClass('item-open')){
			$item.removeClass('item-open');
		}
		else{
			$item.addClass('item-open');
		}
	}
	


};
$(function() {
	onlineForLife.Tutorial.init();
});


