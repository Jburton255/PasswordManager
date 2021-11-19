<?php
	session_start();
	if (!isset($_SESSION["RegState"])) {
		$_SESSION["RegState"] = 0;
		$_SESSION["ErrorMsg"] = "New session started";
	}else{
        $_SESSION["ErrorMsg"] = "Continue session";
    }
	echo json_encode($_SESSION);
	exit();
?>