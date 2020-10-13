var options = ["$100", "$10", "$25", "$250", "$30", "$1000", "$1", "$200", "$45", "$500", "$5", "$20", "Lose", "$1000000", "Lose", "$350", "$5", "$99"];

loadJSON(function (response) {
  // Parse JSON string into object
  var actual_JSON = JSON.parse(response);
});

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

// function byte2Hex(n) {
//   var nybHexString = "0123456789ABCDEF";
//   return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
// }

// function getColor(item, maxitem) {
//   var phase = 0;
//   var center = 128;
//   var width = 127;
//   var frequency = Math.PI * 2 / maxitem;

//   return RGB2Color(red, green, blue);
// }

// function drawWheel() {
//   var canvas = document.getElementById('canvas');
//   var ctx = canvas.getContext('2d');
//   var radius = canvas.width / 2;
//   var img = new Image();
//   let segmentCount = 10;
//   let segmentAngle = Math.PI / segmentCount * 2;
//   var rads = degreesToRadians(360);
//   img.src = 'img/skull.png'; //img
//   ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
//   img.onload = function () {
//     var cache = this;
//     for (let i = 0; i < segmentCount; i++) {
//       ctx.save();
//       ctx.rotate(segmentAngle);
//       ctx.translate(Math.cos(i * segmentAngle), Math.sin(i * segmentAngle));
//       x = Math.round(Math.cos(i * segmentAngle) * radius) + radius;
//       y = Math.round(Math.sin(i * segmentAngle) * radius) + radius;
//       ctx.drawImage(img, x, y);
//     }
//   };
// }

// function dosomerotate() {
//   var canvas = document.getElementById('canvas');
//   var ctx = canvas.getContext('2d');
//   var img = new Image();

//   img.src = 'img/skull.png'; //img
//   var ang = 0; //angle
//   var fps = 1000 / 64; //number of frames per sec
//   img.onload = function () { //on image load do the following stuff
//     canvas.width = this.width << 1; //double the canvas width
//     canvas.height = this.height << 1; //double the canvas height
//     console.log(canvas.width);
//     var cache = this; //cache the local copy of image element for future reference
//     setInterval(function () {
//       ctx.save(); //saves the state of canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
//       ctx.translate(cache.width, cache.height); //let's translate
//       ctx.rotate(Math.PI / 180 * (ang += 5)); //increment the angle and rotate the image 
//       ctx.drawImage(img, -cache.width / 2, -cache.height / 2, cache.width, cache.height); //draw the image ;)
//       ctx.restore(); //restore the state of canvas
//     }, fps);
//   };
// }

function drawRouletteWheel(startAngle) {
  console.log(startAngle);
  let canvasWidth = 500;
  let canvas = document.getElementById("canvas");
  let segmentCount = 10;
  let segmentAngle = Math.PI / segmentCount * 2;
  let segmentDegrees = 360 / segmentCount;
  let ang = 0;

  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear 
    let origin = canvas.width / 2;
    let radius = canvas.width * 0.8;
    let x = origin;
    let y = origin;
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    let cx = 0;
    let cy = radius / 2;
    ctx.save();

    for (let i = 0; i < segmentCount; i++) {
      let imgPath = 'img/skull.png';
      let imgObj = new Image();
      imgObj.src = imgPath;
      let imageWidth = imgObj.width;
      ctx.setTransform(1, 0, 0, 1, x, y);  // set the rotation origin
      ctx.rotate(segmentAngle * i + startAngle); // rotate
      ctx.drawImage(imgObj, -cx - imageWidth / 2, -cy - imageWidth / 2); // draw image offset to put cx,cy at the point of rotation
      ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
    }
  }
}

function spin() {
  let speed = 10;
  let i = 10;
  while (i > 0) {
    setTimeout(function () {
      drawRouletteWheel(i);
    }, 1000);
  }
}

// function showCoords(event) {
//   let x = Math.round(event.clientX * 10);
//   let y = Math.round(event.clientY * 10);
//   // console.log(x, y);
//   drawRouletteWheel(x, y);
// }

// function degreesToRadians(theta) {
//   return theta * Math.PI / 180;
// }

// function spin() {
//   spinAngleStart = Math.random() * 10 + 10;
//   spinTime = 0;
//   spinTimeTotal = Math.random() * 3 + 4 * 1000;
//   rotateWheel();
// }

// function rotateWheel() {
//   spinTime += 30;
//   if (spinTime >= spinTimeTotal) {
//     stopRotateWheel();
//     return;
//   }
//   var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
//   startAngle += (spinAngle * Math.PI / 180);
//   drawRouletteWheel();
//   spinTimeout = setTimeout('rotateWheel()', 30);
// }

// function stopRotateWheel() {
//   clearTimeout(spinTimeout);
//   var degrees = startAngle * 180 / Math.PI + 90;
//   var arcd = arc * 180 / Math.PI;
//   var index = Math.floor((360 - degrees % 360) / arcd);
//   ctx.save();
//   ctx.font = 'bold 30px Helvetica, Arial';
//   var text = options[index]
//   ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
//   ctx.restore();
// }

// function easeOut(t, b, c, d) {
//   var ts = (t /= d) * t;
//   var tc = ts * t;
//   return b + c * (tc + -3 * ts + 3 * t);
// }

window.onLoad = drawRouletteWheel(0);
// window.onLoad = dosomerotate();
// window.onLoad = drawWheel();