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
  this.RoadsCount = player_game.roads.length;
  this.SoldiersCount = player_game.cards["knight"].length;
  this.Points = player_game.points;
}
/* Pass in ajax object return, and game.other_players */
var otherPlayerAJAX_otherPlayerGame = function(other_player_ajax, other_players_game){
  for(var i = 0; i < other_players_game.length; i++){
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
  for(var i = 0; i < other_players_game.length; i++){
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
**
*/
var roadAJAX_roadGame = function(AJAX_road, game_road, other_players_game){
  for(var i = 0; i < other_players_game.length; i++){
    if(other_players_game[i].id == AJAX_road.PlayerID){
      game_road.player = other_players_game[i];
    }
  }
}

// =============================================================================
// COLLEGE TRANSITONS
// =============================================================================
/* Update college on server when college is added or upgraded
**
*/
//$(new collegeGame_collegeAJAX(game.colleges[i])).serialize(); */
var collegeGame_collegeAJAX = function(game_college){
   this.CollegeID = game_college.id;
   this.PlayerID = game_college.player.id;
   this.Available = game_college.too_close;
   this.University = game_college.university;
}
