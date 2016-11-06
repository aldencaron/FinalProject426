$( document ).ready(function() {
  // hexagon
var canvas = document.createElement("canvas");
canvas.style.margins="200 auto";
canvas.id = "canvas";
canvas.width="1000";
canvas.height="1000";
var cxt= canvas.getContext('2d');
for( var x=0; x<3; x++){
  var numberOfSides = 6,
      size = 20,
      Xcenter = 200+(Math.sqrt(3)*size*x),
      Ycenter = 100;

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
  var numberOfSides = 6,
      size = 20,
      Xcenter = 200-((1/2)*Math.sqrt(3)*size)+(Math.sqrt(3)*size*x);
      Ycenter = 100+ (3/2*size);

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
  var numberOfSides = 6,
      size = 20,
      Xcenter = 200-(Math.sqrt(3)*size)+(Math.sqrt(3)*size*x);
      Ycenter = 100+ (3*size);

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
  var numberOfSides = 6,
      size = 20,
      Xcenter = 200-((1/2)*Math.sqrt(3)*size)+(Math.sqrt(3)*size*x);
      Ycenter = 100+ (3*(3/2)*size);

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
  var numberOfSides = 6,
      size = 20,
      Xcenter = 200+(Math.sqrt(3)*size*x),
      Ycenter = 100+ (6*size);

  cxt.beginPath();
  cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));

  for (var i = 1; i <= numberOfSides;i += 1) {
      cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
  }
  cxt.strokeStyle = "#000000";
  cxt.lineWidth = 1;
  cxt.stroke();
}

  document.body.appendChild(canvas);

});
