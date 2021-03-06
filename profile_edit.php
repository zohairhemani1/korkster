<?php
session_start();
include 'headers/_user-details.php';
	
	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
        if(isset($_POST['security_btn']) === false){
            $imgFrom="users";
            include 'headers/image_upload.php';
            $fname = $_POST['fname'];
            $description = $_POST['userDesc'];
            $lname = $_POST['lname'];
            $college = explode('-', $_POST['userSchool']);
            $college = trim($college[0]);
            if(!isset($profilePic)){
                $profilePic = $_profilePic;
            }
            $query = "SELECT ID from colleges WHERE name LIKE :cname";
            $sth = $dbh->prepare($query);
            $sth->bindValue(':cname',$college);
            $sth->execute();
            $schoolID = $sth->fetchColumn();
            $sth = $dbh->prepare("UPDATE users SET fname = :fname, lname = :lname, profilePic = :profilePic, description = :desc, collegeID = :schoolID WHERE ID = :userID");
            $sth->bindValue(':fname',$fname);
            $sth->bindValue(':lname',$lname);
            $sth->bindValue(':profilePic',$profilePic);
            $sth->bindValue(':desc',$description);
            $sth->bindValue(':schoolID',$schoolID);
        }else{
            $password = $_POST['newPass'];
            $passwordC = $_POST['newPass_confirm'];
            if($password != null || $password != '' || $passwordC != null || $passwordC != ''){
                $password = md5($password);
                $sth = $dbh->prepare("UPDATE users SET password = :pass WHERE ID = :userID");
                $sth->bindValue(':pass',$password);
            }
        }
        $sth->bindValue(':userID',$_userID);
        $sth->execute();
		header("Location: $_username");
	}		
// ending if block of $_POST
?>



<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<title>User Profile</title>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/bootstrap-tagsinput.css" type="text/css">

<link rel="stylesheet" href="css/style.css" type="text/css">
<link rel="stylesheet" href="css/media.css" type="text/css">
<link rel="stylesheet" href="css/fontello.css" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/jquery.sidr.dark.css" type="text/css">

<style>
*, *:before, *:after {
	-webkit-box-sizing: initial;
	-moz-box-sizing: initial;
	box-sizing: initial;
}
img {
	vertical-align: top;
}
input[type="file"] {
display: initial;
}
p {
margin: initial;
}
</style>
<!--<script src="js/jquery.min.js"></script>-->
<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.sidr.min.js"></script>
<script src="js/custom.js"></script>
<script src="js/bootstrap-tagsinput.js"></script>

<script>
$(document).ready(function() {
  $('#simple-menu').sidr();
});
</script>


<!--[if lt IE 9]>
	<script src="js/lib/html5shiv.js"></script>
<![endif]-->
</head>

<body>
<div class="inbox_des create_gig">
  <div class="header_bg">
    <header class="main-header"> <a id="simple-menu" class="icon-menu" href="#sidr"></a>
     
      <?php include 'headers/menu-top-navigation.php';?>
    </header>
    <div class="clear"></div>
  </div>
  <!--/.header_bg-->
  <div id="backgroundPopup"></div>
  <div class="content_inbox">
  
    <h2><?php echo $_username;?>'s Profile</h2>
      <ul class="nav nav-pills">
  <li class="active"><a data-toggle="pill" href="#general">General</a></li>
  <li><a data-toggle="pill" href="#security">Security</a></li>
</ul>

