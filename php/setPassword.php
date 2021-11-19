<?php
    session_start();
    require_once("config.php");
    $Email = $_SESSION["Email"];
    $Password = md5($_POST["Password"]);

    //Connecet to DB
    $con = mysqli_connect(SERVER,USER,PASSWORD,DATABASE);
    if(!$con) {
        $_SESSION["RegState"] = -1;
        $_SESSION["ErrorMsg"] = "DB connection failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }
    //Update Password
    $query="UPDATE Users SET Password='$Password',  Rcount=Rcount+1 WHERE Email='$Email';";
    $result = mysqli_query($con, $query);
    if(!$result) {
        $_SESSION["RegState"] = -2;
        $_SESSION["ErrorMsg"] = "Password update failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }
    if(mysqli_affected_rows($con) != 1) {
        $_SESSION["RegState"] = -3;
        $_SESSION["ErrorMsg"] = "Password update failed 2: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }

    //Password set
    $_SESSION["RegState"] = 0;
    $_SESSION["ErrorMsg"] = "Password set. Please login".mysqli_error($con);
    echo json_encode($_SESSION);
    exit();
?>