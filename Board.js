$(document).ready(function() {

  var size = 60;
  var width = Math.floor(Math.sqrt(3) * size * 5 + 1);
  var x_initial = width / 2 - (Math.sqrt(3) * size) + 8;
  var y_initial = 98;
  var num_sides = 6;
  var board;

  // Helper methods
  var pointDistance = function(a1, a2, b1, b2) {
    return (Math.sqrt((Math.pow(a1 - b1, 2)) + Math.pow(a2 - b2, 2)));
  }
  var checkTopLeft = function(a1, a2, b1, b2, c1, c2) {
    var m = (b2 - a2) / (b1 - a1);
    var b = a2 - m * a1;
    return (c2 <= (m * c1 + b));
  }
  var checkTopRight = function(a1, a2, b1, b2, c1, c2) {
    var m = (b2 - a2) / (b1 - a1);
    var b = a2 - m * a1;
    return (c2 <= (m * c1 + b));
  }
  var checkBottomLeft = function(a1, a2, b1, b2, c1, c2) {
    var m = (b2 - a2) / (b1 - a1);
    var b = a2 - m * a1;
    return (c2 >= (m * c1 + b));
  }
  var checkBottomRight = function(a1, a2, b1, b2, c1, c2) {
    var m = (b2 - a2) / (b1 - a1);
    var b = a2 - m * a1;
    return (c2 >= (m * c1 + b));
  }
  var checkLeft = function(x0, x1) {
    return (x1 >= x0);
  }
  var checkRight = function(x0, x1) {
    return (x1 <= x0);
  }

  // Draw board  
  var drawBoard = function() {

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

      ctx.fillStyle = ctx.createPattern(board.tiles[i].image, "repeat");
      ctx.fill();

      if (board.tiles[i].number != 0) {
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
        ctx.fillText(board.tiles[i].number, board.tiles[i].x_center, board.tiles[i].y_center);
      }
    }

    // Draw on tiles 
    for (var i = 0; i < board.num_pieces; i++) {
      ctx.beginPath();
      ctx.moveTo(board.tiles[i].x_coords[0], board.tiles[i].y_coords[0]);
      for (var j = 1; j <= num_sides; j++) {
        ctx.lineTo(board.tiles[i].x_coords[j], board.tiles[i].y_coords[j]);
      }
      drawTile(board.tiles[i].x_center, board.tiles[i].y_center, i);

    }
    // Draw on possible colleges, add check for available, add check for whether to draw or not TODO 
    for (var i = 0; i < board.num_colleges; i++) {
      if (board.colleges[i].used || board.colleges[i].available) {
        ctx.beginPath();
        ctx.arc(board.colleges[i].x, board.colleges[i].y, board.colleges[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = board.colleges[i].color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }

    // Draw on possible roads, add check for available TODO 
    for (var i = 0; i < board.num_roads; i++) {
      if (board.roads[i].used || board.roads[i].available) {
        ctx.beginPath();
        ctx.arc((board.roads[i].start_x + board.roads[i].end_x) / 2, (board.roads[i].start_y + board.roads[i].end_y) / 2,
          board.roads[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = board.roads[i].color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }

    document.getElementById("board").append(canvas);


  };

  var board_canvas = document.getElementById("board_canvas");
  board_canvas.addEventListener('mousedown', function(e) {
    var rect = board_canvas.getBoundingClientRect();
    var x = (((e.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((e.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

    // Check colleges
    /*for (var i = 0; i < board.num_colleges; i++) {
      // TODO add in an if statement to check if on the board
      // TODO alerts undefined here fix this please 
      if (pointDistance(x, y, board.colleges[i].x, board.colleges[i].y) <= board.colleges[i].radius) {
        for (var j = 0; j < board.colleges[i].tiles.length; j++) {
          alert(board.colleges[i].tiles[j].type);
          board.colleges[i].used = true;
          board.colleges[i].available = false;
          //TODO mark other unavailable 
          board.colleges[i].color = "red";
          board.colleges[i].radius = 10;
          drawBoard();
        }
      }
    }*/

    // Check hexagons
    for (var i = 0; i < board.num_pieces; i++) {
      if (checkLeft(board.tiles[i].x_coords[4], x) 
		&& checkRight(board.tiles[i].x_coords[1], x) 
		&& checkTopLeft(board.tiles[i].x_coords[5], board.tiles[i].y_coords[5], board.tiles[i].x_coords[0], board.tiles[i].y_coords[0], x, y) 
	    && checkTopRight(board.tiles[i].x_coords[0], board.tiles[i].y_coords[0], board.tiles[i].x_coords[1], board.tiles[i].y_coords[1], x, y) 
	    && checkBottomLeft(board.tiles[i].x_coords[2], board.tiles[i].y_coords[2], board.tiles[i].x_coords[3], board.tiles[i].y_coords[3], x, y) 
	    && checkBottomRight(board.tiles[i].x_coords[3], board.tiles[i].y_coords[3], board.tiles[i].x_coords[4], board.tiles[i].y_coords[4], x, y)) {
        alert(board.tiles[i].type + ", " + board.tiles[i].number);
        break;
      }
    }

  })
  
  //TODO something is not correct here 
   var setupColleges = function() {
	var board_canvas = document.getElementById("board_canvas");
	board_canvas.addEventListener('mousedown', function(e) {
    var rect = board_canvas.getBoundingClientRect();
    var x = (((e.clientX - rect.left) / (rect.right - rect.left) * board_canvas.width));
    var y = (((e.clientY - rect.top) / (rect.bottom - rect.top) * board_canvas.height));

	// Check colleges
	for (var i = 0; i < board.num_colleges; i++) {
	  // TODO add in an if statement to check if on the board
	  // TODO alerts undefined here fix this please 
	  if (pointDistance(x, y, board.colleges[i].x, board.colleges[i].y) <= board.colleges[i].radius) {
		for (var j = 0; j < board.colleges[i].tiles.length; j++) {
		  alert(board.colleges[i].tiles[j].type);
		  board.colleges[i].used = true;
		  board.colleges[i].available = false;
		  //TODO mark other unavailable 
		  board.colleges[i].color = "red";
		  board.colleges[i].radius = 10;
		  drawBoard();
		}
	  }
	}
   })
  };

  board = new gameBoard();
  drawBoard();
  setupColleges();
});
