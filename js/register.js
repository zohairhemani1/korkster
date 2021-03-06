var error;

$(document).ready(function(e) 
{
	signupForm();
	loginForm();
	contactForm();
});

// register form ajax

function contactForm()
{
		// variable to hold request
		var request;
		// bind to the submit event of our form
		$("#contact-form").submit(function(event){
		// show loading bar until the json is recieved
	
		contact_validation();
		
    	// abort any pending request
		if (request) {
			request.abort();
		}
		// setup some local variables
		var $form = $(this);
		// let's select and cache all the fields
		var $inputs = $form.find("input, select, button, textarea");
		// serialize the data in the form
		var serializedData = $form.serialize();
		
		
		// let's disable the inputs for the duration of the ajax request
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
		
			
		if(error.length==0)
		{
			$('.genload').css("padding-top", "20px");
			$('.genload').css("padding-bottom", "20px");
			
			$('#loading-contact').html("<img src='img/loading.gif'>");
			 $inputs.prop("disabled", true);
		// fire off the request to /form.php
			request = $.ajax({
				url: "contactus.php",
				type: "post",
				data: serializedData
			});
				// callback handler that will be called on success
			request.done(function (response, textStatus, jqXHR){
				// log a message to the console
				
				//console.log("Hooray, it worked!");
				$('#loading-contact').html('');
				if(response=="success")
				{
					$('#loading-contact').html('<span class =\'alert alert-success\'><strong>Your message has been successfully sent! </strong>.</span>');
					setTimeout(function() {   //calls after a certain time
					   window.location.href = document.location.search;
					}, 2000);
				}
				else
				{
					$('#loading-contact').html('<span class=\'alert alert-danger\'>Sorry, There has been an error in our system!</span>');
				}
			});
		
			// callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
				// log the error to the console
				$('#loading-contact').html('');
				alert('Request Failed!');
				console.error(
					"The following error occured: "+
					textStatus, errorThrown
				);
			});
	
			// callback handler that will be called regardless
			// if the request failed or succeeded
			request.always(function () {
				// reenable the inputs
				$inputs.prop("disabled", false);
			});
			
			
		} // if clause end's here of validation
	
		// prevent default posting of form
		event.preventDefault();
	});
	
}
function contact_validation()

{
	error = [];
	var errorDiv = document.getElementById('error');
	errorDiv.innerHTML = "";
	var name = document.getElementById('name-contact').value;
	var email = document.getElementById('email-contact').value;
	var message = document.getElementById('message-contact').value;
	
	if($('#message-contact').val().length < 4)
	{
		$('.genload').css("padding-top", "20px");
		$('.genload').css("padding-bottom", "20px");
		$('#loading-contact').html('<span class=\'alert alert-warning\'><strong>Your message is too short.</strong></span>');
		error.push("Message is too short!");
	}
	function nullCheck(inputField,nameToPrintOnScreen){
		if(inputField==null || inputField=="")
		{
			var e = nameToPrintOnScreen+" Cannot be left empty! <br/>"
			error.push(e + "");
		}
		
	}
	
	nullCheck(name,"Name");
	nullCheck(message,"Message");
	nullCheck(email,"Email");
	
	for(var i=0; i<error.length; i++)
	{
		errorDiv.innerHTML += error[i];
	}
}

function signupForm()
{
		// variable to hold request
		var request;
		// bind to the submit event of our form
		$("#signup").submit(function(event){
	
		// show loading bar until the json is recieved
		validation();
		
    	// abort any pending request
		if (request) {
			request.abort();
		}
		// setup some local variables
		var $form = $(this);
		// let's select and cache all the fields
		var $inputs = $form.find("input, select, button, textarea");
		// serialize the data in the form
		var serializedData = $form.serialize();
		
		
		// let's disable the inputs for the duration of the ajax request
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
			
		if(error.length==0)
		{
			$('.genload').css("padding-top", "20px");
			$('.genload').css("padding-bottom", "20px");
				
			$('#loading').html("<img src='img/loading.gif'>");
			 $inputs.prop("disabled", true);
		// fire off the request to /form.php
			request = $.ajax({
				url: "signup_form.php",
				type: "post",
				data: serializedData
			});
			
				// callback handler that will be called on success
			request.done(function (response, textStatus, jqXHR){
				// log a message to the console
				
				//console.log("Hooray, it worked!");
				$('#loading').html('');
				if(response == "success")
				{
					$('#loading').html('<span class =\'alert alert-success\'><strong>Registered Successfully! </strong>. A Verificaiton Link has been Emailed to you!</span>');
					setTimeout(function() {   //calls after a certain time
					   window.location.href = "index.php";
					}, 2000);
				}
				else if(response == "username already exist")
				{
					$('#loading').html('<span class=\'alert alert-danger\'><strong>Username not available!</strong> Select a different username.</span>');
				}
				else if(response == "email address already exist")
				{
					$('#loading').html('<span class=\'alert alert-danger\'><strong>An account with the same email address already exists!</strong></span>');
				}
				else if(response == "You are already registered, Logging you in!")
				{
					$('#loading').html('<span class=\'alert alert-danger\'><strong>You are already registered, Logging you in!</strong></span>');
					LoginFormFB(_userID);
				}
				/*else if(response == "password didn't match"){
					$('#loading').html('<span class=\'alert alert-warning\'><strong>Oops! Password did not match! Try again.</strong></span>');
				}*/
				else{
					$('#loading').html('<span class=\'alert alert-danger\'>Sorry, There has been an error in our system!' + response+'</span>');
				}
			});
		
			// callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
				// log the error to the console
				$('#loading').html('');
				alert('Request Failed!');
				console.error(
					"The following error occured: "+
					textStatus, errorThrown
				);
			});
	
			// callback handler that will be called regardless
			// if the request failed or succeeded
			request.always(function () {
				// reenable the inputs
				$inputs.prop("disabled", false);
			});
			
			
		} // if clause end's here of validation
	
		// prevent default posting of form
		event.preventDefault();
	});
	
}




