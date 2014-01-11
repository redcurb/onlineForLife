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
		
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				console.log('error');
				console.log(error);
				return;
			}
			if (user) {
				// User is already logged in.
				console.log(user);
				console.log(user.email);
				document.location="feed.html";
			} else {
				// User is logged out.
				console.log('no user');
				onlineForLife.Register.init();
				onlineForLife.Login.init();
				onlineForLife.Forgot.init();
			}
		});
		
		
		
	}
};

onlineForLife.Register = {
	inputCount:4,
	
	invalidItems:{
		
	},
	
	init: function(){
		console.log('reg init');		
		onlineForLife.Register.setupFocus();
		onlineForLife.Register.setupForm();
		var $form = $('#form-registration');
		$form.on('submit',function(event){
			event.preventDefault();
			onlineForLife.Register.handleFormSubmit($form);
		});
	},

	showFirebaseError: function(error){
		console.log(error);
		var $error =  $('.error-messages');
		var $text = $error.find('span');
		var text = '';
		$text.text(error);
		$error.show('slide',{direction: 'down'}, 200);
	},

	createUser: function($form){
		var $firstName = $form.find('#input-register-firstname');
		var $email = $form.find('#input-register-email');
		var $password = $form.find('#input-register-password');
		var $zip = $form.find('#input-register-zip');
		var firstNameVal = $firstName.val();
		var emailVal = $email.val();
		var passwordVal = $password.val();
		var zipVal = $zip.val();
		
		
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				console.log('error');
				onlineForLife.Register.showFirebaseError(error);
				return;
			}
			if (user) {
				// User is already logged in.
				console.log('already logged in');
				console.log(user);
				onlineForLife.Register.handleRegSuccess();
			} else {
				// User is logged out.
				auth.createUser(emailVal, passwordVal, function(error,  user) {
					if (!error) {
						console.log('user created: ' + user.id);
						var usersUrl = 'https://ofl.firebaseio.com/users/'+user.id;
						var usersData = new Firebase(usersUrl);
		
						var userId = user.id;
						var userEmail = user.email;
						var userName = firstNameVal;
						var userZip = zipVal;
						var pushData = { id: userId, email: userEmail, name: userName, zip: userZip };
						usersData.push(pushData);
						
						var usersPrayersUrl = 'https://ofl.firebaseio.com/users/'+user.id + '/prayers';
						var usersPrayersData = new Firebase(usersPrayersUrl);
						usersPrayersData.push("{}");
		
						auth.login('password', {
						  email: emailVal,
						  password: passwordVal,
						  rememberMe: true
						});
					} else {
						console.log('createUser error');
						console.log(error);
						onlineForLife.Register.showFirebaseError(error);
					}
				});
			}
		});
	},
	
	handleRegSuccess: function(auth, email, password){
		console.log('handleRegSuccess');
		document.location = 'feed.html';
	},
	
	handleRegError: function(){
		console.log('handleRegError');
	},
	
	handleFormSubmit: function($form){
		var formOk = onlineForLife.Register.validateForm();
		if(formOk){
			onlineForLife.Register.createUser($form);
		}
		else{
			//alert('fix it');
		}
	},
	
	setupHandlers: function(){
		var $form = $('#form-registration');
		var $firstName = $form.find('#input-register-firstname');
		var $email = $form.find('#input-register-email');
		var $password = $form.find('#input-register-password');
		var $zip = $form.find('#input-register-zip');
		$firstName.on('blur',function(){
			console.log('firstName blur');
			onlineForLife.Register.handleInputValidation($form, $(this));
		});
		$email.on('blur',function(){
			console.log('email blur');
			onlineForLife.Register.handleInputValidation($form, $(this));
		});
		$password.on('blur',function(){
			console.log('password blur');
			onlineForLife.Register.handleInputValidation($form, $(this));
		});
		$zip.on('blur',function(){
			console.log('zip blur');
			onlineForLife.Register.handleInputValidation($form, $(this));
		});
	},
	
	handleInputValidation: function($form, $this){
		var fieldId = $this.attr('id');
		console.log('handleInputValidation',fieldId);
		
		var regexFirstName = /^[a-zA-Z\.\,\+\-]*$/;
		var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var regexPassword = /.{6,12}/;		
		var regexZip = /.{5,5}/;

		var $errorFirstName1 = $form.find('.error-firstname.error-1');
		var $errorFirstName2 = $form.find('.error-firstname.error-2');
		var $errorEmail = $form.find('.error-email');
		var $errorPassword = $form.find('.error-password');
		var $errorZip = $form.find('.error-zip');
		//console.log($this);
		if(fieldId=='input-register-firstname'){
			var fieldValue = $this.val();
			console.log('fieldValue',fieldValue);
			if(!regexFirstName.test(fieldValue) || fieldValue.length<2){
				console.log('first name incorrect');
				formValid = false;
				if(!regexFirstName.test(fieldValue)){
					onlineForLife.Register.showError($form, $errorFirstName1, $this);
				}
				else if(fieldValue.length<2){
					onlineForLife.Register.showError($form, $errorFirstName2, $this);
				}
			}
			else{
				$this.addClass('valid-true');
			}
		}

		if(fieldId=='input-register-email'){
			var fieldValue = $this.val();
			if(regexEmail.test(fieldValue)){
				$this.addClass('valid-true');
			}
			else{
				console.log('email incorrect');
				formValid = false;
				onlineForLife.Register.showError($form,$errorEmail,$this);
			}
		}

		if(fieldId=='input-register-password'){
			var fieldValue = $this.val();
			if(regexPassword.test(fieldValue)){
				$this.addClass('valid-true');
			}
			else{
				console.log('password incorrect');
				formValid = false;
				onlineForLife.Register.showError($form,$errorPassword,$this);
			}
		}

		if(fieldId=='input-register-zip'){
			var fieldValue = $this.val();
			if(regexZip.test(fieldValue) && fieldValue.length==5){
				console.log('zip ok');
				$this.addClass('valid-true');
			}
			else{
				console.log('zip incorrect',$('#input-register-zip').val().length);
				formValid = false;
				onlineForLife.Register.showError($form,$errorZip,$this);
			}
		}


		
	},
	
	setupForm: function(){
		onlineForLife.Register.setupHandlers();
	},
	
	validateForm: function(){
		var $form = $('#form-registration');
		var $firstName = $form.find('#input-register-firstname');
		var $email = $form.find('#input-register-email');
		var $password = $form.find('#input-register-password');
		var $zip = $form.find('#input-register-zip');
		var $inputs = $form.find('input[data-validate=true]');
		
		var inputCount = onlineForLife.Register.inputCount;
		var errorCount = $form.find('input.valid-false').length;
		var validCount = $form.find('input.valid-true').length;
		console.log('errorCount',errorCount);
		console.log('validCount',validCount);
		console.log('validCount==inputCount',validCount==inputCount);
		
		var formValid = (validCount==inputCount) ? true : false;
		return formValid;
	},
	
	hideAllErrors: function($form){
		$form.find('.input-error').hide('slide',{direction: 'right'}, 200);
	},
	
	showError: function($form, $error, $input){
		$form.addClass('form-invalid');
		$input.addClass('valid-false').removeClass('valid-true');
		$error.show('slide',{direction: 'right'}, 200);
	},
	
	hideError: function($error, $field){
		console.log('hideError');
		$field.removeClass('valid-false');
		$('.error-messages').hide('slide',{direction: 'up'}, 200);
		$error.hide('slide',{direction: 'right'}, 200);
	},
	
	setupFocus: function($form, $error, $input){
		var $form = $('#form-registration');
		var $firstName = $form.find('#input-register-firstname');
		var $email = $form.find('#input-register-email');
		var $password = $form.find('#input-register-password');
		var $zip = $form.find('#input-register-zip');

		var $errorFirstName1 = $form.find('.error-firstname.error-1');
		var $errorFirstName2 = $form.find('.error-firstname.error-2');
		var $errorEmail = $form.find('.error-email');
		var $errorPassword = $form.find('.error-password');
		var $errorZip = $form.find('.error-zip');

		$firstName.on('focus',function(){
			console.log('firstName focus');
			onlineForLife.Register.hideError($errorFirstName1, $firstName);
			onlineForLife.Register.hideError($errorFirstName2, $firstName);
		});
		$email.on('focus',function(){
			console.log('email focus');
			onlineForLife.Register.hideError($errorEmail,$email);
		});
		$password.on('focus',function(){
			console.log('password focus');
			onlineForLife.Register.hideError($errorPassword,$password);
		});
		$zip.on('focus',function(){
			console.log('zip focus');
			onlineForLife.Register.hideError($errorZip,$zip);
		});
	}
};

