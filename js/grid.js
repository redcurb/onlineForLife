Grid = {
	init: function(){
		var $debug = $('#debug');
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		
		var screenWidth = window.screen.width;
		var screenHeight = window.screen.height;
		var html = '';
		html += '<li>screenWidth: ' + screenWidth + '</li>';
		html += '<li>screenHeight: ' + screenHeight + '</li>';
		html += '<li>windowWidth: ' + windowWidth + '</li>';
		html += '<li>windowHeight: ' + windowHeight + '</li>';
		$debug.append(html);
	}	
};
$(function() {
	Grid.init();
});