function signupFormFB(userID, fname,lname,email,profilePic)
{
	
		
	
		// variable to hold request
		var request;
		
    	// abort any pending request
		if (request) {
			request.abort();
		}
		
			console.log(userID+fname+lname+email+profilePic);
		
			$('#loading').html("<img src='img/loading.gif'>");
			
			request = $.ajax({
				url: "signup_form_fb.php",
				type: "post",
				data: {username:userID,firstname:fname,lastname:lname,email:email,profilePic:profilePic}
			});
			
				// callback handler that will be called on success
			request.done(function (response, textStatus, jqXHR){
				// log a message to the console
				
				console.log("Hooray, it worked!");
				$('#loading').html('');
				
				alert(JSON.stringify(response));
				
				if(response=="success")
				{
					$('#loading').html('<span class =\'alert alert-success\'><strong>Registered Successfully! </strong>. A Verificaiton Link has been Emailed to you!</span>');
					console.log('You have been REGISTERED successfully!  A Verificaiton Link has been Emailed to you!');
					LoginFormFB(userID);
				}
				else if(response == "You are already registered, Logging you in!")
				{
					$('#loading').html('<span class=\'alert alert-warning\'><strong>You are already registered!</strong> Logging you in.</span>');
					console.log('You are already registered, Logging you in!');
					LoginFormFB(userID);
				}
				else
				{
					$('#loading').html('<span class=\'alert alert-danger\'>Sorry, There has been an error in our system!' + response+'</span>');

					console.log('Sorry, There has been an error in our system! We are working on it. Thank You for your patience. ' + response);
				}
				
				//window.location.href = "your-questions.html";
			});
		
			// callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
				// log the error to the console
				$('#loading').html('');
				alert('Request Failed!');
				console.error(
					"The following error occured: "+
					textStatus, errorThrown
				);
			});
	
			// callback handler that will be called regardless
			// if the request failed or succeeded
			request.always(function () {
				// reenable the inputs
			//	$inputs.prop("disabled", false);
			});
			
}







function validation()

{
	error = [];
	/*var errorDiv = document.getElementById('error');
	errorDiv.innerHTML = "";*/
	var username = document.getElementById('username').value;
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var email = document.getElementById('email').value;
	var college = document.getElementById('regsearch').value;
	var password = document.getElementById('password').value;
	var verifyPassword = document.getElementById('verifyPassword').value;
	if($('#regresults').text() == "No results found!"){
		$('.genload').css("padding-top", "20px");
		$('.genload').css("padding-bottom", "20px");
		$('#loading').html('<span class=\'alert alert-warning\'><strong>Sorry! No school found with the name "'+$('#regsearch').val()+'".</strong></span>');
		error.push('no school found');
	}
	if($('#password').val() != $('#verifyPassword').val())
	{
		$('.genload').css("padding-top", "20px");
		$('.genload').css("padding-bottom", "20px");
		$('#loading').html('<span class=\'alert alert-warning\'><strong>Oops! Password did not match! Try again.</strong></span>');
		error.push('password didnt match');
	}
	
	nullCheck(username,"Username");
	nullCheck(firstName,"First Name");
	nullCheck(lastName,"Last Name");
	nullCheck(college,"College");
	nullCheck(email,"Email");
	nullCheck(password,"Password");
	nullCheck(verifyPassword,"Verify Password");
	/*
	for(var i=0; i<error.length; i++)
	{
		errorDiv.innerHTML += error[i];
	}*/
}


