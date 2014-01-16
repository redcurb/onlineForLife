onlineForLife.USMap = {
	init: function(){
		onlineForLife.USMap.setupMap();
		onlineForLife.USMap.setupHandlers();
		//onlineForLife.USMap.toggleState('TX');
	},
	
	setupMap:function(){
		var configData = onlineForLife.App.config.feed.map;
		onlineForLife.USMap.createMap();
	},
	
	createMap:function(){
		//console.log('setupMap');
		$('#map').usmap({
			'stateStyles': {
				fill: onlineForLife.App.config.feed.map.fillColor, 
				"stroke-width": onlineForLife.App.config.feed.map.strokeWidth,
				'stroke' : onlineForLife.App.config.feed.map.strokeColor
			},
			click: function(event, data) {
				
			},
  			mouseover: function(event, data) {
				//event.preventDefault();
				fill: onlineForLife.App.config.feed.map.highlightColor
			},
  			'stateHoverStyles': {
				fill: onlineForLife.App.config.feed.map.highlightColor
			},
			showLabels: false,
		});
		$('#map path').off('mouseover');
	},
	
	setupHandlers:function(){
	},
	
	toggleState:function(state){
		console.log('toggleState: ' + state);
		var todayCount = $( ".main-refresh .refresh-count");
		var currentCount = onlineForLife.Feed.prayersToday;
		var newCount = currentCount + 1;
		//console.log('currentCount',currentCount);
		onlineForLife.Feed.prayersToday = newCount;
		$('#map').usmap('trigger', state, 'mouseover');
		todayCount.text(newCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		setTimeout(function() {
			$('#map').usmap('trigger', state, 'mouseout');
		}, onlineForLife.App.config.feed.map.delaySpeed);
	}
};
$(function() {
	
});


