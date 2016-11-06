$( document ).ready(function() {
  // hexagon
  
var drawBoard = function(){  
  
var canvas = document.createElement("canvas");
canvas.style = "margin: 0 auto;";
canvas.id = "canvas";

var numberOfSides = 6;
var size = 60;

var width = Math.floor(Math.sqrt(3)*size*5 + 1);
canvas.width = width;
canvas.height="515";

Xinitial = width/2 - (Math.sqrt(3) * size);
Yinitial = 95;
var cxt= canvas.getContext('2d');

var pattern_field = cxt.createPattern(images[0], "repeat");
var pattern_paper = cxt.createPattern(images[1], "repeat");
var pattern_mountain = cxt.createPattern(images[2], "repeat");
var pattern_brick = cxt.createPattern(images[3], "repeat");
var pattern_pasta = cxt.createPattern(images[4], "repeat");
var patterns = [pattern_field, pattern_paper, pattern_mountain, pattern_brick, pattern_pasta];
for( var x=0; x<3; x++){
  
  var Xcenter = Xinitial+(Math.sqrt(3)*size*x),
      Ycenter = Yinitial;

  cxt.beginPath();
  cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));

  for (var i = 1; i <= numberOfSides;i += 1) {
      cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
  }
  cxt.strokeStyle = "#000000";
  cxt.lineWidth = 1;
  cxt.stroke();  
  cxt.fillStyle = patterns[Math.floor(Math.random() * 5)];
  cxt.fill();
}
for( var x=0; x<4; x++){
  var Xcenter = Xinitial-((1/2)*Math.sqrt(3)*size)+(Math.sqrt(3)*size*x);
      Ycenter = Yinitial+ (3/2*size);

  cxt.beginPath();
  cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));

  for (var i = 1; i <= numberOfSides;i += 1) {
      cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
  }
  cxt.strokeStyle = "#000000";
  cxt.lineWidth = 1;
  cxt.stroke();
  cxt.fillStyle = patterns[Math.floor(Math.random() * 5)];
  cxt.fill();
}

for( var x=0; x<5; x++){
  var Xcenter = Xinitial-(Math.sqrt(3)*size)+(Math.sqrt(3)*size*x);
      Ycenter = Yinitial+ (3*size);

  cxt.beginPath();
  cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));

  for (var i = 1; i <= numberOfSides;i += 1) {
      cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
  }
  cxt.strokeStyle = "#000000";
  cxt.lineWidth = 1;
  cxt.stroke();
  cxt.fillStyle = patterns[Math.floor(Math.random() * 5)];
  cxt.fill();
}
for( var x=0; x<4; x++){
  var Xcenter = Xinitial-((1/2)*Math.sqrt(3)*size)+(Math.sqrt(3)*size*x);
      Ycenter = Yinitial+ (3*(3/2)*size);

  cxt.beginPath();
  cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));

  for (var i = 1; i <= numberOfSides;i += 1) {
      cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
  }
  cxt.strokeStyle = "#000000";
  cxt.lineWidth = 1;
  cxt.stroke();
  cxt.fillStyle = patterns[Math.floor(Math.random() * 5)];
  cxt.fill();
}

for( var x=0; x<3; x++){
  var Xcenter = Xinitial+(Math.sqrt(3)*size*x),
      Ycenter = Yinitial+ (6*size);

  cxt.beginPath();
  cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));

  for (var i = 1; i <= numberOfSides;i += 1) {
      cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
  }
  cxt.strokeStyle = "#000000";
  cxt.lineWidth = 1;
  cxt.stroke();
  cxt.fillStyle = patterns[Math.floor(Math.random() * 5)];
  cxt.fill();

}

  document.getElementById("board").append(canvas);

};

 var loadedImagesNum = 0;
 var imageNames = ["field.jpg", "paper.jpg", "mountain.jpeg", "brickwall.jpg", "pasta.jpg"];
 var images = [];
 for(var i = 0; i < imageNames.length; i++){
	var image = new Image();
	image.src = imageNames[i];
	image.onload = function () {
		loadedImagesNum++;
		if(loadedImagesNum >= imageNames.length){
			drawBoard();
		}
    };
	images.push(image);
 }

});
