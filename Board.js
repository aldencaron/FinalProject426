$(document).ready(function() {

  var size = 60;
  var width = Math.floor(Math.sqrt(3) * size * 5 + 1);
  var x_initial = width / 2 - (Math.sqrt(3) * size) + 10;
  var y_initial = 98;
  var num_sides = 6;
  var board;
  var turn_over = false;
  var partial_turn_over = false;

  // =============================================================================
  // BOARD DRAWING
  // =============================================================================
  var drawBoard = function(available_roads, available_colleges, available_universities, available_robber, resources, dice_roll) {
    // Set up canvas
    var canvas = document.getElementById("board_canvas");
    canvas.style = "margin: 0 auto;";

    var radius = 20;

    canvas.width = width + 20;
    canvas.height = 515 + 20;

    var ctx = canvas.getContext('2d');

    // Draw on tiles
    for (var i = 0; i < game.num_pieces; i++) {
      ctx.beginPath();
      ctx.moveTo(game.tiles[i].x_coords[0], game.tiles[i].y_coords[0]);
      for (var j = 1; j <= num_sides; j++) {
        ctx.lineTo(game.tiles[i].x_coords[j], game.tiles[i].y_coords[j]);
      }
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.fillStyle = ctx.createPattern(game.tiles[i].image, "repeat");
      ctx.fill();
      // Draw on the number circle
      if (game.tiles[i].number != 0 || available_robber) {
        ctx.beginPath();
        ctx.arc(game.tiles[i].x_center, game.tiles[i].y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        if(game.tiles[i].robber){ctx.fillStyle = '#001A57';}
        if(available_robber && !game.tiles[i].robber){ctx.fillStyle = 'grey';}
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        if(resources && game.tiles[i].number == dice_roll){ctx.lineWidth = 10;}
        ctx.stroke();

        // Draw on the number
        ctx.fillStyle = 'black';
        if(game.tiles[i].robber){ctx.fillStyle = 'white';}
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.font = "bold 26px Arial";
        if(!game.tiles[i].robber){
          ctx.fillText(game.tiles[i].number, game.tiles[i].x_center, game.tiles[i].y_center);
        }
        else{
          ctx.fillText("R", game.tiles[i].x_center, game.tiles[i].y_center);
        }
      }
      // When robber is on the desert
      else if(game.tiles[i].number == 0 && game.tiles[i].robber){
        ctx.beginPath();
        ctx.arc(game.tiles[i].x_center, game.tiles[i].y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#001A57';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.font = "bold 26px Arial";
        ctx.fillText("R", game.tiles[i].x_center, game.tiles[i].y_center);
      }
    }
    // Draw on roads
    for (var i = 0; i < game.num_roads; i++) {
      if (game.roads[i].used) {
        ctx.beginPath();
        ctx.moveTo(game.roads[i].start_x, game.roads[i].start_y);
        ctx.lineTo(game.roads[i].end_x, game.roads[i].end_y);
        if(game.roads[i].used){ctx.fillStyle = game.roads[i].player.color;}
        ctx.lineWidth = 8;
        ctx.strokeStyle = game.roads[i].player.color;
        ctx.stroke();
      }
      else if (available_roads && game.roads[i].available){
        ctx.beginPath();
        ctx.arc((game.roads[i].start_x + game.roads[i].end_x) / 2, (game.roads[i].start_y + game.roads[i].end_y) / 2,
        game.roads[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }
    // Draw on colleges
    for (var i = 0; i < game.num_colleges; i++) {
      if (game.colleges[i].used) {
        if(game.colleges[i].settlement){
          game.colleges[i].radius = 12;
        }
        ctx.beginPath();
        ctx.arc(game.colleges[i].x, game.colleges[i].y, game.colleges[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = game.colleges[i].player.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
      if(available_colleges && game.colleges[i].available){
        ctx.beginPath();
        ctx.arc(game.colleges[i].x, game.colleges[i].y, game.colleges[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
      if(available_universities && !game.colleges[i].university && game.colleges[i].player == game.player){
        ctx.beginPath();
        ctx.arc(game.colleges[i].x, game.colleges[i].y, 12, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke;
      }
    }
    document.getElementById("board").append(canvas);
  };

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  // Add colleges at set up of game
  var addCollegeStart = function(event) {
    partial_turn_over = false;
    var rect = board_canvas.getBoundingClientRect();
    var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

    // Check colleges
    for (var i = 0; i < game.num_colleges; i++) {
      // TODO add in an if statement to check if on the game -- available here only works for first
      if(game.colleges[i].available){
        if (game.pointDistance(x, y, game.colleges[i].x, game.colleges[i].y) <= game.colleges[i].radius) {
          partial_turn_over = true;
          game.colleges[i].used = true;
          game.colleges[i].available = false;
          game.player.colleges.push(game.colleges[i]);

          // If second turn give the player resources
          if(game.turn_number == 2){
            for(var j = 0; j < game.colleges[i].tiles.length; j++){
              game.player.cards[game.colleges[i].tiles[j].resource]++;
            }
          }
          // Update roads
          game.colleges[i].player = game.player;
          for(var j = 0; j < game.num_roads; j++){
            game.roads[j].available = false;
            if(game.roads[j].connections[0].id == game.colleges[i].id){
              game.roads[j].connections[1].available = false;
              if(!game.roads[j].used){
                game.roads[j].available = true;
              }
            }
            else if(game.roads[j].connections[1].id == game.colleges[i].id){
              game.roads[j].connections[0].available = false;
              if(!game.roads[j].used){
                game.roads[j].available = true;
              }
            }
            game.colleges[i].radius = 10;
            drawBoard(true, false, false, false, false, 0);
          }
        }
      }
    }
    if(partial_turn_over){
      board_canvas.removeEventListener('mousedown', addCollegeStart);
      partial_turn_over = false;
    }
  };
  var addRoadStart = function(event) {
    partial_turn_over = false;
    var rect = board_canvas.getBoundingClientRect();
    var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

    // Check roads
    for (var i = 0; i < game.num_roads; i++) {
      if(game.roads[i].available){
        if (game.pointDistance(x, y, game.roads[i].x_center, game.roads[i].y_center) <= game.roads[i].radius) {
          partial_turn_over = true;
          game.roads[i].used = true;
          game.roads[i].available = false;
          game.player.roads.push(game.roads[i]);
          game.roads[i].player = game.player;
          //TODO add new available colleges as we come
          game.roads[i].radius = 12;
          drawBoard(false, false, false, false, false, 0);
        }
      }
    }
    if(partial_turn_over){
      board_canvas.removeEventListener('mousedown', addRoadStart);
      game.turn_number++;
      game.fireEvent(new game.TurnChangeEvent());
    }
  };

  var setupTurn = function() {
    partial_turn_over = false;
    drawBoard(false, true, false, false, false, 0);
    var board_canvas = document.getElementById("board_canvas");
    board_canvas.addEventListener('mousedown', addCollegeStart);
    board_canvas.addEventListener('mousedown', addRoadStart);
  };

  // Update html for player
  var updatePlayerInfo = function() {
    //Update card counts
    $("#player_one_ram_cards").text(game.player.cards["ram"]);
    $("#player_one_brick_cards").text(game.player.cards["brick"]);
    $("#player_one_basketball_cards").text(game.player.cards["basketball"]);
    $("#player_one_ramen_cards").text(game.player.cards["ramen"]);
    $("#player_one_book_cards").text(game.player.cards["book"]);
    //Other cards TODO
    //Total point //TODO
    //Special points //TODO

  }
  var updateOtherPlayerInfo = function() {
    //TODO
  }

  var moveRobber = function(event){
    partial_turn_over = false;
    var board_canvas = document.getElementById("board_canvas");
    var rect = board_canvas.getBoundingClientRect();
    var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

    // Check hexagons
    for (var i = 0; i < game.num_pieces; i++) {
      game.tiles[i].robber = false;
      if (game.checkLeft(game.tiles[i].x_coords[4], x)
      && game.checkRight(game.tiles[i].x_coords[1], x)
      && game.checkTopLeft(game.tiles[i].x_coords[5], game.tiles[i].y_coords[5], game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], x, y)
      && game.checkTopRight(game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], game.tiles[i].x_coords[1], game.tiles[i].y_coords[1], x, y)
      && game.checkBottomLeft(game.tiles[i].x_coords[2], game.tiles[i].y_coords[2], game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], x, y)
      && game.checkBottomRight(game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], game.tiles[i].x_coords[4], game.tiles[i].y_coords[4], x, y)) {
        partial_turn_over = true;
        game.tiles[i].robber = true;
      }
    }
    if(partial_turn_over){
      board_canvas.removeEventListener('mousedown', moveRobber);
      partial_turn_over = false;
      drawBoard(false, false, false, false, false, 0);
      //game.fireEvent(new game.TurnChangeEvent());
    }
  };

  var diceRoll = function() {
    var current_roll = game.rollDice(2);
    $("#current_dice_roll_text").text("Dice Roll: " + current_roll);
    //TODO post to server
    if(current_roll == 7){
      var board_canvas = document.getElementById("board_canvas");
      board_canvas.addEventListener('mousedown', moveRobber);
      drawBoard(false, false, false, true, false, 0);
      game.fireEvent(new game.RobberEvent());
    }
    // Is not a robber
    else{
      drawBoard(false, false, false, false, true, current_roll);

      // Add cards
      for(var i = 0; i < game.player.colleges.length; i++){
        for(var j = 0; j < game.player.colleges[i].tiles.length; j++){
          if(game.player.colleges[i].tiles[j].number == current_roll){
            game.player.cards[game.player.colleges[i].tiles[j].resource]++;
            if(game.player.colleges[i].university){
              game.player.cards[game.player.colleges[i].tiles[j].resource]++;
            }
          }
        }
      }
    }
    if(current_roll==7){alert("who the fuck knows");}
    game.turn_number++;
    game.fireEvent(new game.TurnChangeEvent());
  }
  // Query for dice roll from other players
  var diceRollOther = function(current_roll){

  }

  // =============================================================================
  // GAME RUNNING
  // =============================================================================

  var turnChecks = function(){
    updatePlayerInfo();
    if(game.turn_number == 1){
      game.fireEvent(new game.SetupTurnEvent());
    }
    else if(game.turn_number == 2){
      game.fireEvent(new game.SetupTurnEvent());
    }
    else if(game.turn_number > 2 && game.turn_number < 8){
      game.fireEvent(new game.DiceRollEvent());
    }
  }
  var game = new SettlersGame();
  game.startGame();
  game.registerEventHandler(SETTLERS_CONSTANTS.SETUP_TURN_EVENT, setupTurn);
  game.registerEventHandler(SETTLERS_CONSTANTS.ROBBER_EVENT, moveRobber);
  game.registerEventHandler(SETTLERS_CONSTANTS.TURN_CHANGE_EVENT, turnChecks);
  game.registerEventHandler(SETTLERS_CONSTANTS.DICE_ROLL_EVENT, diceRoll);
  drawBoard(false, false, false, false, false, 0);
  turnChecks();

});
