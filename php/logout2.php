<?php
	$CookieName= md5("tul40235");
	//print "Cooke name ($CookieName) <br>";

	if (!isset($_COOKIE[$CookieName])){
		session_destroy();
		echo json_encode($_SESSION);
		exit();
	}
    $SessionID = $_COOKIE[$CookieName];
    session_start($SessionID);
    setcookie($CookieName, "", time() - 3600, "/");
	session_destroy(); 
    echo json_encode($_SESSION);
    exit();  
?>
