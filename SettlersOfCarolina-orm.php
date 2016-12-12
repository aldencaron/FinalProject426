<?php

//Classes: Player, Road, Tile, Card, College
//Player has playerID, Username, RoadsCount, SoldiersCount
//Tile has TileID, robber
//Card has CardID and cardnames
//College has CollegeID, PlayerID, Available, University
//DiceRoll has DiceID, RollResult

class Card {
  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "aldenc",
          "comp426",
          "aldencdb");
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

  private function update($PlayerID) {
    $mysqli= Card::connect();


    $SQL = "Update Cards set
    Ram = $this->Ram,
    Ramen = $this->Ramen,
    Brick = $this->Brick,
    Basketball = $this->Basketball,
    Book = $this->Book,
    Knight = $this->Knight,
    OldWell = $this->OldWell,
    ThePit = $this->ThePit,
    DavisLibrary = $this->DavisLibrary,
    Sitterson = $this->Sitterson,
    BellTower = $this->BellTower,
    Roads = $this->Roads,
    Volunteer = $this->Volunteer,
    Monopoly = $this->Monopoly
    WHERE PlayerID = '$PlayerID'";

   $result= mysqli_query($mysqli, $SQL);

   if ($result == false) {
       header("HTTP/1.0 503 Service Unavailable");
       print("An error in the database occurred: " . $mysqli->error);
       exit();

   }
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
                        $card_info['Basketball'],
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
    $SQL = "Select PlayerID from Cards where 1";
    $result= mysqli_query($mysqli, $SQL);
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
    $id_array[] = intval($next_row['PlayerID']);
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

 public static function getAllJSON() {
     $mysqli = Card::connect();
     $result = $mysqli->query("SELECT * FROM Cards");

     $json = array();
     if($result){
     while ($row = $result->fetch_array()) {
         $json_sub = array();
         $json_sub['PlayerID'] = $row['PlayerID'];
         $json_sub['Ram'] = $row['Ram'];
         $json_sub['Ramen'] = $row['Ramen'];
         $json_sub['Brick'] = $row['Brick'];
         $json_sub['Basketball'] = $row['Basketball'];
         $json_sub['Book'] = $row['Book'];
         $json_sub['Knight'] = $row['Knight'];
         $json_sub['OldWell'] = $row['OldWell'];
         $json_sub['ThePit'] = $row['ThePit'];
         $json_sub['DavisLibrary'] = $row['DavisLibrary'];
         $json_sub['Sitterson'] = $row['Sitterson'];
         $json_sub['BellTower'] = $row['BellTower'];
         $json_sub['Roads'] = $row['Roads'];
         $json_sub['Volunteer'] = $row['Volunteer'];
         $json_sub['Monopoly'] = $row['Monopoly'];
         $json[] = $json_sub;
     }
   }
     return json_encode($json);
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
  public function setPlayerID($PlayerID){
    $this->PlayerID = $PlayerID;
    return $this->update($this->PlayerID);
  }
  public function setRam($Ram){
    $this->Ram = $Ram;
    return $this->update($this->PlayerID);
  }
  public function setRamen($Ramen){
    $this->Ramen = $Ramen;
    return $this->update($this->PlayerID);
  }
  public function setBrick($Brick){
    $this->Brick = $Brick;
    return $this->update($this->PlayerID);
  }
  public function setBasketball($Basketball){
    $this->Basketball = $Basketball;
    return $this->update($this->PlayerID);
  }
  public function setBook($Book){
    $this->Book = $Book;
    return $this->update($this->PlayerID);
  }
  public function setKnight($Knight){
    $this->Knight = $Knight;
    return $this->update($this->PlayerID);
  }
  public function setOldWell($OldWell){
    $this->OldWell = $OldWell;
    return $this->update($this->PlayerID);
  }
  public function setThePit($ThePit){
    $this->ThePit = $ThePit;
    return $this->update($this->PlayerID);
  }
  public function setDavisLibrary($DavisLibrary){
    $this->DavisLibrary = $DavisLibrary;
    return $this->update($this->PlayerID);
  }
  public function setSitterson($Sitterson){
    $this->Sitterson = $Sitterson;
    return $this->update($this->PlayerID);
  }
  public function setBellTower($BellTower){
    $this->BellTower = $BellTower;
    return $this->update($this->PlayerID);
  }
  public function setRoads($Roads){
    $this->Roads = $Roads;
    return $this->update($this->PlayerID);
  }
  public function setVolunteer($Volunteer){
    $this->Volunteer = $Volunteer;
    return $this->update($this->PlayerID);
  }
  public function setMonopoly($Monopoly){
    $this->Monopoly = $Monopoly;
    return $this->update($this->PlayerID);
  }
}

class College {

  private $CollegeID;
  private $PlayerID;
  private $Available;
  private $University;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "aldenc",
          "comp426",
          "aldencdb");
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

  public static function getAllJSON() {
      $mysqli = College::connect();
      $result = $mysqli->query("SELECT * FROM Colleges");

      $json = array();
      if($result){
      while ($row = $result->fetch_array()) {
          $json_sub = array();
          $json_sub['CollegeID'] = $row['CollegeID'];
          $json_sub['PlayerID'] = $row['PlayerID'];
          $json_sub['Available'] = $row['Available'];
          $json_sub['University'] = $row['University'];
          $json[] = $json_sub;
      }
    }
      return json_encode($json);
  }

   private function update($CollegeID) {
     $mysqli= College::connect();

     $SQL = "Update Colleges set
     PlayerID = $this->PlayerID,
     Available = $this->Available,
     University = $this->University
     WHERE CollegeID = " . $CollegeID;
    $result= mysqli_query($mysqli, $SQL);

    if ($result == false) {
        header("HTTP/1.0 503 Service Unavailable");
        print("An error in the database occurred: " . $mysqli->error);
        exit();

    }

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

  public function setCollegeID($CollegeID){
    $this->CollegeID = $CollegeID;
    return $this->update($this->CollegeID);
  }

  public function setPlayerID($PlayerID){
    $this->PlayerID = $PlayerID;
    return $this->update($this->CollegeID);
  }

  public function setAvailable($Available){
    $this->Available = $Available;
    return $this->update($this->CollegeID);
  }

  public function setUniversity($University){
    $this->University = $University;
    return $this->update($this->CollegeID);
  }
}

class Turn{
  private $TurnID;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "aldenc",
          "comp426",
          "aldencdb");
  }

  public function GetHighestID(){
    $mysqli = Turn::connect();
    $SQL = "Select max(TurnID) as TurnID from Turns";
    $result = mysqli_query($mysqli, $SQL);
    if($result){
    if ($result->num_rows==0){
      return 1;
    }
    $row = $result->fetch_array();
    return intval($row['TurnID']);
  }
  return null;
}
  public function gameOver(){
    $mysqli = Turn::connect();
    $SQL = "SET IDENTITY_INSERT Turns ON";
    $result = mysqli_query($mysqli, $SQL);
    $SQL = "INSERT INTO Turns (TurnID) VALUES (10000)";
    $result = mysqli_query($mysqli, $SQL);
    $SQL = "SET IDENTITY_INSERT Turns OFF";
    $result = mysqli_query($mysqli, $SQL);
    $a = Turn::GetHighestID();
    return $a;

  }

  private function __construct($TurnID){
      $this->TurnID = $TurnID;
    }

  public function create(){
    $mysqli = Turn::connect();
    $id = Turn::getHighestID() + 1;
    $SQL = "Insert into Turns Values($id)";
    $result = mysqli_query($mysqli, $SQL);
    if ($result) {} else {
        header("HTTP/1.0 500 Server Error");
        print($mysqli->error);
        exit();
    }

    return new Turn($id);
  }

  public function getJSON(){
  $json_obj = array('TurnID' => $this->TurnID );
  return json_encode($json_obj);
  }
}
class DevStack {
  private $DevID;
  private $Card;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "aldenc",
          "comp426",
          "aldencdb");
  }

  public function create($DevID, $Card) {
      $mysqli = DevStack::connect();
      $res = $mysqli->query(
          "INSERT INTO DevStacks VAlUES ('$DevID', '$Card')"
      );

      if ($res) {} else {
          header("HTTP/1.0 500 Server Error");
          print($mysqli->error);
          exit();
      }
      return new DevStack($DevID, $Card);
  }

  public static function findByID($DevID){
    $mysqli= DevStack::connect();
    $SQL= "Select * from DevStacks where DevID = $DevID ";
    $result= mysqli_query($mysqli, $SQL);

    if($result){
      if($result->num_rows==0){
        return null;
      }
      else{
        $DevStack_info = $result->fetch_array();
        return new DevStack($DevStack_info['DevID'],
                           $DevStack_info['Card']);
      }
    }
  return null;
  }

  public static function getAllIDs() {
    $mysqli = DevStack::connect();
    $SQL = "Select DevID from DevStacks where 1";
    $result= mysqli_query($mysqli, $SQL);
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
    $id_array[] = intval($next_row['DevID']);
      }
    }
    return $id_array;
    }

  public function getJSON(){
  $json_obj = array('DevID' => $this->DevID,
                     'Card' => $this->Card );
  return json_encode($json_obj);
  }

  public static function getAllJSON() {
      $mysqli = DevStack::connect();
      $result = $mysqli->query("SELECT * FROM DevStacks");

      $json = array();
      if($result){
      while ($row = $result->fetch_array()) {
          $json_sub = array();
          $json_sub['DevID'] = $row['DevID'];
          $json_sub['Card'] = $row['Card'];
          $json[] = $json_sub;
      }
    }
      return json_encode($json);
  }

  private function update($DevID) {
    $mysqli= DevStack::connect();

    $SQL = "Update DevStacks set
    Card= $this->Card
    WHERE DevID = " . $DevID;
   $result= mysqli_query($mysqli, $SQL);

   if ($result == false) {
       header("HTTP/1.0 503 Service Unavailable");
       print("An error in the database occurred: " . $mysqli->error);
       exit();

   }

   return $result;
  }

 private function __construct($DevID, $Card){
 $this->DevID= $DevID;
 $this->Card = $Card;
 }
 public function getDevID() {
     return $this->DevID;
 }
 public function getCard() {
     return $this->Card;
  }
  public function setDevID($DevID){
    $this->DevID = $DevID;
    return $this->update($this->DevID);
  }
  public function setCard($Card){
    $this->Card = $Card;
    return $this->update($this->DevID);
  }

}


