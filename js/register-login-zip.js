var onlineForLife = window.onlineForLife || {}; onlineForLife.Auth = onlineForLife.Auth || {}; onlineForLife.Login = onlineForLife.Login || {}; onlineForLife.Login = onlineForLife.Login || {};

onlineForLife.Overrides = {
	init: function(){
		onlineForLife.Overrides.setupSpinners();
		onlineForLife.Auth.checkLoginStatus();
	},
	
	setupSpinners: function(){
		onlineForLife.Overrides.setupSpinnersReg();
		onlineForLife.Overrides.setupSpinnersLogin();
	},
	
	setupSpinnersReg: function(){
		var $form = $('#form-registration');
		var $btn = $form.find('.btn-primary');
		var spinnerHtml = '<i class="fa fa-spinner fa-spin"></i>';
		$btn.append(spinnerHtml);
	},
	
	setupSpinnersLogin: function(){
		var $form = $('#form-login');
		var $btn = $form.find('.btn-primary');
		var spinnerHtml = '<i class="fa fa-spinner fa-spin"></i>';
		$btn.append(spinnerHtml);
	}
};
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
		onlineForLife.Auth.setupPage();
	},
	
	setupPage: function(){
		onlineForLife.Auth.checkPageParam();
		onlineForLife.Auth.setupDev();
	},
	
	setupDev: function(){
		$('#login').attr('href','');
		var $state = $('#input-register-state');
		stateVal = $state.val();
		$state.bind('change',function(e){
			var firstText = $('#input-register-firstname').val();
			if(firstText.toLowerCase()=='dev'){
				$('body').addClass('test-mode-enabled');
			}
			return false;
		});
	},
	
	checkPageParam: function(){
		var testVal = Redcurb.Helpers.getParameterByName('test');
		if(testVal=="true"){
			onlineForLife.Auth.test = true;
			$('body').addClass('test-mode-enabled');
		}
		onlineForLife.Overrides.init();
	},
	
	setupOverrideForgot: function(){
		var $loginBtnFieldset = $('#form-login .fieldset-btn');
		var loginFormForgotHtml = '<div class="fieldset-col fieldset-col-1"><a href="#forgot" class="link link-secondary" data-role="none">Forgot Password</a></div>';
		$loginBtnFieldset.append(loginFormForgotHtml);
		
		var $forgotBtnFieldset = $('#forgot .fieldset-btn');
		var $forgotPrimary = $forgotBtnFieldset.find('.btn-primary');
		$forgotPrimary.text('Reset Password');
		var forgotFormLoginHtml = '<a href="#login" class="btn btn-secondary" data-role="none">Login</a>';
		$forgotBtnFieldset.prepend(forgotFormLoginHtml);
	},
	
	userData: {},
	
	handleLoginSuccess: function(method, user, token){
		//console.log('handleLoginSuccess: ' + method);
		//console.log(user);
		//console.log('handleLoginSuccess',typeof(user.firebaseAuthToken)=='undefined');
		if(user.firebaseAuthToken!="" && user.firebaseAuthToken!="undefined" && typeof(user.firebaseAuthToken)=='undefined'){
			token = user.firebaseAuthToken;
		}
		if(token!="" && token!="undefined"){
			//console.log('GOOD TOKEN');
			Redcurb.Helpers.setCookie('userFirebaseToken',user.firebaseAuthToken,30);
		}
		onlineForLife.Auth.updateUserData(method, user);
	},
	
	goToFeed: function(){
		var paramString = '?userId=' + onlineForLife.Auth.userId;
		if(onlineForLife.Auth.test){
			paramString = paramString + '&test=true';
		}
		document.location="feed.html" + paramString;
	},
	
	updateUserData: function(method, user){
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com/users/' + user.id);
		var userDataRef =  new Firebase('https://ofl.firebaseio.com/users/' + user.id + '/userInfo');
		var formData = onlineForLife.Auth.userData;
		if(method=='REG_SUCCESS'){
			userDataRef.child('zip').set(formData.zip);
			userDataRef.child('name').set(formData.name);
		}
		if(typeof(device)!='undefined'){
			userDataRef.child('device').set(device);
		}
		onlineForLife.Auth.goToFeed();
	},
	
	checkLoginStatus: function(){
		var loggedIn = false;
		
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				//console.log('error');
				//console.log(error);
				return;
			}
			if (user) {
				// User is already logged in.
				//console.log(user);
				//console.log(user.email);
				onlineForLife.Login.init();
				onlineForLife.Auth.userId = user.id;
				onlineForLife.Auth.handleLoginSuccess('AUTO_LOGGED_IN',user,"");
			} else {
				// User is logged out.
				//console.log('no user');
				onlineForLife.Auth.tryTokenLogin();
			}
		});
		
	},
		
		
	tryTokenLogin: function(){
		var token = Redcurb.Helpers.getCookie('userFirebaseToken');
		var dataRef = new Firebase("https://ofl.firebaseio.com/");
		//console.log('tryTokenLogin: ' + token);
		// Log me in.
		if(Redcurb.Helpers.getCookie('userFirebaseToken')=="undefined" || Redcurb.Helpers.getCookie('userFirebaseToken')==""){
			onlineForLife.Register.init();
			onlineForLife.Login.init();
		}
		else{
			dataRef.auth(token, function(error,user) {
			  if(error) {
				//console.log("Token Login Failed!", error);
			  }
			  else {
				//console.log("Token Login Succeeded! - " + Redcurb.Helpers.getCookie('userFirebaseToken'));
				//console.log(user);	
				onlineForLife.Auth.handleLoginSuccess('TOKEN_LOGGED_IN',user,token);
			  }
			});
		}
	}
	
};

