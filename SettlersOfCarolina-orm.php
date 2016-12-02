<?php

//Classes: Player, Road, Tile, Card, College
//Player has playerID, Username, RoadsCount, SoldiersCount
//Tile has TileID, robber
//Card has CardID and cardnames
//College has CollegeID, PlayerID, Available, University
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

  private function update() {
    $mysqli= Card::connect();

    $SQL = "Update Cards set
    PlayerID = $mysqli->real_escape_string($this->PlayerID),
    Ram = $mysqli->real_escape_string($this->Ram),
    Ramen = $mysqli->real_escape_string($this->Ramen),
    Brick = $mysqli->real_escape_string($this->Brick),
    Basketball = $mysqli->real_escape_string($this->Basketball),
    Book = $mysqli->real_escape_string($this->Book),
    Knight = $mysqli->real_escape_string($this->Knight),
    OldWell = $mysqli->real_escape_string($this->OldWell),
    ThePit = $mysqli->real_escape_string($this->ThePit),
    DavisLibrary = $mysqli->real_escape_string($this->DavisLibrary),
    Sitterson = $mysqli->real_escape_string($this->Sitterson),
    BellTower = $mysqli->real_escape_string($this->BellTower),
    Roads = $mysqli->real_escape_string($this->Roads),
    Volunteer = $mysqli->real_escape_string($this->Volunteer),
    Monopoly = $mysqli->real_escape_string($this->Monopoly)";
   $result= mysqli_query($mysqli, $SQL);
   return $result;
  }


  public static function findByID($PlayerID){
    $mysqli = Card::connect();
    $SQL = "Select * from Cards where PlayerID = $PlayerID";
    $result= mysqli_query($mysqli, $SQL);
    if($result){
      if($result->num_rows==0){
        //no matches
        return null;
      }
      else{
        $card_info = $result->fetch_array();
        return new Card($card_info['PlayerID'],
                        $card_info['Ram'],
                        $card_info['Ramen'],
                        $card_info['Brick'],
                        $card_info['BasketBall'],
                        $card_info['Book'],
                        $card_info['Knight'],
                        $card_info['OldWell'],
                        $card_info['ThePit'],
                        $card_info['DavisLibrary'],
                        $card_info['Sitterson'],
                        $card_info['BellTower'],
                        $card_info['Roads'],
                        $card_info['Volunteer'],
                        $card_info['Monopoly']);
      }
    }
    return null;
  }
  public static function getAllIDs() {
    $mysqli = Card::connect();
    $SQL = "Select CardID from Cards where 1";
    $result= mysqli_query($mysqli, $SQL);
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
    $id_array[] = intval($next_row['CardID']);
      }
    }
    return $id_array;
    }

  public function create($PlayerID, $Ram, $Ramen, $Brick, $Basketball,
   $Book, $Knight, $OldWell, $ThePit, $DavisLibrary, $Sitterson,
    $BellTower, $Roads, $Volunteer, $Monopoly) {
      $conn = Card::connect();

      $res = $conn->query(
      "INSERT INTO Cards VALUES('$PlayerID', '$Ram', '$Ramen',
      '$Brick', '$Basketball', '$Book', '$Knight', '$OldWell', '$ThePit',
      '$DavisLibrary', '$Sitterson', '$BellTower', '$Roads', '$Volunteer', '$Monopoly')
      ");

      if ($res == false) {
          header("HTTP/1.0 500 Server Error");
          print("Query was unsuccessful");
          exit();
      }
      return new Card($PlayerID, $Ram, $Ramen, $Brick, $Basketball,
       $Book, $Knight, $OldWell, $ThePit, $DavisLibrary, $Sitterson,
        $BellTower, $Roads, $Volunteer, $Monopoly);
  }

  public function getJSON(){
  $json_obj = array(  'PlayerID' => $this->PlayerID,
                      'Ram' => $this->Ram,
                      'Ramen' => $this->Ramen,
                      'Brick' => $this->Brick,
                      'Basketball' => $this->Basketball,
                      'Book' => $this->Book,
                      'Knight' => $this->Knight,
                      'OldWell' => $this->OldWell,
                      'ThePit' => $this->ThePit,
                      'DavisLibrary' => $this->DavisLibrary,
                      'Sitterson' => $this->Sitterson,
                      'BellTower' => $this->BellTower,
                      'Roads' => $this->Roads,
                      'Volunteer' => $this->Volunteer,
                      'Monopoly' => $this->Monopoly);
  return json_encode($json_obj);
 }

   private function __construct( $PlayerID, $Ram, $Ramen, $Brick, $Basketball,
    $Book, $Knight, $OldWell, $ThePit, $DavisLibrary, $Sitterson,
     $BellTower, $Roads, $Volunteer, $Monopoly ){
    $this->PlayerID = $PlayerID;
    $this->Ram = $Ram;
    $this->Ramen = $Ramen;
    $this->Brick = $Brick;
    $this->Basketball = $Basketball;
    $this->Book = $Book;
    $this->Knight = $Knight;
    $this->OldWell = $OldWell;
    $this->ThePit = $ThePit;
    $this->DavisLibrary = $DavisLibrary;
    $this->Sitterson = $Sitterson;
    $this->BellTower = $BellTower;
    $this->Roads = $Roads;
    $this->Volunteer = $Volunteer;
    $this->Monopoly = $Monopoly;
  }

  public function getPlayerID() {
      return $this->PlayerID;
  }

  public function getRam() {
      return $this->Ram;
  }

  public function getRamen() {
      return $this->Ramen;
  }

  public function getBrick() {
      return $this->Brick;
  }

  public function getBasketball() {
      return $this->Basketball;
  }

  public function getBook() {
      return $this->Book;
  }

  public function getKnight() {
      return $this->Knight;
  }

  public function getOldWell() {
      return $this->OldWell;
  }

  public function getThePit() {
      return $this->ThePit;
  }

  public function getDavisLibrary() {
      return $this->DavisLibrary;
  }

  public function getSitterson() {
      return $this->Sitterson;
  }

  public function getBellTower() {
      return $this->BellTower;
  }

  public function getRoads() {
      return $this->Roads;
  }

  public function getVolunteer() {
      return $this->Volunteer;
  }

  public function getMonopoly() {
      return $this->Monopoly;
  }
  public function setPlayerID(){
    $this->PlayerID = $PlayerID;
    return $this->update();
  }
  public function setRam(){
    $this->Ram = $Ram;
    return $this->update();
  }
  public function setRamen(){
    $this->Ramen = $Ramen;
    return $this->update();
  }
  public function setBrick(){
    $this->Brick = $Brick;
    return $this->update();
  }
  public function setBasketball(){
    $this->Basketball = $Basketball;
    return $this->update();
  }
  public function setBook(){
    $this->Book = $Book;
    return $this->update();
  }
  public function setKnight(){
    $this->Knight = $Knight;
    return $this->update();
  }
  public function setOldWell(){
    $this->OldWell = $OldWell;
    return $this->update();
  }
  public function setThePit(){
    $this->ThePit = $ThePit;
    return $this->update();
  }
  public function setDavisLibrary(){
    $this->DavisLibrary = $DavisLibrary;
    return $this->update();
  }
  public function setSitterson(){
    $this->Sitterson = $Sitterson;
    return $this->update();
  }
  public function setBellTower(){
    $this->BellTower = $BellTower;
    return $this->update();
  }
  public function setRoads(){
    $this->Roads = $Roads;
    return $this->update();
  }
  public function setVolunteer(){
    $this->Volunteer = $Volunteer;
    return $this->update();
  }
  public function setMonopoly(){
    $this->Monopoly = $Monopoly;
    return $this->update();
  }
}

