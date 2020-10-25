var options = ["$100", "$10", "$25", "$250", "$30", "$1000", "$1", "$200", "$45", "$500", "$5", "$20", "Lose", "$1000000", "Lose", "$350", "$5", "$99"];

loadJSON(function (response) {
  // Parse JSON string into object
  var actual_JSON = JSON.parse(response);
});

/*
 * NOTES:
 *
 * Get images from canvas:
 * https://stackoverflow.com/questions/10257781/can-i-get-image-from-canvas-element-and-use-it-in-img-src-tag
 */

const imgObj = new Image();
const canvas = document.getElementById("canvas");
const radius = canvas.width / 2;
console.log(imgObj.width / 2);
const imgPath = 'img/skull.png';
imgObj.src = imgPath;
const cx = imgObj.width / 2;
const cy = radius;
const segmentCount = 10;
const segmentAngle = Math.PI / segmentCount * 2;
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById('spinButton');
const imageWidth = imgObj.width;
const speed = 5000;

let delta;
let startTime = false;

// Spin action!
spinButton.addEventListener('click', function (event) {
  spin();
  event.target.disabled = true;
})

let offsetX;
let offsetY;

function drawRouletteWheel(imgObj, angle) {

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.width);
    ctx.save();

    for (let i = 0; i < segmentCount; i++) {
      ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.width / 2);  // set the rotation origin
      ctx.rotate(i * segmentAngle + angle); // rotate
      ctx.drawImage(imgObj, -imgObj.width / 2, -radius); // draw image offset to put cx,cy at the point of rotation
      ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
    }
  }
}

function getChosen() {

}

/**
 * Main loop mofo!
 * @param {*} time This is passed automatically by requestAnimationFrame() 
 */
function mainLoop(time) {

  // Do this on first call...
  if (!startTime) {
    startTime = time;
  }

  time = time - startTime;
  if (imgObj.complete) {
    delta = speed / (time ^ 2);
    if (delta < 1.25) {
      delta = prevDelta;
      startTime = false; // Resest timer
      spinButton.disabled = false;
      return;
    }

    drawRouletteWheel(imgObj, delta);
    prevDelta = delta;
  }
  requestAnimationFrame(mainLoop);
}

/**
 * Make the damn thing go
 */
function spin() {
  requestAnimationFrame(mainLoop);
}

drawRouletteWheel(imgObj, 0) 