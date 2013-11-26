var onlineForLife = window.onlineForLife || {}; onlineForLife.USMap = onlineForLife.USMap || {};
onlineForLife.USMap = {
	init: function(){
		onlineForLife.USMap.setupMap();
		onlineForLife.USMap.setupHandlers();
		onlineForLife.USMap.toggleState(onlineForLife.USMap.CurrentState);
	},
	
	setupMap:function(){
		$('#map').usmap({
			'stateStyles': {
				fill: '#aaa', 
				"stroke-width": 1,
				'stroke' : '#fff'
			},
			'stateHoverStyles': {
				fill: 'teal'
			},
			showLabels: false,
			'mouseoverState': {
				'CA' : function(event, data) {
					//return false;
					console.log('ca is the best!');
				}
			}
		});

	},
	
	setupHandlers:function(){
		$('#over-ca').click(function(){
			onlineForLife.USMap.toggleState('CA');				
		});
	},
	
	toggleState:function(state){
		console.log('toggleState: ' + state);
		$('#map').usmap('trigger', state, 'mouseover');
		setTimeout(function() {
			$('#map').usmap('trigger', state, 'mouseout');
		}, 3000);
	}
	


};
$(function() {
	//onlineForLife.USMap.init();
});


