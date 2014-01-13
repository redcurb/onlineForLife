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
	}
	


};
$(function() {
	onlineForLife.Tutorial.init();
});