function nullCheck(inputField,nameToPrintOnScreen)
{
	
	if(inputField==null || inputField=="")
	{
		var e = nameToPrintOnScreen+" Cannot be left empty! <br/>"
		error.push(e + "");
	}
	
}



// login form code below.






function LoginFormFB()
{
	console.log('fb');
		// variable to hold request
		var request;
		// bind to the submit event of our form
		
    // abort any pending request
		if (request) {
			request.abort();
		}
	
		// let's disable the inputs for the duration of the ajax request
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
			
			$('#loading-login').html("<img src='img/loading.gif'>");
		// fire off the request to /form.php
			request = $.ajax({
				url: "login_form_fb.php",
				type: "post",
				data: {userID:_userID}
			});
			
				// callback handler that will be called on success
			request.done(function (response, textStatus, jqXHR){
				// log a message to the console
				
				//alert(response);
				
				console.log("Hooray, it worked!");
				$('#loading-login').html('');
				
				if(response=="success")
				{
					$('#loading-login').html('<span class=\'alert alert-success\'><strong>Login Successfull</strong></span>');
					window.location.href = "index.php";
				}
				else if(response == "incorrect credentials")
				{
					$('#loading-login').html('<span class=\'alert alert-danger\'><strong>Incorrect Credentials.</strong></span>');
					
				}
				else
				{
					$('#loading-login').html('<span class=\'alert alert-danger\'><strong>Sorry, There has been an error in our system!</strong>' + response+'</span>');
				}
				
				//window.location.href = "your-questions.html";
			});
		
			// callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
				// log the error to the console
				$('#loading-login').html('');
				alert('Request Failed!');
				console.error(
					"The following error occured: "+
					textStatus, errorThrown
				);
			});
	
			// callback handler that will be called regardless
			// if the request failed or succeeded
			request.always(function () {
				// reenable the inputs
			});
			
			
	
		// prevent default posting of form
		//event.preventDefault();
	
	
}





function loginForm()
{
	
		// variable to hold request
		var request;
		// bind to the submit event of our form
		$("#login-form").submit(function(event){
		// show loading bar until the json is recieved
		//alert('Login Submit button clicked!');
		loginValidation();
		
    // abort any pending request
		if (request) {
			request.abort();
		}
		// setup some local variables
		var $form = $(this);
		// let's select and cache all the fields
		var $inputs = $form.find("input, select, button, textarea");
		// serialize the data in the form
		var serializedData = $form.serialize();
		
		
		// let's disable the inputs for the duration of the ajax request
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
			
		if(error.length==0)
		{
			$('.genload').css("padding-top", "20px");
			$('.genload').css("padding-bottom", "20px");
			
			$('#loading-login').html("<img src='img/loading.gif'>");
			 $inputs.prop("disabled", true);
		// fire off the request to /form.php
			request = $.ajax({
				url: "login_form.php",
				type: "post",
				data: serializedData
			});
			
				// callback handler that will be called on success
				request.done(function (response, textStatus, jqXHR){
				// log a message to the console
				
				//alert(response);
				$('#loading-login').html('');
				
				if(response=="success")
				{
					$('#loading-login').html('<span class=\'alert alert-success\'><strong>Login Successfull</strong></span>');
					var sPageURL = window.location.search.substring(1);
					var sParameterName = sPageURL.split('=');
					if (sParameterName[0] == 'status') 
					{
						window.location.href = 'index.php';
					}else{
					window.location.href = document.location.search;
					}
				}
				else if(response == "incorrect credentials")
				{
					$('#loading-login').html('<span class=\'alert alert-danger\'><strong>Incorrect Credentials.</strong></span>');
					$('#password-login').val('');
				}
				else
				{
					$('#loading-login').html('<span class=\'alert alert-danger\'><strong>Sorry, There has been an error in our system!</strong>' + response+'</span>');
				}
			});
		
			// callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
				// log the error to the console
				$('#loading-login').html('');
				alert('Request Failed!');
				console.error(
					"The following error occured: "+textStatus, errorThrown
				);
			});
	
			// callback handler that will be called regardless
			// if the request failed or succeeded
			request.always(function () {
				// reenable the inputs
			$inputs.prop("disabled", false);
			});
			
			
		} // if clause end's here of validation
	
		// prevent default posting of form
		event.preventDefault();
	});
	
}


function loginValidation()
{
	error = [];
	
	var errorDiv = document.getElementById('error-login');
	errorDiv.innerHTML = "<span class=\'alert alert-danger\'>";
	var username = document.getElementById('username-login').value;
	var password = document.getElementById('password-login').value;
	
	nullCheck(username,"Username");
	nullCheck(password,"Password");
	
	for(var i=0; i<error.length; i++)
	{
		errorDiv.innerHTML += error[i];
	}
		errorDiv.innerHTML +="</strong></span>";
}

