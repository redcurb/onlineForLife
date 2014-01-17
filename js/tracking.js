var onlineForLife = window.onlineForLife || {};
onlineForLife.Tracking = {
	trackEvent: function(eventName, eventAction){
		ga('send', 'event', eventName, eventAction);
	}
};

