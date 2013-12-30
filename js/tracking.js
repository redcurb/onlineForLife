var onlineForLife = window.onlineForLife || {}; onlineForLife.Tracking = onlineForLife.Tracking || {};
onlineForLife.Tracking = {
	trackEvent: function(eventName, eventAction){
		ga('send', 'event', eventName, eventAction);
	}

};

