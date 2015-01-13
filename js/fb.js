var _userID;
var _fname;
var _lname;
var _email;
var _profilePic;


 // This is called with the results from from FB.getLoginStatus().

  function statusChangeCallback(response,source) {

    console.log('statusChangeCallback');

    console.log(response);

    // The response object is returned with a status field that lets the

    // app know the current login status of the person.

    // Full docs on the response object can be found in the documentation

    // for FB.getLoginStatus().

    if (response.status === 'connected') {

      // Logged into your app and Facebook.

  console.log('Welcome!  Fetching your information.... ');

    FB.api('/me', function(response) {

      console.log('Successful login for: ' + response.name+response.email+response.id);

      //document.getElementById('status').innerHTML =

        //'Thanks for logging in, ' + response.name + '!';
		
		
	_userID=response.id;
	_fname=response.first_name;
	_lname=response.last_name;
	_email=response.email;
	_profilePic="http://graph.facebook.com/" + response.id + "/picture";
	
	
	
		
				if(source == 'login'){
					LoginFormFB(_userID);
				} else if(source == 'register'){
					$("#typeAcc").val("fb");
					$("#firstName").val(_fname);
					$("#lastName").val(_lname);
					$("#email").val(_email);
					$("#username").val(_userID);
					$("#firstName").prop('readonly',true);
					$("#lastName").prop('readonly',true);
					$("#email").prop('readonly',true);
					$("#username").prop('readonly',true);
					$("#password").prop('readonly',true);
					$("#verifyPassword").prop('readonly',true);	
					var randnum=Math.floor((Math.random() * 500000) + 1);
					$("#password").val(randnum);
					$("#verifyPassword").val(randnum);
					
					
					//signupFormFB(_userID,_fname,_lname,_email,_profilePic);
				}
		
		
			
			
    });

    } else if (response.status === 'not_authorized') {

      // The person is logged into Facebook, but not your app.

     // document.getElementById('status').innerHTML = 'Please log ' +

       // 'into this app.';

    } else {

      // The person is not logged into Facebook, so we're not sure if

      // they are logged into this app or not.

      //document.getElementById('status').innerHTML = 'Please log ' +

        //'into Facebook.';
		
	

      //document.getElementById('status').innerHTML =

        //'Thanks for logging in, ' + response.name + '!';
		
		
	
	
	FB.login(function(response) {
		
			if (response.authResponse) {
				
				
				
					console.log('Welcome!  Fetching your information.... ');

    FB.api('/me', function(response) {

      console.log('Successful login for: ' + response.name+response.email+response.id);
				
				_userID=response.id;
				_fname=response.first_name;
				_lname=response.last_name;
				_email=response.email;
				_profilePic="http://graph.facebook.com/" + response.id + "/picture";
	
				if(source == 'login'){
			
					LoginFormFB(_userID);
				
				} else if(source == 'register'){
					$("#typeAcc").val("fb");
					$("#firstName").val(_fname);
					$("#lastName").val(_lname);
					$("#email").val(_email);
					$("#username").val(_userID);
					$("#firstName").prop('readonly',true);
					$("#lastName").prop('readonly',true);
					$("#email").prop('readonly',true);
					$("#username").prop('readonly',true);
					$("#password").prop('readonly',true);
					$("#verifyPassword").prop('readonly',true);	
					
					var randnum=Math.floor((Math.random() * 500000) + 1);
				
					$("#password").val(randnum);
					$("#verifyPassword").val(randnum);
				}
				});
			}
		
		
			
			
    });

    }

  }



  // This function is called when someone finishes with the Login

  // Button.  See the onlogin handler attached to it in the sample

  // code below.

  function checkLoginState() {

    FB.getLoginStatus(function(response) {

      statusChangeCallback(response);

    });

  }


function initfb(source){
  window.fbAsyncInit = function() {

  FB.init({

    appId      : '1422834004652463',

    cookie     : true,  // enable cookies to allow the server to access 

     status     : true,                   // the session
	channelUrl : 'channel.html',

    xfbml      : true,  // parse social plugins on this page

    version    : 'v2.0' // use version 2.0

  });



  // Now that we've initialized the JavaScript SDK, we call 

  // FB.getLoginStatus().  This function gets the state of the

  // person visiting this page and can return one of three states to

  // the callback you provide.  They can be:

  //

  // 1. Logged into your app ('connected')

  // 2. Logged into Facebook, but not your app ('not_authorized')

  // 3. Not logged into Facebook and can't tell if they are logged into

  //    your app or not.

  //

  // These three cases are handled in the callback function.



  FB.getLoginStatus(function(response) {

    statusChangeCallback(response,source);

  });



  };



  // Load the SDK asynchronously

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

}

  // Here we run a very simple test of the Graph API after login is

  // successful.  See statusChangeCallback() for when this call is made.

  function testAPI() {

    

  }
// JavaScript Document