<?php
    session_start();
    $_SESSION["RegState"] = 1;
    echo json_encode($_SESSION);
    exit();
?>
