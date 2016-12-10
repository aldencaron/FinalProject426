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
global $path_components;
//
 $path_components= explode('/', $_SERVER['PATH_INFO']);
 //error_log(print_r($path_components, true), 3,  "debug.txt");
  if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if($path_components[1]=="Cards"){
      if($path_components[2]!="" &&
    count($path_components) >= 3){
      if($path_components[2]=='getAll'){
        header("Content-type: application/json");
        print(Card::getALLJSON());
        exit();
      }
      //if there is an id
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
        print(json_encode(Card::getALLIDs()));
        exit();
      }
    }
  else if($path_components[1]=="Players"){
    if($path_components[2]!="" &&
  count($path_components) >= 3){
    if($path_components[2]=='getAll'){
      header("Content-type: application/json");
      print(Player::getALLJSON());
      exit();
    }
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
      print(json_encode(Player::getALLIDs()));
      exit();
    }
  }
  else if($path_components[1]=="Roads"){
    if($path_components[2]!="" &&
  count($path_components) >= 3){
    if($path_components[2]=='getAll'){
      header("Content-type: application/json");
      print(Road::getALLJSON());
      exit();
    }
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
      //error_log(print_r($Road_Info, true), 3,  "debug.txt");
      exit();
    }
    else{
      // no ID, try returning all IDs.
      //TODO implement .getAllIDs
      header("Content-type: application/json");
        print(json_encode(Road::getALLIDs()));
        exit();
    }
  }
  else if($path_components[1]=="Tiles"){
    if($path_components[2]!="" &&
  count($path_components) >= 3){
    if($path_components[2]=='getAll'){
      header("Content-type: application/json");
      print(Tile::getALLJSON());
      exit();
    }
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
      header("Content-type: application/json");
      print(json_encode(Tile::getAllIDs()));
      exit();
    }
  }
  else if($path_components[1]=="Colleges"){
    if($path_components[2]!="" &&
  count($path_components) >= 3){
    if($path_components[2]=='getAll'){
      header("Content-type: application/json");
      print(College::getALLJSON());
      exit();
    }
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
      header("Content-type: application/json");
      print(json_encode(College::getALLIDs()));
      exit();
  }
}  else if($path_components[1]=="DiceRolls"){
        if($path_components[2]!="" &&
        count($path_components) >= 3) {
            $DiceID= intval($path_components[2]);
            $DiceRoll_Info = DiceRoll::findByID($DiceID);
            if ($DiceRoll_Info == null) {
                // not found.
                header("HTTP/1.0 404 Not Found");
                print("Dice id: " . $DiceRoll_info . " not found.");
                exit();
            }
      header("Content-type: application/json");
      print($DiceRoll_Info->getJSON());
      exit();
    }
  }
    else if($path_components[1]=="Turns"){
      if ($path_components[2] == "gameover") {
        $Turn = Turn::gameOver();
        if($Turn == null){
          header("HTTP/1.0 404 Not Found");
          print("gameover failed.");
          exit();
        }
      }
      $Turn = Turn::GetHighestID();
      if($Turn == null){
        header("HTTP/1.0 404 Not Found");
        print("Turn not found.");
        exit();
      }
      header("Content-type: application/json");
      print(json_encode($Turn));
      exit();
    }
