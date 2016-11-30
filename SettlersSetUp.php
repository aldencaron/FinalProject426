<?php
//initialize tables
date_default_timezone_set('America/New_York');

$mysqli = new mysqli("classroom.cs.unc.edu",
                   "naeimz",
                   "alphabetazetaomega",
		               "naeimzdb");
$SQL = "drop table if exists Players";
mysqli_query($mysqli, $SQL);
$SQL = "drop table if exists Roads";
mysqli_query($mysqli, $SQL);
$SQL = "drop table if exists Colleges";
mysqli_query($mysqli, $SQL);
$SQL = "drop table if exists Tiles";
mysqli_query($mysqli, $SQL);
$SQL = "drop table if exists Cards";
mysqli_query($mysqli, $SQL);

$SQL = "Create Table Players (
  PlayerID int primary key not null auto_increment,
  Username varchar(50),
  RoadsCount int,
  SoldiersCount int,
  Points int)";
mysqli_query($mysqli, $SQL);
//4 players
for($i = 0; $i < 4; $i++){
  $SQL = "Insert into Players (PlayerID, Username, Roadscount. SoldiersCount, Points)
  Values ($i, 0, 0, 0, 0)";
    mysqli_query($mysqli, $SQL);
}

$SQL = "Create Table Roads (
  RoadID int primary key not null auto_increment,
  PlayerID int,
  Available int)";
mysqli_query($mysqli, $SQL);
//73 roads
for($i = 0; $i < 4; $i++){
  $SQL = "Insert into Players (PlayerID, Username, Roadscount. SoldiersCount, Points)
  Values ($i, 0, 0, 0, 0)";
    mysqli_query($mysqli, $SQL);
}

$SQL = "Create Table Tiles (
  ID int primary key not null auto_increment,
  Robber int)";
mysqli_query($mysqli, $SQL);
//19 Tiles

$SQL = "Create Table Colleges (
  CollegeID int primary key not null auto_increment,
  PlayerID int,
  Available int,
  University int)";
mysqli_query($mysqli, $SQL);
//54 colleges


  $SQL = "Create Table Cards (
    PlayerID int primary key not null auto_increment,
    Ram int, Ramen int, Brick int, Basketball int,
    Book int, Knight int, OldWell int, ThePit int,
    DavisLibrary int, Sitterson int, BellTower int,
    Roads int, Volunteer int, Monopoly int)";
    $result= mysqli_query($mysqli, $SQL);

 ?>
