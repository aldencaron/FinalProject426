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
                if (game.tiles[i].robber) {
                    ctx.fillStyle = '#001A57';
                }
                if (available_robber && !game.tiles[i].robber) {
                    ctx.fillStyle = 'grey';
                }
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                if (resources && game.tiles[i].number == dice_roll) {
                    ctx.lineWidth = 10;
                }
                ctx.stroke();

                // Draw on the number
                ctx.fillStyle = 'black';
                if (game.tiles[i].robber) {
                    ctx.fillStyle = 'white';
                }
                ctx.textBaseline = 'middle';
                ctx.textAlign = "center";
                ctx.font = "bold 26px Arial";
                if (!game.tiles[i].robber) {
                    ctx.fillText(game.tiles[i].number, game.tiles[i].x_center, game.tiles[i].y_center);
                } else {
                    ctx.fillText("R", game.tiles[i].x_center, game.tiles[i].y_center);
                }
            }
            // When robber is on the desert
            else if (game.tiles[i].number == 0 && game.tiles[i].robber) {
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
                if (game.roads[i].used) {
                    ctx.fillStyle = game.roads[i].player.color;
                }
                ctx.lineWidth = 8;
                ctx.strokeStyle = game.roads[i].player.color;
                ctx.stroke();
            } else if (available_roads && game.roads[i].available) {
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
                if (game.colleges[i].settlement) {
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
            if (available_colleges && game.colleges[i].available) {
                ctx.beginPath();
                ctx.arc(game.colleges[i].x, game.colleges[i].y, game.colleges[i].radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'gray';
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }
            if (available_universities && !game.colleges[i].university && game.colleges[i].player == game.player) {
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
            if (game.colleges[i].available) {
                if (game.pointDistance(x, y, game.colleges[i].x, game.colleges[i].y) <= game.colleges[i].radius) {
                    partial_turn_over = true;
                    game.colleges[i].used = true;
                    game.colleges[i].available = false;
                    game.player.colleges.push(game.colleges[i]);
                    game.player.points++;
                    game.colleges[i].player = game.player;
                    // AJAX POST to update college
                    /*$.ajax({url: "SettlersOfCarolina.php/Colleges/" + game.colleges[i].id,
          type: "POST",
          dataType: "json",
          data: $(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
          success: function(College_json, status, jqXHR) {
          alert("success");
        }
        error: function(jqXHR, status, error) {
        alert(jqXHR.responseText);
      }
    });*/
                    // If second turn give the player resources
                    if (game.turn_number == 2) {
                        for (var j = 0; j < game.colleges[i].tiles.length; j++) {
                            game.player.cards[game.colleges[i].tiles[j].resource]++;
                        }
                    }
                    // Update roads
                    for (var j = 0; j < game.num_roads; j++) {
                        game.roads[j].available = false;
                        if (game.roads[j].connections[0].id == game.colleges[i].id) {
                            game.roads[j].connections[1].available = false;
                            game.roads[j].connections[1].too_close = true;
                            if (!game.roads[j].used) {
                                game.roads[j].available = true;
                            }
                        } else if (game.roads[j].connections[1].id == game.colleges[i].id) {
                            game.roads[j].connections[0].available = false;
                            game.roads[j].connections[0].too_close = true;
                            if (!game.roads[j].used) {
                                game.roads[j].available = true;
                            }
                        }
                    }
                    game.colleges[i].radius = 10;
                    drawBoard(true, false, false, false, false, 0);
                }
            }
        }
        if (partial_turn_over) {
            board_canvas.removeEventListener('mousedown', addCollegeStart);
            partial_turn_over = false;
            // Change availability
            if (game.turn_number == 2) {
                for (var k = 0; k < game.colleges.length; k++) {
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
            if (game.roads[i].available) {
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
        if (partial_turn_over) {
            board_canvas.removeEventListener('mousedown', addRoadStart);
            if (game.turn_number == 2) {
                // Fix availability
                for (var k = 0; k < game.roads.len; k++) {
                    game.roads[k].available = false;
                }
                for (var k = 0; k < game.player.roads.length; k++) {
                    for (var l = 0; l < game.player.roads[k].connections[0].roads.length; l++) {
                        if (!game.player.roads[k].connections[0].roads[l].used) {
                            game.player.roads[k].connections[0].roads[l].available = true;
                        }
                    }
                    for (var l = 0; l < game.player.roads[k].connections[1].roads.length; l++) {
                        if (!game.player.roads[k].connections[1].roads[l].used) {
                            game.player.roads[k].connections[1].roads[l].available = true;
                        }
                    }
                }
            }
            game.turn_number++;
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

    var checkBuyRoad = function() {
        // Resource error
        /*if (game.player.cards["brick"] < 1 || game.player.cards["book"] < 1) {
            alert("Insufficient amounts of resources!");
            return;
        }*/
        var available = false;
        for (var i = 0; i < game.roads.length; i++) {
            if (game.roads[i].available) {
                available = true;
            }
        }
        // Availability error
        if (!available) {
            alert("No roads available at this time!");
        }
        // Can buy road
        else {
            drawBoard(true, false, false, false, false, 0);
            game.player.cards["book"]--;
            game.player.cards["brick"]--;
            updatePlayerInfo();
            alert("Pick a road.");
            var board_canvas = document.getElementById("board_canvas");
            board_canvas.addEventListener('mousedown', buyRoad);
        }
    }
    var buyRoad = function(event) {
        partial_turn_over = false;
        var rect = board_canvas.getBoundingClientRect();
        var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
        var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

        // Check roads
        for (var i = 0; i < game.num_roads; i++) {
            if (game.roads[i].available) {
                if (game.pointDistance(x, y, game.roads[i].x_center, game.roads[i].y_center) <= game.roads[i].radius) {
                    partial_turn_over = true;
                    game.roads[i].used = true;
                    game.roads[i].available = false;
                    game.player.roads.push(game.roads[i]);
                    game.roads[i].player = game.player;
                    game.roads[i].radius = 12;

                    drawBoard(false, false, false, false, false, 0);
                }
            }
        }
        if (partial_turn_over) {
            board_canvas.removeEventListener('mousedown', buyRoad);
            for(var k = 0; k < game.roads.length; k++){
              game.roads[k].available = false;
            }
            // Set available colleges
            for (var k = 0; k < game.player.roads.length; k++) {
                if(!game.player.roads[k].connections[0].used && !game.player.roads[k].connections[0].too_close){
                  game.player.roads[k].connections[0].available = true;
                }
                if(!game.player.roads[k].connections[1].used && !game.player.roads[k].connections[1].too_close){
                  game.player.roads[k].connections[1].available = true;
                }
            }
            // Set available roads
            for (var k = 0; k < game.player.roads.length; k++) {
                for (var l = 0; l < game.player.roads[k].connections[0].roads.length; l++) {
                    if (!game.player.roads[k].connections[0].roads[l].used) {
                        game.player.roads[k].connections[0].roads[l].available = true;
                    }
                }
                for (var l = 0; l < game.player.roads[k].connections[1].roads.length; l++) {
                    if (!game.player.roads[k].connections[1].roads[l].used) {
                        game.player.roads[k].connections[1].roads[l].available = true;
                    }
                }
            }
            drawBoard(false, false, false, false, false, 0);
        }
    };
    var checkBuyCollege = function() {
        // Resource problem
        /*if (game.player.cards["ram"] < 1 || game.player.cards["brick"] < 1 ||
            game.player.cards["ramen"] < 1 || game.player.cards["book"] < 1) {
            alert("Insufficient amounts of resources!");
            return;
        }*/
        var available = false;
        for (var i = 0; i < game.colleges.length; i++) {
            if (game.colleges[i].available) {
                available = true;
            }
        }
        // Availbility problem
        if (!available) {
            alert("No colleges available at this time!");
        }
        // Can buy colleges
        else {
          drawBoard(false, true, false, false, false, 0);
          game.player.cards["book"]--;
          game.player.cards["brick"]--;
          game.player.cards["ram"]--;
          game.player.cards["ramen"]--;
          updatePlayerInfo();
          alert("Pick a college.");
          var board_canvas = document.getElementById("board_canvas");
          board_canvas.addEventListener('mousedown', buyCollege);
        }
    };
    var buyCollege = function() {
      partial_turn_over = false;
      var rect = board_canvas.getBoundingClientRect();
      var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
      var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

      // Check colleges
      for (var i = 0; i < game.num_colleges; i++) {
          if (game.colleges[i].available) {
              if (game.pointDistance(x, y, game.colleges[i].x, game.colleges[i].y) <= game.colleges[i].radius) {
                  partial_turn_over = true;
                  game.colleges[i].used = true;
                  game.colleges[i].available = false;
                  game.player.colleges.push(game.colleges[i]);
                  game.player.points++;
                  game.colleges[i].player = game.player;

                  // Update roads
                  for (var j = 0; j < game.num_roads; j++) {
                      game.roads[j].available = false;
                      if (game.roads[j].connections[0].id == game.colleges[i].id) {
                          game.roads[j].connections[1].available = false;
                          game.roads[j].connections[1].too_close = true;
                          if (!game.roads[j].used) {
                              game.roads[j].available = true;
                          }
                      } else if (game.roads[j].connections[1].id == game.colleges[i].id) {
                          game.roads[j].connections[0].available = false;
                          game.roads[j].connections[0].too_close = true;
                          if (!game.roads[j].used) {
                              game.roads[j].available = true;
                          }
                      }
                  }
                  game.colleges[i].radius = 10;
              }
          }
      }
      if (partial_turn_over) {
          board_canvas.removeEventListener('mousedown', buyCollege);
          drawBoard(false, false, false, false, false, 0);
          partial_turn_over = false;
      }
    };
    var checkBuyUniversity = function() {
        // Resource problem
        /*if (game.player.cards["basketball"] < 3 || game.player.cards["ramen"] < 2) {
            alert("Insufficient amounts of resources!");
            return;
        }*/
        var available = false;
        for (var i = 0; i < game.player.colleges.length; i++) {
            if (!game.colleges[i].university) {
                available = true;
            }
        }
        // Availability problem
        if (!available) {
            alert("No universities available at this time!");
        }
        // Can buy university
        else {
          drawBoard(false, false, true, false, false, 0);
          game.player.cards["ramen"] = game.player.cards["ramen"] - 2;
          game.player.cards["basketball"] = game.player.cards["basketball"] - 3;
          updatePlayerInfo();
          alert("Pick a university.");
          var board_canvas = document.getElementById("board_canvas");
          board_canvas.addEventListener('mousedown', buyUniversity);        }
    };
    var buyUniversity = function() {
      partial_turn_over = false;
      var rect = board_canvas.getBoundingClientRect();
      var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
      var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

      // Check colleges
      for (var i = 0; i < game.num_colleges; i++) {
          if (!game.colleges[i].university && game.colleges[i].player == game.player) {
              if (game.pointDistance(x, y, game.colleges[i].x, game.colleges[i].y) <= game.colleges[i].radius) {
                  partial_turn_over = true;
                  game.colleges[i].university = true;
                  game.player.points++;

                  game.colleges[i].radius = 14;
              }
          }
      }
      if (partial_turn_over) {
          board_canvas.removeEventListener('mousedown', buyUniversity);
          updatePlayerInfo();
          drawBoard(false, false, false, false, false, 0);
          partial_turn_over = false;
      }
    };
    var checkBuyCard = function() {
        /*if (game.player.cards["ram"] < 1 || game.player.cards["ramen"] < 1 ||
            game.player.cards["basketball"] < 1) {
            alert("Insufficient amounts of resources!");
        }
        else if(game.next_dev_card > 24){
          alert("No more development cards");
        }
        else{*/
          buyCard();
        //}
    };
    var buyCard = function() {
        var card = game.dev_cards[game.next_dev_card];
        game.next_dev_card++;
        alert("You got " + card.type + "!");
        if(card.type == "oldwell" || card.type == "sitterson" || card.type == "pit" || card.type == "bell" || card.type == "davis"){
          game.player.cards["victory_points"][card.type]++;
          game.player.points++;
        }
        else{
          game.player.cards[card.type]++;
        }
        updatePlayerInfo();
    };

    // Update html for player
    var updatePlayerInfo = function() {
        //Update card counts
        $("#player_one_ram_cards").text(game.player.cards["ram"]);
        $("#player_one_brick_cards").text(game.player.cards["brick"]);
        $("#player_one_basketball_cards").text(game.player.cards["basketball"]);
        $("#player_one_ramen_cards").text(game.player.cards["ramen"]);
        $("#player_one_book_cards").text(game.player.cards["book"]);
        $("#player_one_knight_cards").text(game.player.cards["knight"]);
        $("#player_one_road_cards").text(game.player.cards["roads"]);
        $("#player_one_volunteer_cards").text(game.player.cards["volunteer"]);
        $("#player_one_monopoly_cards").text(game.player.cards["monopoly"]);
        $("#player_one_well_cards").text(game.player.cards["victory_points"]["oldwell"]);
        $("#player_one_pit_cards").text(game.player.cards["victory_points"]["pit"]);
        $("#player_one_davis_cards").text(game.player.cards["victory_points"]["davis"]);
        $("#player_one_sitterson_cards").text(game.player.cards["victory_points"]["sitterson"]);
        $("#player_one_bell_cards").text(game.player.cards["victory_points"]["bell"]);
        $("#player_one_points").text("Points: " + parseInt(game.player.points));

    };
    var updateOtherPlayerInfo = function() {
        //TODO
    };

    var moveRobber = function(event) {
        partial_turn_over = false;
        var board_canvas = document.getElementById("board_canvas");
        var rect = board_canvas.getBoundingClientRect();
        var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
        var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

        // Check hexagons
        for (var i = 0; i < game.num_pieces; i++) {
            game.tiles[i].robber = false;
            if (game.checkLeft(game.tiles[i].x_coords[4], x) &&
                game.checkRight(game.tiles[i].x_coords[1], x) &&
                game.checkTopLeft(game.tiles[i].x_coords[5], game.tiles[i].y_coords[5], game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], x, y) &&
                game.checkTopRight(game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], game.tiles[i].x_coords[1], game.tiles[i].y_coords[1], x, y) &&
                game.checkBottomLeft(game.tiles[i].x_coords[2], game.tiles[i].y_coords[2], game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], x, y) &&
                game.checkBottomRight(game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], game.tiles[i].x_coords[4], game.tiles[i].y_coords[4], x, y)) {
                partial_turn_over = true;
                game.tiles[i].robber = true;
            }
        }
        if (partial_turn_over) {
            board_canvas.removeEventListener('mousedown', moveRobber);
            partial_turn_over = false;
            drawBoard(false, false, false, false, false, 0);
            game.turn_number++;
        }
    };

    var giveResourceCard = function(card_name){
      switch(card_name){
        case "RAM":
          game.player.cards["ram"]++;
          return true;
        case "RAMEN":
          game.player.cards["ramen"]++;
          return true;
        case "BRICK":
          game.player.cards["brick"]++;
          return true;
        case "BASKETBALL":
          game.player.cards["basketball"]++;
          return true;
        case "BOOK":
          game.player.cards["book"]++;
          return true;
        default:
          return false;
      }
    }

    var useKnightCard = function(){
      if(game.player.cards["knight"] < 1){
        alert("You do not have a knight card!");
      }
      else{
        game.player.cards["knight"]--;
        //TODO update solider count for largest army
        alert("Move the robber!");
        game.fireEvent(new game.RobberEvent());
      }
    }
    var useRoadCard = function(){
      if(game.player.cards["roads"] < 1){
        alert("You do not have a roads card!");
      }
      else{
        game.player.cards["roads"]--;
        alert("You receive 2 book cards and 2 brick cards with which to build 2 roads!");
        game.player.cards["book"]+=2;
        game.player.cards["brick"]+=2;
        updatePlayerInfo();
      }
    }

    var useVolunteerCard = function(){
      if(game.player.cards["volunteer"] < 1){
        alert("You do not have a volunteering card!");
      }
      else{
        game.player.cards["volunteer"]--;
        alert("You volunteered for medical research to make extra cash. You may pick two cards to receive for your troubles.");
        var first_card = prompt("Pick which card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
        while(!giveResourceCard(first_card)){
          first_card = prompt("Bad input. Please try: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
        }
        var second_card = prompt("Pick a second card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
        while(!giveResourceCard(second_card)){
          second_card = prompt("Bad input. Please try: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
        }
      }
    }
    var useMonopolyCard = function(){
      if(game.player.cards["monopoly"] < 1){
        alert("You do not have a monopoly card!");
      }
      else{
        alert("You declared a monopoly!")
        var monopoly_resource = prompt("Pick which card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK.")
        while(!giveResourceCard(monopoly_resource)){
          monopoly_resource = prompt("Bad input. Please try: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
        }
      }
    }

    var diceRoll = function() {
        var current_roll = game.rollDice(2);
        $("#current_dice_roll_text").text("Dice Roll: " + current_roll);
        //TODO post to server
        if (current_roll == 7) {
            // Steal Cards
            if ((game.player.cards["ram"] + game.player.cards["ramen"] + game.player.cards["brick"] + game.player.cards["basketball"] + game.player.cards["book"]) > 7) {
                alert("Robber! You have too many cards. The robber will steal half!");
                game.player.cards["ram"] = Math.floor(game.player.cards["ram"] / 2);
                game.player.cards["ramen"] = Math.floor(game.player.cards["ramen"] / 2);
                game.player.cards["brick"] = Math.floor(game.player.cards["brick"] / 2);
                game.player.cards["basketball"] = Math.floor(game.player.cards["basketball"] / 2);
                game.player.cards["book"] = Math.floor(game.player.cards["book"] / 2);
                updatePlayerInfo();
            }
            var board_canvas = document.getElementById("board_canvas");
            board_canvas.addEventListener('mousedown', moveRobber);
            drawBoard(false, false, false, true, false, 0);
            game.fireEvent(new game.RobberEvent());
        }
        // Is not a robber
        else {
            drawBoard(false, false, false, false, true, current_roll);

            // Add cards
            for (var i = 0; i < game.player.colleges.length; i++) {
                for (var j = 0; j < game.player.colleges[i].tiles.length; j++) {
                    if (game.player.colleges[i].tiles[j].number == current_roll && !game.player.colleges[i].tiles[j].robber) {
                        game.player.cards[game.player.colleges[i].tiles[j].resource]++;
                        if (game.player.colleges[i].university) {
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
        var use_knight_card = document.getElementById("use_knight");
        use_knight_card.addEventListener('click', useKnightCard);
        var use_roads_card = document.getElementById("use_roads");
        use_roads_card.addEventListener('click', useRoadCard);
        var use_volunteer_card = document.getElementById("use_volunteer");
        use_volunteer_card.addEventListener('click', useVolunteerCard);
        var use_monopoly_card = document.getElementById("use_monopoly");
        use_monopoly_card.addEventListener('click', useMonopolyCard);
    };
    // Query for dice roll from other players
    var diceRollOther = function(current_roll) {

    };

    var end_turn_button = document.getElementById("turn_over_button");
    end_turn_button.addEventListener('click', function() {
        game.fireEvent(new game.TurnChangeEvent())
    });

    // =============================================================================
    // GAME RUNNING
    // =============================================================================

    // Keep track of turns
    var turnChecks = function() {
        updatePlayerInfo();
        if (game.turn_number == 1) {
            game.fireEvent(new game.SetupTurnEvent());
        } else if (game.turn_number == 2) {
            game.fireEvent(new game.SetupTurnEvent());
        } else if (game.turn_number > 2 && game.turn_number < 20) {
            game.fireEvent(new game.DiceRollEvent());
        }
    }
    // Initialize game
    // CAN DO WITH PARAMETERS AND HAVE EVERYONE START THE SAME GAME
    var game = new SettlersGame();
    game.startGame();
    // Add roads to colleges
    for (var k = 0; k < game.num_colleges; k++) {
        for (var l = 0; l < game.num_roads; l++) {
            if (game.roads[l].connections[0].id == game.colleges[k].id || game.roads[l].connections[1].id == game.colleges[k].id) {
                game.colleges[k].roads.push(game.roads[l]);
            }
        }
    }
    game.registerEventHandler(SETTLERS_CONSTANTS.SETUP_TURN_EVENT, setupTurn);
    game.registerEventHandler(SETTLERS_CONSTANTS.ROBBER_EVENT, moveRobber);
    game.registerEventHandler(SETTLERS_CONSTANTS.TURN_CHANGE_EVENT, turnChecks);
    game.registerEventHandler(SETTLERS_CONSTANTS.DICE_ROLL_EVENT, diceRoll);
    drawBoard(false, false, false, false, false, 0);
    turnChecks();

});
