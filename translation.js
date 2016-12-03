// =============================================================================
// PLAYER TRANSITIONS 
// =============================================================================


/* Changes game object to AJAX call
** USE THIS to pass in
** $(new playerGametoAJAX(player)).serialize();
 */
var playerGametoAJAX = function (player_game){
  this.PlayerID = player_game.id;
  this.Username = player_game.username;
  this.RoadsCount = player_game.roads.len;
  this.SoldiersCount = player_game.cards["knight"].len;
  this.Points = player_game.points;
}
var otherPlayerAJAXtoGame = function(other_player_ajax){
  for(var i = 0; i < len(game.other_players)){
    if(game.other_players[i].id == other_player_ajax.id){
      game.other_players[i].knights_count = other_player_ajax.SoldiersCount;
      game.other_players[i].points = other_player_ajax.Points;
    }
  }
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
}
