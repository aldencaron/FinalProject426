<?php
//initialize tables
$mysqli = new mysqli("classroom.cs.unc.edu",
                   "comp426f16",
                   "CH@ngemenow99Please!comp426f16",
		               "comp426f16db");
$SQL = "drop table if exists Players"
$result= $mysqli_query($SQL);
$SQL = "drop table if exists Roads"
$result= $mysqli_query($SQL);
$SQL = "drop table if exists Colleges"
$result= $mysqli_query($SQL);
$SQL = "drop table if exists Tiles"
$result= $mysqli_query($SQL);
$SQL = "drop table if exists Cards"
$result= $mysqli_query($SQL);


 ?>
