$(document).ready(function() {

  var size = 60;
  var width = Math.floor(Math.sqrt(3) * size * 5 + 1);
  var x_initial = width / 2 - (Math.sqrt(3) * size) + 8;
  var y_initial = 98;
  var num_sides = 6;
  var board;

  // Draw board
  var drawAvailableBoard = function() {
    // Set up canvas
    var canvas = document.getElementById("board_canvas");
    canvas.style = "margin: 0 auto;";

    var radius = 20;

    canvas.width = width + 20;
    canvas.height = 515 + 20;

    var ctx = canvas.getContext('2d');

    var drawTile = function(x_center, y_center) {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.fillStyle = ctx.createPattern(game.tiles[i].image, "repeat");
      ctx.fill();

      if (game.tiles[i].number != 0) {
        ctx.beginPath();
        ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.font = "bold 26px Arial";
        ctx.fillText(game.tiles[i].number, game.tiles[i].x_center, game.tiles[i].y_center);
      }
    }

    // Draw on tiles
    for (var i = 0; i < game.num_pieces; i++) {
      ctx.beginPath();
      ctx.moveTo(game.tiles[i].x_coords[0], game.tiles[i].y_coords[0]);
      for (var j = 1; j <= num_sides; j++) {
        ctx.lineTo(game.tiles[i].x_coords[j], game.tiles[i].y_coords[j]);
      }
      drawTile(game.tiles[i].x_center, game.tiles[i].y_center, i);

    }
    // Draw on possible colleges, add check for available, add check for whether to draw or not TODO
    for (var i = 0; i < game.num_colleges; i++) {
      if (game.colleges[i].available || game.colleges[i].used) {
        ctx.beginPath();
        ctx.arc(game.colleges[i].x, game.colleges[i].y, game.colleges[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'gray';
        if(game.colleges[i].used){ctx.fillStyle = game.colleges[i].player.color;}
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }

    // Draw on possible roads, add check for available TODO
    for (var i = 0; i < game.num_roads; i++) {
      if (game.roads[i].used || game.roads[i].available) {
        ctx.beginPath();
        ctx.arc((game.roads[i].start_x + game.roads[i].end_x) / 2, (game.roads[i].start_y + game.roads[i].end_y) / 2,
        game.roads[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'gray';
        if(game.roads[i].used){ctx.fillStyle = game.roads[i].player.color;}
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }

    document.getElementById("board").append(canvas);


  };

  /*var board_canvas = document.getElementById("board_canvas");
  board_canvas.addEventListener('mousedown', function(e) {
    var rect = board_canvas.getBoundingClientRect();
    var x = (((e.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((e.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));


    // Check hexagons
    for (var i = 0; i < game.num_pieces; i++) {
      if (game.checkLeft(game.tiles[i].x_coords[4], x)
      && game.checkRight(game.tiles[i].x_coords[1], x)
      && game.checkTopLeft(game.tiles[i].x_coords[5], game.tiles[i].y_coords[5], game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], x, y)
      && game.checkTopRight(game.tiles[i].x_coords[0], game.tiles[i].y_coords[0], game.tiles[i].x_coords[1], game.tiles[i].y_coords[1], x, y)
      && game.checkBottomLeft(game.tiles[i].x_coords[2], game.tiles[i].y_coords[2], game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], x, y)
      && game.checkBottomRight(game.tiles[i].x_coords[3], game.tiles[i].y_coords[3], game.tiles[i].x_coords[4], game.tiles[i].y_coords[4], x, y)) {
        alert(game.tiles[i].type + ", " + game.tiles[i].number);
        break;
      }
    }

  })*/

  var addCollege = function(event) {
    var found = false;
    var rect = board_canvas.getBoundingClientRect();
    var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

    // Check colleges
    for (var i = 0; i < game.num_colleges; i++) {
      // TODO add in an if statement to check if on the game -- available here only works for first
      if(game.colleges[i].available){
        if (game.pointDistance(x, y, game.colleges[i].x, game.colleges[i].y) <= game.colleges[i].radius) {
          found = true;
          game.colleges[i].used = true;
          game.colleges[i].available = false;
          game.player.colleges.push(game.colleges[i]);
          game.colleges[i].player = game.player;
          for(var j = 0; j < game.num_roads; j++){
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
            drawAvailableBoard();
          }
        }
      }
    }
    if(found){
      board_canvas.removeEventListener('mousedown', addCollege);
    }
  };
  var addRoad = function() {
    var found = false;
    var rect = board_canvas.getBoundingClientRect();
    var x = (((event.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((event.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

    // Check roads
    for (var i = 0; i < game.num_roads; i++) {
      if(game.roads[i].available){
        if (game.pointDistance(x, y, game.roads[i].x_center, game.roads[i].y_center) <= game.roads[i].radius) {
          found = true;
          game.roads[i].used = true;
          game.roads[i].available = false;
          game.player.roads.push(game.roads[i]);
          game.roads[i].player = game.player;
          //TODO add new available colleges as we come
          game.roads[i].radius = 12;
          drawAvailableBoard();
        }
      }
    }
    if(found){
      board_canvas.removeEventListener('mousedown', addRoad);
    }
  };
  var firstTurn = function() {
    var board_canvas = document.getElementById("board_canvas");
    board_canvas.addEventListener('mousedown', addCollege);
    board_canvas.addEventListener('mousedown', addRoad);
  };

  var game = new SettlersGame();
  game.startGame();
  drawAvailableBoard();
  firstTurn();
});
