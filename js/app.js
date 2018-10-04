const BOB_BODY_RADIUS = 100;    // Radius of Bob's body segment
const BOB_HEAD_RADIUS = 50;     // Radius of Bob's head
const BOB_EYE_RADIUS = 8;       // Radius of each of Bob's eyes
const BOB_EYE_X_OFFSET = 20;    // Distance from the middle of each of Bob's eyes to the center (x direction) of his head
const BOB_EYE_Y_OFFSET = 5;     // Distance from the middle of Bob's eye line to the center (y direction) of his head
const BOB_MOUTH_WIDTH = 50;     // Width of Bob's mouth
const BOB_MOUTH_HEIGHT = 15;    // Maximum height Bob can open his mouth
const BOB_MOUTH_Y_OFFSET = 23;  // Distance from Bob's mouth to the center (y direction) of his head
const MOUSTACHE_OFFSET = 40;    // Distance from Bob's moustache to the center
const MOUSTACHE_RADIUS = 10;    // Radius of the moustache's curl
const MOUSTACHE_THICKNESS = 4;

const BODY_COLOUR = "#0000FF";
const FACE_COLOUR = "#AA00FF";
const CROWN_COLOUR = "#FFFF00";
const MOUSTACHE_COLOUR = "#FF005050";

const BACKGROUND_COLOUR = "#FF8080";
const BOB_COLOUR = "#0000FF";
const BOB_EYE_COLOUR = "#000000";

let canvas;
let chatLog;

let voice, ears;
let bobIsSpeaking = false;
let utteranceEvent;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent('bob-container');
  chatLog = createElement('ul');
  //logMessage("Bob", "This is a string.");

  voice = new p5.Speech();
  voice.onEnd = speechEnded;

  ears = new p5.SpeechRec();
  ears.onResult = speechRecognized;
  ears.onEnd = () => {
    if (!bobIsSpeaking) {
      ears.start();
    }
  };
  ears.start();
}

function logMessage(speaker, message) {
  let el = createElement('li', `${speaker}: ${message}`);
  el.parent(chatLog);
}


function draw() {
  background(BACKGROUND_COLOUR);
  drawBob();
}

function drawBob() {
  stroke(BODY_COLOUR);
  fill(BODY_COLOUR);

  // Draw the body
  ellipse(width / 2, height / 2 + BOB_BODY_RADIUS, BOB_BODY_RADIUS * 2, BOB_BODY_RADIUS * 2);

  stroke(FACE_COLOUR);
  fill(FACE_COLOUR);
  // Draw the head
  ellipse(width / 2, height / 2 - BOB_HEAD_RADIUS, BOB_HEAD_RADIUS * 2, BOB_HEAD_RADIUS * 2);

  drawCrown();
  drawFace();
  drawMoustache();
}

function drawCrown() {
  let NUM_POINTS = 3;

  let crownHeight = BOB_HEAD_RADIUS / 2;
  let crownX = width / 2 - BOB_HEAD_RADIUS;
  let crownY = height / 2 - BOB_HEAD_RADIUS - crownHeight - BOB_EYE_Y_OFFSET * 3.5;
  let crownWidth = BOB_HEAD_RADIUS * 2;
  let pointWidth = crownWidth / NUM_POINTS;
  let pointHalfWidth = pointWidth / 2;

  stroke(CROWN_COLOUR);
  fill(CROWN_COLOUR);

  // The headband
  rect(crownX, crownY, BOB_HEAD_RADIUS * 2, crownHeight);

  // The triangles
  for (let i = 0; i < NUM_POINTS; i++) {
    triangle(
      crownX + pointWidth * i,
      crownY,
      crownX + pointWidth * i + pointWidth,
      crownY,
      crownX + pointWidth * i + pointHalfWidth,
      crownY - crownHeight
    );
  }
}

function drawFace() {
  stroke(BOB_EYE_COLOUR);
  fill(BOB_EYE_COLOUR);

  ellipse(width / 2 - BOB_EYE_X_OFFSET, height / 2 - BOB_HEAD_RADIUS - BOB_EYE_Y_OFFSET, BOB_EYE_RADIUS * 2, BOB_EYE_RADIUS * 2);
  ellipse(width / 2 + BOB_EYE_X_OFFSET, height / 2 - BOB_HEAD_RADIUS - BOB_EYE_Y_OFFSET, BOB_EYE_RADIUS * 2, BOB_EYE_RADIUS * 2);

  ellipse(width / 2, height / 2 - BOB_HEAD_RADIUS + BOB_MOUTH_Y_OFFSET, BOB_MOUTH_WIDTH, mouthHeight());
}

function drawMoustache() {
  noFill();
  stroke(MOUSTACHE_COLOUR);
  strokeWeight(MOUSTACHE_THICKNESS);

  arc(width / 2 + 20, height / 2 - MOUSTACHE_OFFSET, MOUSTACHE_RADIUS * 4, MOUSTACHE_RADIUS*2, 0, PI);
  arc(width / 2 + 30, height / 2 - MOUSTACHE_OFFSET, MOUSTACHE_RADIUS * 2, MOUSTACHE_RADIUS*2, PI, 0);
  arc(width / 2 - 20, height / 2 - MOUSTACHE_OFFSET, MOUSTACHE_RADIUS * 4, MOUSTACHE_RADIUS*2, 0, PI);
  arc(width / 2 - 30, height / 2 - MOUSTACHE_OFFSET, MOUSTACHE_RADIUS * 2, MOUSTACHE_RADIUS*2, PI, 0);
  strokeWeight(1);
}

function mouthHeight() {
  if (bobIsSpeaking) {
    return BOB_MOUTH_HEIGHT;
  }
  return 1;
}

function speechEnded() {
  bobIsSpeaking = false;
  ears.start();
}

function speechRecognized() {
  bobIsSpeaking = true;
  voice.speak(chat(ears.resultString));
}
