function RunGame() {
  var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/shellyg/final/";

  alert("Welcome " + username + "! You are player " + id + "!");

  var size = 60;
  var width = Math.floor(Math.sqrt(3) * size * 5 + 1) + 60;
  var x_initial = (width/ 2) - (Math.sqrt(3) * size) ;
  var y_initial = 98;
  var num_sides = 6;
  var board;
  var turn_over = false;
  var partial_turn_over = false;
  var current_roll = 0;
  var just_had_turn = false;
  var current_max_roads_player = 0;
  var current_max_army_player = 0;
  var current_max_army = 2;
  var roads_card = false;
  // =============================================================================
  // BOARD DRAWING
  // =============================================================================
  var drawBoard = function(available_roads, available_colleges, available_universities, available_robber, resources, dice_roll) {
    // Set up canvas
    var canvas = document.getElementById("board_canvas");
    canvas.style = "margin: 0 auto;";

    var radius = 20;

    canvas.width = width;
    canvas.height = 515 + 20;

    var ctx = canvas.getContext('2d');

    // Draw on tiles
    for (var i = 0; i < game.num_tiles; i++) {
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
      if(game.colleges[i].used){
          ctx.beginPath();
          game.colleges[i].radius = 12;
          if(game.colleges[i].university){game.colleges[i].radius = 16;}
          ctx.arc(game.colleges[i].x, game.colleges[i].y, game.colleges[i].radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = game.colleges[i].player.color;
          ctx.fill();
          ctx.lineWidth = 2;
          if(game.colleges[i].x){ctx.lineWidth = 3;}
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
        ctx.stroke();
      }
      document.getElementById("board").append(canvas);
    }
  }

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
          $.ajax({url:url_base + "SettlersOfCarolina.php/Colleges/" + game.colleges[i].id,
          type: "POST",
          dataType: "json",
          async: false,
          data: collegeGame_collegeAJAX(game.colleges[i]), //$(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
          success: function(College_json, status, jqXHR) {
          },
        error: function(jqXHR, status, error) {
        alert(jqXHR.responseText);
      }
    });

    // If second turn give the player resources
    if (game.turn_number == game.player.id + 4) {
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
  if (game.turn_number == game.player.id + 4) {
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
        $.ajax({url:url_base + "SettlersOfCarolina.php/Roads/" + game.roads[i].id,
          type: "POST",
          dataType: "json",
          async: false,
          data: roadGame_roadAJAX(game.roads[i]),
          success: function(College_json, status, jqXHR) {
          },
        error: function(jqXHR, status, error) {
        alert(jqXHR.responseText);
        }
      });
        game.roads[i].radius = 12;
        drawBoard(false, false, false, false, false, 0);
      }
    }
  }
  if (partial_turn_over) {
    board_canvas.removeEventListener('mousedown', addRoadStart);
    if (game.turn_number == game.player.id + 4) {
      // Fix availability
      for (var k = 0; k < game.roads.len; k++) {
        game.roads[k].available = false;
      }
      for (var k = 0; k < game.player.roads.length; k++) {
        for (var l = 0; l < game.player.roads[k].connections[0].roads.length; l++) {
          if (!game.player.roads[k].connections[0].roads[l].used) {
            if(!game.player.roads[k].connections[0].used || (game.player.roads[k].connections[0].player.id == game.player.id)){
              game.player.roads[k].connections[0].roads[l].available = true;
            }
          }
        }
        for (var l = 0; l < game.player.roads[k].connections[1].roads.length; l++) {
          if (!game.player.roads[k].connections[1].roads[l].used) {
            if(!game.player.roads[k].connections[1].used || (game.player.roads[k].connections[1].player.id == game.player.id)){
              game.player.roads[k].connections[1].roads[l].available = true;
            }
          }
        }
      }
    }
    drawBoard(false, false, false, false, false, 0);
    game.fireEvent(new game.TurnChangeEvent());
  }
};

