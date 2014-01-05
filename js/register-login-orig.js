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
	invalidItems:{
		
	},
	
	init: function(){
		console.log('reg init');		
		onlineForLife.Register.setupFocus();
		$('#form-registration').on('submit',function(event){
			event.preventDefault();
			onlineForLife.Register.handleFormSubmit();
		});
	},
	
	handleFormSubmit: function(){
		var formOk = onlineForLife.Register.validateForm();
		if(formOk){
			document.location = 'feed.html';
		}
		else{
			//alert('fix it');
		}
	},
	
	validateForm: function(){
		var formValid = true;
		//formValid = false;
		var $form = $('#form-registration');
		var $firstName = $form.find('#input-register-firstname');
		var $email = $form.find('#input-register-email');
		var $password = $form.find('#input-register-password');
		var $zip = $form.find('#input-register-zip');
		var $inputs = $form.find('input[data-validate=true]');
		var $errorFirstName1 = $form.find('.error-firstname.error-1');
		var $errorFirstName2 = $form.find('.error-firstname.error-2');
		var $errorEmail = $form.find('.error-email');
		var $errorPassword = $form.find('.error-password');
		var $errorZip = $form.find('.error-zip');

		
		if($form.hasClass('form-invalid')){
			$inputs.removeClass('valid-false');
			$form.removeClass('form-invalid');
			onlineForLife.Register.hideAllErrors($form);
		}
		
		
		var firstNameValue = $firstName.val();
		var emailValue = $email.val();
		var passwordValue = $password.val();
		var zipValue = $zip.val();
		var zipString = zipValue.toString();
		
		var output = '';
		output += 'firstName: ' + firstNameValue + '\n';
		output += 'email: ' + emailValue + '\n';
		output += 'password: ' + passwordValue + '\n';
		output += 'zip: ' + zipValue + '\n';
		console.log(output);

		var regexFirstName = /^[a-zA-Z\.\,\+\-]*$/;
		var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var regexPassword = /.{6,12}/;		
		var regexZip = /.{5}/;
		console.log(regexEmail.test(emailValue));
		
		
		if(!regexFirstName.test(firstNameValue) || firstNameValue.length<2){
			console.log('first name incorrect');
			formValid = false;
			if(!regexFirstName.test(firstNameValue)){
				onlineForLife.Register.showError($form, $errorFirstName1, $firstName);
			}
			else if(firstNameValue.length<2){
				onlineForLife.Register.showError($form, $errorFirstName2, $firstName);
			}
		}

		if(!regexEmail.test(emailValue)){
			console.log('email incorrect');
			formValid = false;
			onlineForLife.Register.showError($form,$errorEmail,$email);
		}
		
		if(!regexPassword.test(passwordValue)){
			console.log('password incorrect');
			formValid = false;
			onlineForLife.Register.showError($form,$errorPassword,$password);
		}
		
		if(!regexZip.test(zipValue)){
			console.log('zip incorrect');
			formValid = false;
			onlineForLife.Register.showError($form,$errorZip,$zip);
		}
		
		
		return formValid;
	},
	
	hideAllErrors: function($form){
		$form.find('.input-error').hide('slide',{direction: 'right'}, 200);
	},
	
	showError: function($form, $error, $input){
		$form.addClass('form-invalid');
		$input.addClass('valid-false');
		$error.show('slide',{direction: 'right'}, 200);
	},
	
	hideError: function($error){
		console.log('hideError');
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
			onlineForLife.Register.hideError($errorFirstName1);
			onlineForLife.Register.hideError($errorFirstName2);
		});
		$email.on('focus',function(){
			console.log('email focus');
			onlineForLife.Register.hideError($errorEmail);
		});
		$password.on('focus',function(){
			console.log('password focus');
			onlineForLife.Register.hideError($errorPassword);
		});
		$zip.on('focus',function(){
			console.log('zip focus');
			onlineForLife.Register.hideError($errorZip);
		});
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

