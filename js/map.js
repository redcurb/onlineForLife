onlineForLife.USMap = {
	init: function(){
		var $map = $('#map');
		if($('body').hasClass('platform-tablet')){
			//$map = $('#map-tablet');	
		}
		onlineForLife.USMap.setupMap($map);
	},
	
	setupMap:function($map){
		var configData = onlineForLife.App.config.feed.map;

		onlineForLife.USMap.createMap($map);
	},
	
	createMap:function($map){
		$map.usmap({
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
		$map.find('path').off('mouseover');
	},
	
	toggleState:function(state){
		//console.log('toggleState: ' + state);
		$('#map,#map-tablet').usmap('trigger', state, 'mouseover');
		setTimeout(function() {
			$('#map,#map-tablet').usmap('trigger', state, 'mouseout');
		}, onlineForLife.App.config.feed.map.delaySpeed);
	}
};
$(function() {
	
});