onlineForLife.Register = {
	inputCount:4,
	
	invalidItems:{
		
	},
	
	init: function(){
		//console.log('reg init');		
		onlineForLife.Register.setupFocus();
		onlineForLife.Register.setupForm();
		var $form = $('#form-registration');
		$form.on('submit',function(event){
			event.preventDefault();
			onlineForLife.Register.handleFormSubmit($form);
		});
	},

	showFirebaseError: function(error){
		//console.log(error);
		var $error =  $('.error-messages');
		var $text = $error.find('span');
		var text = '';
		$text.text(error);
		$error.show('slide',{direction: 'down'}, 200);
	},

	createUser: function($form){
		//console.log('createUser');
		var $firstName = $form.find('#input-register-firstname');
		var $email = $form.find('#input-register-email');
		var $password = $form.find('#input-register-password');
		var $zip = $form.find('#input-register-zip');
		var $state = $form.find('#input-register-state');
		var firstNameVal = $firstName.val();
		var emailVal = $email.val();
		var passwordVal = $password.val();
		var zipVal = $zip.val();
		var stateVal = $state.val();
		
		
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				$form.removeClass('submitting');
				//console.log('error');
				onlineForLife.Register.showFirebaseError(error);
				return;
			}
			if (user) {
				// User is already logged in.
				//console.log('already logged in');
				//console.log(user);
				onlineForLife.Register.handleRegSuccess(user);
			} else {
				// User is logged out.
				auth.createUser(emailVal, passwordVal, function(error,  user) {
					if (!error) {
						//console.log('user created: ' + user.id);
						
						var usersUrl = 'https://ofl.firebaseio.com/users/'+user.id;
						var usersData = new Firebase(usersUrl);
		
						onlineForLife.Auth.userId = user.id;
						var userId = user.id;
						var userEmail = user.email;
						var userName = firstNameVal;
						var userZip = zipVal;
						var userState = stateVal;
						var timestamp = new Date().getTime();
						var timestampVal = timestamp.toString();
						var deviceData = {"platform" : "", "available" : "", "model" : "", "cordova" : "", "version" : "", "uuid" : ""};
						var configData = {"push" : { "token" : "", "allowed" : "", "specialUpdates" : "", "none" : "", "UUID" : "", "dailySummary" : "", "everyLifeChoice" : ""}};					
						var userInfoData = { id: userId, email: userEmail, name: userName, zip: userZip, state: userState };
						
						var userTableData = {};
						userTableData.id = userId;
						userTableData.timestamp = timestamp;
						userTableData.config = configData;
						userTableData.userInfo = userInfoData;
						userTableData.userInfo.device = deviceData;
						usersData.set(userTableData);
						
						usersData.child('config').set(configData);
						usersData.child('userInfo').set(userInfoData);
						onlineForLife.Auth.userData = userInfoData;
		
						auth.login('password', {
						  email: emailVal,
						  password: passwordVal,
						  rememberMe: true
						});
					} else {
						$form.removeClass('submitting');
						//console.log('createUser error');
						onlineForLife.Register.showFirebaseError(error);
					}
				});
			}
		});
	},
	
	handleRegSuccess: function(user){
		//console.log('handleRegSuccess');
		onlineForLife.Auth.handleLoginSuccess('REG_SUCCESS',user,"");
	},
	
	handleRegError: function(){
		//console.log('handleRegError');
	},
	
	handleFormSubmit: function($form){
		var formOk = onlineForLife.Register.validateForm();
		if(formOk){
			$form.addClass('submitting');
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
			//console.log('firstName blur');
			onlineForLife.Register.handleInputValidation($form, $(this));
		});
		$email.on('blur',function(){
			//console.log('email blur');
			onlineForLife.Register.handleInputValidation($form, $(this));
		});
		$password.on('blur',function(){
			//console.log('password blur');
			onlineForLife.Register.handleInputValidation($form, $(this));
		});
		$zip.on('blur',function(){
			//console.log('zip blur');
			onlineForLife.Register.handleInputValidation($form, $(this));
		});
	},
	
	handleInputValidation: function($form, $this){
		var fieldId = $this.attr('id');
		//console.log('handleInputValidation',fieldId);
		
		var regexFirstName = /^[a-zA-Z\.\,\+\-]*$/;
		var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var regexPassword = /.{6,12}/;		
		var regexZip = /.{5,5}/;

		var $errorFirstName1 = $form.find('.error-firstname.error-1');
		$errorFirstName1.text('Name should only contain letters');
		var $errorFirstName2 = $form.find('.error-firstname.error-2');
		var $errorEmail = $form.find('.error-email');
		var $errorPassword = $form.find('.error-password');
		var $errorZip = $form.find('.error-zip:first');
		//console.log($this);
		if(fieldId=='input-register-firstname'){
			var fieldValue = $this.val();
			//console.log('fieldValue',fieldValue);
			if(!regexFirstName.test(fieldValue) || fieldValue.length<2){
				//console.log('first name incorrect');
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
				//console.log('email incorrect');
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
				//console.log('password incorrect');
				formValid = false;
				onlineForLife.Register.showError($form,$errorPassword,$this);
			}
		}

		if(fieldId=='input-register-zip'){
			var fieldValue = $this.val();
			if(regexZip.test(fieldValue) && fieldValue.length==5){
				//console.log('zip ok');
				$this.addClass('valid-true');
			}
			else{
				//console.log('zip incorrect',$('#input-register-zip').val().length);
				formValid = false;
				onlineForLife.Register.showError($form,$errorZip,$this);
			}
		}


		
	},
	
	setupForm: function(){
		var $form = $('#form-registration');
		onlineForLife.Register.setupHandlers();
		onlineForLife.Register.getStatesData($form);
		onlineForLife.Register.getZIPDigitData($form);
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
		//console.log('errorCount',errorCount);
		//console.log('validCount',validCount);
		//console.log('validCount==inputCount',validCount==inputCount);
		
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
		//console.log('hideError');
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
			//console.log('firstName focus');
			onlineForLife.Register.hideError($errorFirstName1, $firstName);
			onlineForLife.Register.hideError($errorFirstName2, $firstName);
		});
		$email.on('focus',function(){
			//console.log('email focus');
			onlineForLife.Register.hideError($errorEmail,$email);
		});
		$password.on('focus',function(){
			//console.log('password focus');
			onlineForLife.Register.hideError($errorPassword,$password);
		});
		$zip.on('focus',function(){
			//console.log('zip focus');
			onlineForLife.Register.hideError($errorZip,$zip);
		});
	},
	
	emptyStateList: function(){
		var html = '<option value="" disabled>State</option>';
		var $state = $('#input-register-state').addClass('list-empty');
		$state.html(html);
	},
	
	getStatesData: function($form){
		onlineForLife.Register.emptyStateList();
		console.log('getStatesData');
		onlineForLife.Register.states = {};
		var dbUrl = 'https://ofl.firebaseio.com/data/states';
		var dataRef = new Firebase(dbUrl);
		dataRef.once('value', function(snapshot) {
			var stateData = snapshot.val();
			onlineForLife.Register.states=stateData;
		});
	},
	
	getZIPDigitData: function($form){
		console.log('getZIPDigitData');
		onlineForLife.Register.setupZIPCode($form);
		onlineForLife.Register.zipCodesByDigit = {};
		var dbUrl = 'https://ofl.firebaseio.com/data/zipCodesByDigit';
		var dataRef = new Firebase(dbUrl);
		dataRef.once('value', function(snapshot) {
			var zipData = snapshot.val();
			onlineForLife.Register.zipCodesByDigit=zipData;
		});
	},
	
	setupZIPCode: function($form){
		console.log('setupZIP');
		var $zip = $form.find('#input-register-zip');
		$zip.off('keyup');
		$zip.on('keyup',function() {
			console.log('Handler for .keyup() called.');
			onlineForLife.Register.handleZIPKeyup($zip);
		});
		var $errorZip2Html = '<i class="input-error error-zip error2"><i class="fa fa-exclamation-circle"></i><span>Please enter a valid ZIP Code</span></i>';
		$form.find('.fieldset-text').append($errorZip2Html);
	},
	
	checkZIPString: function($form,$errorZip,$zip){
		var validChar = true;
		var prevText = $zip.data('prevText');
		if(validChar){
			$zip.data('prevText',zipVal);
		}
	},
	
	handleZIPNotFound: function(){
		var $form = $('#form-registration');
		var $errorZip = $form.find('.error-zip.error2');
		var $zip = $form.find('#input-register-zip');
		onlineForLife.Register.emptyStateList();
		onlineForLife.Register.showError($form,$errorZip,$zip);
	},
	
	setStateByFullZIP: function(zipVal){
		console.log('setStateByFullZIP');
		var dbUrl = 'https://ofl.firebaseio.com/data/zipcodes/'+zipVal;
		var dataRef = new Firebase(dbUrl);
		var $list = $('#input-register-state');
		var stateData = onlineForLife.Register.states;
		dataRef.once('value', function(snapshot) {
			var stateCode = snapshot.val();
			if(stateCode===null){
				console.log('no zip found');
				onlineForLife.Register.handleZIPNotFound();
			}
			else{
				var html = '<option value="' + stateCode + '">' + stateData[stateCode] + '</option>';
				$list.html(html).removeClass('list-empty');
			}
		});
	},
	
	filterStateList: function(length,zipVal){
		var states = onlineForLife.Register.zipCodesByDigit[zipVal];
		var $list = $('#input-register-state');
		var html = '';
		var stateData = onlineForLife.Register.states;
		if(length==1){
			$.each(states,function(key,stateCode){
				html += '<option value="' + stateCode + '">' + stateData[stateCode] + '</option>';
			});
			$list.html(html).removeClass('list-empty');
		}
		else if(length==5){
			onlineForLife.Register.setStateByFullZIP(zipVal);
		}
	},
	
	handleZIPKeyup: function($zip){
		var $form = $('#form-registration');
		var zipVal = $zip.val();
		var zipLength = zipVal.length;
		console.log('zipVal: ' + zipVal);
		console.log('zipLength: ' + zipLength);
		if(zipLength==0){
			onlineForLife.Register.emptyStateList();
		}
		else if(zipLength==5){
			onlineForLife.Register.filterStateList(zipLength,zipVal);
		}
		else{
			onlineForLife.Register.filterStateList(1,zipVal.charAt(0));
			$form.find('.input-error.error-zip.error2').hide('slide',{direction: 'right'}, 200);	
		}
	}
};

