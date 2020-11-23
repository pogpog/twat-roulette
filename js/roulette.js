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
    "imgPath": "https://m.media-amazon.com/images/I/51YrkmaZgpL.jpg"
  },
  {
    "role": "Chancellor",
    "name": "Rishi Sunak",
    "imgPath": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykLOWXjuDW4VPpCKKBvQcI9rkS4wOJYH8DQ&usqp=CAU"
  },
  {
    "role": "Home Secretary",
    "name": "Priti Patel",
    "imgPath": "https://www.funkybunky.co.uk/media/ecom/prodlg/pritipatel.jpg"
  },
  {
    "role": "Foreign Secretary",
    "name": "Dominic Raab",
    "imgPath": "https://www.bighedz.com/657-large_default/dominic-raab-brexit-life-size-card-face-mask.jpg"
  },
  {
    "role": "Chancellor of the Duchy of Lancaster",
    "name": "Michael Gove",
    "imgPath": "https://images.partydelights.co.uk/MASK/10/27/front/v1/fac/1.jpg"
  },
  {
    "role": "Health Secretary",
    "name": "Matt Hancock",
    "imgPath": "https://www.funkybunky.co.uk/media/ecom/prodlg/amh.jpg"
  },
  {
    "role": "Machiavellian Gollum",
    "name": "Dominic Cummings",
    "imgPath": "https://i.ebayimg.com/images/g/ZiMAAOSwS5ReTBIv/s-l400.jpg"
  },
  {
    "role": "Some Dodgy Bloke in Ladbrokes",
    "name": "Nigel Farage",
    "imgPath": "https://m.media-amazon.com/images/I/61F2scOIhuL._AC_SS350_.jpg"
  },
  {
    "role": "Transport Secretary",
    "name": "Grant Shapps",
    "imgPath": "https://i.ebayimg.com/images/g/xdoAAOSwzgBY1SK7/s-l400.jpg"
  },
  {
    "role": "Leader of the House of Commons",
    "name": "Jacob Rees-Mogg",
    "imgPath": "https://i.ebayimg.com/images/g/bUUAAOSwLaBZzJ7W/s-l400.jpg"
  },
];

/**
 * Make an array of image objects based on the twat array.
 */
const imageArray = twats.map(function (item) {
  const imgObj = new Image();
  imgObj.src = item.imgPath;
  imgObj.width = 100;
  imgObj.height = 100;
  return imgObj;
});

/*
 * NOTES:
 *
 * Get images from canvas:
 * https://stackoverflow.com/questions/10257781/can-i-get-image-from-canvas-element-and-use-it-in-img-src-tag
 */

// const imgObj = new Image();
const canvas = document.getElementById("canvas");
const radius = canvas.width / 2;
const segmentCount = twats.length;
const segmentAngle = Math.PI / segmentCount * 2;
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById('spinButton');
const speed = 5000;
const imgWidth = imgHeight = 100;

let delta;
let startTime = false;

// Spin action!
spinButton.addEventListener('click', function (event) {
  spin();
  event.target.disabled = true;
})

let offsetX;
let offsetY;

function drawRouletteWheel(imageArray, angle, myRand) {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.width);
    ctx.save();

    for (let i = 0; i < segmentCount; i++) {
      let imgObj = imageArray[i];
      ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.width / 2);  // set the rotation origin
      ctx.rotate(i * segmentAngle + angle + myRand); // rotate
      ctx.drawImage(imgObj, -imgObj.width / 2, -radius, imgWidth, imgHeight); // draw image offset to put cx,cy at the point of rotation
      ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
    }
  }
}


let myRand = 0;

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
  if (true) {
    delta = speed / (time ^ 2);
    if (delta < 1.25) {
      delta = prevDelta;
      startTime = false; // Resest timer
      spinButton.disabled = false;
      return;
    }

    drawRouletteWheel(imageArray, delta, myRand);
    prevDelta = delta;
  }
  requestAnimationFrame(mainLoop);
}

/**
 * Make the damn thing go
 */
function spin() {
  myRand = Math.floor(Math.random() * twats.length);
  console.log(myRand);
  requestAnimationFrame(mainLoop);
}

drawRouletteWheel(imageArray, 0) 
