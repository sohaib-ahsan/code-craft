<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
    //get the code from the frontend
    $code = $_POST['code'];
    //Evaluate the code extracted from frontend and send back to display it in the div
    echo eval($code);; 
    }
?>