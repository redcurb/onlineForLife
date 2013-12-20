var onlineForLife = window.onlineForLife || {}; onlineForLife.Events = onlineForLife.Events || {};
onlineForLife.Events = {
	version: 1,

	init: function(){
		console.log('events init');
		onlineForLife.Events.setupHandlers();
		onlineForLife.Events.setupFirebaseEvents();
	},
	
	setupHandlers: function(){
		console.log('EVENTS setupHandlers');
		$('ul.event-calendar li').on('click',function(){
			onlineForLife.Events.toggleCalendarItem($(this));
		});
	},
	
	setupFirebaseEvents:function(){
		console.log('setupFirebasePrayers');
		var dbUrl = 'https://onlineforlife.firebaseio.com/events';
		var myDataRef = new Firebase(dbUrl);
		
		myDataRef.on('child_added', function(snapshot) {
			var message = snapshot.val();
			console.log(message);
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


