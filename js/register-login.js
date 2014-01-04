var onlineForLife = window.onlineForLife || {}; onlineForLife.Auth = onlineForLife.Auth || {}; onlineForLife.Login = onlineForLife.Login || {}; onlineForLife.Login = onlineForLife.Login || {};


onlineForLife.Auth = {
	init: function(){
		//pagebeforecreate
		//pagecreate
		//pageinit
		//pagebeforehide
		//pagebeforeshow
		//pageremove
		//pagehide
		//pageshow

		onlineForLife.Auth.checkLoginStatus();
	},
	
	checkLoginStatus: function(){
		var loggedIn = false;
		//loggedIn = true;
		if(loggedIn){
			document.location="feed.html";
		}
		else{
			onlineForLife.Register.init();
			onlineForLife.Login.init();
			onlineForLife.Forgot.init();
		}
	}
};

onlineForLife.Register = {
	init: function(){
		console.log('reg init');		
		$('#form-registration').on('submit',function(event){
			event.preventDefault();
			onlineForLife.Register.handleFormSubmit();
		});
	},
	
	handleFormSubmit: function(){
		var formOk = true;
		if(formOk){
			document.location = 'feed.html';
		}
	}
};

onlineForLife.Login = {
	init: function(){
		$('#form-login').on('submit',function(){
			onlineForLife.Login.handleFormSubmit();
		});
	},
	
	handleFormSubmit: function(){
		var formOk = true;
		if(formOk){
			//document.location="feed.html";
		}
	}
};

onlineForLife.Forgot = {
	init: function(){
		$('#form-forgot').on('submit',function(){
			onlineForLife.Forgot.handleFormSubmit();
		});
	},
	
	handleFormSubmit: function(){
		var formOk = true;
		if(formOk){
			//document.location="home.html#login";
		}
	}
};


$(function() {
	onlineForLife.Auth.init();
});