class College {

  private $CollegeID;
  private $PlayerID;
  private $Available;
  private $University;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "naeimz",
          "naeim410",
          "naeimzdb");
  }

  public function create($CollegeID, $PlayerID, $Available, $University) {
      $mysqli = College::connect();

      $res = $mysqli->query(
          "INSERT INTO Colleges VALUES ('$CollegeID', '$PlayerID',
              '$Available', '$University')"
      );

      if ($res == false) {
          header("HTTP/1.0 500 Server Error");
          print($mysqli->error);
          exit();
      }
      return new College($CollegeID, $PlayerID, $Available, $University);
  }

  public static function findByID($CollegeID){
    $mysqli= College::connect();
    $SQL= "Select * from Colleges where CollegeID = $CollegeID ";

    $result= mysqli_query($mysqli, $SQL);

    if($result){
      if($result->num_rows==0){
        return null;
      }
      else{
        $College_info = $result->fetch_array();
        return new College($College_info['CollegeID'],
                           $College_info['PlayerID'],
                           $College_info['Available'],
                           $College_info['University'] );
      }
    }
  return null;
  }

  public static function getAllIDs() {
    $mysqli = College::connect();
    $SQL = "Select CollegeID from Colleges where 1";
    $result= mysqli_query($mysqli, $SQL);
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
    $id_array[] = intval($next_row['CollegeID']);
      }
    }
    return $id_array;
    }
  public function getJSON(){
  $json_obj = array('CollegeID' => $this->CollegeID,
                     'PlayerID' => $this->PlayerID,
                     'Available' => $this->Available,
                     'University' => $this->University );
  return json_encode($json_obj);
  }

   private function update() {
     $mysqli= College::connect();

     $SQL = "Update Colleges set
     CollegeID = $mysqli->real_escape_string($this->CollegeID),
     PlayerID = $mysqli->real_escape_string($this->PlayerID),
     Available = $mysqli->real_escape_string($this->Available),
     Available = $mysqli->real_escape_string($this->University)";
    $result= mysqli_query($mysqli, $SQL);
    return $result;
   }

  private function __construct($CollegeID, $PlayerID, $Available, $University){
  $this->CollegeID = $CollegeID;
  $this->PlayerID = $PlayerID;
  $this->Available = $Available;
  $this->University = $University;
  }

  public function getCollegeID() {
      return $this->CollegeID;
  }

  public function getPlayerID(){
      return $this->PlayerID;
  }

  public function getAvailable(){
      return $this->Available;
  }

  public function getUniversity(){
    return $this->University;
  }

  public function setCollegeID(){
    $this->CollegeID = $CollegeID;
    return $this->update();
  }

  public function setPlayerID(){
    $this->PlayerID = $PlayerID;
    return $this->update();
  }

  public function setAvailable(){
    $this->Available = $Available;
    return $this->update();
  }

  public function setUniversity(){
    $this->University = $University;
    return $this->update();
  }
}

