// =============================================================================
// GAME TO AJAX ARGUMENTS
// =============================================================================

var playerGame_playerAJAX = function (player_game){
  return ("PlayerID=" + player_game.id + "&Username=" + player_game.username + "&RoadsCount=" +
  player_game.roads.length + "&SolidersCount=" + player_game.used_knights + "&Points=" + player_game.points);
}

var tileGame_tileAJAX = function(game_tile){
  var robber_bool;
  if(game_tile.robber){
    robber_bool = 1;
  }
  else{
    robber_bool = 0;
  }
  console.log("Robber bool: " + robber_bool);
  console.log("TileID=" + game_tile.id + "&Robber=" + robber_bool);
  return("TileID=" + game_tile.id + "&Robber=" + robber_bool);
}

var roadGame_roadAJAX = function(game_road){
  return ("RoadID=" + game_road.id + "&PlayerID=" + game_road.player.id);
}

var collegeGame_collegeAJAX = function(game_college){
   var university_bool;
   if(game_college.university){
     university_bool = 1;
   }
   else{
     university_bool = 0;
   }
   console.log("University bool:" + university_bool);
   console.log("CollegeID=" + game_college.id + "&PlayerID=" + game_college.player.id +
   "&Available=" + game_college.too_close + "&Univerisity=" + university_bool);
   return ("CollegeID=" + game_college.id + "&PlayerID=" + game_college.player.id +
   "&Available=" + game_college.too_close + "&Univerisity=" + university_bool);
}

var playerGame_cardsAJAX = function(game_player){
  return ("PlayerID=" + game_player.id + "&Ram=" + game_player.cards["ram"] + "&Ramen=" + game_player.cards["ramen"] +
    "&Brick=" + game_player.cards["brick"] + "&Roads=" + game_player.cards["roads"] + "&Knight=" + game_player.cards["knight"] +
    "&Book=" + game_player.cards["book"] + "&OldWell=" + game_player.cards["victory_points"]["oldwell"] +
    "&ThePit=" + game_player.cards["victory_points"]["pit"] + "&DavisLibrary=" + game_player.cards["victory_points"]["davis"] +
    "&Sitterson=" + game_player.cards["victory_points"]["sitterson"] + "&BellTower=" + game_player.cards["victory_points"]["bell"] +
    "&Volunteer=" + game_player.cards["volunteer"] + "&Monopoly=" + game_player.cards["monopoly"] + "&Basketball=" +
    game_player.cards["basketball"]);
}
