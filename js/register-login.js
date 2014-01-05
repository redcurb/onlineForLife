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
	inputCount:4,
	
	invalidItems:{
		
	},
	
	init: function(){
		console.log('reg init');		
		onlineForLife.Register.setupFocus();
		onlineForLife.Register.setupForm();
		
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
		console.log($this);
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

