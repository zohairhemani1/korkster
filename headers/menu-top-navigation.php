<html>
<head>
<link rel='shortcut icon' href='img/icon.ico' />
    </head></html>
<?php

    echo"   <div class='logo'><a href='index.php'><img src='img/walk_sell_logo.png' width='180' alt=''></a></div>
    
";
	if(isset($_SESSION['username'])) 
	{
        $query = "SELECT count(ID) FROM inbox WHERE isRead = 0 AND ID IN (select max(ID) FROM inbox WHERE receiverID = :receiverID GROUP BY senderID) LIMIT 5";
//		SELECT u.ID,u.fname , i.isRead FROM inbox i INNER JOIN users u ON i.senderID = u.ID WHERE i.ID IN ((select max(ID) FROM inbox WHERE i.receiverID =          :receiverID GROUP BY senderID)) || i.senderID = :senderID LIMIT 5
		$sth = $dbh->prepare($query);
		$sth->bindValue(':receiverID',$_userID);
		$sth->execute();
        $resultCount = $sth->fetchColumn();
        
        $query = "SELECT u.profilePic, u.ID,u.fname ,i.message, i.isRead FROM inbox i INNER JOIN users u ON i.senderID = u.ID WHERE i.ID IN (select max(ID) FROM inbox WHERE i.receiverID = :receiverID GROUP BY senderID) order by i.id desc LIMIT 5";
//		SELECT u.ID,u.fname , i.isRead FROM inbox i INNER JOIN users u ON i.senderID = u.ID WHERE i.ID IN ((select max(ID) FROM inbox WHERE i.receiverID =          :receiverID GROUP BY senderID)) || i.senderID = :senderID LIMIT 5
		$sth = $dbh->prepare($query);
		$sth->bindValue(':receiverID',$_userID);
		$sth->execute();

    	echo "
		
		  <div style='display:none' id='sidr'>
          <ul>
            <li class='home'><a href='index.php'>HOME</a></li>
            <li class='to_do'><a href='create_gig.php'>START SELLING</a></li>
			<li class='admin'><a><span class='user_pic_thumb' style='padding:0px'><img src='img/users/{$_profilePic}' width='24' alt='user pic'></span> {$_fname_uppercase}</a>
                <ul>
                    <li style='margin-left: 28px;'><a href='{$_username}'><img src='img/icon-profile.png' style='margin: 11px 12px 0px 2px; width:17px' alt='user pic'> My Profile</a></li>
                    <li><a href='{$collegeURL}' class='whats_new'><span class='info_circle fa fa-institution' style='display:inline'>&nbsp;</span>My School</a></li>
                    <li><a href='inbox.php' class='inbox'><span class='fa fa-inbox' style='display:inline'>&nbsp;</span>Inbox</a></li>
                    <li><a href='deals.php' class='collection'><span class='fa-heart-o' style='display:inline'>&nbsp;</span>My Deals</a></li>";
                    //<li><a href='#' class='settings'><span class='fa fa-gear'  style='display:inline'>&nbsp;</span>Settings</a></li>
                    echo"<li><a href='index.php?status=logout' class='logout'><span class='fa fa-arrow-circle-o-left'  style='display:inline'>&nbsp;</span>Logout</a></li>
                    <div class='clear'></div>
                </ul>
            </li>
          </ul>
		</div>
		
		<nav class='main_nav'>
                <ul class='inbox_menu'>
                    <li class='home'><a href='index.php'>HOME</a></li>
                    <li class='to_do'><a href='create_gig.php'>START SELLING</a></li>
                ";
                if($resultCount > 0){
                    echo"
                <li class='bubble'><a href='#' class='topopup'><img class='notice_red' src='img/bubble_red.png' width='24' alt=''><span class='message'>$resultCount</span></a>";
                }
                    else{
                        echo"
                <li class='bubble'><a href='#' class='topopup'><img src='img/bubble.png' width='24' alt=''></a>";
                    }
                 echo"
                    <div id='toPopup'>     	
             		<div id='popup_content'>";
					if($sth->rowCount() > 0){
                      echo "<ul class='antiscroll-inner'>";
						while($result = $sth->fetch(PDO::FETCH_ASSOC)){
							echo "<li>
				        <a class='",($result['isRead'] == 0) ? "notice_red" : "","' href=inbox_des.php?id=$result[ID]&mode=0>
                        <img class='notifice' src='img/users/$result[profilePic]' />
                        <span class='username'>$result[fname]</span>
				        <em class='envelope'></em><span class='message_not'>
                        $result[message]</span></a></li>";
						}
						echo "<div class='clear'></div>
							</ul>
							<a href='inbox.php' target='_blank' class='load_more'>LOAD MORE</a>";
						}else{
							echo "YOU HAVE NO NOTIFICATIONS";
						}
						echo "</div> <!--your content end-->
						</div> <!--toPopup end-->
						</li>
                            <li id='admin'><a style='text-decoration:none;'>
							<span class='user_pic_thumb'><img src='img/users/{$_profilePic}' width='24' alt='user pic'></span>
							{$_fname_uppercase} {$_lname_uppercase}</a>
							<ul>
                            <li><a href='{$_username}'><img src='img/icon-profile1.png' style='margin: 11px 12px 0px 0px; width:17px' alt='user pic'>My Profile</a></li>								<li><a href='{$collegeURL}' class='whats_new'><span class='info_circle fa fa-institution'>&nbsp;</span>My School</a></li>
								<li><a href='inbox.php' class='inbox'><span class='fa fa-inbox'>&nbsp;</span>Inbox</a></li>
								<li><a href='deals.php' class='collection'><span class='fa-heart-o'>&nbsp;</span>My Deals</a></li>";
                            //<li><a href='#' class='settings'><span class='fa fa-gear'>&nbsp;</span>Settings</a></li>
                            echo"<li><a href='index.php?status=logout' class='logout'><span class='fa fa-arrow-circle-o-left'>&nbsp;</span>Logout</a></li>
                            <div class='clear'></div>
                        </ul>
                    </li>
                </ul>
            </nav>";
	}
	
	else
	{
		echo "
		 
    <div id='sidr'>		<!--unnecessary-->

          <ul>

            <li class='home'><a href='index.php'>HOME</a></li>

             <li class='to_do'><a href='#'>START SELLING</a></li>

             <li class='shopping'><a  href='#' onclick='return closeMenu();' data-toggle='modal' data-target='#login'>LOGIN</a></li>

              <li id='sales'><a href='#' onclick='return closeMenu();' data-toggle='modal' data-target='#register'>JOIN</a></li>


          </ul>
		</div>
		
		<nav class='main_nav'>
                <ul>
                    <li class='home'><a href='index.php'>HOME</a></li>
                    <li class='to_do'><a href='error.php'>START SELLING</a></li>
                    <!-- <li class='bubble'><a href='#'><img src='img/bubble.png' width='24' alt=''></a></li> -->
                    <li class='shopping'><a href='#'  data-toggle='modal' data-target='#login'>LOGIN</a></li>
                    <li id='sales'><a href='#' data-toggle='modal' data-target='#register'>JOIN</a></li>
                </ul>
			</nav>";
	}
	
?>