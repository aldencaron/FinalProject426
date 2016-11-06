$( document ).ready(function() {
  // hexagon
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
}

  document.getElementById("board").append(canvas);

});
