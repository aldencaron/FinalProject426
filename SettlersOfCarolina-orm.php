<?php

class Card {
  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "comp426f16",
          "CH@ngemenow99Please!comp426f16",
          "mhbdb");
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
  $result = $mysqli_query($SQL);
  $CardValue = $result;

    if($result->num_rows==0){
      $SQL = "Insert into Cards (PlayerID, $CardName) Values ($PlayerID, " . $result+1 . " )";
      $result = $mysqli_query($SQL);
    }
    else{
      $SQL = "Update Cards set $CardName = $CardValue where PlayerID = $PlayerID";
      $result = $mysqli_query($SQL);
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
      };

        return new Card($PlayerID, $Ram, $Ramen, $Brick, $Basketball,
         $Book, $Knight, $OldWell, $ThePit, $DavisLibrary, $Sitterson,
          $BellTower, $Roads, $Volunteer, $Monopoly);
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

 ?>
