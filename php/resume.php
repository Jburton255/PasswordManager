<?php
	$CookieName=md5("tul40235");
	if (!isset($_COOKIE[$CookieName])){
		echo json_encode($_SESSION);
		exit();
	}
    $SessionID = $_COOKIE[$CookieName];
    session_start($SessionID);
	$_SESSION["RegState"] = 4;
	echo json_encode($_SESSION);
	exit();
?>