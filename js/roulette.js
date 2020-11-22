var options = ["$100", "$10", "$25", "$250", "$30", "$1000", "$1", "$200", "$45", "$500", "$5", "$20", "Lose", "$1000000", "Lose", "$350", "$5", "$99"];

// Not wolrking for reasons unknown.
// loadJSON(function (response) {
//   // Parse JSON string into object
//   var actual_JSON = JSON.parse(response);
//   console.log(actual_JSON.twats);
// });

const twats = [
  {
    "role": "Prime Minister",
    "name": "Boris Johnson",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Chancellor",
    "name": "Rishi Sunak",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Home Secretary",
    "name": "Priti Patel",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Foreign Secretary",
    "name": "Dominic Raab",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Chancellor of the Duchy of Lancaster",
    "name": "Michael Gove",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Health Secretary",
    "name": "Matt Hancock",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Defence Secretary",
    "name": "Ben Wallace",
    "imgPath": "img/skull.png"
  },
  {
    "role": "International Trade Secretary",
    "name": "Liz Truss",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Environment Secretary",
    "name": "George Eustice",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Education Secretary",
    "name": "Gavin Williamson",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Culture Secretary",
    "name": "Oliver Dowden",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Business Secretary",
    "name": "Alok Sharma",
    "imgPath": "img/skull.png"
  },
  {
    "role": "MHCLG Secretary",
    "name": "Robert Jenrick",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Work & Pensions Secretary",
    "name": "Thérèse Coffey",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Justice Secretary and Lord Chancellor",
    "name": "Robert Buckland",
    "imgPath": "img/skull.png"
  },
  {
    "role": "International Development Secretary",
    "name": "Anne-Marie Trevelyan",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Transport Secretary",
    "name": "Grant Shapps",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Welsh Secretary",
    "name": "Simon Hart",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Scottish Secretary",
    "name": "Alister Jack",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Northern Irish Secretary",
    "name": "Brandon Lewis",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Attorney General",
    "name": "Suella Braverman",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Chief Secretary to the Treasury",
    "name": "Stephen Barclay",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Party Chairman",
    "name": "Amanda Milling",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Leader of the House of Commons",
    "name": "Jacob Rees-Mogg",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Chief Whip",
    "name": "Mark Spencer",
    "imgPath": "img/skull.png"
  },
  {
    "role": "Leader of the House of Lords",
    "name": "Baroness Evans"
  }
];

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
const segmentCount = twats.length;
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
      // imgObj.src = twats[i].imgPath;
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
