	
	
		var prayersUrl = 'https://ofl.firebaseio.com/prayers';
		var prayerData = new Firebase(prayersUrl);
//		prayerData.set({});
		$('#prayer-submit').click(function (e) {
			var state = $('#prayer-states').val();
			var stateName = $('#prayer-states option:selected').text();
			var step = $('#prayer-steps').val();
			console.log(state, stateName, step);
			if($('#form-create-prayer input:required:invalid').length==0){
				prayerData.push({state: state, stateName:stateName, step: step});
			}
		});
		$('#prayer-reset').click(function (e) {
			prayerData.set({});
		});

	
		
		var feedUrl = 'https://ofl.firebaseio.com/feed';
		var feedData = new Firebase(feedUrl);
//		feedData.set({});
		$('#feed-submit').click(function (e) {
			var state = $('#feed-states').val();
			var stateName = $('#feed-states option:selected').text();
			var step = $('#feed-steps').val();
			console.log(state, stateName, step);
			if($('#form-create-feed-item input:required:invalid').length==0){
				feedData.push({state: state, stateName:stateName, step: step});
			}
		});
		$('#feed-reset').click(function (e) {
			feedData.set({});
		});

	
		
		var eventUrl = 'https://ofl.firebaseio.com/events';
		var eventData = new Firebase(eventUrl);
//		eventData.set({});
		$('#event-submit').click(function (e) {
			var eventId = new Date().getTime();
			var eventTitle = $('#event-title').val();
			var eventMonth = $('#event-month option:selected').text();
			var eventDay = $('#event-day option:selected').text();
			var eventYear = $('#event-year option:selected').text();
			var eventStartHour = $('#event-start-hour option:selected').text();
			var eventStartMinute = $('#event-start-minute option:selected').text();
			var eventStartAmpm = $('#event-start-ampm option:selected').text();
			var eventEndHour = $('#event-end-hour option:selected').text();
			var eventEndMinute = $('#event-end-minute option:selected').text();
			var eventEndAmpm = $('#event-end-ampm option:selected').text();
			var eventLocation = $('#event-location').val();
			var eventDescription = $('#event-description').val();
			var data = {
				id: eventId,
				title: eventTitle,
				month: eventMonth,
				day: eventDay,
				year: eventYear,
				startHour: eventStartHour,
				startMinute: eventStartMinute,
				startAmpm: eventStartAmpm,
				endHour: eventEndHour,
				endMinute: eventEndMinute,
				endAmpm: eventEndAmpm,
				location: eventLocation,
				description: eventDescription
			}
//			console.log(state, stateName, step);
			if($('#form-create-event input:required:invalid').length==0){
				eventData.push(data);
			}
		});
		$('#event-reset').click(function (e) {
			eventData.set({});
		});

		
		