class Tile {
  private $TileID;
  private $Robber;
  private $Placement;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "aldenc",
          "comp426",
          "aldencdb");
  }

  public function create($TileID, $Robber, $Placement) {
      $mysqli = Tile::connect();
      $res = $mysqli->query(
          "INSERT INTO Tiles VAlUES ('$TileID', '$Robber', '$Placement')"
      );

      if ($res) {} else {
          header("HTTP/1.0 500 Server Error");
          print($mysqli->error);
          exit();
      }
      return new Tile($TileID, $Robber, $Placement);
  }

  public static function findByID($TileID){
    $mysqli= Tile::connect();
    $SQL= "Select * from Tiles where TileID = $TileID ";
    $result= mysqli_query($mysqli, $SQL);

    if($result){
      if($result->num_rows==0){
        return null;
      }
      else{
        $Tile_info = $result->fetch_array();
        return new Tile($Tile_info['TileID'],
                           $Tile_info['Robber'],
                            $Tile_info['Placement']);
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
                     'Robber' => $this->Robber,
                      'Placement' => $this ->Placement);

  return json_encode($json_obj);
  }

  public static function getAllJSON() {
      $mysqli = Tile::connect();
      $result = $mysqli->query("SELECT * FROM Tiles");

      $json = array();
      if($result){
      while ($row = $result->fetch_array()) {
          $json_sub = array();
          $json_sub['TileID'] = $row['TileID'];
          $json_sub['Robber'] = $row['Robber'];
          $json_sub['Placement'] = $row['Placement'];
          $json[] = $json_sub;
      }
    }
      return json_encode($json);
  }

  private function update($TileID) {
    $mysqli= Tile::connect();

    $SQL = "Update Tiles set
    Robber = $this->Robber,
    Placement = $this->Placement
    WHERE TileID = $TileID";
   $result= mysqli_query($mysqli, $SQL);

   if ($result == false) {
       header("HTTP/1.0 503 Service Unavailable");
       print("An error in the database occurred: " . $mysqli->error);
       exit();

   }

   return $result;
  }

 private function __construct($TileID, $Robber, $Placement){
 $this->TileID= $TileID;
 $this->Robber = $Robber;
 $this->Placement = $Placement;
 }
 public function getTileID() {
     return $this->TileID;
 }
 public function getPlacement(){
      return $this->Placement;
 }
 public function getRobber() {
     return $this->Robber;
  }
  public function setTileID($TileID){
    $this->TileID = $TileID;
    return $this->update($this->TileID);
  }
  public function setPlacement($Placement){
    $this->Placement = $Placement;
    return $this->update($this->Placement);
  }
  public function setRobber($Robber){
    $this->Robber = $Robber;
    return $this->update($this->TileID);
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
            "aldenc",
            "comp426",
            "aldencdb");
    }

  public static function findByID($RoadID){
    $mysqli= Road::connect();
    $SQL= "Select * from Roads where RoadID = $RoadID ";
    $result= $mysqli->query($SQL);

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

  public static function getAllJSON() {
      $mysqli = Road::connect();
      $result = $mysqli->query("SELECT * FROM Roads");

      $json = array();
      if($result){
      while ($row = $result->fetch_array()) {
          $json_sub = array();
          $json_sub['RoadID'] = $row['RoadID'];
          $json_sub['PlayerID'] = $row['PlayerID'];
          $json_sub['Available'] = $row['Available'];
          $json[] = $json_sub;
      }
    }
      return json_encode($json);
  }

   private function update($RoadID) {
     $mysqli= Road::connect();

     $SQL =
     "Update Roads set
     PlayerID = $this->PlayerID,
     Available = $this->Available
     WHERE RoadID = $RoadID";
    $result= mysqli_query($mysqli, $SQL);

    if ($result == false) {
        header("HTTP/1.0 503 Service Unavailable");
        print("An error in the database occurred: " . $mysqli->error);
        exit();

    }
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

  public function setRoadID($RoadID){
    $this->RoadID = $RoadID;
    return $this->update($this->RoadID);
  }

  public function setPlayerID($PlayerID){
    $this->PlayerID = $PlayerID;
    return $this->update($this->RoadID);
  }

  public function setAvailable($Available){
    $this->Available = $Available;
    return $this->update($this->RoadID);
  }

}

class Player {
  private $PlayerID;
  private $Username;
  private $RoadsCount;
  private $SoldiersCount;
  private $Points;
  private $HexColor;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "aldenc",
          "comp426",
          "aldencdb");
  }

  public function create($PlayerID, $Username, $RoadsCount,
  $SoldiersCount, $Points, $HexColor) {
      $mysqli = Player::connect();
      $res = $mysqli->query(
          "INSERT INTO Players VAlUES('$PlayerID', '$Username',
          '$RoadsCount', '$SoldiersCount', '$Points', '$HexColor')"
      );

      if ($res) {} else {
          header("HTTP/1.0 500 Server Error");
          print($mysqli->error);
          exit();
      }

      return new Player($PlayerID, $Username, $RoadsCount, $SoldiersCount, $Points, $HexColor);
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
                           $Player_info['SoldiersCount'],
                           $Player_info['Points'],
                           $Player_info['HexColor']);
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
                    'Points' => $this->Points,
                    'HexColor' => $this->HexColor);
  return json_encode($json_obj);
  }

  public static function getAllJSON() {
      $mysqli = Player::connect();
      $result = $mysqli->query("SELECT * FROM Players");

      $json = array();
      if($result){
      while ($row = $result->fetch_array()) {
          $json_sub = array();
          $json_sub['PlayerID'] = $row['PlayerID'];
          $json_sub['Username'] = $row['Username'];
          $json_sub['RoadsCount'] = $row['RoadsCount'];
          $json_sub['SoldiersCount'] = $row['SoldiersCount'];
          $json_sub['Points'] = $row['Points'];
          $json_sub['HexColor'] = $row['HexColor'];
          $json[] = $json_sub;
      }
    }
      return json_encode($json);
  }

 private function update($PlayerID) {
   $mysqli= Player::connect();

   $SQL = "Update Players set
   Username = '$this->Username',
   RoadsCount = $this->RoadsCount,
   SoldiersCount = $this->SoldiersCount,
   Points = $this->Points,
   HexColor = '$this->HexColor'
   WHERE PlayerID = " . $PlayerID;
  $result= mysqli_query($mysqli, $SQL);


  if ($result == false) {
      header("HTTP/1.0 503 Service Unavailable");
      print("An error in the database occurred: " . $mysqli->error);
      exit();
  }

    return $result;
  }