onlineForLife.Login = {
	init: function(){
		console.log('login init');
		onlineForLife.Login.setupAutoLogin();
		$('#form-login').on('submit',function(event){
			event.preventDefault();
			console.log('login submit clicked');
			onlineForLife.Login.handleFormSubmit();
			return false;
		});
	},
	
	setupAutoLogin: function(){
		var $form = $('#form-login');
		var $email = $form.find('#input-login-email');
		var $password = $form.find('#input-login-password');
		$('#login-brian').on('click',function(event){
			event.preventDefault();
			$email.val('brian@brian.com');
			$password.val('password1');
			$('#form-login').submit();
			return false;
		});
		$('#login-jon').on('click',function(event){
			event.preventDefault();
			$email.val('jon@redcurbsolutions.com');
			$password.val('password1');
			$('#form-login').submit();
			return false;
		});
	},
	
	showFirebaseError: function(error){
		console.log(error);
		var $error =  $('.error-messages');
		var $text = $error.find('span');
		var text = '';
		$text.text(error);
		$error.show('slide',{direction: 'down'}, 200);
	},

	handleFormSubmit: function(){
		console.log('handleFormSubmit');
		var $form = $('#form-login');
		var $email = $form.find('#input-login-email');
		var $password = $form.find('#input-login-password');
		var emailVal = $email.val();
		var passwordVal = $password.val();

		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				console.log('error');
				console.log(error);
				onlineForLife.Register.showFirebaseError(error);
				return;
			}
			if(user){
				// User is already logged in.
				console.log('logged in');
				console.log(user.email);
				onlineForLife.Login.handleFormSuccess();
			} else {
				// User is logged out.
				console.log('no user');
				var email = emailVal;
				var password = passwordVal;
				auth.login('password', {
				  email: email,
				  password: password,
				  rememberMe: false
				});
			}
		});
	},
	
	handleFormSuccess: function(){
		document.location="feed.html";
	}
};

onlineForLife.Forgot = {
	init: function(){
		$('#form-forgot').on('submit',function(e){
			e.preventDefault();
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

