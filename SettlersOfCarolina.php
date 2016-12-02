<?php
require_once('SettlersOfCarolina-orm.php');

//NUMBER ONE: Get Multiple People in One Game
//we need function to update/get cards
//to get/update roads
//To get/update colleges
//To find/set robber
//Get and update Player Information.

//Classes: Player, Road, Tile, Card, College

//Get/SettlersofCarolina/Cards/PlayerID and POST/SettlersofCarolina/Cards/PlayerID
//global $path_components;
//

 $path_components= explode('/', $_SERVER['PATH_INFO']);

  if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if($path_components[1]=="Cards"){
      if($path_components[2]!="" &&
    count($path_components) >= 3){
        $PlayerID= intval($path_components[2]);
        $requested_hand = Card::findByID($PlayerID);
        if ($requested_hand == null) {
          // not found.
          header("HTTP/1.0 404 Not Found");
          print("Player id: " . $PlayerID . " not found.");
          exit();
        }
        header("Content-type: application/json");
        print($requested_hand->getJSON());
        exit();
      }
      else{
        // no ID, try returning all IDs.
        //TODO implement .getAllIDs
        header("Content-type: application/json");
        print("Tried usong getAllIds()");
        exit();
      }
    }
  else if($path_components[1]=="Players"){
    if($path_components[2]!="" &&
  count($path_components) >= 3){
      $PlayerID= intval($path_components[2]);
      $Player_Info = Player::findByID($PlayerID);
      if ($Player_Info == null) {
        // not found.
        header("HTTP/1.0 404 Not Found");
        print("Player id: " . $PlayerID . " not found.");
        exit();
      }
      header("Content-type: application/json");
      print($Player_Info->getJSON());
      exit();
    }
    else{
      // no ID, try returning all IDs.
      //TODO implement .getAllIDs
      header("Content-type: application/json");
      print("Tried usong getAllIds()");
      exit();
    }
  }
  else if($path_components[1]=="Roads"){
    if($path_components[2]!="" &&
  count($path_components) >= 3){
      $RoadID= intval($path_components[2]);
      $Road_Info = Road::findByID($RoadID);
      if ($Road_Info == null) {
        // not found.
        header("HTTP/1.0 404 Not Found");
        print("Road id: " . $RoadID . " not found.");
        exit();
      }
      header("Content-type: application/json");
      print($Road_Info->getJSON());
      error_log(print_r($Road_Info, true), 3,  "debug.txt");
      exit();
    }
    else{
      // no ID, try returning all IDs.
      //TODO implement .getAllIDs
      header("Content-type: application/json");
      print("Tried usong getAllIds()");
      exit();
    }
  }
  else if($path_components[1]=="Tiles"){
    if($path_components[2]!="" &&
  count($path_components) >= 3){
      $TileID= intval($path_components[2]);
      $Tile_Info = Tile::findByID($TileID);
      if ($Tile_Info == null) {
        // not found.
        header("HTTP/1.0 404 Not Found");
        print("Tile id: " . $Tile_info . " not found.");
        exit();
      }
      header("Content-type: application/json");
      print($Tile_Info->getJSON());
      exit();
    }
    else{
      // no ID, try returning all IDs.
      //TODO implement .getAllIDs
      //header("Content-type: application/json");
      //print(json_encode(Tile::getAllIDs()));
      exit();
    }
  }
  else if($path_components[1]=="Colleges"){
    if($path_components[2]!="" &&
  count($path_components) >= 3){
      $CollegeID= intval($path_components[2]);
      $College_Info = College::findByID($CollegeID);
      if ($College_Info == null) {
        // not found.
        header("HTTP/1.0 404 Not Found");
        print("College id: " . $CollegeID . " not found.");
        exit();
      }
      header("Content-type: application/json");
      print($College_Info->getJSON());
      exit();
    }
    else{
      // no ID, try returning all IDs.
      //TODO implement .getAllIDs
      header("Content-type: application/json");
      print("Tried usong getAllIds()");
      exit();
  }
}
header("HTTP/1.0 404 Not Found");
print("Get Doesn't match any DB.");
exit();
}
  if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if ((count($path_components) >= 2) &&
        ($path_components[1] != "")) {
        global $DBname;
        $DBname = $path_components[1];
        if($DBname=="Players"){
          postPlayer();
        }
        else if($DBname=="Roads"){
          postRoad();
        }
        else if($DBname=="College"){
          postCollege();
        }
        else if($DBname=="Tiles"){
          postTile();
        }
        else if($DBname=="Cards"){
          postCard();
        }
  }
  header("HTTP/1.0 404 Not Found");
  print("Post Doesn't match any DB.");
  exit();
}
// If here, none of the above applied and URL could
// not be interpreted with respect to RESTful conventions.

