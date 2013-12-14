var onlineForLife = window.onlineForLife || {}; onlineForLife.Events = onlineForLife.Events || {};
onlineForLife.Events = {
	version: 1,

	init: function(){
		onlineForLife.Events.setupHandlers();
	},
	
	setupHandlers: function(){
		console.log('EVENTS setupHandlers');
		$('ul.event-calendar li').on('click',function(){
			onlineForLife.Events.toggleCalendarItem($(this));
		});
	},
	
	toggleCalendarItem: function($li){
		if($li.hasClass('item-open')){
			$li.removeClass('item-open').find('.event-details').animate({height:0},1000);
		}
		else{
			$li.addClass('item-open').find('.event-details').animate({height:'240px'},1000);
		}
	}


};
$(function() {
	onlineForLife.Events.init();
});


