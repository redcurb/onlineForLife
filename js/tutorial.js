var onlineForLife = window.onlineForLife || {}; onlineForLife.Tutorial = onlineForLife.Tutorial || {};
onlineForLife.Tutorial = {
	init: function(){
		
		onlineForLife.Tutorial.setupHandlers();
	},
	
	setupHandlers: function(){
		$('a.tutorial-show').on('click', function(){
			$('#content-tutorial').addClass('tutorial-open').removeClass('tutorial-closed');
		});
		$('a.tutorial-hide').on('click', function(){
			$('#content-tutorial').addClass('tutorial-closed').removeClass('tutorial-open');
		});
		$('.tutorial-item .tutorial-cta').on('click', function(){
			onlineForLife.Tutorial.handleItemToggle($(this));
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