header("HTTP/1.0 404 Not Found");
print("Get Doesn't match any DB.");
exit();
}
  if ($_SERVER['REQUEST_METHOD'] == "POST") {
  //  if ((count($path_components) >= 2) &&
  //      ($path_components[1] != "")) {
        global $DBname;
        $DBname = $path_components[1];
        if($DBname=="Players"){
          postPlayer();
        }
        else if($DBname=="Roads"){
          postRoad();
        }
        else if($DBname=="Colleges"){
          postCollege();
        }
        else if($DBname=="Tiles"){
          postTile();
        }
        else if($DBname=="Cards"){
          postCard();
        }
        else if($DBname=="DiceRolls"){
          postDiceRoll();
        }
        else if($DBname== 'Turns'){
          global $path_components;
          // if ($path_components[2] == "gameover") {

            $Turn = Turn::gameOver();
            if($Turn == null){
              header("HTTP/1.0 404 Not Found");
              print("gameover failed.");
              exit();
            }
          // }
        //   $Turn = Turn::create();
        //   header("Content-type: application/json");
        //   print($Turn->getJSON());
        //   exit();
        // }
    }
//  }
  header("HTTP/1.0 404 Not Found");
  print("Post Doesn't match any DB.");
  exit();
// If here, none of the above applied and URL could
// not be interpreted with respect to RESTful conventions.
//header("HTTP/1.0 400 Bad Request");
//print("Did not understand URL");
  //helper functions
  function postPlayer(){
      global $path_components;
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $PlayerID= intval($path_components[2]);
          $Player = Player::findByID($PlayerID);
          if($Player==null){
              function createPlayer() {
                  // Create new Player
                  $new_PlayerID = false;
                  if (isset($_REQUEST['PlayerID'])) {
                      $new_PlayerID = intval(trim($_REQUEST['PlayerID']));
                  } else {
                      header("HTTP/1.0 400 Bad PlayerID Request");
                      print("PlayerID is is not given.");
                      exit();
                  }
                  $new_Username = false;
                  if (isset($_REQUEST['Username'])) {
                      $new_Username = trim($_REQUEST['Username']);
                  } else {
                      header("HTTP/1.0 400 Bad Username Request");
                      print("Username is is not given.");
                      exit();
                  }
                  $new_RoadsCount = false;
                  if (isset($_REQUEST['RoadsCount'])) {
                      $new_RoadsCount = intval(trim($_REQUEST['RoadsCount']));
                  } else {
                      header("HTTP/1.0 400 Bad RoadsCount Request");
                      print("RoadsCount is is not given.");
                      exit();
                  }
                  $new_SoldiersCount = false;
                  if (isset($_REQUEST['SoldiersCount'])) {
                      $new_SoldiersCount = intval(trim($_REQUEST['SoldiersCount']));
                  } else {
                      header("HTTP/1.0 400 Bad SoldiersCount Request");
                      print("SoldiersCount is is not given.");
                      exit();
                  }
                  $new_Points = false;
                  if (isset($_REQUEST['Points'])) {
                      $new_Points = intval(trim($_REQUEST['Points']));
                  } else {
                      header("HTTP/1.0 400 Bad Points Request");
                      print("Points is is not given.");
                      exit();
                  }

                  $new_HexColor = false;
                  if (isset($_REQUEST['HexColor'])) {
                      $new_HexColor = intval(trim($_REQUEST['HexColor']));
                  }
                  // else {
                  //     header("HTTP/1.0 400 Bad HexColor Request");
                  //     print("HexColor is not given");
                  //     exit();
                  // }

                  if (isset($_REQUEST['PlayerID']) && isset($_REQUEST['Username']) &&
                    isset($_REQUEST['Points']) && isset($_REQUEST['SoldiersCount']) &&
                    isset($_REQUEST['RoadsCount'])
                     //&& isset($_REQUEST['HexColor'])
                   ) {
                      $Player = Player::create($new_PlayerID, $new_Username,
                      $new_RoadsCount, $new_SoldiersCount, $new_Points, $newHexColor);
                      if ($Player == null) {
                          header("HTTP/1.0 500 Server Error");
                          print("Player was not inserted");
                          exit();
                      }
                      header("Content-type: application/json");
                      print($Player->getJSON());
                      exit();
                  }
              }
              createPlayer();
          }
          //check which values to update
          $new_PlayerID = false;
          if (isset($_REQUEST['PlayerID'])) {
              $new_PlayerID = intval(trim($_REQUEST['PlayerID']));
          }
          $new_Username = false;
          if(isset($_REQUEST['Username'])){
            $new_Username= trim($_REQUEST['Username']);
            if ($new_Username == "") {
              header("HTTP/1.0 400 Bad Username Request");
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
          $new_HexColor = false;
          if (isset($_REQUEST['HexColor'])) {
              $new_HexColor = intval(trim($_REQUEST['HexColor']));
          }
          //update via ORM
          if ($new_PlayerID != false) {
              $Player->setPlayerID($new_PlayerID);
          }
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
          if ($new_HexColor != false) {
              $Player->setHexColor($new_HexColor);
          }
             //return json
            header("Content-type: application/json");
            print($Player->getJSON());
            exit();
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
    exit();
  }
  function postRoad(){
    global $path_components;
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $RoadID= intval($path_components[2]);
          $Road = Road::findByID($RoadID);
          if($Road==null){
              // Inner function goes here
              function createRoad() {
                  $new_RoadID = false;
                  if (isset($_REQUEST['RoadID'])) {
                      $new_RoadID = intval(trim($_REQUEST['RoadID']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("RoadID is not given.");
                      exit();
                  }
                  $new_PlayerID = false;
                  if (isset($_REQUEST['PlayerID'])) {
                      $new_PlayerID = intval(trim($_REQUEST['PlayerID']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("PlayerID is not given.");
                      exit();
                  }
                  $new_Available = false;
                  if (isset($_REQUEST['Available'])) {
                      $new_Available = intval(trim($_REQUEST['Available']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Available is not given.");
                      exit();
                  }
                  if ($new_RoadID && $new_PlayerID && $new_Available) {
                      $Road = Road::create($new_RoadID, $new_PlayerID, $new_Available);
                      if ($Road == null) {
                          header("HTTP/1.0 500 Server Error");
                          print("Road was not inserted");
                          exit();
                      }
                      header("Content-type: application/json");
                      print($Road->getJSON());
                      exit();
                  }
              }
              createRoad();
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
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
    exit();
  }
  function postCollege(){
    global $path_components;
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $CollegeID= intval($path_components[2]);
          $College = College::findByID($CollegeID);
          if($College==null){
              function createCollege() {
                  // Create new College
                  $new_CollegeID = false;
                  if (isset($_REQUEST['CollegeID'])) {
                      $new_CollegeID = intval(trim($_REQUEST['CollegeID']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("CollegeID is not given.");
                      exit();
                  }
                  $new_PlayerID = false;
                  if (isset($_REQUEST['CollegeID'])) {
                      $new_PlayerID = intval(trim($_REQUEST['PlayerID']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("PlayerID is not given.");
                      exit();
                  }
                  $new_Available = false;
                  if (isset($_REQUEST['Available'])) {
                      $new_Available = intval(trim($_REQUEST['Available']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Available is not given.");
                      exit();
                  }
                  $new_University = false;
                  if (isset($_REQUEST['University'])) {
                      $new_University = intval(trim($_REQUEST['University']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("University is not given.");
                      exit();
                  }
                  if ($new_CollegeID && $new_PlayerID && $new_Available && $new_University) {
                      $College = College::create($new_CollegeID, $new_PlayerID, $new_Available, $new_University);
                      if ($College == null) {
                          header("HTTP/1.0 500 Server Error");
                          print("College was not inserted");
                          exit();
                      }
                      header("Content-type: application/json");
                      print($College->getJSON());
                      exit();
                  }
              }
              createCollege();
          }
          //check which values to update
          $new_CollegeID = false;
          if (isset($_REQUEST['CollegeID'])) {
              $new_CollegeID = intval(trim($_REQUEST['CollegeID']));
          }
          $new_PlayerID= false;
          if(isset($_REQUEST['PlayerID'])){
            $new_PlayerID=intval(trim($_REQUEST['PlayerID']));
          }
          $new_Available= false;
          if(isset($_REQUEST['Available'])){
            $new_Available=intval(trim($_REQUEST['Available']));
          }
          $new_University=false;
          if(isset($_REQUEST['University'])){
            $new_University= intval(trim($_REQUEST['University']));
          }
          //update via ORM
          if ($new_CollegeID != false) {
              $College->setCollegeID($new_CollegeID);
          }
          if($new_PlayerID != false){
            $College->setPlayerID($new_PlayerID);
          }
          if($new_Available != false){
            $College->setAvailable($new_Available);
          }
          if($new_University != false){
            $College->setUniversity($new_University);
          }
             //return json
            header("Content-type: application/json");
            print($College->getJSON());
            exit();
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
  }
  function postTile(){
      global $path_components;
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $TileID= intval($path_components[2]);
          $Tile = Tile::findByID($TileID);
          if($Tile==null){
              function createTile() {
                  // Create new Tile
                  $new_TileID = false;
                  if (isset($_REQUEST['TileID'])) {
                      $new_TileID = intval(trim($_REQUEST['TileID']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("TileID is is not given.");
                      exit();
                  }
                  $new_Robber = false;
                  if (isset($_REQUEST['Robber'])) {
                      $new_Robber = intval(trim($_REQUEST['Robber']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Robber is is not given.");
                      exit();
                  }
                  if ($new_TileID && $new_Robber) {
                      $Tile = Tile::create($new_TileID, $new_Robber);
                      if ($Tile == null) {
                          header("HTTP/1.0 500 Server Error");
                          print("Tile was not inserted");
                          exit();
                      }
                      header("Content-type: application/json");
                      print($Tile->getJSON());
                      exit();
                  }
              }
              createTile();
          }
          //check which values to update
          $new_TileID = false;
          if (isset($_REQUEST["TileID"])) {
              $new_TileID = intval(trim($_REQUEST['TileID']));
          }
          $new_Robber=false;
          if(isset($_REQUEST["Robber"])){
            $new_Robber= intval(trim($_REQUEST['Robber']));
          }
          //update via ORM
          if ($new_TileID != false) {
              $Tile->setTileID($new_TileID);
          }
          if($new_Robber != false){
            $Tile->setRobber($new_Robber);
          }
             //return json
            header("Content-type: application/json");
            print($Tile->getJSON());
            exit();
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
}
  function postCard(){
      global $path_components;
    if ((count($path_components) >= 3) &&
        ($path_components[2] != "")) {
          $CardID= intval($path_components[2]);
          $Card = Card::findByID($CardID);
          if($Card==null){
              function createCard() {
                  // Create new Card
                  $new_PlayerID = false;
                  if (isset($_REQUEST['PlayerID'])) {
                      $new_PlayerID = intval(trim($_REQUEST['PlayerID']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("PlayerID is not given.");
                      exit();
                  }
                  $new_Ram = false;
                  if (isset($_REQUEST['Ram'])) {
                      $new_Ram = intval(trim($_REQUEST['Ram']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Ram is not given.");
                      exit();
                  }
                  $new_Ramen = false;
                  if (isset($_REQUEST['Ramen'])) {
                      $new_Ramen = intval(trim($_REQUEST['Ramen']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Ramen is not given.");
                      exit();
                  }
                  $new_Brick = false;
                  if (isset($_REQUEST['Brick'])) {
                      $new_Brick = intval(trim($_REQUEST['Brick']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Brick is not given.");
                      exit();
                  }
                  $new_Basketball = false;
                  if (isset($_REQUEST['Basketball'])) {
                      $new_Basketball = intval(trim($_REQUEST['Basketball']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Basketball is not given.");
                      exit();
                  }
                  $new_Book = false;
                  if (isset($_REQUEST['Book'])) {
                      $new_Book = intval(trim($_REQUEST['Book']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Book is not given.");
                      exit();
                  }
                  $new_Knight = false;
                  if (isset($_REQUEST['Knight'])) {
                      $new_Knight = intval(trim($_REQUEST['Knight']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Knight is not given.");
                      exit();
                  }
                  $new_OldWell = false;
                  if (isset($_REQUEST['OldWell'])) {
                      $new_OldWell = intval(trim($_REQUEST['OldWell']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("OldWell is not given.");
                      exit();
                  }
                  $new_ThePit = false;
                  if (isset($_REQUEST['ThePit'])) {
                      $new_ThePit = intval(trim($_REQUEST['ThePit']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("ThePit is not given.");
                      exit();
                  }
                  $new_DavisLibrary = false;
                  if (isset($_REQUEST['DavisLibrary'])) {
                      $new_DavisLibrary = intval(trim($_REQUEST['DavisLibrary']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("DavisLibrary is not given.");
                      exit();
                  }
                  $new_Sitterson = false;
                  if (isset($_REQUEST['Sitterson'])) {
                      $new_Sitterson = intval(trim($_REQUEST['Sitterson']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Sitterson is not given.");
                      exit();
                  }
                  $new_BellTower = false;
                  if (isset($_REQUEST['BellTower'])) {
                      $new_BellTower = intval(trim($_REQUEST['BellTower']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("BellTower is not given.");
                      exit();
                  }
                  $new_Roads = false;
                  if (isset($_REQUEST['Roads'])) {
                      $new_Roads = intval(trim($_REQUEST['Roads']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Roads is not given.");
                      exit();
                  }
                  $new_Volunteer = false;
                  if (isset($_REQUEST['Volunteer'])) {
                      $new_Volunteer = intval(trim($_REQUEST['Volunteer']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Volunteer is not given.");
                      exit();
                  }
                  $new_Monopoly = false;
                  if (isset($_REQUEST['Monopoly'])) {
                      $new_Monopoly = intval(trim($_REQUEST['Monopoly']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("Monopoly is not given.");
                      exit();
                  }
                  if ($new_PlayerID && $new_Ram && $new_Ramen && $new_Brick
                      && $new_Basketball && $new_Book && $new_Knight && $new_OldWell
                      && $new_ThePit && $new_DavisLibrary && $new_Sitterson
                      && $new_BellTower && $new_Roads && $new_Volunteer
                      && $new_Monopoly) {
                      $Card = Card::create($new_PlayerID, $new_Ram, $new_Ramen, $new_Brick,
                      $new_Basketball, $new_Book, $new_Knight, $new_OldWell, $new_ThePit,
                      $new_DavisLibrary, $new_Sitterson, $new_BellTower, $new_Roads,
                      $new_Volunteer, $new_Monopoly);
                      if ($Card == null) {
                          header("HTTP/1.0 500 Server Error");
                          print("Card was not inserted");
                          exit();
                      }
                      header("Content-type: application/json");
                      print($Card->getJSON());
                      exit();
                  }
              }
              createCard();
          }
          //check which values to update
          $new_PlayerID = false;
          if (isset($_REQUEST['PlayerID'])) {
              $new_PlayerID = intval(trim($_REQUEST['PlayerID']));
          }
          $new_Ram=false;
          if(isset($_REQUEST['Ram'])){
            $new_Ram= intval(trim($_REQUEST['Ram']));
          }
          $new_Ramen=false;
          if(isset($_REQUEST['Ramen'])){
            $new_Ramen= intval(trim($_REQUEST['Ramen']));
          }
          $new_Brick=false;
          if(isset($_REQUEST['Brick'])){
            $new_Brick= intval(trim($_REQUEST['Brick']));
          }
          $new_Basketball=false;
          if(isset($_REQUEST['Basketball'])){
            $new_Basketball= intval(trim($_REQUEST['Basketball']));
          }
          $new_Book=false;
          if(isset($_REQUEST['Book'])){
            $new_Book= intval(trim($_REQUEST['Book']));
          }
          $new_Knight=false;
          if(isset($_REQUEST['Knight'])){
            $new_Knight= intval(trim($_REQUEST['Knight']));
          }
          $new_OldWell=false;
          if(isset($_REQUEST['OldWell'])){
            $new_OldWell= intval(trim($_REQUEST['OldWell']));
          }
          $new_ThePit=false;
          if(isset($_REQUEST['ThePit'])){
            $new_ThePit= intval(trim($_REQUEST['ThePit']));
          }
          $new_DavisLibrary=false;
          if(isset($_REQUEST['DavisLibrary'])){
            $new_DavisLibrary= intval(trim($_REQUEST['DavisLibrary']));
          }
          $new_Sitterson=false;
          if(isset($_REQUEST['Sitterson'])){
            $new_Sitterson= intval(trim($_REQUEST['Sitterson']));
          }
          $new_BellTower=false;
          if(isset($_REQUEST['BellTower'])){
            $new_BellTower= intval(trim($_REQUEST['BellTower']));
          }
          $new_Roads=false;
          if(isset($_REQUEST['Roads'])){
            $new_Roads= intval(trim($_REQUEST['Roads']));
          }
          $new_Volunteer=false;
          if(isset($_REQUEST['Volunteer'])){
            $new_Volunteer= intval(trim($_REQUEST['Volunteer']));
          }
          $new_Monopoly=false;
          if(isset($_REQUEST['Monopoly'])){
            $new_Monopoly= intval(trim($_REQUEST['Monopoly']));
          }
          //update via ORM
          if ($new_PlayerID != false) {
              $Card->setPlayerID($new_PlayerID);
          }
          if($new_Ram != false){
            $Card->setRam($new_Ram);
          }
          if($new_Ramen != false){
            $Card->setRamen($new_Ramen);
          }
          if($new_Brick != false){
            $Card->setBrick($new_Brick);
          }
          if($new_Basketball != false){
            $Card->setBasketball($new_Basketball);
          }
          if($new_Book != false){
            $Card->setBook($new_Book);
          }
          if($new_Knight != false){
            $Card->setKnight($new_Knight);
          }
          if($new_OldWell != false){
            $Card->setOldWell($new_OldWell);
          }
          if($new_ThePit != false){
            $Card->setThePit($new_ThePit);
          }
          if($new_DavisLibrary != false){
            $Card->setDavisLibrary($new_DavisLibrary);
          }
          if($new_Sitterson != false){
            $Card->setSitterson($new_Sitterson);
          }
          if($new_BellTower != false){
            $Card->setBellTower($new_BellTower);
          }
          if($new_Roads != false){
            $Card->setRoads($new_Roads);
          }
          if($new_Volunteer != false){
            $Card->setVolunteer($new_Volunteer);
          }
          if($new_Monopoly != false){
            $Card->setMonopoly($new_Monopoly);
          }
             //return json
            header("Content-type: application/json");
            print($Card->getJSON());
            exit();
      }

      function postDiceRoll(){
      global $path_components;
        if ((count($path_components) >= 3) &&
            ($path_components[2] != "")) {
            $DiceID= intval($path_components[2]);
            $DiceRoll = DiceRoll::findByID($DiceID);

          if($DiceRoll==null){
              function createDiceRoll() {
                  // Create new Tile
                  $new_DiceID = false;
                  if (isset($_REQUEST['DiceID'])) {
                      $new_DiceID = intval(trim($_REQUEST['DiceID']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("DiceID is is not given.");
                      exit();
                  }

                  $new_RollResult = false;
                  if (isset($_REQUEST['RollResult'])) {
                      $new_RollResult = intval(trim($_REQUEST['RollResult']));
                  } else {
                      header("HTTP/1.0 400 Bad Request");
                      print("RollResult is is not given.");
                      exit();
                  }

                  if ($new_DiceID && $new_RollResult) {
                      $DiceRoll = DiceRoll::create($new_DiceID, $new_RollResult);

                      if ($DiceRoll == null) {
                          header("HTTP/1.0 500 Server Error");
                          print("DiceRoll was not inserted");
                          exit();
                      }
                      header("Content-type: application/json");
                      print($DiceRoll->getJSON());
                      exit();
                  }
              }
              createDiceRoll();
          }
      }

          //check which values to update
          $new_DiceID = false;
          if (isset($_REQUEST["DiceID"])) {
              $new_DiceID = intval(trim($_REQUEST['DiceID']));
          }

          $new_RollResult=false;
          if(isset($_REQUEST["RollResult"])){
            $new_RollResult= intval(trim($_REQUEST['RollResult']));
          }
          //update via ORM
          if ($new_DiceID != false) {
              $Dice->setDiceID($new_DiceID);
          }
          if($new_RollResult != false){
            $DiceRoll->setRollResult($new_RollResult);
          }
             //return json
            header("Content-type: application/json");
            print($DiceRoll->getJSON());
            exit();
      }
    header("HTTP/1.0 400 Bad Request");
    print("Did not understand URL");
    exit();
  }
 ?>
