<?php
    session_start();
    $_SESSION["RegState"] = 5;
    echo json_encode($_SESSION);
    exit();
?>