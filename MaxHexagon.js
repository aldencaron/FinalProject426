$(document).ready(function() {
  
  // Roll dice 
  var diceRoll = function(num_dice){
	var sum = 0;
	for(var i = 0; i < num_dice; i++){
		sum += (Math.floor(Math.random() * 6) + 1);
	}
	return sum;
  }
  
  // Tile objects
  var gameTile = function(image, type, number){
	this.image = image;
	this.type = type;
	this.number = number;
	this.x_coords = [];
	this.y_coords = [];
	// Add in location when it is assigned 
  }
  
  // Make one board object per game
  var gameBoard = function(){
	this.num_pieces = 19;  
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
	
	this.types = ["FIELD", "FIELD", "FIELD", "FIELD", "PAPER", "PAPER", "PAPER", "PAPER", 
	"MOUNTAIN", "MOUNTAIN", "MOUNTAIN", "BRICK", "BRICK", "BRICK", "PASTA", "PASTA", "PASTA", "PASTA", "DESERT"];
	
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
		tiles.push(new gameTile(tile_image, tile_type, tile_number));
	}
	this.tiles = tiles;
	
  }
  var board;

  // Set up random board  
  var drawBoard = function() {
	
	// Set up canvas
    var canvas = document.getElementById("board_canvas");
    canvas.style = "margin: 0 auto;";

    var num_sides = 6;
    var size = 60;
	var radius = 20;

    var width = Math.floor(Math.sqrt(3) * size * 5 + 1);
    canvas.width = width + 12;
    canvas.height = 515 + 16;

    x_initial = width / 2 - (Math.sqrt(3) * size) + 8;
    y_initial = 95;
    var ctx = canvas.getContext('2d');
	
	var border_color = "#000000";
	var text_fill_color = "#000000";
	var line_width = 8;
	
	var x_center, y_center;
	var x_centers = [];
	var y_centers = [];
	
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
		ctx.fillText(board.tiles[i].number, x_center, y_center);
	  }
	  
	  board.tiles[i].x_center = x_center;
	  board.tiles[i].y_center = y_center;
	}
		
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
	
	for(var i = 0; i < board.num_pieces; i++){
	  ctx.beginPath();
      ctx.moveTo(x_centers[i] + size * Math.sin(0), y_centers[i] + size * Math.cos(0));
	  board.tiles[i].x_coords[0] = x_centers[i] + size * Math.sin(0);
	  board.tiles[i].y_coords[0] = y_centers[i] + size * Math.cos(0); 

      for (var j = 1; j <= num_sides; j++) {
        ctx.lineTo(x_centers[i] + size * Math.sin(j * 2 * Math.PI / num_sides), y_centers[i] + size * Math.cos(j * 2 * Math.PI / num_sides));
		board.tiles[i].x_coords[j] = x_centers[i] + size * Math.sin(j * 2 * Math.PI / num_sides);
	    board.tiles[i].y_coords[j] = y_centers[i] + size * Math.cos(j * 2 * Math.PI / num_sides);
      }
	  
	  drawTile(x_centers[i], y_centers[i], i);
      
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
	alert("clicked the canvas yo");  
  })

});
