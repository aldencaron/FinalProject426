$(document).ready(function() {
  
  var size = 60;
  var width = Math.floor(Math.sqrt(3) * size * 5 + 1);
  var x_initial = width / 2 - (Math.sqrt(3) * size) + 8;
  var y_initial = 98;
  var num_sides = 6;
  
  // Roll dice 
  var diceRoll = function(num_dice){
	var sum = 0;
	for(var i = 0; i < num_dice; i++){
		sum += (Math.floor(Math.random() * 6) + 1);
	}
	return sum;
  }
  
  // college objects
  var gameCollege = function(x, y, tiles){
	this.x = x;
	this.y = y;
	this.tiles = tiles;
	this.used = false;
	this.available = true;
	// Add player when assigned 	  
  }
  
  // Tile objects
  var gameTile = function(image, type, number){
	this.image = image;
	this.type = type;
	this.number = number;
	this.x_coords = [];
	this.y_coords = [];
	this.colleges = [];
	// Add in location when it is assigned 
	// Add in colleges as it goes
  }
  
  // Make one board object per game
  var gameBoard = function(){
	this.num_pieces = 19;  
	this.num_colleges = 54;
	var pieces_placement = [];
  
    for (var i = 0; i < this.num_pieces; i++){
	  var random = Math.floor(Math.random() * this.num_pieces);
	  while(pieces_placement[random] != null) {
		random = Math.floor(Math.random() * this.num_pieces);
	  }	
	  pieces_placement[random] = i;
    }
	
	this.pieces_placement = pieces_placement;
	this.numbers_placement = [6, 5, 9, 4, 3, 8, 10, 6, 5, 9, 12, 3, 2, 10, 11, 11, 4, 8];
	

	// Need certain amounts of each pattern type
    this.pieces = [images[0], images[0], images[0], images[0],
      images[1], images[1], images[1], images[1],
      images[2], images[2], images[2],
      images[3], images[3], images[3],
      images[4], images[4], images[4], images[4],
      images[5]
    ];
	
	// Set up tile types 
	this.types = ["FIELD", "FIELD", "FIELD", "FIELD", "PAPER", "PAPER", "PAPER", "PAPER", 
	"MOUNTAIN", "MOUNTAIN", "MOUNTAIN", "BRICK", "BRICK", "BRICK", "PASTA", "PASTA", "PASTA", "PASTA", "DESERT"];
	
	// Set up tile coordinates 
	var x_center, y_center;
	var x_centers = [];
	var y_centers = [];
	
	for(var x = 0; x < 3; x++) {
	  x_centers.push(x_initial + (Math.sqrt(3) * size * x));
      y_centers.push(y_initial);
	}
	for(var x = 0; x < 4; x++) {
	  x_centers.push(x_initial - ((1 / 2) * Math.sqrt(3) * size) + (Math.sqrt(3) * size * x));
	  y_centers.push(y_initial + (3 / 2 * size));
	}
	for(var x = 0; x < 5; x++) {
	  x_centers.push(x_initial - (Math.sqrt(3) * size) + (Math.sqrt(3) * size * x));
      y_centers.push(y_initial + (3 * size));	
	}
	for(var x = 0; x < 4; x++) {
	  x_centers.push(x_initial - ((1 / 2) * Math.sqrt(3) * size) + (Math.sqrt(3) * size * x));
	  y_centers.push(y_initial + (3 * (3 / 2) * size));
	}
	for(var x = 0; x < 3; x++) {
	  x_centers.push(x_initial + (Math.sqrt(3) * size * x));
	  y_centers.push(y_initial + (6 * size));
	}
	
	var tiles = []; 
	for(var i = 0; i < this.num_pieces; i++){
		var tile_image = this.pieces[this.pieces_placement[i]];
		var tile_type = this.types[this.pieces_placement[i]];
		
		var tile_number;
		if(tile_type == "DESERT"){
			tile_number = 0;
			this.numbers_placement.splice(i, 0, 0);
		}
		else{
			tile_number = this.numbers_placement[i];
		}
		var new_tile = new gameTile(tile_image, tile_type, tile_number)
		tiles.push(new_tile);
		new_tile.x_center = x_centers[i];
		new_tile.y_center = y_centers[i];
		new_tile.x_coords[0] = new_tile.x_center + size * Math.sin(0);
	    new_tile.y_coords[0] = new_tile.y_center + size * Math.cos(0); 
		for (var j = 1; j <= num_sides; j++) {
			new_tile.x_coords[j] = new_tile.x_center + size * Math.sin(j * 2 * Math.PI / num_sides);
			new_tile.y_coords[j] = new_tile.y_center + size * Math.cos(j * 2 * Math.PI / num_sides);
        }
	}
	this.tiles = tiles;
	
	var colleges = []
	colleges.push(new gameCollege(this.tiles[0].x_coords[3], this.tiles[0].y_coords[3], [this.tiles[0]]));
	colleges.push(new gameCollege(this.tiles[1].x_coords[3], this.tiles[1].y_coords[3], [this.tiles[1]]));
	colleges.push(new gameCollege(this.tiles[2].x_coords[3], this.tiles[2].y_coords[3], [this.tiles[2]]));
	
	colleges.push(new gameCollege(this.tiles[0].x_coords[5], this.tiles[0].y_coords[5], [this.tiles[0]]));
	colleges.push(new gameCollege(this.tiles[1].x_coords[5], this.tiles[1].y_coords[5], [this.tiles[0], this.tiles[1]]));
	colleges.push(new gameCollege(this.tiles[2].x_coords[5], this.tiles[2].y_coords[5], [this.tiles[1], this.tiles[2]]));
	colleges.push(new gameCollege(this.tiles[2].x_coords[1], this.tiles[2].y_coords[1], [this.tiles[2]]));
	
	colleges.push(new gameCollege(this.tiles[0].x_coords[4], this.tiles[0].y_coords[4], [this.tiles[0], this.tiles[3]]));
	colleges.push(new gameCollege(this.tiles[1].x_coords[4], this.tiles[1].y_coords[4], [this.tiles[0], this.tiles[1], this.tiles[4]]));
	colleges.push(new gameCollege(this.tiles[2].x_coords[4], this.tiles[2].y_coords[4], [this.tiles[1], this.tiles[2], this.tiles[5]]));
	colleges.push(new gameCollege(this.tiles[2].x_coords[2], this.tiles[2].y_coords[2], [this.tiles[2], this.tiles[6]]));
	
	colleges.push(new gameCollege(this.tiles[3].x_coords[5], this.tiles[3].y_coords[5], [this.tiles[3]]));
	colleges.push(new gameCollege(this.tiles[4].x_coords[5], this.tiles[4].y_coords[5], [this.tiles[0], this.tiles[3], this.tiles[4]]));
	colleges.push(new gameCollege(this.tiles[5].x_coords[5], this.tiles[5].y_coords[5], [this.tiles[1], this.tiles[4], this.tiles[5]]));
	colleges.push(new gameCollege(this.tiles[6].x_coords[5], this.tiles[6].y_coords[5], [this.tiles[2], this.tiles[5], this.tiles[6]]));
	colleges.push(new gameCollege(this.tiles[6].x_coords[1], this.tiles[6].y_coords[1], [this.tiles[6]]));
	
	colleges.push(new gameCollege(this.tiles[3].x_coords[4], this.tiles[3].y_coords[4], [this.tiles[3], this.tiles[7]]));
	colleges.push(new gameCollege(this.tiles[4].x_coords[4], this.tiles[4].y_coords[4], [this.tiles[3], this.tiles[4], this.tiles[8]]));
	colleges.push(new gameCollege(this.tiles[5].x_coords[4], this.tiles[5].y_coords[4], [this.tiles[4], this.tiles[5], this.tiles[9]]));
	colleges.push(new gameCollege(this.tiles[6].x_coords[4], this.tiles[6].y_coords[4], [this.tiles[5], this.tiles[6], this.tiles[10]]));
	colleges.push(new gameCollege(this.tiles[6].x_coords[2], this.tiles[6].y_coords[2], [this.tiles[6], this.tiles[11]]));
	
	colleges.push(new gameCollege(this.tiles[7].x_coords[5], this.tiles[7].y_coords[5], [this.tiles[7]]));
	colleges.push(new gameCollege(this.tiles[8].x_coords[5], this.tiles[8].y_coords[5], [this.tiles[3], this.tiles[7], this.tiles[8]]));
	colleges.push(new gameCollege(this.tiles[9].x_coords[5], this.tiles[9].y_coords[5], [this.tiles[4], this.tiles[8], this.tiles[9]]));
	colleges.push(new gameCollege(this.tiles[10].x_coords[5], this.tiles[10].y_coords[5], [this.tiles[5], this.tiles[9], this.tiles[10]]));
	colleges.push(new gameCollege(this.tiles[11].x_coords[5], this.tiles[11].y_coords[5], [this.tiles[6], this.tiles[10], this.tiles[11]]));
	colleges.push(new gameCollege(this.tiles[11].x_coords[1], this.tiles[11].y_coords[1], [this.tiles[11]]));

	colleges.push(new gameCollege(this.tiles[7].x_coords[4], this.tiles[7].y_coords[4], [this.tiles[7]]));
	colleges.push(new gameCollege(this.tiles[8].x_coords[4], this.tiles[8].y_coords[4], [this.tiles[7], this.tiles[8], this.tiles[11]]));
	colleges.push(new gameCollege(this.tiles[9].x_coords[4], this.tiles[9].y_coords[4], [this.tiles[8], this.tiles[9], this.tiles[13]]));
	colleges.push(new gameCollege(this.tiles[10].x_coords[4], this.tiles[10].y_coords[4], [this.tiles[9], this.tiles[10], this.tiles[14]]));
	colleges.push(new gameCollege(this.tiles[11].x_coords[4], this.tiles[11].y_coords[4], [this.tiles[10], this.tiles[11], this.tiles[15]]));
	colleges.push(new gameCollege(this.tiles[11].x_coords[2], this.tiles[11].y_coords[2], [this.tiles[11]]));
	
	colleges.push(new gameCollege(this.tiles[12].x_coords[5], this.tiles[12].y_coords[5], [this.tiles[7], this.tiles[12]]));
	colleges.push(new gameCollege(this.tiles[13].x_coords[5], this.tiles[13].y_coords[5], [this.tiles[8], this.tiles[12], this.tiles[13]]));
	colleges.push(new gameCollege(this.tiles[14].x_coords[5], this.tiles[14].y_coords[5], [this.tiles[9], this.tiles[13], this.tiles[14]]));
	colleges.push(new gameCollege(this.tiles[15].x_coords[5], this.tiles[15].y_coords[5], [this.tiles[10], this.tiles[14], this.tiles[15]]));
	colleges.push(new gameCollege(this.tiles[15].x_coords[1], this.tiles[15].y_coords[1], [this.tiles[11], this.tiles[15]]));
	
	colleges.push(new gameCollege(this.tiles[12].x_coords[4], this.tiles[12].y_coords[4], [this.tiles[12]]));
	colleges.push(new gameCollege(this.tiles[13].x_coords[4], this.tiles[13].y_coords[4], [this.tiles[12], this.tiles[13], this.tiles[16]]));
	colleges.push(new gameCollege(this.tiles[14].x_coords[4], this.tiles[14].y_coords[4], [this.tiles[13], this.tiles[14], this.tiles[17]]));
	colleges.push(new gameCollege(this.tiles[15].x_coords[4], this.tiles[15].y_coords[4], [this.tiles[14], this.tiles[15], this.tiles[18]]));
	colleges.push(new gameCollege(this.tiles[15].x_coords[2], this.tiles[15].y_coords[2], [this.tiles[15]]));
	
	colleges.push(new gameCollege(this.tiles[16].x_coords[5], this.tiles[16].y_coords[5], [this.tiles[12], this.tiles[16]]));
	colleges.push(new gameCollege(this.tiles[17].x_coords[5], this.tiles[17].y_coords[5], [this.tiles[13], this.tiles[16], this.tiles[17]]));
	colleges.push(new gameCollege(this.tiles[18].x_coords[5], this.tiles[18].y_coords[5], [this.tiles[14], this.tiles[17], this.tiles[18]]));
	colleges.push(new gameCollege(this.tiles[18].x_coords[1], this.tiles[18].y_coords[1], [this.tiles[15], this.tiles[18]]));
	
	colleges.push(new gameCollege(this.tiles[16].x_coords[4], this.tiles[16].y_coords[4], [this.tiles[16]]));
	colleges.push(new gameCollege(this.tiles[17].x_coords[4], this.tiles[17].y_coords[4], [this.tiles[16], this.tiles[17]]));
	colleges.push(new gameCollege(this.tiles[18].x_coords[4], this.tiles[18].y_coords[4], [this.tiles[17], this.tiles[18]]));
	colleges.push(new gameCollege(this.tiles[18].x_coords[2], this.tiles[18].y_coords[2], [this.tiles[18]]));
	
	colleges.push(new gameCollege(this.tiles[16].x_coords[0], this.tiles[16].y_coords[0], [this.tiles[16]]));
	colleges.push(new gameCollege(this.tiles[17].x_coords[0], this.tiles[17].y_coords[0], [this.tiles[17]]));
	colleges.push(new gameCollege(this.tiles[18].x_coords[0], this.tiles[18].y_coords[0], [this.tiles[18]]));
	
	this.colleges = colleges;
	
  }
  var board;


  // Draw board  
  var drawBoard = function() {
	
	// Set up canvas
    var canvas = document.getElementById("board_canvas");
    canvas.style = "margin: 0 auto;";
 
	var radius = 20;

    canvas.width = width + 20;
    canvas.height = 515 + 20;

    var ctx = canvas.getContext('2d');
	
	var border_color = "#000000";
	var text_fill_color = "#000000";
	var line_width = 8;
	
	var drawTile = function(x_center, y_center){
	  ctx.strokeStyle = border_color;
      ctx.lineWidth = line_width;
      ctx.stroke();
      
	  ctx.fillStyle = ctx.createPattern(board.tiles[i].image, "repeat");
      ctx.fill();
	  
	  if(board.tiles[i].number != 0){
		ctx.beginPath();
        ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = border_color;
        ctx.stroke();    
		
		ctx.fillStyle = text_fill_color;
		ctx.textBaseline = 'middle';
		ctx.textAlign = "center";
	    ctx.font = "bold 26px Arial";
		ctx.fillText(board.tiles[i].number, board.tiles[i].x_center, board.tiles[i].y_center);
	  }
	}
		
	for(var i = 0; i < board.num_pieces; i++){
	  ctx.beginPath();
      ctx.moveTo(board.tiles[i].x_coords[0], board.tiles[i].y_coords[0]);
      for (var j = 1; j <= num_sides; j++) {
        ctx.lineTo(board.tiles[i].x_coords[j], board.tiles[i].y_coords[j]);
      }
	  drawTile(board.tiles[i].x_center, board.tiles[i].y_center, i);
      
    }
	// Draw on possible colleges, add check for available, add check for whether to draw or not TODO 
	for(var i = 0; i < board.num_colleges; i++){
		ctx.beginPath();
        ctx.arc(board.colleges[i].x, board.colleges[i].y, 8, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = border_color;
        ctx.stroke();
	}

    document.getElementById("board").append(canvas);
	

  };

  // Load all images first 
  var loadedImagesNum = 0;
  var imageNames = ["field.jpg", "paper.jpg", "mountain.jpg", "brickwall.jpg", "pasta.jpg", "desert.jpg"];
  var images = [];
  for (var i = 0; i < imageNames.length; i++) {
    var image = new Image();
    image.src = imageNames[i];
    image.onload = function() {
      loadedImagesNum++;
      if (loadedImagesNum >= imageNames.length) {
        board = new gameBoard();
		drawBoard();
      }
    };
    images.push(image);
  }
  
  var board_canvas = document.getElementById("board_canvas");
  board_canvas.addEventListener('mousedown', function(e){
	var rect = board_canvas.getBoundingClientRect();
	var x = (((e.clientX - rect.left)/(rect.right - rect.left) * board_canvas.width));
	var y = (((e.clientY - rect.top)/(rect.bottom - rect.top) * board_canvas.height));
	
	var checkTopLeft = function(a1, a2, b1, b2, c1, c2) {
		var m = (b2 - a2)/(b1 - a1);
		var b = a2 - m * a1;
		return (c2 <= (m * c1 + b));
	}
	var checkTopRight = function(a1, a2, b1, b2, c1, c2) {
		var m = (b2 - a2)/(b1 - a1);
		var b = a2 - m * a1;
		return (c2 <= (m * c1 + b));	
	}
	var checkBottomLeft = function(a1, a2, b1, b2, c1, c2) {
		var m = (b2 - a2)/(b1 - a1);
		var b = a2 - m * a1;
		return (c2 >= (m * c1 + b));	
	}
	var checkBottomRight = function(a1, a2, b1, b2, c1, c2) {
		var m = (b2 - a2)/(b1 - a1);
		var b = a2 - m * a1;
		return (c2 >= (m * c1 + b));	
	}
	var checkLeft = function(x0, x1) {
		return (x1 >= x0);
	}
	var checkRight = function(x0, x1) {
		return (x1 <= x0);
	}
	
	for(var i = 0; i < board.num_pieces; i++){
		if(checkLeft(board.tiles[i].x_coords[4], x) 
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

});
