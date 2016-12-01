<?php function postCard(){
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
