var onlineForLife = window.onlineForLife || {}; onlineForLife.Auth = onlineForLife.Auth || {}; onlineForLife.Login = onlineForLife.Login || {}; onlineForLife.Login = onlineForLife.Login || {};

onlineForLife.Overrides = {
	init: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Overrides init');
		}

		onlineForLife.Overrides.getLatestFiles();
	},
	
	setupRegPage: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Overrides setupRegPage');
		}
		onlineForLife.Overrides.modifyDomItems();
		onlineForLife.Overrides.setupSpinners();
		onlineForLife.Auth.checkLoginStatus();
	},

	getLatestFiles: function(){
		var enablePasswordReset = true;
		if(enablePasswordReset){
			onlineForLife.Overrides.getScriptFiles();
		}
		else{
			onlineForLife.Overrides.setupRegPage();
		}
	},

	getScriptFiles: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('getScriptFiles');
		}
		var fbLoginJs = $.getScript('https://cdn.firebase.com/js/simple-login/1.2.5/firebase-simple-login.js');
			fbLoginJs.done(function( script, textStatus ) {
				onlineForLife.Auth.setupOverrideForgot();
				onlineForLife.Overrides.setupRegPage();
			});
			fbLoginJs.fail(function( jqxhr, settings, exception ) {
		});
	},

	modifyDomItems: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('modifyDomItems');
		}
		var firstNameHtml = '<i class="input-error error-firstname error-3"><i class="fa fa-exclamation-circle"></i><span>Please enter your first name only</span></i>';
		$('#form-registration .fieldset-text').append(firstNameHtml);
		$('#form-registration .error-firstname.error-1 span').text('First Name should only contain letters');
		$('#form-registration .error-firstname.error-2 span').text('First Name should be at least 2 characters');
		var $zip = $('#input-register-zip');
		$zip.get(0).type='tel';
	},

	setupSpinners: function(){
		onlineForLife.Overrides.setupSpinnersReg();
		onlineForLife.Overrides.setupSpinnersLogin();
		onlineForLife.Overrides.setupSpinnersForgot();
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
	},
	
	setupSpinnersForgot: function(){
		var $form = $('#form-forgot');
		var $btn = $form.find('.btn-primary');
		var spinnerHtml = '<i class="fa fa-spinner fa-spin"></i>';
		$btn.append(spinnerHtml);
	}
	
};
onlineForLife.Auth = {
	loadCount: 0,
	
	init: function(){
		//pagebeforecreate
		//pagecreate
		//pageinit
		//pagebeforehide
		//pagebeforeshow
		//pageremove
		//pagehide
		//pageshow
		
		Redcurb.Helpers.addDevConsole({name:'login',element:$('#login') });
		
		onlineForLife.Auth.loadCount += 1;
		device = {uuid:'A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'};
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('CONSOLE.LOGIN register-login.js v. 1.120');
			console.login('Auth.init');
		}
		if(typeof(device)=='undefined'){
			setTimeout(function(){
				onlineForLife.Auth.init();
			}, 1000);
		}
		else{
			onlineForLife.Auth.setupPage();
		}
		
		
	},
	
	setupPage: function(){
		console.log('setupPage');
		onlineForLife.Auth.checkPageParam();
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('setupPage 1','');
		}
		onlineForLife.Auth.setupDev();
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('setupPage 2');
		}
	},
	
	setupDev: function(){
		console.log('setupDev');
		$('#login').attr('href','');
		var $state = $('#input-register-state');
		stateVal = $state.val();
		var $name = $('#input-register-firstname');
		nameVal = $name.val();
		$state.bind('change',function(e){
			var firstText = $('#input-register-firstname').val();
			if(firstText.toLowerCase()=='dev'){
				$('body').addClass('test-mode-enabled');
			}
			return false;
		});
		$name.bind('blur',function(e){
			var firstText = $('#input-register-firstname').val();
			if(firstText.toLowerCase()=='devben' || firstText.toLowerCase()=='Devben'){
				var output = '';
				output += "uuid: " + device.uuid + '\n';
				output += "token: " + Redcurb.Helpers.getCookie('userFirebaseToken');
				alert(output);
			}
			return false;
		});
		//onlineForLife.Auth.setupErrorHandling();
	},
	
	setupErrorHandling: function(){
		window.ErrorData = {};
		var timestamp = new Date().getTime();
		ErrorData.timestamp = timestamp;

		//window.device = window.device || {};
		//window.device.uuid = window.device.uuid || "NO-UUID";
		
		if(device.uuid=='00DCDD5F-5643-4E60-85EB-D0C4AFE78813'){
			console.login("DEV LOGIN BEN");
			console.login(device);
		}
		if(device.uuid=='NO-UUID'){
			console.login("DEV LOGIN NO-UUID");
		}
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login("DEV LOGIN BRIAN");
			console.login(device);
		}
	},
	
	createErrorRecord: function(key,value){
		console.log('createErrorRecord');
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			if (typeof(value)=='undefined'){
				console.login(key);
			}
			else{
				console.login(key + ': ' + value);
			}
		}

		var data = {};
		data[key] = value;
		var errorDataRef =  new Firebase('https://ofl.firebaseio.com/errors/' + device.uuid);
		errorDataRef.child(ErrorData.timestamp).push(data);
	},
	
	checkPageParam: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('checkPageParam 1');
		}
		
		var testVal = Redcurb.Helpers.getParameterByName('test');
		var feedBypassVal = Redcurb.Helpers.getParameterByName('feedBypass');
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('checkPageParam 2');
		}
		if(testVal=="true"){
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login('checkPageParam testVal');
			}
			onlineForLife.Auth.test = true;
			$('body').addClass('test-mode-enabled');
		}
		if(feedBypassVal=="true"){
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login('checkPageParam bypass');
			}
			onlineForLife.Auth.feedBypass = true;
		}
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('checkPageParam 3');
		}
		onlineForLife.Overrides.init();
	},
	
	setupOverrideForgot: function(){
		var resetPageHtml = '<div data-role="page" id="reset" data-page="reset" class="page-register-login page-reset"><h3><i class="logo-main"></i></h3><form id="form-reset" novalidate class="form-register-login"><p class="error-messages success-messages-forgot"><i class="fa fa-unlock-alt"></i><span>Check your email for your new password.</span></p><p class="error-messages"><i class="fa fa-exclamation-triangle"></i><span></span></p><div class="fieldset fieldset-text"><input type="email" id="input-reset-email" placeholder="Email" required data-role="none" class="input-text first" /><input type="password" id="input-reset-password-temp" placeholder="Current/Temporary Password" required data-role="none" class="input-text" pattern=".{6,12}" title="Password must be 6 and 12 characters" /><input type="password" id="input-reset-password-new" placeholder="New Password" required data-role="none" class="input-text" pattern=".{6,12}" maxlength="12" title="Password must be 6 and 12 characters" /><input type="password" id="input-reset-password-new-confirm" placeholder="New Password Confirm" required data-role="none" class="input-text" pattern=".{6,12}" maxlength="12" title="Password must be 6 and 12 characters" /><i class="input-error error-email"><i class="fa fa-exclamation-circle"></i><span>Please enter your email address</span></i><i class="input-error error-password1"><i class="fa fa-exclamation-circle"></i><span>Please enter your temporary password</span></i><i class="input-error error-password2"><i class="fa fa-exclamation-circle"></i><span>Please enter your new password</span></i><i class="input-error error-password3"><i class="fa fa-exclamation-circle"></i><span>Please confirm your new password</span></i></div><div class="fieldset fieldset-btn"><a href="#login" class="btn btn-secondary" data-role="none">Login</a><button type="submit" class="btn btn-primary" data-role="none">Reset<i class="fa fa-spinner fa-spin"></i></button></div></form></div>';
		$('body').append(resetPageHtml);
		onlineForLife.Reset.init();
		
		var $loginBtnFieldset = $('#form-login .fieldset-btn');
		var loginFormForgotHtml = '<div class="fieldset-col fieldset-col-1"><a href="#forgot" class="link link-secondary" data-role="none">Forgot Password</a></div>';
		$loginBtnFieldset.append(loginFormForgotHtml);
		$('#form-login .error-messages').addClass('error-messages-login');
		
		var $forgotBtnFieldset = $('#forgot .fieldset-btn');
		var $forgotPrimary = $forgotBtnFieldset.find('.btn-primary');
		$forgotPrimary.text('Forgot Password');
		var forgotFormLoginHtml = '<a href="#login" class="btn btn-secondary" data-role="none">Login</a>';
		var resetLinkHtml = '<div class="fieldset-col fieldset-col-1" id="forgot-text-link"><a href="#reset" class="link link-secondary" data-role="none">Reset Password</a></div>';
		$forgotBtnFieldset.prepend(forgotFormLoginHtml);
		$('#form-forgot .fieldset-btn').append(resetLinkHtml);
	},
	
	userData: {},
	
	handleLoginSuccess: function(method, user, token){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('handleLoginSuccess');
		}
		if(token!="" && token!="undefined"){
			console.log('GOOD TOKEN');
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login('GOOD TOKEN', token);
			}
			Redcurb.Helpers.setCookie('userFirebaseToken',token,30);
		}
		onlineForLife.Auth.updateUserData(method, user);
	},
	
	goToFeed: function(){
		var paramString = '?userId=' + onlineForLife.Auth.userId;
		if(onlineForLife.Auth.test){
			paramString = paramString + '&test=true';
		}
		var feedUrl = "feed.html" + paramString;
		console.log('goToFeed: ' + feedUrl);
		if(!onlineForLife.Auth.feedBypass){
			document.location=feedUrl;
		}
	},
	
	updateUserData: function(method, user){
		//console.log('updateUserData: ' + method);
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
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('checkLoginStatus');
		}
		//console.log('+++++++++++ AUTH checkLoginStatus: ' + Redcurb.Helpers.getCookie('userFirebaseToken'));
		var loggedIn = false;
		
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login('login error');
				}
				//console.log('error');
				//console.log(error);
				return;
			}
			if (user) {
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login('user exists');
				}
				console.log("AUTH checkLoginStatus: User is already logged in");
				console.log(user);
				//console.log(user.email);
				onlineForLife.Login.init();
				onlineForLife.Auth.userId = user.id;
				onlineForLife.Auth.handleLoginSuccess('AUTO_LOGGED_IN',user,user.firebaseAuthToken);
			}
			else {
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login('user not logged in');
				}
				console.log("AUTH checkLoginStatus: User is logged out.");
				onlineForLife.Auth.tryTokenLogin();
			}
		});
	},
		
	tryTokenLogin: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('tryTokenLogin');
		}
		console.log('+++++++++++ tryTokenLogin: ');
		var token = Redcurb.Helpers.getCookie('userFirebaseToken');
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('token',token);
		}
		var dataRef = new Firebase("https://ofl.firebaseio.com/");
		//console.log('tryTokenLogin: ' + token);
		// Log me in.
		if(token=="undefined" || token==""){
			console.log('+++++++++++ tryTokenLogin: NO COOKIE TOKEN' );
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login('tryTokenLogin: NO COOKIE TOKEN');
			}
			if(Redcurb.Helpers.getCookie('userFirebaseLoggedOut')=="true"){
				console.log('user logged out');
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login('tryTokenLogin: user logged out');
				}
				$('#input-login-email').val(Redcurb.Helpers.getCookie('userEmail'));
				$.mobile.changePage( "#login", { transition: "none"} );
			}
			onlineForLife.Register.init();
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login('AFTER Register.init', token);
			}
			onlineForLife.Login.init();
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login('AFTER Login.init', token);
			}
		}
		else{
			console.log('+++++++++++ tryTokenLogin: COOKIE TOKEN Exists' );
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login('tryTokenLogin: COOKIE TOKEN Exists');
			}
			dataRef.auth(token, function(error,user) {
			  if(error) {
				console.log("Token Login Failed!", error);
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login('Token Login Failed!', error);
					console.login('Token Login Failed! error.code', error.code);
				}
				
				if(error.code=='EXPIRED_TOKEN'){
					onlineForLife.Register.init();
					onlineForLife.Login.init();
				}
			  }
			  else {
				console.log("Token Login Succeeded! - " );
				console.log('user');
				console.log(user);
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login('Token Login Succeeded!', user);
				}
				onlineForLife.Auth.userId = user.auth.id;
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
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Register.init');
		}
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
			}
			else {
				// User is logged out.
				auth.createUser(emailVal, passwordVal, function(error,  user) {
					if (!error) {
						//console.log('user created: ' + user.id);
						
						var usersUrl = 'https://ofl.firebaseio.com/users/'+user.id;
						var usersData = new Firebase(usersUrl);
		
						var totalUserCount =  new Firebase('https://ofl.firebaseio.com/users/count');
						totalUserCount.transaction(function(current_value) {
							return current_value + 1;
						});

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
					}
					else {
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
		onlineForLife.Auth.handleLoginSuccess('REG_SUCCESS',user,user.firebaseAuthToken);
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
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('setupHandlers');
		}
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
		var $errorFirstName2 = $form.find('.error-firstname.error-2');
		var $errorFirstName3 = $form.find('.error-firstname.error-3');
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
				if(fieldValue.indexOf(' ')>-1){
					onlineForLife.Register.showError($form, $errorFirstName3, $this);
				}
				else if(!regexFirstName.test(fieldValue)){
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
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('setupForm');
		}
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
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('setupFocus');
		}
		var $form = $('#form-registration');
		var $firstName = $form.find('#input-register-firstname');
		var $email = $form.find('#input-register-email');
		var $password = $form.find('#input-register-password');
		var $zip = $form.find('#input-register-zip');

		var $errorsFirstName = $form.find('.error-firstname');
		var $errorEmail = $form.find('.error-email');
		var $errorPassword = $form.find('.error-password');
		var $errorZip = $form.find('.error-zip');

		$firstName.on('focus',function(){
			//console.log('firstName focus');
			onlineForLife.Register.hideError($errorsFirstName, $firstName);
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
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('getStatesData');
		}
		onlineForLife.Register.emptyStateList();
		//console.log('getStatesData');
		onlineForLife.Register.states = {};
		var dbUrl = 'https://ofl.firebaseio.com/data/states';
		var dataRef = new Firebase(dbUrl);
		dataRef.once('value', function(snapshot) {
			var stateData = snapshot.val();
			onlineForLife.Register.states=stateData;
		});
	},
	
	getZIPDigitData: function($form){
		//console.log('getZIPDigitData');
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('getZIPDigitData');
		}
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
		//console.log('setupZIP');
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('setupZIPCode');
		}
		var $zip = $form.find('#input-register-zip');
		$zip.off('keyup');
		$zip.on('keyup',function() {
			//console.log('Handler for .keyup() called.');
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
		//console.log('setStateByFullZIP');
		var dbUrl = 'https://ofl.firebaseio.com/data/zipcodes/'+zipVal;
		var dataRef = new Firebase(dbUrl);
		var $list = $('#input-register-state');
		var stateData = onlineForLife.Register.states;
		dataRef.once('value', function(snapshot) {
			var stateCode = snapshot.val();
			if(stateCode===null){
				//console.log('no zip found');
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
		//console.log('zipVal: ' + zipVal);
		//console.log('zipLength: ' + zipLength);
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
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('No Token - Login init');
		}
		onlineForLife.Login.setupAutoLogin();
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Login.init AFTER setupAutoLogin');
		}
		onlineForLife.Login.setupFocus();
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Login.init AFTER setupFocus');
		}
		onlineForLife.Forgot.init();
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Login.init AFTER Forgot.init');
		}
		$('#form-login').on('submit',function(event){
			event.preventDefault();
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login('Login submit');
			}
			//console.log('login form submitted');
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login("DEV LOGIN FORM SUBMIT - Dev User");
			}
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
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('setupFocus');
		}
		var $form = $('#form-login');
		var $email = $form.find('#input-login-email');
		var $password = $form.find('#input-login-password');

		var $errorEmail = $form.find('.error-email');
		var $errorPassword = $form.find('.error-password');

		$email.on('focus',function(){
			//console.log('email focus');
			onlineForLife.Login.hideError($errorEmail,$email);
		});
		$email.on('blur',function(){
			//console.log('email focus');
			var emailVal = $email.val();
			$('#form-forgot input.input-text').val(emailVal);
			onlineForLife.Login.hideError($errorEmail,$email);
		});
		$password.on('focus',function(){
			//console.log('password focus');
			onlineForLife.Login.hideError($errorPassword,$password);
			onlineForLife.Login.hideError($errorPassword,$password);
			var emailVal = $email.val();
			$('#form-forgot input.input-text').val(emailVal);
		});
	},
	
	setupAutoLogin: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('setupAutoLogin');
		}
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
		var $error =  $('.error-messages.error-messages-login');
		var $text = $error.find('span');
		var text = '';
		$text.text(error);
		$error.show('slide',{direction: 'down'}, 200);
	},

	handleFormSubmit: function(){
		console.log('handleFormSubmit');
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login("handleFormSubmit - Dev User");
		}
		var $form = $('#form-login');
		var $email = $form.find('#input-login-email');
		var $password = $form.find('#input-login-password');
		var emailVal = $email.val();
		var passwordVal = $password.val();
		
		$form.addClass('submitting');
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
				console.login("handleFormSubmit AUTH - Dev User");
			}
			if (error) {
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login("handleFormSubmit ERROR - Dev User");
					console.login("handleFormSubmit ERROR");
					console.login(error);
				}
				console.log('Login error');
				//console.log(error);
				$form.removeClass('submitting');
				onlineForLife.Login.showFirebaseError(error);
				console.login("Login error");
				console.login(error);

				return;
			}
			if(user){
				// User is already logged in.
				//console.log('logged in');
				//console.log(user.firebaseAuthToken);
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login("handleFormSubmit user - Dev User");
					console.login("handleFormSubmit user.id");
					console.login(user.id);
					console.login("handleFormSubmit user.id");
					console.login(user);
					console.login("handleFormSubmit user.firebaseAuthToken",user.firebaseAuthToken);
				}
				onlineForLife.Auth.userId = user.id;
				Redcurb.Helpers.setCookie('userFirebaseToken',user.firebaseAuthToken,30);
				onlineForLife.Login.handleFormSuccess(user,auth);
			}
			else {
				// User is logged out.
				console.log('no user');
				var email = emailVal;
				var password = passwordVal;
				if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
					console.login("handleFormSubmit NO user",emailVal);
				}
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
		onlineForLife.Auth.handleLoginSuccess('LOGGED_IN',user,user.firebaseAuthToken);
	}
};

