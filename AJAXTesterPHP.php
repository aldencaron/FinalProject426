<?php
    require_once("SettlersOfCarolina-orm.php");

    if (isset($_GET['request'])) {
        $mysqli = new mysqli("classroom.cs.unc.edu", "naeimz", "naeim410", "naeimzdb");
        $result = $mysqli->query(trim($_GET['request']));

        $obj = $result->fetch_object();
        header("Content-Type: application/json");
        print(json_encode($obj));
    }
 ?>