private function __construct($PlayerID, $Username, $RoadsCount, $SoldiersCount, $Points, $HexColor){
    $this->PlayerID= $PlayerID;
    $this->Username= $Username;
    $this->RoadsCount= $RoadsCount;
    $this->SoldiersCount= $SoldiersCount;
    $this->Points= $Points;
    $this->HexColor = $HexColor;
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
  public function getHexColor(){
    return $this->HexColor;
  }

  public function setPlayerID($PlayerID){
    $this->PlayerID = $PlayerID;
    return $this->update($this->PlayerID);
  }

  public function setUsername($Username){
    $this->Username = $Username;
    return $this->update($this->PlayerID);
  }

  public function setRoadsCount($RoadsCount){
    $this->RoadsCount = $RoadsCount;
    return $this->update($this->PlayerID);
  }

  public function setSoldiersCount($SoldiersCount){
    $this->SoldiersCount = $SoldiersCount;
    return $this->update($this->PlayerID);
  }

  public function setPoints($Points){
    $this->Points = $Points;
    return $this->update($this->PlayerID);
  }

  public function setHexColor($HexColor){
    $this->HexColor = $HexColor;
    return $this->update($this->PlayerID);
  }

}

class DiceRoll {
  private $DiceID;
  private $RollResult;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu",
          "aldenc",
          "comp426",
          "aldencdb");
  }

  public function create($DiceID, $RollResult) {
      $mysqli = DiceRoll::connect();
      $res = $mysqli->query(
          "INSERT INTO DiceRolls VAlUES ('$DiceID', '$RollResult')"
      );

      if ($res) {} else {
          header("HTTP/1.0 500 Server Error");
          print($mysqli->error);
          exit();
      }
      return new DiceRoll($DiceID, $RollResult);
  }

  public static function findByID($DiceID){
    $mysqli= DiceRoll::connect();
    $SQL= "Select * from DiceRolls where DiceID = $DiceID ";
    $result= mysqli_query($mysqli, $SQL);

    if($result){
      if($result->num_rows==0){
        return null;
      }
      else{
        $DiceRoll_info = $result->fetch_array();
        return new DiceRoll($DiceRoll_info['DiceID'],
                           $DiceRoll_info['RollResult']);
      }
    }
  return null;
  }

  public static function getAllIDs() {
    $mysqli = DiceRoll::connect();
    $SQL = "Select DiceID from DiceRolls where 1";
    $result= mysqli_query($mysqli, $SQL);
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
    $id_array[] = intval($next_row['DiceID']);
      }
    }
    return $id_array;
    }

  public function getJSON(){
  $json_obj = array('DiceID' => $this->DiceID,
                     'RollResult' => $this->RollResult );
  return json_encode($json_obj);
  }

  public static function getAllJSON() {
      $mysqli = DiceRoll::connect();
      $result = $mysqli->query("SELECT * FROM DiceRolls");

      $json = array();
      if($result){
      while ($row = $result->fetch_array()) {
          $json_sub = array();
          $json_sub['DiceID'] = $row['DiceID'];
          $json_sub['RollResult'] = $row['RollResult'];
          $json[] = $json_sub;
      }
    }
      return json_encode($json);
  }

  private function update($DiceID) {
    $mysqli= DiceRoll::connect();

    $SQL = "Update DiceRolls set
    RollResult= $this->RollResult
    WHERE DiceID = $DiceID";
   $result= mysqli_query($mysqli, $SQL);

   if ($result == false) {
       header("HTTP/1.0 503 Service Unavailable");
       print("An error in the database occurred: " . $mysqli->error);
       exit();

   }

   return $result;
  }

 private function __construct($DiceID, $RollResult){
 $this->DiceID= $DiceID;
 $this->RollResult = $RollResult;
 }
 public function getDiceID() {
     return $this->DiceID;
 }
 public function getRollResult() {
     return $this->RollResult;
  }
  public function setDiceID($DiceID){
    $this->DiceID = $DiceID;
    return $this->update($this->$DiceID);
  }
  public function setRollResult($RollResult){
    $this->RollResult = $RollResult;
    return $this->update($this->DiceID);
  }

}

 ?>
