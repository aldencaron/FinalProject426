<?php
    if (isset($_GET['request'])) {
        $mysqli = new mysqli("classroom.cs.unc.edu", "naeimz", "naeim410","naeimzdb");

        // Connection error
        if ($mysqli == false) {
            header("HTTP/1.0 500 Server Error");
            print("Incorrect mysqli connection");
            exit();
        }

        $result = $mysqli->query(trim($_GET['request']));
        if ($result) { // Query was successful
            // There is no output (updating database)
            if (gettype($result) == "boolean") {
                header("Content-Type: application/json");
                print("Query was successful");
                exit();
            } else { // There is an output (selecting from database)
                header("Content-Type: application/json");
                while($row = $result->fetch_object()) {
                    print(stripslashes(json_encode($row)));
                }
                exit();
            }
        } else { // Query was unsuccesful
            header("HTTP/1.0 400 Bad Request");
            print("Query error: " . $mysqli->error);
            exit();
        }
    }
 ?>