<div class="tab-content">
  <div id="general" class="tab-pane fade in active">
  <form name="general_edit" id="general_edit" action="profile_edit.php" method="post" enctype="multipart/form-data">
    <div class="left_gig">
      <div class="form_row">
        <div class="label_wrap">
          <label for="firstname">First Name</label>
        </div>
        <div class="user_names user_fname">
          <input class="gig_text price" type="text" id="fname" value="<?php echo $_fname;?>" name="fname" style="width:100%;" required/>
        </div>
		<div class="label_wrap userl_lname">
          <label for="lastname">Last Name</label>
        </div>
        <div class="user_names">
          <input class="gig_text price" type="text" id="lname" value="<?php echo $_lname;?>" name="lname" style="width:100%;" required/>
        </div>
      </div>
      <div class="form_row">
        <div class="label_wrap">
          <label for="gig_category">School</label>
        </div>
        <div class="input_wrap">
		<input type="text" class="form-control gig_text school_txt" value="<?php echo $_collegeName; ?>" name="userSchool" placeholder="School" size="" id="regsearch" onKeyUp="regfindmatch();" autocomplete="off" style="width:95%" required>
            <ul id ="regresults" name="schools" >
            </ul>
        </div>
      </div>
      <div class="form_row">
        <div class="label_wrap">
          <label for="gig_gallery">Profile Picture</label>
        </div>
        <div class="input_wrap">
          <div class="file_input">
            <!--  <button type="file" class="btn_signup" name="file" id="name">Browse</button>  -->
            
            <input id="fileupload" accept="image/*" type="file" name="file" multiple >
            
            <p>JPEG file, 2MB Max, <span class="grey_c">you own the copyrights</span></p>
          </div>
        </div>
      </div>
      
      <div class="form_row">
        <div class="label_wrap">
          <label for="gig_desc">Description</label>
        </div>
        <div class="input_wrap gig_desc">
          <textarea class="gig_text desc" rows="10" maxlength="200" name="userDesc" required><?php echo $_description; ?></textarea>
        </div>
      </div>
    </div>
      <div class="bottom_save_block">
      <button type="submit" class="btn_signup">Save &amp; Continue</button>
      <button class="btn_signup btn_cancel">Cancel</button>
    </div>
  </form>
    </div>
    <div id="security" class="tab-pane fade">
    <form name="security_edit" id="security_edit" action="profile_edit.php" method="post">
    <div class="left_gig">
      <div class="form_row">
        <div class="label_wrap">
          <label for="newPass">New Password</label>
        </div>
        <div class="input_wrap newPass">
          <input class="gig_text" type="password" id="newPass" name="newPass" style="width:90%;" required/>
        </div>
      </div>
      <div class="form_row">
        <div class="label_wrap">
          <label style="width: 134px;" for="newPass_confirm">Confirm Password</label>
        </div>
        <div class="input_wrap newPass_confirm">
          <input class="gig_text" type="password" id="newPass_confirm" name="newPass_confirm" style="width:90%;" required/>
        </div>
      </div>
     <div class="error"></div>
    </div>
    
     <!-- <div class="form_row">
        <div class="label_wrap">
          <label for="gig_title">instruction for buyer</label>
        </div>
        <div class="input_wrap gig_title">
          <textarea class="gig_desc_text" rows="2" maxlength="80"></textarea>
        </div>
      </div> -->
    <div style="margin-bottom: 180px;" class="bottom_save_block">
      <button type="submit" name="security_btn" class="btn_signup">Save &amp; Continue</button>
      <button class="btn_signup btn_cancel">Cancel</button>
    </div>
    </form>
    </div>
    </div>
    
    <div class="clear"></div>
  </div>
</div>
<?php include 'headers/menu-bottom-navigation.php' ?>

<script>
$(function() {      
          $("nav.main_nav li#admin > ul").css("display","none");
        
			       
           			$("nav.main_nav li#admin").hover(function () {   
         							  $( "nav.main_nav li#admin > ul" ).css( "display", "block" );
	            },          
            	function () {      
							           $( "nav.main_nav li#admin > ul" ).css( "display", "none" );
				        });   
				     });
$("#security_edit").on('submit',function(){
    if($('#newPass').val() != $('#newPass_confirm').val())
	{
		$('.error').css("padding-top", "20px");
		$('.error').css("padding-bottom", "20px");
		$('.error').html('<span class=\'alert alert-warning\'><strong>Oops! Password did not match! Try again.</strong></span>');
		return false;
	}
});
</script> 
<script>
	$(document).ready(function(e) {
        $('.input_wrap').on('focus', function(){
			$(this).find('.gig-tooltip').css('background','red');
			});
    });
</script> 
<script src="js/school-list.js"></script>
</body>
</html>