header("HTTP/1.0 400 Bad Request");
print("Did not understand URL");


  //helper functions

  function postPlayer(){
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $PlayerID= intval($path_components[2]);
          $Player = Player::findbyID($PlayerID);
          if($PlayerID==null){
              header("HTTP/1.0 404 Not Found");
              print("Road id: " . $PlayerID . " not found while attempting update.");
              exit();
          }
          //check which values to update
          $new_Username = false;
          if(isset($_REQUEST['Username'])){
            $new_Username= trim($_Request['Username']);
            if ($new_Username == "") {
              header("HTTP/1.0 400 Bad Request");
              print("Bad Username");
              exit();
              }
          }
          $new_RoadsCount= false;
          if(isset($_REQUEST['RoadsCount'])){
            $new_RoadsCount=intval(trim($_REQUEST['RoadsCount']));
          }
          $new_SoldiersCount= false;
          if(isset($_REQUEST['SoldiersCount'])){
            $new_SoldiersCount=intval(trim($_REQUEST['SoldiersCount']));
          }
          $new_Points=false;
          if(isset($_REQUEST['Points'])){
            $new_Points=intval(trim($_REQUEST['Points']));
          }
          //update via ORM
          if($new_Username != false){
            $Player->setUsername($new_Username);
          }
          if($new_RoadsCount != false){
            $Player->setRoadsCount($new_RoadsCount);
          }
          if($new_SoldiersCount!= false){
            $Player->setSoldiersCount($new_SoldiersCount);
          }
          if($new_Points!= false){
              $Player->setPoints($new_Points);
            }
             //return json
            header("Content-type: application/json");
            print($Player->getJSON());
            exit();
      }
      else{
        //no ID, what now?
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
  }

  function postRoad(){
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $RoadID= intval($path_components[2]);
          $Road = Road::findbyID($RoadID);
          if($RoadID==null){
              header("HTTP/1.0 404 Not Found");
              print("Road id: " . $RoadID . " not found while attempting update.");
              exit();
          }
          //check which values to update
          $new_PlayerID= false;
          if(isset($_REQUEST['PlayerID'])){
            $new_PlayerID=intval(trim($_REQUEST['PlayerID']));
          }
          $new_Available= false;
          if(isset($_REQUEST['Available'])){
            $new_Available=intval(trim($_REQUEST['Available']));
          }
          //update via ORM
          if($new_PlayerID != false){
            $Road->setPlayerID($new_PlayerID);
          }
          if($new_Available != false){
            $Road->setAvailable($new_Available);
          }
             //return json
            header("Content-type: application/json");
            print($Road->getJSON());
            exit();
      }
      else{
        //no ID, what now?
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
  }

  function postCollege(){
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $CollegeID= intval($path_components[2]);
          $College = College::findbyID($CollegeID);
          if($CollegeID==null){
              header("HTTP/1.0 404 Not Found");
              print("College id: " . $CollegeID . " not found while attempting update.");
              exit();
          }
          //check which values to update
          $new_PlayerID= false;
          if(isset($_REQUEST['PlayerID'])){
            $new_PlayerID=intval(trim($_REQUEST['PlayerID']));
          }
          $new_Available= false;
          if(isset($_REQUEST['Available'])){
            $new_Available=intval(trim($_REQUEST['Available']));
          }
          $new_University=false;
          if(isset($_Request['University'])){
            $new_University= intval(trim($_Request['University']));
          }
          //update via ORM
          if($new_PlayerID != false){
            $College->setPlayerID($new_PlayerID);
          }
          if($new_Available != false){
            $College->setAvailable($new_Available);
          }
          if($new_University != false){
            $College->setAvailable($new_University);
          }
             //return json
            header("Content-type: application/json");
            print($College->getJSON());
            exit();
      }
      else{
        //no ID, what now?
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
  }
  function postTile(){
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $TileID= intval($path_components[2]);
          $Tile = Tile::findbyID($TileID);
          if($TileID==null){
              header("HTTP/1.0 404 Not Found");
              print("Tile id: " . $TileID . " not found while attempting update.");
              exit();
          }
          //check which values to update
          $new_Robber=false;
          if(isset($_Request['Robber'])){
            $new_Robber= intval(trim($_Request['Robber']));
          }
          //update via ORM
          if($new_Robber != false){
            $Tile->setAvailable($new_Robber);
          }
             //return json
            header("Content-type: application/json");
            print($Tile->getJSON());
            exit();
      }
      else{
        //no ID, what now?
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
  }

  function postCard(){
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $PlayreID= intval($path_components[2]);
          $Card = Card::findbyID($PlayerID);
          if($PlayreID==null){
              header("HTTP/1.0 404 Not Found");
              print("Player id: " . $PlayerID . " not found while attempting update.");
              exit();
          }
          //check which values to update
          $new_Ram=false;
          if(isset($_Request['Ram'])){
            $new_Ram= intval(trim($_Request['Ram']));
          }
          $new_Ramen=false;
          if(isset($_Request['Ramen'])){
            $new_Ramen= intval(trim($_Request['Ramen']));
          }
          $new_Brick=false;
          if(isset($_Request['Brick'])){
            $new_Brick= intval(trim($_Request['Brick']));
          }
          $new_Basketball=false;
          if(isset($_Request['Basketball'])){
            $new_Basketball= intval(trim($_Request['Basketball']));
          }
          $new_Book=false;
          if(isset($_Request['Book'])){
            $new_Book= intval(trim($_Request['Book']));
          }
          $new_Knight=false;
          if(isset($_Request['Knight'])){
            $new_Knight= intval(trim($_Request['Knight']));
          }
          $new_OldWell=false;
          if(isset($_Request['Oldwell'])){
            $new_Oldwell= intval(trim($_Request['Oldwell']));
          }
          $new_ThePit=false;
          if(isset($_Request['ThePit'])){
            $new_ThePit= intval(trim($_Request['ThePit']));
          }
          $new_DavisLibrary=false;
          if(isset($_Request['DavisLibrary'])){
            $new_DavisLibrary= intval(trim($_Request['DavisLibrary']));
          }
          $new_Sitterson=false;
          if(isset($_Request['Sitterson'])){
            $new_Sitterson= intval(trim($_Request['Sitterson']));
          }
          $new_BellTower=false;
          if(isset($_Request['BellTower'])){
            $new_BellTower= intval(trim($_Request['BellTower']));
          }
          $new_Roads=false;
          if(isset($_Request['Roads'])){
            $new_Roads= intval(trim($_Request['Roads']));
          }
          $new_Volunteer=false;
          if(isset($_Request['Volunteer'])){
            $new_Volunteer= intval(trim($_Request['Volunteer']));
          }
          $new_Monopoly=false;
          if(isset($_Request['Monopoly'])){
            $new_Monopoly= intval(trim($_Request['Monopoly']));
          }

          //update via ORM
          $new_Ram=false;
          if($new_Ram != false){
            $Card->setAvailable($new_Ram);
          }
          $new_Ramen=false;
          if($new_Ramen != false){
            $Card->setAvailable($new_Ramen);
          }
          $new_Brick=false;
          if($new_Brick != false){
            $Card->setAvailable($new_Brick);
          }
          $new_Basketball=false;
          if($new_Basketball != false){
            $Card->setAvailable($new_Basketball);
          }
          $new_Book=false;
          if($new_Book != false){
            $Card->setAvailable($new_Book);
          }
          $new_Knight=false;
          if($new_Knight != false){
            $Card->setAvailable($new_Knight);
          }
          $new_OldWell=false;
          if($new_OldWell != false){
            $Card->setAvailable($new_OldWell);
          }
          $new_ThePit=false;
          if($new_ThePit != false){
            $Card->setAvailable($new_ThePit);
          }
          $new_DavisLibrary=false;
          if($new_DavisLibrary != false){
            $Card->setAvailable($new_DavisLibrary);
          }
          $new_Sitterson=false;
          if($new_Sitterson != false){
            $Card->setAvailable($new_Sitterson);
          }
          $new_BellTower=false;
          if($new_BellTower != false){
            $Card->setAvailable($new_BellTower);
          }
          $new_Roads=false;
          if($new_Roads != false){
            $Card->setAvailable($new_Roads);
          }
          $new_Volunteer=false;
          if($new_Volunteer != false){
            $Card->setAvailable($new_Volunteer);
          }
          $new_Monopoly=false;
          if($new_Monopoly != false){
            $Card->setAvailable($new_Monopoly);
          }

             //return json
            header("Content-type: application/json");
            print($Card->getJSON());
            exit();
      }
      else{
        //no ID, what now?
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
  }

 ?>
