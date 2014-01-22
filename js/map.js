onlineForLife.USMap = {
	init: function(){
		onlineForLife.USMap.setupMap();
		onlineForLife.USMap.setupHandlers();
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
		//console.log('toggleState: ' + state);
		$('#map').usmap('trigger', state, 'mouseover');
		setTimeout(function() {
			$('#map').usmap('trigger', state, 'mouseout');
		}, onlineForLife.App.config.feed.map.delaySpeed);
	}
};
$(function() {
	
});


