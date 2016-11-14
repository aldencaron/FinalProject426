$(document).ready(function() {
  
  // Set up random board
  var num_pieces = 19;
  var pieces_placement = [];
  
  for (var i = 0; i < num_pieces; i++){
	var random = Math.floor(Math.floor(Math.random() * num_pieces));
	while(pieces_placement[random] != null) {
		random = Math.floor(Math.floor(Math.random() * num_pieces));
	}	
	pieces_placement[random] = i;
  }
  
  var numbers_placement = [6, 5, 9, 4, 3, 8, 10, 6, 5, 9, 12, 3, 2, 10, 11, 11, 4, 8];
  
  var drawBoard = function() {
	
	// Set up canvas
    var canvas = document.createElement("canvas");
    canvas.style = "margin: 0 auto;";
    canvas.id = "canvas";

    var num_sides = 6;
    var size = 60;
	var radius = 20;

    var width = Math.floor(Math.sqrt(3) * size * 5 + 1);
    canvas.width = width + 12;
    canvas.height = 515;

    x_initial = width / 2 - (Math.sqrt(3) * size);
    y_initial = 95;
    var ctx = canvas.getContext('2d');
	
	var border_color = "#000000";
	var line_width = 8;
	
	var x_center, y_center;
	var used_pieces = 0;
	var used_numbers = 0;

    // Image filling patterns
    var pattern_field = ctx.createPattern(images[0], "repeat");
    var pattern_paper = ctx.createPattern(images[1], "repeat");
    var pattern_mountain = ctx.createPattern(images[2], "repeat");
    var pattern_brick = ctx.createPattern(images[3], "repeat");
    var pattern_pasta = ctx.createPattern(images[4], "repeat");
    var pattern_desert = ctx.createPattern(images[5], "repeat");

	// Need certain amounts of each pattern type
    var patterns = [pattern_field, pattern_field, pattern_field, pattern_field,
      pattern_paper, pattern_paper, pattern_paper, pattern_paper,
      pattern_mountain, pattern_mountain, pattern_mountain,
      pattern_brick, pattern_brick, pattern_brick,
      pattern_pasta, pattern_pasta, pattern_pasta, pattern_pasta,
      pattern_desert
    ];

    for (var x = 0; x < 3; x++) {

      x_center = x_initial + (Math.sqrt(3) * size * x);
      y_center = y_initial;

      ctx.beginPath();
      ctx.moveTo(x_center + size * Math.sin(0), y_center + size * Math.cos(0));

      for (var i = 1; i <= num_sides; i += 1) {
        ctx.lineTo(x_center + size * Math.sin(i * 2 * Math.PI / num_sides), y_center + size * Math.cos(i * 2 * Math.PI / num_sides));
      }
      ctx.strokeStyle = border_color;
      ctx.lineWidth = line_width;
      ctx.stroke();
      
	  ctx.fillStyle = patterns[pieces_placement[used_pieces]];
      ctx.fill();
	  
	  if(pieces_placement[used_pieces] != num_pieces - 1){
		ctx.beginPath();
        ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = border_color;
        ctx.stroke();    
		
		ctx.fillStyle = border_color;
		ctx.textBaseline = 'middle';
		ctx.textAlign = "center";
	    ctx.font = "bold 26px Arial";
		ctx.fillText(numbers_placement[used_numbers], x_center, y_center);
		used_numbers++;
	  }
	  
	  used_pieces++;
    }
    for (var x = 0; x < 4; x++) {
      x_center = x_initial - ((1 / 2) * Math.sqrt(3) * size) + (Math.sqrt(3) * size * x);
      y_center = y_initial + (3 / 2 * size);

      ctx.beginPath();
      ctx.moveTo(x_center + size * Math.sin(0), y_center + size * Math.cos(0));

      for (var i = 1; i <= num_sides; i += 1) {
        ctx.lineTo(x_center + size * Math.sin(i * 2 * Math.PI / num_sides), y_center + size * Math.cos(i * 2 * Math.PI / num_sides));
      }
      ctx.strokeStyle = border_color;
      ctx.lineWidth = line_width;
      ctx.stroke();
      
      ctx.fillStyle = patterns[pieces_placement[used_pieces]];
      ctx.fill();
	  
	  if(pieces_placement[used_pieces] != num_pieces - 1){
		ctx.beginPath();
        ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = border_color;
        ctx.stroke();    
		
		ctx.fillStyle = border_color;
		ctx.textBaseline = 'middle';
		ctx.textAlign = "center";
	    ctx.font = "bold 26px Arial";
		ctx.fillText(numbers_placement[used_numbers], x_center, y_center);
		used_numbers++;
	  }
	  
	  used_pieces++;
    }

    for (var x = 0; x < 5; x++) {
      x_center = x_initial - (Math.sqrt(3) * size) + (Math.sqrt(3) * size * x);
      y_center = y_initial + (3 * size);

      ctx.beginPath();
      ctx.moveTo(x_center + size * Math.sin(0), y_center + size * Math.cos(0));

      for (var i = 1; i <= num_sides; i += 1) {
        ctx.lineTo(x_center + size * Math.sin(i * 2 * Math.PI / num_sides), y_center + size * Math.cos(i * 2 * Math.PI / num_sides));
      }
      ctx.strokeStyle = border_color;
      ctx.lineWidth = line_width;
      ctx.stroke();
	  
	  ctx.fillStyle = patterns[pieces_placement[used_pieces]];
      ctx.fill();
	  
	  if(pieces_placement[used_pieces] != num_pieces - 1){
		ctx.beginPath();
        ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = border_color;
        ctx.stroke();    
		
		ctx.fillStyle = border_color;
		ctx.textBaseline = 'middle';
		ctx.textAlign = "center";
	    ctx.font = "bold 26px Arial";
		ctx.fillText(numbers_placement[used_numbers], x_center, y_center);
		used_numbers++;
	  }
	  
	  used_pieces++;
    }
    for (var x = 0; x < 4; x++) {
      x_center = x_initial - ((1 / 2) * Math.sqrt(3) * size) + (Math.sqrt(3) * size * x);
      y_center = y_initial + (3 * (3 / 2) * size);

      ctx.beginPath();
      ctx.moveTo(x_center + size * Math.sin(0), y_center + size * Math.cos(0));

      for (var i = 1; i <= num_sides; i += 1) {
        ctx.lineTo(x_center + size * Math.sin(i * 2 * Math.PI / num_sides), y_center + size * Math.cos(i * 2 * Math.PI / num_sides));
      }
      ctx.strokeStyle = border_color;
      ctx.lineWidth = line_width;
      ctx.stroke();
   
	  ctx.fillStyle = patterns[pieces_placement[used_pieces]];
      ctx.fill();
	  
	  if(pieces_placement[used_pieces] != num_pieces - 1){
		ctx.beginPath();
        ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = border_color;
        ctx.stroke();    
		
		ctx.fillStyle = border_color;
		ctx.textBaseline = 'middle';
		ctx.textAlign = "center";
	    ctx.font = "bold 26px Arial";
		ctx.fillText(numbers_placement[used_numbers], x_center, y_center);
		used_numbers++;
	  }
	  
	  used_pieces++;
    }

    for (var x = 0; x < 3; x++) {
      x_center = x_initial + (Math.sqrt(3) * size * x);
      y_center = y_initial + (6 * size);

      ctx.beginPath();
      ctx.moveTo(x_center + size * Math.sin(0), y_center + size * Math.cos(0));

      for (var i = 1; i <= num_sides; i += 1) {
        ctx.lineTo(x_center + size * Math.sin(i * 2 * Math.PI / num_sides), y_center + size * Math.cos(i * 2 * Math.PI / num_sides));
      }
      ctx.strokeStyle = border_color;
      ctx.lineWidth = line_width;
      ctx.stroke();
      
	  ctx.fillStyle = patterns[pieces_placement[used_pieces]];
      ctx.fill();
	  
	  if(pieces_placement[used_pieces] != num_pieces - 1){
		ctx.beginPath();
        ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = border_color;
        ctx.stroke();    
		
		ctx.fillStyle = border_color;
		ctx.textBaseline = 'middle';
		ctx.textAlign = "center";
	    ctx.font = "bold 26px Arial";
		ctx.fillText(numbers_placement[used_numbers], x_center, y_center);
		used_numbers++;
	  }
	  
	  used_pieces++;

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
        drawBoard();
      }
    };
    images.push(image);
  }

});