onlineForLife.Login = {
	init: function(){
		//console.log('login init');
		onlineForLife.Login.setupAutoLogin();
		onlineForLife.Login.setupFocus();
		onlineForLife.Forgot.init();
		$('#form-login').on('submit',function(event){
			event.preventDefault();
			//console.log('login submit clicked');
			onlineForLife.Login.handleFormSubmit();
			return false;
		});
	},
	
	showError: function($form, $error, $input){
		$form.addClass('form-invalid');
		$input.addClass('valid-false').removeClass('valid-true');
		$error.show('slide',{direction: 'right'}, 200);
	},
	
	hideError: function($error, $field){
		//console.log('hideError');
		$field.removeClass('valid-false');
		$('.error-messages').hide('slide',{direction: 'up'}, 200);
		$error.hide('slide',{direction: 'right'}, 200);
	},
	
	setupFocus: function($form, $error, $input){
		var $form = $('#form-login');
		var $email = $form.find('#input-login-email');
		var $password = $form.find('#input-login-password');

		var $errorEmail = $form.find('.error-email');
		var $errorPassword = $form.find('.error-password');

		$email.on('focus',function(){
			//console.log('email focus');
			onlineForLife.Login.hideError($errorEmail,$email);
		});
		$password.on('focus',function(){
			//console.log('password focus');
			onlineForLife.Login.hideError($errorPassword,$password);
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
		//console.log(error);
		var $error =  $('.error-messages');
		var $text = $error.find('span');
		var text = '';
		$text.text(error);
		$error.show('slide',{direction: 'down'}, 200);
	},

	handleFormSubmit: function(){
		//console.log('handleFormSubmit');
		var $form = $('#form-login');
		var $email = $form.find('#input-login-email');
		var $password = $form.find('#input-login-password');
		var emailVal = $email.val();
		var passwordVal = $password.val();

		$form.addClass('submitting');
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				//console.log('error');
				//console.log(error);
				$form.removeClass('submitting');
				onlineForLife.Register.showFirebaseError(error);
				return;
			}
			if(user){
				// User is already logged in.
				//console.log('logged in');
				//console.log(user.email);
				onlineForLife.Auth.userId = user.id;
				onlineForLife.Login.handleFormSuccess(user,auth);
			} else {
				// User is logged out.
				//console.log('no user');
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
	
	handleFormSuccess: function(user,auth){
		//console.log('handleFormSuccess');
		//console.log(auth);
		onlineForLife.Auth.handleLoginSuccess('LOGGED_IN',user,"");
	}
};

onlineForLife.Forgot = {
	init: function(){
		$('#forgot').on('submit',function(e){
			e.preventDefault();
			onlineForLife.Forgot.handleFormSubmit();
			return false;
		});
	},
	
	handleFormSubmit: function(){
		var formOk = true;
		//formOk = false;
		$form = $('#form-forgot');
		var $email = $form.find('.input-text');
		$email.val('pinky@brian.com');
		var emailVal = $email.val();
		//console.log('emailVal: ' + emailVal);
		if(formOk){
			var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
			var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
				if (error) {
					//console.log('error');
					//console.log(error);
					return;
				}
				if (user) {
					// User is already logged in.
					//console.log('User is already logged in.');
					//console.log(user);
					//console.log(user.email);

					this.sendPasswordResetEmail('aaa', function(error, success) {
					  if (error) {
						//console.log('Password reset ERROR');
					  }
					  if (!error) {
						//console.log('Password reset email sent successfully');
					  }
					});

				} else {
					// User is logged out.
					//console.log('no user');
				}
			});
			/*
			auth.sendPasswordResetEmail(emailVal, function(error, success) {
			  if (!error) {
				//console.log('Password reset email sent successfully');
			  }
			});
			*/
			//document.location="home.html#login";
			//onlineForLife.Auth.handleLoginSuccess();
		}
	}
};
