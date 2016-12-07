// =============================================================================
// GAME TO AJAX ARGUMENTS
// =============================================================================

var playerGame_playerAJAX = function (player_game){
  return ("PlayerID=" + player_game.id + "&Username=" + player_game.username + "&RoadsCount=" +
  player_game.roads.length + "&SolidersCount=" + player_game.used_knights + "&Points=" + player_game.points);
}

var tileGame_tileAJAX = function(game_tile){
  return("TileID=" + game_tile.id + "&Robber=" + game_tile.robber);
}

var roadGame_roadAJAX = function(game_road){
  return ("RoadID=" + game_road.id + "&PlayerID=" + game_road.player.id);
}

var collegeGame_collegeAJAX = function(game_college){
   return ("CollegeID=" + game_college.id + "&PlayerID=" + game_college.player.id +
   "&Available=" + game_college.too_close + "&Univerisity=" + game_college.university);
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
