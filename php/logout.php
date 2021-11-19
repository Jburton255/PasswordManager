<?php
    session_start();
	$CookieName= md5("tul40235");
    if (!isset($_COOKIE[$CookieName])){
            session_destroy();
            echo json_encode($_SESSION);
            exit();
        }
        
    $SessionID = $_COOKIE[$CookieName];
    session_start($SessionID);
    require_once("config.php");
    $con = mysqli_connect(SERVER,USER,PASSWORD,DATABASE);
    if(!$con) {
        $_SESSION["RegState"] = -1;
        $_SESSION["ErrorMsg"] = "DB connection failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }

    $LOdatetime = date("Y-m-d h:i:s");
    $query="UPDATE Users SET LOdatetime='$LOdatetime' WHERE Email='".$_SESSION["Email"].
    "';"; 
    $result = mysqli_query($con, $query);
    /*
    echo '<pre>';
        var_dump($_SESSION);
    echo '</pre>';*/

    //print "Webdata ($LOdatetime) ($SessionID) (".$_SESSION[""].") <br>";                 

    if(!$result) {
        $_SESSION["RegState"] = -2;
        $_SESSION["ErrorMsg"] = "DB logout Update database failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }
    
    if ($_SESSION["RememberMe"] != "true") {
        //Remove cookie
        setcookie($CookieName, "", time() - 3600, "/");
		session_destroy();
    }
	session_destroy($SessionID);
    echo json_encode($_SESSION);
    
    exit();
?>