class Tile {
  private $TileID;
  private $Robber;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "naeimz",
          "naeim410",
          "naeimzdb");
  }

  public function create($TileID, $Robber) {
      $mysqli = Tile::connect();
      $res = $mysqli->query(
          "INSERT INTO Tiles VAlUES ('$TileID', '$Robber')"
      );

      if ($res) {} else {
          header("HTTP/1.0 500 Server Error");
          print($mysqli->error);
          exit();
      }
      return new Tile($TileID, $Robber);
  }

  public static function findByID($TileID){
    $mysqli= Tiles::connect();
    $SQL= "Select * from Roads where TileID = $TileID ";
    $result= mysqli_query($mysqli, $SQL);

    if($result){
      if($result->num_rows==0){
        return null;
      }
      else{
        $Tile_info = $result->fetch_array();
        return new Tile($Tile_info['TileID'],
                           $Tile_info['Robber']);
      }
    }
  return null;
  }

  public static function getAllIDs() {
    $mysqli = Tile::connect();
    $SQL = "Select TileID from Tiles where 1";
    $result= mysqli_query($mysqli, $SQL);
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
    $id_array[] = intval($next_row['TileID']);
      }
    }
    return $id_array;
    }

  public function getJSON(){
  $json_obj = array('TileID' => $this->TileID,
                     'Robber' => $this->Robber );
  return json_encode($json_obj);
  }

  private function update() {
    $mysqli= Tile::connect();

    $SQL = "Update Roads set
    TileID = $mysqli->real_escape_string($this->TileID),
    Robber= $mysqli->real_escape_string($this->Robber)";
   $result= mysqli_query($mysqli, $SQL);
   return $result;
  }

 private function __construct($TileID, $Robber){
 $this->TileID= $TileID;
 $this->Robber = $Robber;
 }
 public function getTileID() {
     return $this->TileID;
 }
 public function getRobber() {
     return $this->Robber;
  }
  public function setTileID(){
    $this->TileID = $TileID;
    return $this->update();
  }
  public function setRobber(){
    $this->Robber = $Robber;
    return $this->update();
  }

}

class Road{
  private $RoadID;
  private $PlayerID;
  private $Available;

    public static function create($RoadID, $PlayerID, $Available){
    $mysqli= Road::connect();
    $res = $mysqli->query("INSERT INTO Roads VAlUES('$RoadID', '$PlayerID', '$Available')");
    if ($res) {} else {
        header("HTTP/1.0 500 Server Error");
        print($mysqli->error);
        exit();
    }
    return new Road($RoadID, $PlayerID, $Available);
    }

    public static function connect() {
      return new mysqli("classroom.cs.unc.edu",
            "naeimz",
            "naeim410",
            "naeimzdb");
    }

  public static function findByID($RoadID){
    $mysqli= Road::connect();
    $SQL= "Select * from Roads where RoadID = $RoadID ";
    $result= mysqli_query($mysqli, $SQL);

    if($result){
      if($result->num_rows==0){
        return null;
      }
      else{
        $Road_info = $result->fetch_array();
        return new Road($Road_info['RoadID'],
                           $Road_info['PlayerID'],
                           $Road_info['Available'] );
      }
    }
  return null;
  }

