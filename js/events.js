var onlineForLife = window.onlineForLife || {}; onlineForLife.Events = onlineForLife.Events || {};
onlineForLife.Events = {
	version: 1,

	addFirebaseChild: true,

	init: function(){
		//console.log('events init');
		onlineForLife.Events.setupHandlers();
		onlineForLife.Events.setupFirebase();
	},
	
	setupHandlers: function(){
		//console.log('EVENTS setupHandlers');
		onlineForLife.Events.setupEventItemHandlers();
	},
	
	setupEventItemHandlers: function(){
		$('ul.event-calendar li .event-title').off('click');
		$('ul.event-calendar li .event-title').on('click',function(){
			var $li = $(this).parents('li');
			onlineForLife.Events.toggleCalendarItem($li);
		});
	},
	
	setupFirebase:function(){
		setTimeout(function() {
			//console.log('Events addFirebaseChild TRUE');
			onlineForLife.Events.addFirebaseChild = true;
		},5000);
		onlineForLife.Events.setupFirebaseEvents();
	},
	
	setupFirebaseEvents:function(){
		//console.log('setupFirebasePrayers');
		var dbUrl = 'https://ofl.firebaseio.com/events';
		var myDataRef = new Firebase(dbUrl);
	
		myDataRef.on('child_added', function(snapshot) {
			if(onlineForLife.Events.addFirebaseChild){
				var message = snapshot.val();
	
				var eventId = message.id;
				var eventTitle = message.title;
				var eventMonth = message.month;
				var eventDay = message.day;
				var eventYear = message.year;
				var eventStartHour = message.startHour;
				var eventStartMinute = message.startMinute;
				var eventStartAmpm = message.startAmpm;
				var eventEndHour = message.endHour;
				var eventEndMinute = message.endMinute;
				var eventEndAmpm = message.endAmpm;
				var eventLocation = message.location;
				var eventDescription = message.description;
	
				var output = '';
				output += 'eventId: ' + eventId + '\n';
				output += 'eventTitle: ' + eventTitle + '\n';
				output += 'eventMonth: ' + eventMonth + '\n';
				output += 'eventDay: ' + eventDay + '\n';
				output += 'eventYear: ' + eventYear + '\n';
				output += 'eventStartHour: ' + eventStartHour + '\n';
				output += 'eventStartMinute: ' + eventStartMinute + '\n';
				output += 'eventEndHour: ' + eventEndHour + '\n';
				output += 'eventEndMinute: ' + eventEndMinute + '\n';
				output += 'eventLocation: ' + eventLocation + '\n';
				output += 'eventDescription: ' + eventDescription + '\n';
				//console.log(output);
				
				onlineForLife.Events.buildEventItem(eventId, eventTitle, eventMonth, eventDay, eventYear, eventStartHour, eventStartMinute, eventStartAmpm, eventEndHour, eventEndMinute, eventEndAmpm, eventLocation, eventDescription);
			}
		});
	},

	buildEventItem: function(eventId, eventTitle, eventMonth, eventDay, eventYear, eventStartHour, eventStartMinute, eventStartAmpm, eventEndHour, eventEndMinute, eventEndAmpm, eventLocation, eventDescription){
		//console.clear();
		var $calendar = $('ul.event-calendar');
		var source	= $("#template-event-item").html();
		var template = Handlebars.compile(source);
		var context = {eventId: eventId, eventTitle: eventTitle, eventMonth: eventMonth, eventDay: eventDay, eventYear: eventYear, eventStartHour: eventStartHour, eventStartMinute: eventStartMinute, eventStartAmpm: eventStartAmpm, eventEndHour: eventEndHour, eventEndMinute: eventEndMinute, eventEndAmpm: eventEndAmpm, eventLocation: eventLocation, eventDescription: eventDescription};
		var html = template(context);
		//console.log(html);
		$calendar.prepend(html);
		onlineForLife.Events.setupHandlers();
		//return html;
	},

	toggleCalendarItem: function($li){
		if($li.hasClass('item-open')){
			$li.removeClass('item-open').find('.event-details').slideUp(1000);
		}
		else{
			$li.addClass('item-open').find('.event-details').slideDown(1000);
		}
	}


};
$(function() {
	onlineForLife.Events.init();
});


