<?php
    session_start();
    require_once("config.php");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;
    require '../PHPMailer-master/src/Exception.php';
    require '../PHPMailer-master/src/PHPMailer.php';
    require '../PHPMailer-master/src/SMTP.php';
    //Get web data
    $Email = $_GET["resetPasswordEmail"];
    //print "Webdata [$Email] <br>";
   
    //Connect to DB
    $con = mysqli_connect(SERVER,USER,PASSWORD,DATABASE);
    if(!$con) {
        $_SESSION["RegState"] = -1;
        $_SESSION["ErrorMsg"] = "DB connection failed: ".mysqli_error($con);
        echo json_encode($_SESSION);
        exit();
    }
    //print("Database connected!! <br>");
    $Acode = rand(10000,99999);
    // Build INSERT query
    $query="SELECT * FROM Users WHERE Email='$Email';";
    $result = mysqli_query($con,$query);
    if (!$result){
            $_SESSION["RegState"] = -2;
            $_SESSION["ErrorMsg"] = "DB query failed: ".mysqli_error($con);
            echo json_encode($_SESSION);
            exit();
    }
    $numMatches = mysqli_num_rows($result);
    if ($numMatches != 1) {
        $_SESSION["RegState"] = -3;
        $_SESSION["ErrorMsg"] = "Email not found. Please try agian. ";
        echo json_encode($_SESSION);
        exit();
    }
    //Update the New Acode
    $query="UPDATE Users SET Acode='$Acode' WHERE Email='$Email';";
    $result = mysqli_query($con,$query);
    if (!$result){
            $_SESSION["RegState"] = -4;
            $_SESSION["ErrorMsg"] = "Acode update failed: ".mysqli_error($con);
            echo json_encode($_SESSION);
            exit();
    }
    //print "Authentication Success. Acode updated <br>"
    // Build the PHPMailer object:
    $mail= new PHPMailer(true);
    try {
        $mail->SMTPDebug = 0; // Wants to see all errors
        $mail->IsSMTP();
        $mail->Host="smtp.gmail.com";
        $mail->SMTPAuth=true;
        $mail->Username="itspigeontime@gmail.com";    //Set up own pigion 
        $mail->Password="LogicalAnswer24";
        $mail->SMTPSecure = "ssl";
        $mail->Port=465;
        $mail->SMTPKeepAlive = true;
        $mail->Mailer = "smtp";
        $mail->setFrom("tul40235@temple.edu", "James Burton");
        $mail->addReplyTo("tul40235@temple.edu","James Burton");
        $mail->IsHTML (true);
        $msg = "Here is a new confirmation code [".
            "$Acode]. Enjoy!";
        $mail->addAddress($Email, "$Email");
        $mail->Subject = "Reconfirmation code reset";
        $mail->Body = $msg;
        $mail->send();
        //print "Email sent ... <br>";
        $_SESSION["rEmail"] = $Email;
        $_SESSION["RegState"] = 5;
        $_SESSION["ErrorMsg"] = "Email sent. Check inbox";
    } catch (phpmailerException $e) {
        $_SESSION["ErrorMsg"] = "Mailer error: ".
        $e->errorMessage();
        $_SESSION["RegState"] = -5;
    }
    echo json_encode($_SESSION);  
    exit();
?>
