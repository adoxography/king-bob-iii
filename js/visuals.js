/**
 * visuals.js
 *
 * Handles the visual illustration of King Bob III. The key function is
 * drawBob(), which will call subfunctions to draw his various components.
 */
// Radius of Bob's body segment
const BODY_RADIUS = 100;
// Radius of Bob's head
const HEAD_RADIUS = 50;
// Radius of each of Bob's eyes
const EYE_RADIUS = 8;
// Distance from the middle of each of Bob's eyes to the center (x direction) of his head
const EYE_X_OFFSET = 20;
// Distance from the middle of Bob's eye line to the center (y direction) of his head
const EYE_Y_OFFSET = 5;
// Width of Bob's mouth
const MOUTH_WIDTH = 50;
// Maximum height Bob can open his mouth
const MOUTH_HEIGHT = 15;
// Distance from Bob's mouth to the center (y direction) of his head
const MOUTH_Y_OFFSET = 23;
// Distance from Bob's moustache to the center
const MOUSTACHE_OFFSET = 40;
// Radius of the moustache's curl
const MOUSTACHE_RADIUS = 10;
// Thickness of Bob's moustache
const MOUSTACHE_THICKNESS = 4;
// The number of points on Bob's crown
const NUM_CROWN_POINTS = 3

const BODY_COLOUR       = "#0000FF";
const FACE_COLOUR       = "#AA00FF";
const CROWN_COLOUR      = "#FFFF00";
const MOUSTACHE_COLOUR  = "#FF005050";
const BACKGROUND_COLOUR = "#FF8080";
const EYE_COLOUR        = "#000000";

/**
 * Draws Bob on the screen
 *
 * @param isSpeaking  Whether or not Bob is currently speaking, and should
 *                    have his mouth open
 */
function drawBob(isSpeaking) {
  drawBody();
  drawHead();
  drawCrown();
  drawFace(isSpeaking);
  drawMoustache();
}

/**
 * Draws Bob's body on the screen
 */
function drawBody() {
  stroke(BODY_COLOUR);
  fill(BODY_COLOUR);
  ellipse(width / 2, height / 2 + BODY_RADIUS, BODY_RADIUS * 2, BODY_RADIUS * 2);
}

/**
 * Draws Bob's head, without any facial features, on the screen
 */
function drawHead() {
  stroke(FACE_COLOUR);
  fill(FACE_COLOUR);
  ellipse(width / 2, height / 2 - HEAD_RADIUS, HEAD_RADIUS * 2, HEAD_RADIUS * 2);
}

/**
 * Draws Bob's facial features on the screen
 *
 * @param isSpeaking  Whether or not Bob should have his mouth open
 */
function drawFace(isSpeaking) {
  stroke(EYE_COLOUR);
  fill(EYE_COLOUR);

  let mouthHeight = isSpeaking ? MOUTH_HEIGHT : 1;

  ellipse(width / 2 - EYE_X_OFFSET, height / 2 - HEAD_RADIUS - EYE_Y_OFFSET, EYE_RADIUS * 2, EYE_RADIUS * 2);
  ellipse(width / 2 + EYE_X_OFFSET, height / 2 - HEAD_RADIUS - EYE_Y_OFFSET, EYE_RADIUS * 2, EYE_RADIUS * 2);

  ellipse(width / 2, height / 2 - HEAD_RADIUS + MOUTH_Y_OFFSET, MOUTH_WIDTH, mouthHeight);
}

/**
 * Draws Bob's crown on the screen
 */
function drawCrown() {
  let crownHeight = HEAD_RADIUS / 2;
  let crownX = width / 2 - HEAD_RADIUS;
  let crownY = height / 2 - HEAD_RADIUS - crownHeight - EYE_Y_OFFSET * 3.5;
  let crownWidth = HEAD_RADIUS * 2;
  let pointWidth = crownWidth / NUM_CROWN_POINTS;
  let pointHalfWidth = pointWidth / 2;

  stroke(CROWN_COLOUR);
  fill(CROWN_COLOUR);

  // The headband
  rect(crownX, crownY, HEAD_RADIUS * 2, crownHeight);

  // The triangles
  for (let i = 0; i < NUM_CROWN_POINTS; i++) {
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

/**
 * Draws Bob's moustache on the screen
 */
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
