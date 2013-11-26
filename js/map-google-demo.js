var onlineForLife = window.onlineForLife || {}; onlineForLife.GoogleMap = onlineForLife.GoogleMap || {};
onlineForLife.GoogleMap = {
	
	init: function(){
		onlineForLife.GoogleMap.initializeMap();
	},
	
	getState:function(results,status){
		console.log('getState');
		console.log(status);
		console.log(results);
		var stateCode = '';
		$.each(results,function(index,object){
			//console.log(object.types);
			$.each(object.types,function(typeIndex, type){
				//console.log(type);
				if(type=="administrative_area_level_1"){
					console.log("administrative_area_level_1");
					console.log(object.address_components[0].short_name);
					stateCode = object.address_components[0].short_name;
				}
			});
		});
		onlineForLife.USMap.CurrentState = stateCode;
	},
	
	initializeMap: function(coords){
		  var latlng = new google.maps.LatLng(onlineForLife.GoogleMap.coordinates.x,onlineForLife.GoogleMap.coordinates.y);
		  var mapOptions = {
			zoom: 8,
			center: latlng,
			mapTypeId: 'roadmap'
		  }
		  onlineForLife.GoogleMap.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		onlineForLife.GoogleMap.codeLatLng();
	},
	
	codeLatLng: function(coords){
		var geocoder;
		var map;
		var infowindow = new google.maps.InfoWindow();
		var marker;

		  var lat = onlineForLife.GoogleMap.coordinates.x;
		  var lng = onlineForLife.GoogleMap.coordinates.y;
		  var latlng = new google.maps.LatLng(lat, lng);
		  geocoder = new google.maps.Geocoder();
		  geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				
				onlineForLife.GoogleMap.getState(results, status);
				
			  if (results[1]) {
				onlineForLife.GoogleMap.map.setZoom(11);
				marker = new google.maps.Marker({
					position: latlng,
					map: onlineForLife.GoogleMap.map
				});
				//var windowText = results[1].formatted_address + ' ' + results[0]['address_components']['7']['long_name'];
				//infowindow.setContent(windowText);
				//infowindow.open(onlineForLife.GoogleMap.map, marker);
				//alert(results[1].formatted_address + ' ' + results[0]['address_components']['7']['long_name']);
				onlineForLife.USMap.init();				
			  } else {
				alert('No results found');
			  }
			} else {
			  alert('Geocoder failed due to: ' + status);
			}
		  });
	}

};
$(function() {
	onlineForLife.GoogleMap.init();
});