  public static function getAllIDs() {
    $mysqli = Road::connect();
    $SQL = "Select RoadID from Roads where 1";
    $result= mysqli_query($mysqli, $SQL);
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
    $id_array[] = intval($next_row['RoadID']);
      }
    }
    return $id_array;
    }

  public function getJSON(){
  $json_obj = array('RoadID' => $this->RoadID,
                     'PlayerID' => $this->PlayerID,
                     'Available' => $this->Available );
  return json_encode($json_obj);
  }

   private function update() {
     $mysqli= Road::connect();

     $SQL = "Update Roads set
     RoadID = $mysqli->real_escape_string($this->RoadID),
     PlayerID = $mysqli->real_escape_string($this->PlayerID),
     Available = $mysqli->real_escape_string($this->Available)";
    $result= mysqli_query($mysqli, $SQL);
    return $result;
   }
  private function __construct($RoadID, $PlayerID, $Available){
  $this->RoadID = $RoadID;
  $this->PlayerID = $PlayerID;
  $this->Available = $Available;
  }

  public function getRoadID() {
      return $this->RoadID;
  }

  public function getPlayerID(){
      return $this->PlayerID;
  }

  public function getAvailable(){
      return $this->Available;
  }

  public function setRoadID(){
    $this->RoadID = $RoadID;
    return $this->update();
  }

  public function setPlayerID(){
    $this->PlayerID = $PlayerID;
    return $this->update();
  }

  public function setAvailable(){
    $this->Available = $Available;
    return $this->update();
  }

}

class Player {
  private $PlayerID;
  private $Username;
  private $RoadsCount;
  private $SoldiersCount;
  private $Points;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "naeimz",
          "naeim410",
          "naeimzdb");
  }

  public function create($PlayerID, $Username, $RoadsCount,
  $SoldiersCount, $Points) {
      $mysqli = Player::connect();
      $res = $mysqli->query(
          "INSERT INTO Players VAlUES('$PlayerID', '$Username',
          '$RoadsCount', '$SoldiersCount', '$Points')"
      );

      if ($res) {} else {
          header("HTTP/1.0 500 Server Error");
          print($mysqli->error);
          exit();
      }

      return new Player($PlayerID, $Username, $RoadsCount, $SoldiersCount, $Points);
  }

  public static function findByID($PlayerID){
    $mysqli= Player::connect();
    $SQL= "Select * from Players where PlayerID = $PlayerID ";
    $result= mysqli_query($mysqli, $SQL);

    if($result){
      if($result->num_rows==0){
        return null;
      }
      else{
        $Player_info = $result->fetch_array();
        return new Player($Player_info['PlayerID'],
                           $Player_info['Username'],
                           $Player_info['RoadsCount'],
                           $Player_info['SoldierCount'],
                           $Player_info['Points']);
      }
    }
  return null;
  }

  public static function getAllIDs() {
    $mysqli = Player::connect();
    $SQL = "Select PlayerID from Players where 1";
    $result= mysqli_query($mysqli, $SQL);
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
    $id_array[] = intval($next_row['PlayerID']);
      }
    }
    return $id_array;
  }

  public function getJSON(){
  $json_obj = array('PlayerID' => $this->PlayerID,
                    'Username' => $this->Username,
                    'RoadsCount' => $this->RoadsCount,
                    'SoldiersCount' => $this->SoldiersCount,
                    'Points' => $this->Points );
  return json_encode($json_obj);
  }

 private function update() {
   $mysqli= Player::connect();

   $SQL = "Update Players set
   PlayerID = $mysqli->real_escape_string($this->PlayerID),
   Username = '$mysqli->real_escape_string($this->Username)',
   RoadsCount = $mysqli->real_escape_string($this->RoadsCount),
   SoldiersCount = $mysqli->real_escape_string($this->SoldiersCount),
   Points= $mysqli->real_escape_string($this->Points)";
  $result= mysqli_query($mysqli, $SQL);

  return $result;
  }

private function __construct($PlayerID, $Username, $RoadsCount, $SoldiersCount, $Points){
    $this->PlayerID= $PlayerID;
    $this->Username= $Username;
    $this->RoadsCount= $RoadsCount;
    $this->SoldiersCount= $SoldiersCount;
    $this->Points= $Points;
}

  public function getPlayerID(){
      return $this->PlayerID;
  }

  public function getUsername(){
      return $this->Username;
  }

  public function getRoadsCount(){
      return $this->RoadsCount;
  }

  public function getSoldiersCount(){
      return $this->SoldiersCount;
  }

  public function getPoints(){
    return $this->Points;
  }

  public function setPlayerID(){
    $this->PlayerID = $PlayerID;
    return $this->update();
  }

  public function setUsername(){
    $this->Username = $Username;
    return $this->update();
  }

  public function setRoadsCount(){
    $this->RoadsCount = $RoadsCount;
    return $this->update();
  }

  public function setSoldiersCount(){
    $this->SoldiersCount = $SoldiersCount;
    return $this->update();
  }

  public function setPoints(){
    $this->Points = $Points;
    return $this->update();
  }

}

 ?>
