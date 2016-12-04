// =============================================================================
// PLAYER TRANSITIONS
// =============================================================================

/* Changes game object to AJAX call
** USE THIS to pass in
** $(new playerGame_playerAJAX(game.player)).serialize();
** Pass in "game.player"
 */
var playerGame_playerAJAX = function (player_game){
  this.PlayerID = player_game.id;
  this.Username = player_game.username;
  this.RoadsCount = player_game.roads.len;
  this.SoldiersCount = player_game.cards["knight"].len;
  this.Points = player_game.points;
}
/* Pass in ajax object return, and game.other_players */
var otherPlayerAJAX_otherPlayerGame = function(other_player_ajax, other_players_game){
  for(var i = 0; i < len(other_players_game)){
    if(other_players_game[i].id == other_player_ajax.id){
      other_players_game[i].knights_count = other_player_ajax.SoldiersCount;
      other_players_game[i].points = other_player_ajax.Points;
    }
  }
}
/* Update server side
Pass in game.player, pass in
$(new playerGame_cardsAJAX(game.player)).serialize(); */
var playerGame_cardsAJAX = function(game_player){
  this.PlayerID = game_player.ID;
  this.Ram = game_player.cards["ram"];
  this.Ramen = game_player.cards["ramen"];
  this.Brick = game_player.cards["brick"];
  this.Roads = game_player.cards["roads"];
  this.Knight = game_player.cards["knight"];
  this.Book = game_player.cards["books"];
  this.OldWell = game_player.cards["victory_points"]["oldwell"];
  this.ThePit = game_player.cards["victory_points"]["pit"];
  this.DavisLibrary = game_player.cards["victory_points"]["davis"];
  this.Sitterson = game_player.cards["victory_points"]["sitterson"];
  this.BellTower = game_player.cards["victory_points"]["bell"];
  this.Volunteer = game_player.cards["volunteer"];
  this.Monopoly = game_player.cards["monopoly"];
  this.Basketball = game_player.cards["basektball"];
}

/* Update client side for other players from server */
var cardsAJAX_otherPlayerGame = function(cards_ajax, other_players_game){
  for(var i = 0; i < len(other_players_game)){
    if(other_players_game[i].id == other_player_ajax.id){
      other_players_game[i].knights_count = cards_ajax.Knight;
      other_players_game[i].num_cards = cards_ajax.Ram + cards_ajax.Ramen
       + cards_ajax.Brick + cards_ajax.Book + cards_ajax.Basketball;
    }
  }
}

// =============================================================================
// TILE TRANSITONS
// =============================================================================
//TODO check with Max, do I have to call each one? Can I do a select to see where
// the robber is? lol available proably isn't necessary sorry


// =============================================================================
// ROAD TRANSITONS
// =============================================================================
/* Update road on server when road is added
** $(new roadGame_roadAJAX(game.roads[i])).serialize();
*/
var roadGame_roadAJAX = function(game_road){
  this.RoadID = game_road.id;
  this.PlayerID = game_road.player.id;
}
/* Update roads on client that other people have bought
**TODO idk check with max idgaf
*/

// =============================================================================
// COLLEGE TRANSITONS
// =============================================================================
/* Update college on server when college is added or upgraded
**
*/
var collegeGame_collegeAJAX = function(game_college){
  this.CollegeID = game_college.id;
  this.PlayerID = game_college.player.id;
  this.Available = game_college.avaiable;
  this.University = game_college.university;
}

var gameCollege = function(x, y, tiles, id) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.tiles = tiles;
  this.used = false;
  this.available = true;
  this.university = false;
  this.radius = 8;
  this.player = null;
}


var gameRoad = function(college1, college2, id) {
  this.id = id;
  this.start_x = college1.x;
  this.start_y = college1.y;
  this.end_x = college2.x;
  this.end_y = college2.y;
  this.x_center = (this.start_x + this.end_x)/2;
  this.y_center = (this.start_y + this.end_y)/2;
  this.connections = [college1, college2];
  this.available = false; //TODO switch to true when player gets adjacent college
  this.used = false;
  this.radius = 10;
  this.player = null;
}

var gamePlayer = function() {
  this.id;
  this.username;
  this.points = 0;
  this.color = "green";
  this.num_cards = 0;
  this.cards = [];
  this.cards["ramen"] = 0;
  this.cards["book"] = 0;
  this.cards["ram"] = 0;
  this.cards["brick"] = 0
  this.cards["basketball"] = 0;
  this.cards["knight"] = 0;
  this.cards["victory_points"] = [];
  this.cards["victory_points"]["oldwell"] = 0;
  this.cards["victory_points"]["davis"] = 0;
  this.cards["victory_points"]["pit"] = 0;
  this.cards["victory_points"]["sitterson"] = 0;
  this.cards["victory_points"]["bell"] = 0;
  this.cards["monopoly"] = 0;
  this.cards["volunteer"] = 0;
  this.cards["roads"] = 0;
  this.colleges = [];
  this.roads = [];
}

var gameOtherPlayer = function(color){
  this.num_cards = 0;
  this.colleges = [];
  this.roads = [];
  this.color = color;
  this.knights_count = 0;
  this.points;
};