var setupTurn = function() {
  alert("Your turn! Place a college and a road!");
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
  var board_canvas = document.getElementById("board_canvas"); //TODO
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
        $.ajax({url:url_base + "SettlersOfCarolina.php/Roads/" + game.roads[i].id,
          type: "POST",
          dataType: "json",
          async: false,
          data: roadGame_roadAJAX(game.roads[i]), //$(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
          success: function(College_json, status, jqXHR) {
          },
          error: function(jqXHR, status, error) {
          alert(jqXHR.responseText);
          }
          });

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
          if(!game.player.roads[k].connections[0].used || (game.player.roads[k].connections[0].player.id == game.player.id)){
            game.player.roads[k].connections[0].roads[l].available = true;
          }
        }
      }
      for (var l = 0; l < game.player.roads[k].connections[1].roads.length; l++) {
        if (!game.player.roads[k].connections[1].roads[l].used) {
          if(!game.player.roads[k].connections[1].used || (game.player.roads[k].connections[1].player.id == game.player.id)){
            game.player.roads[k].connections[1].roads[l].available = true;
          }
        }
      }
    }
    drawBoard(false, false, false, false, false, 0);
    console.log("roads_card: " + roads_card);
    if(roads_card){
      roads_card = false;
      var available = false;
      for (var i = 0; i < game.roads.length; i++) {
        if (game.roads[i].available) {
          available = true;
        }
      }
      // Availability error
      if (!available) {
        console.log("availability error for some reason");
        alert("No more roads available!");
      }
      else{
        alert("Pick a second road!");
        drawBoard(true, false, false, false, false, 0);
        var board_canvas = document.getElementById("board_canvas");
        board_canvas.addEventListener('mousedown', buyRoad);
      }
    }
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


        // AJAX POST to update college
          $.ajax({url:url_base + "SettlersOfCarolina.php/Colleges/" + game.colleges[i].id,
            type: "POST",
            dataType: "json",
            async: false,
            data: collegeGame_collegeAJAX(game.colleges[i]),
            success: function(College_json, status, jqXHR) {
            },
          error: function(jqXHR, status, error) {
          alert(jqXHR.responseText);
          }
        });

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
  // if (game.player.cards["basketball"] < 3 || game.player.cards["ramen"] < 2) {
  //   alert("Insufficient amounts of resources!");
  //   return;
  // }
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

          game.colleges[i].radius = 16;
          $.ajax({url:url_base + "SettlersOfCarolina.php/Colleges/" + game.colleges[i].id,
            type: "POST",
            dataType: "json",
            async: false,
            data: collegeGame_collegeAJAX(game.colleges[i]),
            success: function(College_json, status, jqXHR) {
              console.log("Posted university");
            },
          error: function(jqXHR, status, error) {
          alert(jqXHR.responseText);
          }
        });
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
    else if(game.next_dev_card > 25){
      alert("No more development cards");
    }
    else{*/
      buyCard();
    //}
  };
  var buyCard = function() {
    game.player.cards["ram"]--;
    game.player.cards["ramen"]--;
    game.player.cards["basketball"]--;
    $.ajax({url:url_base + "SettlersOfCarolina.php/DevStacks/26",
      type: "GET",
      dataType: "json",
      async: false,
      success: function(dev_stack_json, status, jqXHR) {
        game.next_dev_card = parseInt(dev_stack_json["Card"]) - 1;
      },
      error: function(jqXHR, status, error) {
        alert(jqXHR.responseText);
      }
      });

    var card = game.dev_cards[game.next_dev_card];
    game.next_dev_card++;

    $.ajax({url:url_base + "SettlersOfCarolina.php/DevStacks/26",
      type: "POST",
      dataType: "json",
      async: false,
      data: "DevID=26&Card=" + (game.next_dev_card+1),
      success: function(College_json, status, jqXHR) {
      },
      error: function(jqXHR, status, error) {
      alert(jqXHR.responseText);
      }
      });
    if(card.type == "oldwell" || card.type == "sitterson" || card.type == "pit" || card.type == "bell" || card.type == "davis"){
      alert("You got a victory point card!")
      game.player.cards["victory_points"][card.type]++;
      game.player.points++;
    }
    else{
      if(card.type == "knight"){
        alert("You got a knight card! You can chase away the Blue Devil with a knight!");
      }
      else if(card.type == "roads"){
        alert("You got a road building card! You can use this to get the resources to build two new roads!");
      }
      else if(card.type == "volunteer"){
        alert("You volunteered for medical research! Use this card to pick two free resources of your choice!");
      }
      else if(card.type == "monopoly"){
        alert("You got a monopoly card! You can use this card to call monopoly on a resource!");
      }
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
    $('#player_two_username').text(game.other_players[0].username);
    $('#player_two_num_cards').text("Number of Cards: " + game.other_players[0].num_cards);
    $('#player_two_points').text("Points: " + game.other_players[0].points);
    $('#player_three_username').text(game.other_players[1].username);
    $('#player_three_num_cards').text("Number of Cards: " + game.other_players[1].num_cards);
    $('#player_three_points').text("Points: " + game.other_players[1].points);
    $('#player_four_username').text(game.other_players[2].username);
    $('#player_four_num_cards').text("Number of Cards: " + game.other_players[2].num_cards);
    $('#player_four_points').text("Points: " + game.other_players[2].points);
  };

  var moveRobber = function(event) {
    partial_turn_over = false;
    var board_canvas = document.getElementById("board_canvas");
    var rect = board_canvas.getBoundingClientRect();
    var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));
    for (var i = 0; i < game.num_tiles; i++) {
      if(game.tiles[i].robber){
        game.tiles[i].robber = false;
        $.ajax({url:url_base + "SettlersOfCarolina.php/Tiles/" + game.tiles[i].id,
          type: "POST",
          dataType: "json",
          async: false,
          data: tileGame_tileAJAX(game.tiles[i]),
          success: function(tile_json, status, jqXHR) {
            console.log("Success in getting rid of robber");
            console.log("ID to get rid of: " + tile_json["TileID"]);
            console.log("Robber to get rid of: " + tile_json["Robber"]);
            console.log("Placement to get rid of: " + tile_json["Robber"]);
          },
          error: function(jqXHR, status, error) {
            console.log(jqXHR.responseText);
          }
        });
      }
    }
    // Check hexagons
    for (var i = 0; i < game.num_tiles; i++) {
      if (game.checkLeft(game.tiles[i].x_coords[4], x) &&
      game.checkRight(game.tiles[i].x_coords[1], x) &&
      game.checkTopLeft(game.tiles[i].x_coords[5], game.tiles[i].y_coords[5], game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], x, y) &&
      game.checkTopRight(game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], game.tiles[i].x_coords[1], game.tiles[i].y_coords[1], x, y) &&
      game.checkBottomLeft(game.tiles[i].x_coords[2], game.tiles[i].y_coords[2], game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], x, y) &&
      game.checkBottomRight(game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], game.tiles[i].x_coords[4], game.tiles[i].y_coords[4], x, y)) {
        console.log("INSIDE IF STATEMENT TWICE");
        partial_turn_over = true;
        game.tiles[i].robber = true;
        $.ajax({url:url_base + "SettlersOfCarolina.php/Tiles/" + game.tiles[i].id,
          type: "POST",
          dataType: "json",
          async: false,
          data: tileGame_tileAJAX(game.tiles[i]),
          success: function(tile_json, status, jqXHR) {
            console.log("Success in posting robber.");
          },
          error: function(jqXHR, status, error) {
            console.log(jqXHR.responseText);
          }
        });
      }
    }
    if (partial_turn_over) {
      board_canvas.removeEventListener('mousedown', moveRobber);
      partial_turn_over = false;
      drawBoard(false, false, false, false, false, 0);
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
      game.player.used_knights++;
      $.ajax({url: url_base + "SettlersOfCarolina.php/Players/" + game.player.id,
       type: "POST",
       dataType: "json",
       data: playerGame_playerAJAX(game.player),
       async: false,
       success: function(Card_json, status, jqXHR) {
       },
       error: function(jqXHR, status, error) {
        console.log(jqXHR.responseText);
       }
      });
      updatePlayerInfo();
      checkKnightSpecial();
      alert("Move the Blue Devil!");
      var board_canvas = document.getElementById("board_canvas");
      board_canvas.addEventListener('mousedown', moveRobber);
      drawBoard(false, false, false, true, false, 0);
      game.fireEvent(new game.RobberEvent());
    }
  }
  var useRoadCard = function(){
    if(game.player.cards["roads"] < 1){
      alert("You do not have a roads card!");
    }
    else{
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
      else{
        roads_card = true;
        game.player.cards["roads"]--;
        updatePlayerInfo();
        alert("Place your first road!");
        drawBoard(true, false, false, false, false, 0);
        var board_canvas = document.getElementById("board_canvas");
        board_canvas.addEventListener('mousedown', buyRoad);
      }
    }
  }

  var useVolunteerCard = function(){
    if(game.player.cards["volunteer"] < 1){
      alert("You do not have a volunteering card!");
    }
    else{
      game.player.cards["volunteer"]--;
      alert("You volunteered for medical research to make extra cash. You may pick two cards to receive for your troubles.");
      var first_card = prompt("Pick which card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK.").toUpperCase();
      while(!giveResourceCard(first_card)){
        first_card = prompt("Bad input. Please try: RAM, BRICK, BASKETBALL, RAMEN, BOOK.").toUpperCase();
      }
      updatePlayerInfo();
      var second_card = prompt("Pick a second card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK.").toUpperCase();
      while(!giveResourceCard(second_card)){
        second_card = prompt("Bad input. Please try: RAM, BRICK, BASKETBALL, RAMEN, BOOK.").toUpperCase();
      }
      updatePlayerInfo();
    }
  }
  var useMonopolyCard = function(){
    if(game.player.cards["monopoly"] < 1){
      alert("You do not have a monopoly card!");
    }
    else{
      game.player.cards["monopoly"]--;
      alert("You declared a monopoly!");
      var done=0;
      while(!done){
        var monopoly_resource = prompt("Pick which card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
        if(monopoly_resource!= "RAM" || monopoly_resource!= "BRICK"
         || monopoly_resource!="BASKETBALL" || monopoly_resource!="RAMEN" || monopoly_resource!="BOOK"){
          alert("please type a correct option");
        }
        else{
          done=1;
        }
    }
    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    }
      var total=0;
      $.ajax({url: url_base + "SettlersOfCarolina.php/Cards/getAll",
       type: "Get",
       dataType: "json",
       async: false,
       success: function(card_array, status, jqXHR) {
         for( var i=0;i<card_array.length;i++){
           total += card_array[i][monopoly_resource.toLowerCase()];
         }
         game.player.cards[monopoly_resource.toLowerCase()]+= total;
       },
       error: function(jqXHR, status, error) {
        console.log(jqXHR.responseText);
       }
      });

      $.ajax({url: url_base + "SettlersOfCarolina.php/Cards/" + game.player.id,
       type: "POST",
       dataType: "json",
       data: playerGame_cardsAJAX(game.player),
       async: false,
       success: function(card_array, status, jqXHR) {
       },
       error: function(jqXHR, status, error) {
        console.log(jqXHR.responseText);
       }
      });

      for(var i=1; i<5; i++){
        if(i!=game.player.id){
          $.ajax({url: url_base + "SettlersOfCarolina.php/Cards/" + i,
           type: "POST",
           dataType: "json",
           data: (monopoly_resource.capitalizeFirstLetter + "= " + 0),
           async: false,
           success: function(card_array, status, jqXHR) {
             for( var i=0;i<card_array.length;i++){
               total += card_array[i][monopoly_resource];
             }
           },
           error: function(jqXHR, status, error) {
            console.log(jqXHR.responseText);
           }
          });
        }
      }



      updatePlayerInfo();
    }
  }

  var tradeWithBank = function(){
      var bool = false;

      if (game.player.cards["ram"] < 3) {
          console.log("Ram: " + game.player.cards['ram']);
      } else {
          bool = true;
      }
      if (game.player.cards["brick"] < 3) {
          console.log("Brick: " + game.player.cards['brick']);
      } else {
          bool = true;
      }
      if (game.player.cards["basketball"] < 3) {
          console.log("Basketball: " + game.player.cards['basketball']);
      } else {
          bool = true;
      }
      if (game.player.cards['ramen'] < 3) {
          console.log("Ramen: " + game.player.cards['ramen']);
      } else {
          bool = true;
      }
      if (game.player.cards['book'] < 3) {
          console.log("Book: " + game.player.cards['book']);
      } else {
          bool = true;
      }

      if (bool == false) {
          console.log("Not enough cards");
          return;
      } else {
          $("#trade_interface").show();
          $("#part2").hide();
          console.log("You have enough cards");
      }
  }

  // TODO
  var tradeProcessor = function(e) {
      if ($(e.target).is("img")) {
          var parent = $(e.target).parent();
          if (parent.hasClass("rameses")) {
              resource_to_trade = "RAM";
          } else if (parent.hasClass("basketballs")) {
              resource_to_trade = "BASKETBALL";
          } else if (parent.hasClass("ramen")) {
              resource_to_trade = "RAMEN";
          } else if (parent.hasClass("books")) {
              resource_to_trade = "BOOK";
          } else if (parent.hasClass("bricks")) {
              resource_to_trade = "BRICK";
          }
      }

    resource_to_trade = resource_to_trade.toLowerCase();
    if(!(resource_to_trade in game.player.cards)){
      $("#trade_message").html("Bad input. Try again");
    }
    else{
      if(game.player.cards[resource_to_trade] < 3){
        $("#trade_message").html("Not enough " + resource_to_trade + " cards.");
      }
      else{
          $("#trade_message").html("Which resource would you like in return?");
          $("#part1").hide();
          $("#part2").show();
        game.player.cards[resource_to_trade] -= 3;
        updatePlayerInfo();
        return;
      }
    }
  }

  var tradeProcessor2 = function(e) {
      if ($(e.target).is("img")) {
          var parent = $(e.target).parent();
          if (parent.hasClass("rameses")) {
              resource_to_get = "RAM";
          } else if (parent.hasClass("basketballs")) {
              resource_to_get = "BASKETBALL";
          } else if (parent.hasClass("ramen")) {
              resource_to_get = "RAMEN";
          } else if (parent.hasClass("books")) {
              resource_to_get = "BOOK";
          } else if (parent.hasClass("bricks")) {
              resource_to_get = "BRICK";
          }
      }

      resource_to_get = resource_to_get.toLowerCase();
      if(!(resource_to_get in game.player.cards)){
        alert("Bad input. Try again.");
        $("#trade_message").html("Bad input. Try again");
        game.player.cards[resource_to_trade] += 3;
        updatePlayerInfo();
      }
      else{
        game.player.cards[resource_to_get]++;
        updatePlayerInfo();
      }
      $("#trade_message").html("Trade successful!");
      setTimeout(function() {
          $("#part2").hide();
          $("#trade_interface").hide();
          $("#trade_message").html("");
      }, 2000);
  }


  var diceRoll = function() {
    alert("Your turn! Buy/trade!");
    $.ajax({url: url_base + "SettlersOfCarolina.php/DiceRolls/" + game.turn_number,
      type: "GET",
      dataType: "json",
      async: false,
      success: function(roll, status, jqXHR) {
        current_roll = roll["RollResult"];
        },
      error: function(jqXHR, status, error) {
        console.log("Problem waiting for turn");
    }
    });

    $("#current_dice_roll_text").text("Dice Roll: " + current_roll);
    if (current_roll == 7) {
      // Steal Cards
      if ((game.player.cards["ram"] + game.player.cards["ramen"] + game.player.cards["brick"] + game.player.cards["basketball"] + game.player.cards["book"]) > 7) {
        alert("Blue Devil! You have too many cards. The Blue Devil will steal half!");
        game.player.cards["ram"] = Math.floor(game.player.cards["ram"] / 2);
        game.player.cards["ramen"] = Math.floor(game.player.cards["ramen"] / 2);
        game.player.cards["brick"] = Math.floor(game.player.cards["brick"] / 2);
        game.player.cards["basketball"] = Math.floor(game.player.cards["basketball"] / 2);
        game.player.cards["book"] = Math.floor(game.player.cards["book"] / 2);
        updatePlayerInfo();
      }
      alert("Move the Blue Devil!");
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
    }
    // Listeners for buttons
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
    var trade_button = document.getElementById("trade_button");
    trade_button.addEventListener('click', tradeWithBank);
    var end_turn_button = document.getElementById("turn_over_button");
    end_turn_button.addEventListener('click', turnEnd);
    var part1 = document.getElementById("part1");
    part1.addEventListener('click', tradeProcessor);
    var part2 = document.getElementById("part2");
    part2.addEventListener('click', tradeProcessor2);
  };
  // Query for dice roll from other players
  var rollOtherDice = function() {
    $.ajax({url: url_base + "SettlersOfCarolina.php/DiceRolls/" + game.turn_number,
      type:"GET",
      dataType: "json",
      async: false,
      success: function(roll, status, jqXHR) {
        current_roll = parseInt(roll["RollResult"]);
      },
      error: function(jqXHR, status, error) {
        console.log("Problem waiting for turn");
    }
    });
    if(game.turn_number > 8){
      $("#current_dice_roll_text").text("Dice Roll: " + current_roll);

    if (current_roll == 7) {
      // Steal Cards
      if ((game.player.cards["ram"] + game.player.cards["ramen"] + game.player.cards["brick"] + game.player.cards["basketball"] + game.player.cards["book"]) > 7) {
        alert("Blue Devil! You have too many cards. The Blue Devil will steal half!");
        game.player.cards["ram"] = Math.floor(game.player.cards["ram"] / 2);
        game.player.cards["ramen"] = Math.floor(game.player.cards["ramen"] / 2);
        game.player.cards["brick"] = Math.floor(game.player.cards["brick"] / 2);
        game.player.cards["basketball"] = Math.floor(game.player.cards["basketball"] / 2);
        game.player.cards["book"] = Math.floor(game.player.cards["book"] / 2);
        updatePlayerInfo();
      }
    }

    // Is not a robber
    else {
      if(game.turn_number > 8){
        drawBoard(false, false, false, false, true, current_roll);
      }
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
    }
    }
  };

  var checkTarheelRoad = function(){
    if(!game.player.tarheel_road){
      for(var i = 0; i < game.player.colleges.length; i++){
        var num_roads_used = 0;
        var num_colleges_used = 0;
        for(var j = 0; j < game.player.colleges[i].roads; j++){
          if(game.player.colleges[i].roads[j].player.id == game.player.id){
            num_roads_used++;
          }
        }
        if(num_roads_used == 3){
          for(var j = 0; j < game.player.colleges[i].roads; j++){
            if(game.player.colleges[i].roads[j].connections[0].player.id == game.player.id && game.player.colleges[i].roads[j].connections[1].player.id == game.player.id){
              num_colleges_used++;
            }
          }
          if(num_colleges_used == 3){
            $("#player_one_special_roads").text("Tarheel Junction Present");
            game.player.points += 2;
            game.player.tarheel_road = true;
            updatePlayerInfo();
            $.ajax({url: url_base + "SettlersOfCarolina.php/Players/" + game.player.id,
                type: "POST",
                dataType: "json",
                data: playerGame_playerAJAX(game.player),
                async: false,
                success: function(Player_json, status, jqXHR) {
                },
                error: function(jqXHR, status, error) {
                 console.log(jqXHR.responseText);
                }
            });
          }
        }
      }
    }
    if(!game.other_players[0].tarheel_road){
      for(var i = 0; i < game.other_players[0].colleges.length; i++){
        var num_roads_used = 0;
        var num_colleges_used = 0;
        for(var j = 0; j < game.other_players[0].colleges[i].roads; j++){
          if(game.other_players[0].colleges[i].roads[j].player.id == game.other_players[0].id){
            num_roads_used++;
          }
        }
        if(num_roads_used == 3){
          for(var j = 0; j < game.other_players[0].colleges[i].roads; j++){
            if(game.other_players[0].colleges[i].roads[j].connections[0].player.id == game.other_players[0].id
              && game.other_players[0].colleges[i].roads[j].connections[1].player.id == game.other_players[0].id){
              num_colleges_used++;
            }
          }
          if(num_colleges_used == 3){
            $("#player_two_special_roads").text("Tarheel Junction Present");
            game.other_players[0].points += 2;
            game.other_players[0].tarheel_road = true;
          }
        }
      }
    }
    if(!game.other_players[1].tarheel_road){
      for(var i = 0; i < game.other_players[1].colleges.length; i++){
        var num_roads_used = 0;
        var num_colleges_used = 0;
        for(var j = 0; j < game.other_players[1].colleges[i].roads; j++){
          if(game.other_players[1].colleges[i].roads[j].player.id == game.other_players[1].id){
            num_roads_used++;
          }
        }
        if(num_roads_used == 3){
          for(var j = 0; j < game.other_players[1].colleges[i].roads; j++){
            if(game.other_players[1].colleges[i].roads[j].connections[0].player.id == game.other_players[1].id
              && game.other_players[1].colleges[i].roads[j].connections[1].player.id == game.other_players[1].id){
              num_colleges_used++;
            }
          }
          if(num_colleges_used == 3){
            $("#player_three_special_roads").text("Tarheel Junction Present");
            game.other_players[1].points += 2;
            game.other_players[1].tarheel_road = true;
          }
        }
      }
    }
    if(!game.other_players[2].tarheel_road){
      for(var i = 0; i < game.other_players[2].colleges.length; i++){
        var num_roads_used = 0;
        var num_colleges_used = 0;
        for(var j = 0; j < game.other_players[2].colleges[i].roads; j++){
          if(game.other_players[2].colleges[i].roads[j].player.id == game.other_players[2].id){
            num_roads_used++;
          }
        }
        if(num_roads_used == 3){
          for(var j = 0; j < game.other_players[2].colleges[i].roads; j++){
            if(game.other_players[2].colleges[i].roads[j].connections[0].player.id == game.other_players[2].id
              && game.other_players[2].colleges[i].roads[j].connections[1].player.id == game.other_players[2].id){
              num_colleges_used++;
            }
          }
          if(num_colleges_used == 3){
            $("#player_three_special_roads").text("Tarheel Junction Present");
            game.other_players[2].points += 2;
            game.other_players[2].tarheel_road = true;
          }
        }
      }
    }
  }

  var checkKnightSpecial = function(){
    if(current_max_army_player == 0){
      if(game.other_players[0].knights_count > current_max_army){
        current_max_army = game.other_players[0].knights_count;
        current_max_army_player = game.other_players[0].id;
      }
      if(game.other_players[1].knights_count > current_max_army){
        current_max_army = game.other_players[1].knights_count;
        current_max_army_player = game.other_players[1].id;
      }
      if(game.other_players[2].knights_count > current_max_army){
        current_max_army = game.other_players[2].knights_count;
        current_max_army_player = game.other_players[2].id;
      }
      if(game.player.used_knights > current_max_army){
        current_max_army = game.player.used_knights;
        current_max_army_player = game.player.id;
        game.player.points += 2;
        $("#player_one_special_knights").text("Largest Army: " + current_max_army);
      }
      if(current_max_army_player == game.other_players[0].id){
        $("#player_two_special_knights").text("Largest Army: " + current_max_army);
      }
      if(current_max_army_player == game.other_players[1].id){
        $("#player_three_special_knights").text("Largest Army: " + current_max_army);
      }
      if(current_max_army_player == game.other_players[2].id){
        $("#player_four_special_knights").text("Largest Army: " + current_max_army);
      }
    }
    else{
      $("#player_one_special_knights").text("");
      $("#player_two_special_knights").text("");
      $("#player_three_special_knights").text("");
      $("#player_four_special_knights").text("");

      var old_max_army_player = current_max_army_player;
      if(game.other_players[0].knights_count > current_max_army){
        current_max_army = game.other_players[0].knights_count;
        current_max_army_player = game.other_players[0].id;
      }
      if(game.other_players[1].knights_count > current_max_army){
        current_max_army = game.other_players[1].knights_count;
        current_max_army_player = game.other_players[1].id;
      }
      if(game.other_players[2].knights_count > current_max_army){
        current_max_army = game.other_players[2].knights_count;
        current_max_army_player = game.other_players[2].id;
      }
      if(game.player.used_knights > current_max_army){
        current_max_army = game.player.used_knights;
        current_max_army_player = game.player.id;
        if(old_max_army_player != game.player.id){
          game.player.points += 2;
        }
        $("#player_one_special_knights").text("Largest Army: " + current_max_army);
      }
      if(old_max_army_player == game.player.id && current_max_army_player != game.player.id){
        game.player.points -= 2;
      }
      updatePlayerInfo();
      $.ajax({url: url_base + "SettlersOfCarolina.php/Players/" + game.player.id,
          type: "POST",
          dataType: "json",
          data: playerGame_playerAJAX(game.player),
          async: false,
          success: function(Player_json, status, jqXHR) {
          },
          error: function(jqXHR, status, error) {
           console.log(jqXHR.responseText);
          }
      });
      if(current_max_army_player == game.other_players[0].id){
        $("#player_two_special_knights").text("Largest Army: " + current_max_army);
      }
      if(current_max_army_player == game.other_players[1].id){
        $("#player_three_special_knights").text("Largest Army: " + current_max_army);
      }
      if(current_max_army_player == game.other_players[2].id){
        $("#player_four_special_knights").text("Largest Army: " + current_max_army);
      }
    }
    updateOtherPlayerInfo();
  }

  var getLongestContinuousRoads = function(player){
    //http://stackoverflow.com/questions/3191460/finding-the-longest-road-in-a-settlers-of-catan-game-algorithmically
    var roads_not_checked = [];
    var roads_together = [];
    var roads_checked = [];
    for(var i = 0; i < player.roads.length; i++){
      roads_not_checked[i] = player.roads[i];
    }
    var current_to_check = roads_not_checked[roads_not_checked.length - 1];
    roads_together[0].push(current_to_check);
    roads_not_checked.pop();
    for(var i = 0; i < current_to_check.connections[0].roads.length; i++){
      if(current_to_check.connections[0].roads[i].id != current_to_check.id
        && current_to_check.connections[0].roads[i].player.id == player.id){
          roads_together[0].push(current_to_check.connections[0].roads[i]);
        }
      }
      for(var i = 0; i < current_to_check.connections[1].roads.length; i++){
        if(current_to_check.connections[1].roads[i].id != current_to_check.id
          && current_to_check.connections[1].roads[i].player.id == player.id){
            roads_together[0].push(current_to_check.connections[1].roads[i]);
          }
        }
    }


  var checkRoadsSpecial = function(){
    var current_max_roads = 2;

    // Figure out which player
    if(current_max_roads_player == game.player.id){
      current_max_roads = game.player.roads.length;
    }
    else{
      for(var i = 0; i < game.other_players.length; i++){
        if(current_max_roads_player == game.other_players[i].id){
          curent_max_roads = game.other_players[i].roads.length;
        }
      }
    }
    // Figure out new current roads
    for(var i = 0; i < game.other_players.length; i++){
      if(game.other_players[i].roadss.length > current_max_roads){
        current_max_roads_player = game.other_players[i].id;
        current_max_roads = game.other_players[i].roads.length;
      }
    }
    if(game.player.roads.length > current_max_roads){
      current_max_roads_player = game.player.id;
      current_max_roads = game.player.roads.length;
    }
    if(current_max_roads > 3){

    }

  }

  var updateRoads = function(roads_array){
    for(var i = 0; i < roads_array.length; i++){
      for(var j = 0; j < game.other_players.length; j++){
        if(roads_array[i]["PlayerID"] == game.other_players[j].id){
          game.roads[roads_array[i]["RoadID"] - 1].player = game.other_players[j];
          game.other_players[j].roads.push(game.colleges[roads_array[i]["RoadID"] - 1]);
          game.roads[roads_array[i]["RoadID"] - 1].used = true;
          game.roads[roads_array[i]["RoadID"] - 1].available = false;
        }
      }
    }
    if(game.turn_number < 9){
      drawBoard(false, false, false, false, false, 0);
    }
    else{
      drawBoard(false, false, false, false, true, current_roll);
    }
  }
  // Also updates universities
  var updateColleges = function(colleges_array){
    for(var i = 0; i < colleges_array.length; i++){
      for(var j = 0; j < game.other_players.length; j++){
        if(colleges_array[i]["PlayerID"] == game.other_players[j].id){
          game.colleges[colleges_array[i]["CollegeID"] - 1].player = game.other_players[j];
          game.other_players[j].colleges.push(game.colleges[colleges_array[i]["CollegeID"] - 1]);
          if(colleges_array[i]["University"] == 0){
            game.colleges[colleges_array[i]["CollegeID"] - 1].university = false;
          }
          else{
            game.colleges[colleges_array[i]["CollegeID"] - 1].university = true;
          }
          game.colleges[colleges_array[i]["CollegeID"] - 1].used = true;
          game.colleges[colleges_array[i]["CollegeID"] - 1].available = false;
          for(var k = 0; k < game.colleges[colleges_array[i]["CollegeID"] - 1].roads.length; k++){
            game.colleges[colleges_array[i]["CollegeID"] - 1].roads[k].connections[0].available = false;
            game.colleges[colleges_array[i]["CollegeID"] - 1].roads[k].connections[1].available = false;
            game.colleges[colleges_array[i]["CollegeID"] - 1].roads[k].connections[0].too_close = true;
            game.colleges[colleges_array[i]["CollegeID"] - 1].roads[k].connections[1].too_close = true;
          }
        }
      }
    }
    if(game.turn_number < 9){
      drawBoard(false, false, false, false, false, 0);
    }
    else{
      drawBoard(false, false, false, false, true, current_roll);
    }
  }
  var updateTiles = function(tiles_array){
    for(var i = 0; i < tiles_array.length; i++){
      if(parseInt(tiles_array[i]["Robber"]) == 2){
        game.tiles[tiles_array[i]["TileID"] - 1].robber = false;
      }
      else{
        game.tiles[tiles_array[i]["TileID"] - 1].robber = true;
      }
      game.tiles[tiles_array[i]["TileID"] - 1].placement = tiles_array[i]["Placement"];
    }
    if(game.turn_number < 9){
      drawBoard(false, false, false, false, false, 0);
    }
    else{
      drawBoard(false, false, false, false, true, current_roll);
    }
  }

  var updateOtherPlayers_Players = function(players_array){
    for(var i = 0; i < game.other_players.length; i++){
      for(var j = 0; j < players_array.length; j++){
        if(game.other_players[i].id == players_array[j]["PlayerID"]){
          game.other_players[i].username = players_array[j]["Username"];
          game.other_players[i].knights_count = players_array[j]["SoldiersCount"];
          game.other_players[i].points = players_array[j]["Points"];
          game.other_players[i].color = "#" + players_array[j]["HexColor"];
        }
      }
    }

    checkKnightSpecial();
    updateOtherPlayerInfo();
  }
  var updateOtherPlayers_Cards = function(cards_array){
    for(var i = 0; i < game.other_players.length; i++){
      for(var j = 0; j < cards_array.length; j++){
        if(game.other_players.length == cards_array[j]["PlayerID"]){
          game.other_players[i].num_cards = parseInt(cards_array[j]["Ram"]) + parseInt(cards_array[j]["Ramen"])
           + parseInt(cards_array[j]["Brick"]) + parseInt(cards_array[j]["Book"]) + parseInt(cards_array[j]["Basketball"]);
        }
      }
    }
    updateOtherPlayerInfo();
  }

  // =============================================================================
  // GAME RUNNING
  // =============================================================================

  var gameOver = function(){
    $('#startup').show();
    $('#top_container').hide();
  }

  var turnEnd = function(){
    updatePlayerInfo();
    alert("Turn over!");

    // Remove all current board listeners
    var board_canvas = document.getElementById("board_canvas");
    board_canvas.removeEventListener('mousedown', moveRobber);
    var buy_road = document.getElementById("buy_road");
    buy_road.removeEventListener('click', checkBuyRoad);
    var buy_college = document.getElementById("buy_college");
    buy_college.removeEventListener('click', checkBuyCollege);
    var buy_university = document.getElementById("buy_university");
    buy_university.removeEventListener('click', checkBuyUniversity);
    var buy_card = document.getElementById("buy_card");
    buy_card.removeEventListener('click', checkBuyCard);
    var use_knight_card = document.getElementById("use_knight");
    use_knight_card.removeEventListener('click', useKnightCard);
    var use_roads_card = document.getElementById("use_roads");
    use_roads_card.removeEventListener('click', useRoadCard);
    var use_volunteer_card = document.getElementById("use_volunteer");
    use_volunteer_card.removeEventListener('click', useVolunteerCard);
    var use_monopoly_card = document.getElementById("use_monopoly");
    use_monopoly_card.removeEventListener('click', useMonopolyCard);
    var trading = document.getElementById("trade_button");
    trade_button.removeEventListener('click', tradeWithBank);
    var end_turn_button = document.getElementById("turn_over_button");
    end_turn_button.removeEventListener('click', turnEnd);
    var part1 = document.getElementById('part1');
    part1.removeEventListener('click', tradeProcessor);
    var part2 = document.getElementById('part2');
    part2.removeEventListener('click', tradeProcessor2);

    // Update player cards
    $.ajax({url: url_base + "SettlersOfCarolina.php/Cards/" + game.player.id,
        type: "POST",
        dataType: "json",
        data: playerGame_cardsAJAX(game.player),
        async: false,
        success: function(Card_json, status, jqXHR) {
        },
        error: function(jqXHR, status, error) {
         console.log(jqXHR.responseText);
        }
    });
    // Update player object
    $.ajax({url: url_base + "SettlersOfCarolina.php/Players/" + game.player.id,
        type: "POST",
        dataType: "json",
        data: playerGame_playerAJAX(game.player),
        async: false,
        success: function(Player_json, status, jqXHR) {
        },
        error: function(jqXHR, status, error) {
         console.log(jqXHR.responseText);
        }
    });
    game.turn_number++;
    just_had_turn = true;

    $.ajax({url: url_base + "SettlersOfCarolina.php/Turns",
      type: "POST",
      dataType: "json",
      async: false,
      success: function(turn, status, jqXHR) {
        console.log("success on posting");
      },
      error: function(jqXHR, status, error) {
       console.log(jqXHR.responseText);
      }

    });
    if(game.player.points == 10){
      $.ajax({url: url_base + "SettlersOfCarolina.php/Turns/gameover",
        type: "POST",
        dataType: "json",
        async: false,
        success: function(turn, status, jqXHR) {
          console.log("success on posting game over");
        },
        error: function(jqXHR, status, error) {
         console.log(jqXHR.responseText);
        }

      });
    }
    turnChecks();
  }

  // Keep track of turns
  var turnChecks = function() {
    updatePlayerInfo();
    // Do appropriate things per turn number
    if(game.turn_number >= 10000){
      alert("Game over!");
      document.body.innerHTML="";
      gameOver();
    }
    else if (game.turn_number == game.player.id) {
      game.fireEvent(new game.SetupTurnEvent());
    }
    else if (game.turn_number == game.player.id + 4) {
      game.fireEvent(new game.SetupTurnEvent());
    }
    else if (game.turn_number % 4 == game.player.id || ((game.turn_number % 4) + 4) == game.player.id) {
      game.fireEvent(new game.DiceRollEvent());
    }
    else{
      var my_turn = false;
      var c = setInterval(function(){
        if(my_turn){
          clearInterval(c);
        }
        else{
          $.ajax({url: url_base + "SettlersOfCarolina.php/Tiles/getAll",
            type:"GET",
            dataType: "json",
            async: false,
            success: function(tiles_array, status, jqXHR) {
              updateTiles(tiles_array);
            },
            error: function(jqXHR, status, error) {
              console.log("Problem updating TILES");
            }
          });
          $.ajax({url: url_base + "SettlersOfCarolina.php/Colleges/getAll",
            type:"GET",
            dataType:"json",
            async: false,
            success: function(colleges_array, status, jqXHR) {
              updateColleges(colleges_array);
            },
            error: function(jqXHR, status, error) {
              console.log("Problem updating COLLEGES");
            }
          });
          $.ajax({url: url_base + "SettlersOfCarolina.php/Roads/getAll",
            type:"GET",
            dataType: "json",
            async: false,
            success: function(roads_array, status, jqXHR) {
              updateRoads(roads_array);
            },
            error: function(jqXHR, status, error) {
              console.log("Problem updating ROADS");
            }
          });
          $.ajax({url: url_base + "SettlersOfCarolina.php/Players/getAll",
            type:"GET",
            dataType: "json",
            async: false,
            success: function(players_array, status, jqXHR) {
              updateOtherPlayers_Players(players_array);
            },
            error: function(jqXHR, status, error) {
              console.log("Problem updating PLAYERS");
            }
          });
          $.ajax({url: url_base + "SettlersOfCarolina.php/Cards/getAll",
            type:"GET",
            dataType: "json",
            async: false,
            success: function(cards_array, status, jqXHR) {
              updateOtherPlayers_Cards(cards_array);
            },
            error: function(jqXHR, status, error) {
              console.log("Problem updating PLAYERS");
            }
          });
          $.ajax({url: url_base + "SettlersOfCarolina.php/Turns",
            type:"GET",
            dataType: "json",
            success: function(turn, status, jqXHR) {
              if(turn >= 10000){
                //TODO more here
                alert("Game over!");
                clearInterval(c);
                gameOver();
                }
              else if(turn % 4 == game.player.id || ((turn % 4) + 4) == game.player.id){
                game.turn_number = turn;
                my_turn = true;
                $("#current_turn").text("Currently your turn!");
                $("#turn_info").css("background-color", game.player.color);
                turnChecks();
              }
              else if(game.turn_number + 1 == turn){
                if(turn % 4 == game.other_players[0].id || ((turn % 4) + 4) ==  game.other_players[0].id){
                  $("#current_turn").text("Currently " + game.other_players[0].username + "'s turn!");
                  $("#turn_info").css("background-color", game.other_players[0].color);
                }
                if(turn % 4 == game.other_players[1].id || ((turn % 4) + 4) ==  game.other_players[1].id){
                  $("#current_turn").text("Currently " + game.other_players[1].username + "'s turn!");
                  $("#turn_info").css("background-color", game.other_players[1].color);
                }
                if(turn % 4 == game.other_players[2].id || ((turn % 4) + 4) ==  game.other_players[2].id){
                  $("#current_turn").text("Currently " + game.other_players[2].username + "'s turn!");
                  $("#turn_info").css("background-color", game.other_players[2].color);
                }
                game.turn_number = turn;
                rollOtherDice();
              }
              else if(just_had_turn){
                if(turn % 4 == game.other_players[0].id || ((turn % 4) + 4) ==  game.other_players[0].id){
                  $("#current_turn").text("Currently " + game.other_players[0].username + "'s turn!");
                  $("#turn_info").css("background-color", game.other_players[0].color);
                }
                if(turn % 4 == game.other_players[1].id || ((turn % 4) + 4) ==  game.other_players[1].id){
                  $("#current_turn").text("Currently " + game.other_players[1].username + "'s turn!");
                  $("#turn_info").css("background-color", game.other_players[1].color);
                }
                if(turn % 4 == game.other_players[2].id || ((turn % 4) + 4) ==  game.other_players[2].id){
                  $("#current_turn").text("Currently " + game.other_players[2].username + "'s turn!");
                  $("#turn_info").css("background-color", game.other_players[2].color);
                }
                game.turn_number = turn;
                rollOtherDice();
                just_had_turn = false;
              }
              else if(turn > 8){
                drawBoard(false, false, false, false, true, current_roll);
              }

              },
            error: function(jqXHR, status, error){
              console.log("Problem waiting for turn");
            }
          });
        }
      }, 1000);
    }
  }
  // Initialize game
  // CAN DO WITH PARAMETERS AND HAVE EVERYONE START THE SAME GAME
  var tiles_placement_array = [];
  var dev_placement_array = [];
  $.ajax({url: url_base + "SettlersOfCarolina.php/Tiles/getAll",
    type:"GET",
    dataType: "json",
    async: false,
    success: function(tiles_array, status, jqXHR) {
      for(var i = 0; i < tiles_array.length; i++){
        tiles_placement_array[i] = tiles_array[i]["Placement"] - 1;
      }
    },
    error: function(jqXHR, status, error) {
      console.log("Problem updating TILES");
    }
  });
  $.ajax({url: url_base + "SettlersOfCarolina.php/DevStacks/getAll",
    type:"GET",
    dataType: "json",
    async: false,
    success: function(dev_array, status, jqXHR) {
      for(var i = 0; i < dev_array.length-1; i++){
        dev_placement_array[i] = dev_array[i]["Card"] - 1;
      }
    },
    error: function(jqXHR, status, error) {
      console.log("Problem updating TILES");
    }
  });

  var game = new SettlersGame(tiles_placement_array, dev_placement_array);
  game.startGame();
  // Add roads to colleges
  for (var k = 0; k < game.num_colleges; k++) {
    for (var l = 0; l < game.num_roads; l++) {
      if (game.roads[l].connections[0].id == game.colleges[k].id || game.roads[l].connections[1].id == game.colleges[k].id) {
        game.colleges[k].roads.push(game.roads[l]);
      }
    }
  }
  game.player.username = username;
  game.player.id = id;

  // Set up colors
  // Assign other players ids based on own id
  for(var i = 0; i < game.other_players.length; i++){
    game.other_players[i].id = game.player.id + i + 1;
    if(game.other_players[i].id > 4){
      game.other_players[i].id -= 4;
    }
  }
  $.ajax({url: url_base + "SettlersOfCarolina.php/Players/getAll",
    type:"GET",
    dataType: "json",
    async: false,
    success: function(players_array, status, jqXHR) {
      updateOtherPlayers_Players(players_array);
    },
    error: function(jqXHR, status, error) {
      console.log("Problem updating PLAYERS");
    }
  });
  console.log("Color inside gamerunner:" + color);
  game.player.color = "#" + color;

  $("#player_one").css("background-color", game.player.color);
  $("#player_two").css("background-color", game.other_players[0].color);
  $("#player_three").css("background-color", game.other_players[1].color);
  $("#player_four").css("background-color", game.other_players[2].color);

  game.registerEventHandler(SETTLERS_CONSTANTS.SETUP_TURN_EVENT, setupTurn);
  game.registerEventHandler(SETTLERS_CONSTANTS.ROBBER_EVENT, moveRobber);
  game.registerEventHandler(SETTLERS_CONSTANTS.TURN_CHANGE_EVENT, turnEnd);
  game.registerEventHandler(SETTLERS_CONSTANTS.DICE_ROLL_EVENT, diceRoll);
  drawBoard(false, false, false, false, false, 0);
  turnChecks();

};
