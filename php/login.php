<?php
    session_start();
    require_once("config.php");
    $CookieName= md5("tul40235");
    // if (isset($_COOKIE[$CookieName])){
    //     $_SESSION["RegState"] = 4;
    //     $_SESSION["ErrorMsg"] = "Resume";
    //     echo json_encode($_SESSION);
    //     exit();
    // }
    //Get WebData
    $Email = $_POST["loginEmail"];
    $Password = md5($_POST["loginPassword"]);
    $_SESSION["RememberMe"] = $_POST["RememberMe"];

    //print "Webdata ($Email) ($Password) (".$_SESSION["RememberMe"].") <br>";

    $con = mysqli_connect(SERVER,USER,PASSWORD,DATABASE);
    if(!$con) {
        $_SESSION["RegState"] = -1;
        $_SESSION["ErrorMsg"] = "DB connection failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }
	//print "DB connected <br>";

    //check for login
    $query="SELECT * FROM Users WHERE Password='$Password' and Email='$Email';";
    
    $result = mysqli_query($con, $query);
  
    if(!$result) {
        $_SESSION["RegState"] = -2;
        $_SESSION["ErrorMsg"] = "Passworrd Update failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }
	//print "Query worked <br>";
    if(mysqli_num_rows($result) != 1) {
        $_SESSION["RegState"] = -3;
        $_SESSION["ErrorMsg"] = "Either email or password not match: ";
        echo json_encode($_SESSION);
        exit();
    }
	
    $row = mysqli_fetch_assoc($result);
    $_SESSION["FirstName"] = $row["FirstName"];
    $_SESSION["LastName"] = $row["LastName"]; 
    $_SESSION["Email"] = $row["Email"];
    mysqli_free_result($result);

    $Ldatetime = date("Y-m-d h:i:s");
    $query="UPDATE Users SET Ldatetime='$Ldatetime' WHERE Email='".$_SESSION["Email"].
    "';"; 
    $result = mysqli_query($con, $query);
    mysqli_close($con);

    //Logged in
    $_SESSION["RegState"] = 4;
    session_regenerate_id(true);
    $SessionID = session_id();
    session_start($SessionID);
    $CookieName = md5("tul40235");
    setcookie($CookieName, $SessionID, time()+86400, "/");
    //print "Cookie created <br>";
    echo json_encode($_SESSION);

    exit();
?>