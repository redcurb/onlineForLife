$(function() {
		/*
	function checkConnection(){
		if(window.navigator.onLine){
			console.log('has connection');
			onlineForLife.Auth.init();
		}
		else {
			console.log('has NO connection');
			alert("You're currently not connected to the internet.");
			setTimeout(function(){
				location.reload();
			}, 3000);
		}
	}
	checkConnection();
	*/
	onlineForLife.Auth.init();
});

