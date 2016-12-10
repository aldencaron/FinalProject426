function RunGame() {
  var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final/";

  alert(username);
  alert(id);

  // var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
  //   $.ajax({url: url_base + "/SettlersOfCarolina.php/Turns/",
  //     type: "POST",
  //      dataType: "json",
  //      async: false,
  //      success: function(Road_json, status, jqXHR) {
  //        console.log("success");
  //      return new Road(Road_json);},
  //        error: function(jqXHR, status, error) {
  //        console.log(jqXHR.responseText);
  //  }
  // });

  var size = 60;
  var width = Math.floor(Math.sqrt(3) * size * 5 + 1);
  var x_initial = width / 2 - (Math.sqrt(3) * size) + 10;
  var y_initial = 98;
  var num_sides = 6;
  var board;
  var turn_over = false;
  var partial_turn_over = false;
  var current_roll = 0;

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
      if (game.colleges[i].used) {
        if (game.colleges[i].settlement) {
          game.colleges[i].radius = 12;
        }
        ctx.beginPath();
        if(game.colleges[i].university){game.colleges[i].radius = 14}
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
          $.ajax({url:url_base + "SettlersOfCarolina.php/Colleges/" + game.colleges[i].id,
          type: "POST",
          dataType: "json",
          async: false,
          data: collegeGame_collegeAJAX(game.colleges[i]), //$(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
          success: function(College_json, status, jqXHR) {
          alert("success");
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
          data: roadGame_roadAJAX(game.roads[i]), //$(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
          success: function(College_json, status, jqXHR) {
          alert("success");
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
        $.ajax({url:url_base + "SettlersOfCarolina.php/Roads/" + game.roads[i].id,
          type: "POST",
          dataType: "json",
          async: false,
          data: roadsGame_roadsAJAX(game.roads[i]), //$(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
          success: function(College_json, status, jqXHR) {
          alert("success");
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
  if (game.player.cards["ram"] < 1 || game.player.cards["brick"] < 1 ||
  game.player.cards["ramen"] < 1 || game.player.cards["book"] < 1) {
    alert("Insufficient amounts of resources!");
    return;
  }
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
            data: collegeGame_collegeAJAX(game.colleges[i]), //$(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
            success: function(College_json, status, jqXHR) {
            alert("success");
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
  if (game.player.cards["basketball"] < 3 || game.player.cards["ramen"] < 2) {
    alert("Insufficient amounts of resources!");
    return;
  }
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
          //TODO put this ajax in a function
          $.ajax({url:url_base + "SettlersOfCarolina.php/Colleges/" + game.colleges[i].id,
            type: "POST",
            dataType: "json",
            async: false,
            data: collegeGame_collegeAJAX(game.colleges[i]), //$(new collegeGame_collegeAJAX(game.colleges[i])).serialize(),
            success: function(College_json, status, jqXHR) {
            alert("success");
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
    if (game.player.cards["ram"] < 1 || game.player.cards["ramen"] < 1 ||
    game.player.cards["basketball"] < 1) {
      alert("Insufficient amounts of resources!");
    }
    else if(game.next_dev_card > 24){
      alert("No more development cards");
    }
    else{
      buyCard();
    }
  };
  var buyCard = function() {
    var card = game.dev_cards[game.next_dev_card];
    game.next_dev_card++;

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
    //TODO can do in order if I know their IDs but idk
    $('#player_two_username').text(game.other_players[0].username);
    $('#player_two_num_cards').text(game.other_players[0].num_cards);
    $('#player_two_points').text(game.other_players[0].points);
    $('#player_three_username').text(game.other_players[1].username);
    $('#player_three_num_cards').text(game.other_players[1].num_cards);
    $('#player_three_points').text(game.other_players[1].points);
    $('#player_four_username').text(game.other_players[2].username);
    $('#player_four_cards').text(game.other_players[2].num_cards);
    $('#player_four_points').text(game.other_players[2].points);
  };

  var moveRobber = function(event) {
    partial_turn_over = false;
    var board_canvas = document.getElementById("board_canvas");
    var rect = board_canvas.getBoundingClientRect();
    var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

    // Check hexagons
    for (var i = 0; i < game.num_tiles; i++) {
      game.tiles[i].robber = false;
      if (game.checkLeft(game.tiles[i].x_coords[4], x) &&
      game.checkRight(game.tiles[i].x_coords[1], x) &&
      game.checkTopLeft(game.tiles[i].x_coords[5], game.tiles[i].y_coords[5], game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], x, y) &&
      game.checkTopRight(game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], game.tiles[i].x_coords[1], game.tiles[i].y_coords[1], x, y) &&
      game.checkBottomLeft(game.tiles[i].x_coords[2], game.tiles[i].y_coords[2], game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], x, y) &&
      game.checkBottomRight(game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], game.tiles[i].x_coords[4], game.tiles[i].y_coords[4], x, y)) {
        partial_turn_over = true;
        game.tiles[i].robber = true;
        $.ajax({url:url_base + "SettlersOfCarolina.php/Tiles/" + game.Tiles[i].id,
          type: "POST",
          dataType: "json",
          async: false,
          data: tileGame_tileAJAX(game.tiles[i]),
          success: function(tile_json, status, jqXHR) {
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
      updatePlayerInfo();
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
      updatePlayerInfo();
      var second_card = prompt("Pick a second card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
      while(!giveResourceCard(second_card)){
        second_card = prompt("Bad input. Please try: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
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
      alert("You declared a monopoly!")
      var monopoly_resource = prompt("Pick which card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK.")
      while(!giveResourceCard(monopoly_resource)){
        monopoly_resource = prompt("Bad input. Please try: RAM, BRICK, BASKETBALL, RAMEN, BOOK.");
      }
      updatePlayerInfo();
    }
  }

  var tradeWithBank = function(){
    resource_to_trade = prompt("You can trade with the bank at a 3:1 ratio. Pick which card of: RAM, BRICK, BASKETBALL, RAMEN, BOOK to give to the bank.").toLowerCase();
    if(!(resource_to_trade in game.player.cards)){
      alert("Bad input. Try again.");
    }
    else{
      if(game.player.cards[resource_to_trade] < 3){
        alert("Not enough " + resource_to_trade + " cards.");
      }
      else{
        game.player.cards[resource_to_trade] -= 3;
        updatePlayerInfo();
        resource_to_get = prompt("Which resource would you like in return: RAM, BRICK, BASKETBALL, RAMEN, BOOK?").toLowerCase();
        if(!(resource_to_get in game.player.cards)){
          alert("Bad input. Try again.");
          game.player.cards[resource_to_trade] += 3;
          updatePlayerInfo();
        }
        else{
          game.player.cards[resource_to_get]++;
          updatePlayerInfo();
        }
      }
    }
  }

  var diceRoll = function() {
    $.ajax({url: url_base + "/SettlersOfCarolina.php/DiceRolls/" + game.turn_number,
      type: "GET",
      dataType: "json",
      async: false,
      success: function(roll, status, jqXHR) {
        current_roll = roll;
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
    var trading = document.getElementById("trade_button");
    trade_button.addEventListener('click', tradeWithBank);
  };
  // Query for dice roll from other players
  var diceRollOther = function(current_roll) {
    $.ajax({url: url_base + "/SettlersOfCarolina.php/DiceRolls/" + game.turn_number,
      type:"GET",
      dataType: "json",
      async: false,
      success: function(roll, status, jqXHR) {
        current_roll = roll;
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
  };

  // TODO ALL THESE ARRAY INDEXING MAY BE SUPER WRONG OOPS

  var updateRoads = function(roads_array){
    for(var i = 0; i < roads_array.length; i++){
      for(var j = 0; j < game.other_players; j++){
        if(roads_array[i]["PlayerID"] == game.others_players[j].id){
          game.roads[roads_array[i]["RoadID"] - 1].player = game.other_players[j];
          game.other_players[j].roads.push(game.colleges[roads_array[i]["RoadID"] - 1]);
          game.roads[roads_array[i]["RoadID"] - 1].used = true;
          game.roads[roads_array[i]["RoadID"] - 1].available = false;
        }
      }
    }
    drawBoard(false, false, false, false, false, 0);
  }
  // Also updates universities
  var updateColleges = function(colleges_array){
    for(var i = 0; i < colleges_array.length; i++){
      for(var j = 0; j < game.other_players; j++){
        if(colleges_array[i]["PlayerID"] = game.other_players[j].id){
          game.colleges[colleges_array[i]["CollegeID"] - 1].player = game.other_players[j];
          game.other_players[j].colleges.push(game.colleges[colleges_array[i]["CollegeID"] - 1]);
          game.colleges[colleges_array[i]["CollegeID"] - 1].university = colleges_array[i]["University"];
          game.colleges[colleges_array[i]["CollegeID"] - 1].used = true;
          game.colleges[colleges_array[i]["CollegeID"] - 1].available = false;
          for(var k = 0; k < game.colleges[colleges_array[i]["CollegeID"] - 1].roads.length; k++){
            game.colleges[colleges_array[i]["CollegeID"] - 1].roads.connections[0].available = false;
            game.colleges[colleges_array[i]["CollegeID"] - 1].roads.connections[1].available = false;
            game.colleges[colleges_array[i]["CollegeID"] - 1].roads.connections[0].too_close = true;
            game.colleges[colleges_array[i]["CollegeID"] - 1].roads.connections[1].too_close = true;
          }
        }
      }
    }
    drawBoard(false, false, false, false, false, 0);
  }
  var updateTiles = function(tiles_array){
    for(var i = 0; i < tiles_array.length; i++){
      game.tiles[tiles_array[i]["TileID"] - 1].robber = tiles_array[i]["Robber"];
    }
    drawBoard(false, false, false, false, false, 0);
  }

  var updateOtherPlayers_Players = function(players_array){
    for(var i = 0; i < game.other_players.length; i++){
      for(var j = 0; j < players_array.length; j++){
        if(game.other_players[i].id == players_array[j]["PlayerID"]){
          game.other_players[i].username = players_array[j]["Username"];
          game.other_players[i].knights_count = players_array[j]["SolidersCount"];
          game.other_players[i].points = players_array[j]["Points"];
        }
      }
    }
    updateOtherPlayerInfo();
  }
  var updateOtherPlayers_Cards = function(cards_array){
    for(var i = 0; i < game.other_players.length; i++){
      for(var j = 0; j < cards_array.length; j++){
        if(game.other_players.length == cards_array[j]["PlayerID"]){
          game.other_players[i].num_cards = cards_array[j]["Ram"] + cards_array[j]["Ramen"]
           + cards_array[j]["Brick"] + cards_array[j]["Book"] + cards_array[j]["Basketball"];
        }
      }
    }
    updateOtherPlayerInfo();
  }

  var end_turn_button = document.getElementById("turn_over_button");
  end_turn_button.addEventListener('click', function() {
    game.fireEvent(new game.TurnChangeEvent())
  });

  // =============================================================================
  // GAME RUNNING
  // =============================================================================

  var turnEnd = function(){
    updatePlayerInfo();

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

    // Update player cards
    $.ajax({url: url_base + "/SettlersOfCarolina.php/Cards/" + game.player.id,
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
    $.ajax({url: url_base + "/SettlersOfCarolina.php/Players/" + game.player.id,
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
    $.ajax({url: url_base + "/SettlersOfCarolina.php/Turns",
      type: "POST",
      dataType: "json",
      async: false,
      success: function(turn, status, jqXHR) {
        console.log(success);
      },
      error: function(jqXHR, status, error) {
       console.log(jqXHR.responseText);
      }

    });
    // TODO if points is 10, change to turn 0
    turnChecks();
  }

  // Keep track of turns
  var turnChecks = function() {
    updatePlayerInfo();
    // Do appropriate things per turn number
    if (game.turn_number == game.player.id) {
      game.fireEvent(new game.SetupTurnEvent());
    } else if (game.turn_number == game.player.id + 4) {
      game.fireEvent(new game.SetupTurnEvent());
    } else if (game.turn_number > game.player.id + 8 && game.turn_number < game.player.id + 80) {
      game.fireEvent(new game.DiceRollEvent());
    }
    else{
      game.turn_number--; //TODO not certain that this will work but I think is ok
      var my_turn = false;
      var c = setInterval(function(){
        if(my_turn){
          clearInterval(c);
        }
        // Update things and wait for it to be your turn idk this could be really bad TODO
        else{
          $.ajax({url: url_base + "/SettlersOfCarolina.php/Tiles/getAll",
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
          $.ajax({url: url_base + "/SettlersOfCarolina.php/Colleges/getAll",
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
          $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads/getAll",
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
          $.ajax({url: url_base + "/SettlersOfCarolina.php/Players/getAll",
            type:"GET",
            dataType: "json",
            async: false,
            success: function(players_array, status, jqXHR) {
              updatePlayers(players_array);
            },
            error: function(jqXHR, status, error) {
              console.log("Problem updating PLAYERS");
            }
          });
          var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
          $.ajax({url: url_base + "/SettlersOfCarolina.php/Turns",
            type:"GET",
            dataType: "json",
            success: function(turn, status, jqXHR) {
              if(turn % 4 == id){
                game.turn_number = turn;
                my_turn = true;
                turnChecks();
              }
              else if(game.turn_number+1==turn){
                game.turn_number++;
                rollOtherDice();
              }
              else if(turn == 0){
                //TODO more here
                alert("Game over!");
              }
              },
            error: function(jqXHR, status, error) {
              console.log("Problem waiting for turn");
            }
          });

          //to post we need to knwo the ID...

        }
      }, 100);
    }
  }
  // Initialize game
  // CAN DO WITH PARAMETERS AND HAVE EVERYONE START THE SAME GAME
  var tiles_array = [4, 1, 2, 17, 0, 5, 11, 7, 12, 9, 10, 15, 12, 13, 14, 8, 16, 3, 18];
  var dev_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  var game = new SettlersGame(tiles_array, dev_array);
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

  // Assign other players ids based on own id
  game.other_players[0].id = game.player.id + 1;
  if(game.other_players[0].id > 4){game.other_players[0].id -= 4;}
  game.other_players[1].id = game.player.id + 2;
  if(game.other_players[1].id > 4){game.other_players[0].id -= 4;}
  game.other_players[2].id = game.player.id + 3;
  if(game.other_players[2].id > 4){game.other_players[0].id -= 4;}

  game.registerEventHandler(SETTLERS_CONSTANTS.SETUP_TURN_EVENT, setupTurn);
  game.registerEventHandler(SETTLERS_CONSTANTS.ROBBER_EVENT, moveRobber);
  game.registerEventHandler(SETTLERS_CONSTANTS.TURN_CHANGE_EVENT, turnEnd);
  game.registerEventHandler(SETTLERS_CONSTANTS.DICE_ROLL_EVENT, diceRoll);
  drawBoard(false, false, false, false, false, 0);
  turnChecks();

};
