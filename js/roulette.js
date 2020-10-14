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
let imgObj = new Image();
var ctx;

document.getElementById("spin").addEventListener("click", spin);

function drawRouletteWheel(imgObj, x, y, cx, cy, angle) {
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
    // let x = origin;
    // let y = origin;
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    let cx = 0;
    let cy = radius / 2;
    ctx.save();

    for (let i = 0; i < segmentCount; i++) {
      let imgPath = 'img/skull.png';
      // let imgObj = new Image();
      imgObj.src = imgPath;
      let imageWidth = imgObj.width;
      ctx.setTransform(1, 0, 0, 1, x, y);  // set the rotation origin
      ctx.rotate(i * segmentAngle + angle); // rotate
      ctx.drawImage(imgObj, -cx - imageWidth / 2, -cy - imageWidth / 2); // draw image offset to put cx,cy at the point of rotation
      ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
    }
  }
}

let delta;
let randomChunk = Math.random() * 1000;
let speed = 5000 + randomChunk;
let newTime;
let oldTime;
let startTime = false;

let mainLoop = function (time) { // time is passed by  requestAnimationFrame
  if (!startTime) {
    startTime = time;
  }
  time = time - startTime;
  // console.log('time', time);
  if (imgObj.complete) {
    delta = speed / (time ^ 2);
    // console.log('delta', delta);
    if (delta < 1.25) {
      delta = prevDelta;
      startTime = false;
      return;
    }
    drawRouletteWheel(imgObj, 250, 250, imgObj.width / 2, imgObj.height * 0.8, delta);
    prevDelta = delta;
  }
  requestAnimationFrame(mainLoop);
  // mainLoop(time);
}

let getNewTime = function (time) {
  return time;
}

function spin() {
  // startTime = requestAnimationFrame(getNewTime);
  console.log(startTime);
  requestAnimationFrame(mainLoop);
  // mainLoop(oldTime);
}

// requestAnimationFrame(mainLoop); // starts the animation

// window.onLoad = drawRouletteWheel(0);
// window.onLoad = dosomerotate();
// window.onLoad = drawWheel();
