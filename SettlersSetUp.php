<?php
//initialize tables
date_default_timezone_set('America/New_York');

$mysqli = new mysqli("classroom.cs.unc.edu",
                   "naeimz",
                   "naeim410",
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

$SQL = "drop table if exists DiceRolls";
mysqli_query($mysqli, $SQL);
$SQL = "drop table if exists DevCardStacks";
mysqli_query($mysqli, $SQL);

$SQL = "drop table if exists Turns";
mysqli_query($mysqli, $SQL);

$SQL = "Create Table Players (
  PlayerID int primary key not null auto_increment,
  Username varchar(50),
  RoadsCount int,
  SoldiersCount int,
  Points int,
  HexColor varchar(6))";
  //HexColor int)";
mysqli_query($mysqli, $SQL);
//4 players
/*for($i = 0; $i <= 4; $i++){
  $SQL = "Insert into Players (PlayerID, Username, Roadscount, SoldiersCount, Points)
  Values ($i, 0, 0, 0, 0)";
    mysqli_query($mysqli, $SQL);
}*/

$SQL = "Create Table Roads (
  RoadID int primary key not null auto_increment,
  PlayerID int,
  Available int)";
mysqli_query($mysqli, $SQL);
//73 roads
for($i = 0; $i <= 73; $i++){
  $SQL = "Insert into Roads (RoadID, PlayerID, Available)
  Values ($i, 0, 1)";
    mysqli_query($mysqli, $SQL);
}

$SQL = "Create Table Tiles (
  TileID int primary key not null auto_increment,
  Robber int)";
mysqli_query($mysqli, $SQL);
//19 Tiles
for($i = 0; $i <= 19; $i++){
  $SQL = "Insert into Tiles (TileID, Robber)
  Values ($i, 2)"; //TODO 
    mysqli_query($mysqli, $SQL);
}

$SQL = "Create Table Colleges (
  CollegeID int primary key not null auto_increment,
  PlayerID int,
  Available int,
  University int)";
mysqli_query($mysqli, $SQL);
//54 colleges
for($i = 0; $i <= 54; $i++){
  $SQL = "Insert into Colleges (CollegeID, PlayerID, Available, University)
  Values ($i, 0, 0, 0)";
    mysqli_query($mysqli, $SQL);
}

  $SQL = "Create Table Cards (
    PlayerID int primary key not null auto_increment,
    Ram int, Ramen int, Brick int, Basketball int,
    Book int, Knight int, OldWell int, ThePit int,
    DavisLibrary int, Sitterson int, BellTower int,
    Roads int, Volunteer int, Monopoly int)";
    $result= mysqli_query($mysqli, $SQL);
    for($i = 0; $i <= 4; $i++){
      $SQL = "Insert into Cards (PlayerID, Ram, Ramen, Brick,
      Basketball, Book, Knight, OldWell, ThePit, DavisLibrary,
      Sitterson, BellTower, Roads, Volunteer, Monopoly)
      Values ($i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
        mysqli_query($mysqli, $SQL);
    }
  $SQL = "Create Table Chat (
    ChatID in primary key not null auto_increment,
    username VARCHAR(50) NOT NULL,
    chat-text TEXT NOT NULL)";
    mysqli_query($mysqli, $SQL);


 $SQL = "Create Table DiceRolls (
  DiceID int primary key not null auto_increment,
  RollResult int)";
  mysqli_query($mysqli, $SQL);
  // Load with dice rolls
  for($i = 0; $i <= 1000; $i++){
    //$r = rand(1, 6) + rand(1, 6);
    $r = 7;
    $SQL = "Insert into DiceRolls (DiceID, RollResult)
    Values ($i, $r)";
      mysqli_query($mysqli, $SQL);
  }

$SQL = "Create Table DevCardStacks (
  DevID int primary key not null auto_increment,
  `Order` int)";
  mysqli_query($mysqli, $SQL);



$SQL = "Create Table Turns (
  TurnID int primary key not null auto_increment)";
mysqli_query($mysqli, $SQL);

$SQL = "Insert into Turns (TurnID) Values(1)";
mysqli_query($mysqli, $SQL);


 ?>
