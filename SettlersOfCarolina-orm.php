<?php

class Card {
  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "naeimz",
          "naeim410",
          "naeimzdb");
  }
  private $PlayerID;
  private $Ram;
  private $Ramen;
  private $Brick;
  private $Basketball;
  private $Book;
  private $Knight;
  private $OldWell;
  private $ThePit;
  private $DavisLibrary;
  Private $Sitterson;
  private $BellTower;
  private $Roads;
  private $Volunteer;
  private $Monopoly;

  public static function update($PlayerID, $CardName){
    $conn= Card::connect();

  //check if Player has been inserted.
  $SQL= "Select $CardName from Cards where PlayerID = $PlayerID";
  $result = mysqli_query($mysqli, $SQL);
  $CardValue = $result;

    if($result->num_rows==0){
      $SQL = "Insert into Cards (PlayerID, $CardName) Values ($PlayerID, " . $result+1 . " )";
      $result = mysqli_query($mysqli, $SQL);
    }
    else{
      $SQL = "Update Cards set $CardName = $CardValue where PlayerID = $PlayerID";
      $result = mysqli_query($mysqli, $SQL);
    }
  }

  public static function findByID($PlayerID){
    $mysqli = Card::connect();
    $SQL = "Select * from Cards where PlayerID = $PlayerID";
    $result = $myqli_query($SQL);
    if($result){
      if($result->num_rows==0){
        //no matches
        return null;
      }
      else{
        $card_info = $result->fetch_array();

        // if (!$card_info['complete']) {
        // 	$complete = false;
        //       } else {
        // 	$complete = true;
        //   }

        return new Card(card_info['PlayerID'],
                        card_info['Ram'],
                        card_info['Ramen'],
                        card_info['Brick'],
                        card_info['BasketBall'],
                        card_info['Book'],
                        card_info['Knight'],
                        card_info['OldWell'],
                        card_info['ThePit'],
                        card_info['DavisLibrary'],
                        card_info['Sitterson'],
                        card_info['BellTower'],
                        card_info['Roads'],
                        card_info['Volunteer'],
                        card_info['Monopoly']);
      }
    }
    return null;

  }

  public static function create($PlayerID, $Ram, $Ramen, $Brick, $Basketball,
   $Book, $Knight, $OldWell, $ThePit, $DavisLibrary, $Sitterson,
    $BellTower, $Roads, $Volunteer, $Monopoly) {
      $conn = Card::connect();

      if ($conn->connect_error) {
          die("Connection unsuccessful");
      } else {
          echo "Connection successful";
      }

      $res = $conn->query(
      "INSERT INTO Cards VALUES('$PlayerID', '$Ram', '$Ramen',
      '$Brick', '$Basketball', '$Book', '$Knight', '$OldWell', '$ThePit',
      '$DavisLibrary', '$Sitterson', '$BellTower', '$Roads', '$Volunteer', '$Monopoly')
      ");

      if ($res) {
          return new Card($PlayerID, $Ram, $Ramen, $Brick, $Basketball,
           $Book, $Knight, $OldWell, $ThePit, $DavisLibrary, $Sitterson,
            $BellTower, $Roads, $Volunteer, $Monopoly);
      } else {
          echo "<br />Insertion error! <br />";
          echo $conn->connect_error;
      }
  }

   function __construct( $PlayerID, $Ram, $Ramen, $Brick, $Basketball,
    $Book, $Knight, $OldWell, $ThePit, $DavisLibrary, $Sitterson,
     $BellTower, $Roads, $Volunteer, $Monopoly ){
    $this-> PlayerID = $PlayerID;
    $this-> Ram = $Ram;
    $this-> Ramen = $Ramen;
    $this-> Brick = $Brick;
    $this-> Basketball = $Basketball;
    $this-> Book = $Book;
    $this-> Knight = $Knight;
    $this-> OldWell = $OldWell;
    $this-> ThePit = $ThePit;
    $this-> DavisLibrary = $DavisLibrary;
    $this-> Sitterson = $Sitterson;
    $this-> BellTower = $BellTower;
    $this-> Roads = $Roads;
    $this-> Volunteer = $Volunteer;
    $this-> Monopoly = $Monopoly;

  }

  function getPlayerID() {
      return $this->PlayerID;
  }

  function getRam() {
      return $this->Ram;
  }

  function getRamen() {
      return $this->Ramen;
  }

  function getBrick() {
      return $this->Brick;
  }

  function getBasketball() {
      return $this->Basketball;
  }

  function getBook() {
      return $this->Book;
  }

  function getKnight() {
      return $this->Knight;
  }

  function getOldWell() {
      return $this->OldWell;
  }


  function getThePit() {
      return $this->ThePit;
  }

  function getDavisLibrary() {
      return $this->DavisLibrary;
  }

  function getSitterson() {
      return $this->Sitterson;
  }

  function getBellTower() {
      return $this->BellTower;
  }

  function getRoads() {
      return $this->Roads;
  }

  function getVolunteer() {
      return $this->Volunteer;
  }

  function getMonopoly() {
      return $this->Monopoly;
  }

}
class College {

  private $ID;
  private $PlayerID;
  private $Available;
  private $University;

public static function findByID($ID){

}
public static function getAllIDs() {

}
public static function getJSON(){

}
 private function update() {

 }
private function __construct(){

}

}
class Tile {
  private $ID;
  private $Robber;

  public static function findByID($ID){

  }
  public static function getAllIDs() {

  }
  public static function getJSON(){

  }
   private function update() {

   }
  private function __construct(){

  }

}
class Road{
  private $ID;
  private $PlayerID;
  private $Available;

  public static function findByID($ID){

  }
  public static function getAllIDs() {

  }
  public static function getJSON(){

  }
   private function update() {

   }
  private function __construct(){

  }

}
class Player {
  private $PlayerID;
  private $Username;
  private $RoadsCount;
  private $SoldiersCount;
  private $Points;

  public static function findByID($PlayerID){

  }
  public static function getAllIDs() {

  }
  public static function getJSON(){

  }
   private function update() {

   }
  private function __construct(){

  }

}

 ?>
