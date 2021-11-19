<?php
    session_start();
    require_once("config.php");
    $Acode = $_GET["Acode"];
    $Email = $_SESSION["rEmail"];
    //print "Webdata ($Email) ($Acode) <br>";

    //Connecet to DB
    $con = mysqli_connect(SERVER,USER,PASSWORD,DATABASE);
    if(!$con) {
        $_SESSION["RegState"] = -1;
        $_SESSION["ErrorMsg"] = "DB connection failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }
//print("DB connected <br>");
    //check DB
    $query="SELECT * FROM Users WHERE Email='$Email' and Acode='$Acode';";
    $result = mysqli_query($con, $query);
    if(!$result) {
        $_SESSION["RegState"] = -2;
        $_SESSION["ErrorMsg"] = "Select query failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }

//print("Query Worked <br>");
    //check num record =1
    if(mysqli_num_rows($result) != 1) {
        $_SESSION["RegState"] = -3;
        $_SESSION["ErrorMsg"] = "Authenticatioin failed: Don't Hack Me!(".
            mysqli_num_rows($result).")";
            echo json_encode($_SESSION);
        print "Failed stop the HACKERS!";
        exit();
    }
//print("Authenticatioin passed <br>");
    //All good
    $Acode = rand(10000,99999); 
    $query="UPDATE Users SET Acode='$Acode' WHERE Email='$Email';";
    $result = mysqli_query($con, $query);
    if(!$result) {
        $_SESSION["RegState"] = -4;
        $_SESSION["ErrorMsg"] = "Acode update failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }
//print"Acode updated <br>";
    $_SESSION["Email"] = $Email;
    $_SESSION["RegState"] = 3;
    echo json_encode($_SESSION);
//print("Acode");
    exit();
?>