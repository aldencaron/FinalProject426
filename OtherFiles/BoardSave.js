//TODO update point count
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
      if(game.colleges[i].available){
        if (game.pointDistance(x, y, game.colleges[i].x, game.colleges[i].y) <= game.colleges[i].radius) {
          partial_turn_over = true;
          game.colleges[i].used = true;
          game.colleges[i].available = false;
          game.player.colleges.push(game.colleges[i]);
          game.player.points++;
          game.colleges[i].player = game.player;
          game.player.id = 1; //TODO wrong
          // TODO AJAX CALL to update college
          $.ajax({url: "/SettlersOfCarolina.php/Colleges/" + game.colleges[i].id,
          type: "GET",
          dataType: "json",
          data: $(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
          success: function(College_json, status, jqXHR) {
            alert("success");
            return new College(College_json);},
            error: function(jqXHR, status, error) {
              alert(jqXHR.responseText);
            }
          });
          // If second turn give the player resources
          if(game.turn_number == 2){
            for(var j = 0; j < game.colleges[i].tiles.length; j++){
              game.player.cards[game.colleges[i].tiles[j].resource]++;
            }
          }
            // Update roads
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
            }
          game.colleges[i].radius = 10;
          drawBoard(true, false, false, false, false, 0);
        }
      }
    }
    if(partial_turn_over){
      board_canvas.removeEventListener('mousedown', addCollegeStart);
      partial_turn_over = false;
      // Change availability
      if(game.turn_number == 2){
        for(var k = 0; k < game.colleges.len; k++){
          game.colleges[k].available = false;
        }
      }
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
          // TODO ajax call here
          game.roads[i].radius = 12;
          drawBoard(false, false, false, false, false, 0);
        }
      }
    }
    if(partial_turn_over){
      board_canvas.removeEventListener('mousedown', addRoadStart);
      game.turn_number++;

      // Fix availability
      for(var k = 0; k < game.roads.len; k++){
        game.roads[k].available = false;
      }
      for(var k = 0; k < game.player.roads.len; k++){
        for(var l = 0; l < game.player.roads[k].connection[0].roads.len; l++){
          if(!game.player.roads[k].connection[0].roads[l].used){
            game.player.roads[k].connection[0].roads[l].available = true;
          }
        }
        for(var l = 0; l < game.player.roads[k].connection[1].roads.len; l++){
          if(!game.player.roads[k].connection[0].roads[l].used){
            game.player.roads[k].connection[0].roads[l].available = true;
          }
        }
      }
      drawBoard(false, false, false, false, false, 0);
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

  var checkBuyRoad = function(){
    // Resource error
    if(game.player.cards["brick"] < 1 || game.player.cards["book"] < 1){
      alert("Insufficient amounts of resources!");
      return;
    }
    var available = false;
    for(var i = 0; i < game.roads.len; i++){
      if(game.roads[i].available){
        available = true;
      }
    }
    // Availability error
    if(!available){
      alert("No roads available at this time!");
    }
    // Can buy road
    else{
      game.player.cards["book"]--;
      game.player.cards["brick"]--;
      updatePlayerInfo();
      alert("Pick a road.");
      var board_canvas = document.getElementById("board_canvas");
      board_canvas.addEventListener('mousedown', buyRoad);
      //game.fireEvent(new game.BuyRoadEvent());
    }
  }
  var buyRoad = function(event) {
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
      board_canvas.removeEventListener('mousedown', buyRoad);

      // Fix availability
      for(var k = 0; k < game.roads.len; k++){
        game.roads[k].available = false;
      }
      for(var k = 0; k < game.player.roads.len; k++){
        for(var l = 0; l < game.player.roads[k].connection[0].roads.len; l++){
          if(!game.player.roads[k].connection[0].roads[l].used){
            game.player.roads[k].connection[0].roads[l].available = true;
          }
        }
        for(var l = 0; l < game.player.roads[k].connection[1].roads.len; l++){
          if(!game.player.roads[k].connection[0].roads[l].used){
            game.player.roads[k].connection[0].roads[l].available = true;
          }
        }
      }
      drawBoard(false, false, false, false, false, 0);
    }
  };
  var checkBuyCollege = function(){
    // Resource problem
    if(game.player.cards["ram"] < 1 || game.player.cards["brick"] < 1 ||
    game.player.cards["ramen"] < 1 || game.player.cards["book"] < 1){
      alert("Insufficient amounts of resources!");
      return;
    }
    var available = false;
    for(var i = 0; i < game.colleges.len; i++){
      if(game.colleges[i].available){
        available = true;
      }
    }
    // Availbility problem
    if(!available){
      alert("No colleges available at this time!");
    }
    // Can buy colleges
    else {
      //game.fireEvent( new game.BuyCollegeEvent());
    }
  };
  var buyCollege = function(){
    alert("empty");
  };
  var checkBuyUniversity = function(){
    // Resource problem
    if(game.player.cards["basketball"] < 3 || game.player.cards["ramen"] < 2){
      alert("Insufficient amounts of resources!");
      return;
    }
    var available = false;
    for(var i = 0; i < game.player.colleges.len; i++){
      if(!game.colleges[i].university){
        available = true;
      }
    }
    // Availability problem
    if(!available){
      alert("No universities available at this time!");
    }
    // Can buy university
    else {
      //game.fireEvent(new game.BuyUniversityEvent());
    }
  };
  var buyUniversity = function(){
    alert("empty");
  };
  var checkBuyCard = function(){
    if(game.player.cards["ram"] < 1 || game.player.cards["ramen"] < 1 ||
    game.player.cards["basketball"] < 1){
      alert("Insufficient amounts of resources!");
    }
    //TODO if no dev cards left!
  };
  var buyCard = function(){
    alert("empty");
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

  };
  var updateOtherPlayerInfo = function() {
    //TODO
  };

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
      game.turn_number++;
    }
  };

  var diceRoll = function() {
    var current_roll = game.rollDice(2);
    $("#current_dice_roll_text").text("Dice Roll: " + current_roll);
    //TODO post to server
    if(current_roll == 7){
      // Steal Cards
      if((game.player.cards["ram"] + game.player.cards["ramen"] + game.player.cards["brick"] + game.player.cards["basketball"] + game.player.cards["book"]) > 7){
        alert("Robber! You have too many cards. The robber will steal half!.");
        game.player.cards["ram"] = Math.floor(game.player.cards["ram"]/2);
        game.player.cards["ramen"] = Math.floor(game.player.cards["ramen"]/2);
        game.player.cards["brick"] = Math.floor(game.player.cards["brick"]/2);
        game.player.cards["basketball"] = Math.floor(game.player.cards["basketball"]/2);
        game.player.cards["book"] = Math.floor(game.player.cards["book"]/2);
        updatePlayerInfo();
      }
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
          if(game.player.colleges[i].tiles[j].number == current_roll && !game.player.colleges[i].tiles[j].robber){
            game.player.cards[game.player.colleges[i].tiles[j].resource]++;
            if(game.player.colleges[i].university){
              game.player.cards[game.player.colleges[i].tiles[j].resource]++;
            }
          }
        }
      }
      updatePlayerInfo();
      game.turn_number++;
    }

    // Listeners for buying
    var buy_road = document.getElementById("buy_road");
    buy_road.addEventListener('click', checkBuyRoad);
    var buy_college = document.getElementById("buy_college");
    buy_college.addEventListener('click', checkBuyCollege);
    var buy_university = document.getElementById("buy_university");
    buy_university.addEventListener('click', checkBuyUniversity);
    var buy_card = document.getElementById("buy_card");
    buy_card.addEventListener('click', checkBuyCard);
  };
  // Query for dice roll from other players
  var diceRollOther = function(current_roll){

  };

  var end_turn_button = document.getElementById("turn_over_button");
  end_turn_button.addEventListener('click', function(){game.fireEvent(new game.TurnChangeEvent())});

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
    else if(game.turn_number > 2 && game.turn_number < 15){
      game.fireEvent(new game.DiceRollEvent());
    }
  }
  var game = new SettlersGame();
  game.startGame();
  game.registerEventHandler(SETTLERS_CONSTANTS.SETUP_TURN_EVENT, setupTurn);
  game.registerEventHandler(SETTLERS_CONSTANTS.ROBBER_EVENT, moveRobber);
  game.registerEventHandler(SETTLERS_CONSTANTS.TURN_CHANGE_EVENT, turnChecks);
  game.registerEventHandler(SETTLERS_CONSTANTS.DICE_ROLL_EVENT, diceRoll);
  /*game.registerEventHandler(SETTLERS_CONSTANTS.BUY_ROAD_EVENT, buyRoad);
  game.registerEventHandler(SETTLERS_CONSTANTS.BUY_COLLEGE_EVENT, buyCollege);
  game.registerEventHandler(SETTLERS_CONSTANTS.BUY_UNIVERSITY_EVENT, buyUniversity);
  game.registerEventHandler(SETTLERS_CONSTANTS.BUY_CARD_EVENT, buyCard);*/
  drawBoard(false, false, false, false, false, 0);
  turnChecks();

});