onlineForLife.Forgot = {
	init: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Forgot.init');
		}
		onlineForLife.Forgot.setupFocus();
		$('#forgot').on('submit',function(e){
			e.preventDefault();
			onlineForLife.Forgot.handleFormSubmit();
			return false;
		});
	},
	
	handleForgotPasswordSuccess: function(emailVal){
		$('#input-reset-email').val(emailVal);
		document.location="home.html#reset";
		$('#form-reset').find('.success-messages-forgot').show();
	},
	
	setupFocus: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Forgot setupFocus');
		}
		var $form = $('#form-forgot');
		var $email = $form.find('.input-text');
		var $errorEmail = $form.find('.error-messages');
		$email.on('focus',function(){
			$errorEmail.hide('slide',{direction: 'up'}, 200);
		});
		
		//	dev@radiantbone.com
		
	},
	
	handleForgotPasswordFail: function(error){
		console.log('error: ' + error.code);
		console.log(error);
		errorCode = error.code;
		var errorText = '';
		if(errorCode=='INVALID_USER' || errorCode=='INVALID_EMAIL'){
			errorText = 'That email address does not exist.';
		}
		onlineForLife.Forgot.showFirebaseError(errorText);
	},
	
	showFirebaseError: function(error){
		console.log('showFirebaseError');
		var $error =  $('#form-forgot .error-messages');
		var $text = $error.find('span');
		var text = '';
		$text.text(error);
		$error.show('slide',{direction: 'down'}, 200);
	},

	handleFormSubmit: function(){
		if(device.uuid=='A2BDEA12-36CB-4130-9676-5EC5DFD1AC5D'){
			console.login('Forgot handleFormSubmit');
		}
		var formOk = true;
		//formOk = false;
		$form = $('#form-forgot');
		var $email = $form.find('.input-text');
		var emailVal = $email.val();
		$form.addClass('submitting');
		//console.log('emailVal: ' + emailVal);
		if(formOk){
			
			var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
			var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
				if (error) {
					console.log('error');
					console.log(error);
					$form.removeClass('submitting');
					return;
				}
				if (user) {
					// User is already logged in.
					//console.log('User is already logged in.');
					//console.log(user);
					//console.log(user.email);
					$form.removeClass('submitting');

				} else {
					// User is logged out.
					console.log('no user');
					auth.sendPasswordResetEmail(emailVal, function(error, success) {
					  if (error) {
					  	$form.removeClass('submitting');
						console.log('Password reset ERROR');
						console.log(error);
						onlineForLife.Forgot.handleForgotPasswordFail(error);
					  }
					  if (!error) {
					  	  $form.removeClass('submitting');
						console.log('Password reset email sent successfully');
						onlineForLife.Forgot.handleForgotPasswordSuccess(emailVal);
					  }
					});
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
	
onlineForLife.Reset = {
	init: function(){
		onlineForLife.Reset.setupFocus();
		$('#form-reset').on('submit',function(event){
			event.preventDefault();
			onlineForLife.Reset.handleFormSubmit();
			return false;
		});
	},
	
	setupFocus: function(){
		
	},
	
	handleFormSuccess: function(){
		
	},
	
	showFirebaseError: function(){
		
	},
	
	handleFormSubmit: function(){
		console.log('handleFormSubmit');	

		var $form = $('#form-reset');
		var $email = $form.find('#input-reset-email');
		var $password = $form.find('#input-reset-password-temp');
		var $passwordNew = $form.find('#input-reset-password-new');
		var $passwordConfirm = $form.find('#input-reset-password-new-confirm');
		
		var emailVal = $email.val();
		var passwordVal = $password.val();
		var passwordNewVal = $passwordNew.val();
		var passwordConfirmVal = $passwordConfirm.val();
		
		
		
		
		$form.addClass('submitting');
		var firebaseUrl =  new Firebase('https://ofl.firebaseio.com');
		var auth = new FirebaseSimpleLogin(firebaseUrl, function(error, user) {
			if (error) {
				console.log('error');
				console.log(error);
				$form.removeClass('submitting');
				onlineForLife.Reset.showFirebaseError(error);
				return;
			}
			if(user){
				// User is already logged in.
				console.log('logged in');
				//console.log(user.firebaseAuthToken);
				$form.removeClass('submitting');
			} else {
				// User is logged out.
				console.log('no user');
				var email = emailVal;
				var oldPassword = passwordVal;
				var newPassword = passwordNewVal;
				var newPasswordConfirm = passwordConfirmVal;
				console.log('email: ' + email);
				console.log('oldPassword: ' + oldPassword);
				console.log('newPassword: ' + newPassword);
				console.log('newPasswordConfirm: ' + newPasswordConfirm);
				
				auth.changePassword(email, oldPassword, newPassword, function(error, success) {
				  if (!error) {
					console.log('Password changed successfully');
					$form.removeClass('submitting');
				  }
				  else{
				  	  $form.removeClass('submitting');
			  		console.log('ERROR');
			  		console.log(error);
				  }
				});
				
				
			}
		});



	}
	

};
