/**
 * app.js
 *
 * The entry point for JavaScript. Delegates to /js/visuals.js for drawing Bob
 * on the screen, and to /js/chatbot.js for Bob's conversational behaviour.
 */
let canvas;
let chatLog;

let voice, ears;
let utteranceEvent;
let speechQueue = [];
let isCurrentlySpeaking = false;

/**
 * Initializes all of the variables needed for Bob to run
 *
 * Called by p5.js
 */
function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent('bob-container');
  chatLog = createElement('ul');

  voice = new p5.Speech();
  voice.onEnd = onSpeechEnded;

  ears = new p5.SpeechRec();
  ears.onResult = onSpeechRecognized;

  // When Bob's listening times out, he should start listening again
  ears.onEnd = () => {
    if (!isSpeaking()) {
      ears.start();
    }
  };

  ears.start();
}

/**
 * Draws a single frame
 *
 * Called by p5.js
 */
function draw() {
  background(BACKGROUND_COLOUR);
  drawBob(isSpeaking());
}

/**
 * Determines if Bob is currently speaking
 *
 * @return  boolean
 */
function isSpeaking() {
  return speechQueue.length > 0;
}

/**
 * Logs a message to the screen
 *
 * @param speaker  The name of the person who said the message
 * @param message  The message that was uttered
 */
function logMessage(speaker, message) {
  let lines = message.split('\n');

  for (let line of lines) {
    let el = createElement('li', `${speaker}: ${line}`);
    el.parent(chatLog);
  }
}

/**
 * Callback function for when Bob has finished speaking
 *
 * If Bob still has utterances left in the queue, he says the next one.
 * Otherwise, he starts listening again.
 */
function onSpeechEnded() {
  speechQueue.shift();

  if (speechQueue.length > 0) {
    voice.speak(speechQueue[0]);
  } else {
    ears.start();
  }
}

/**
 * Callback function for when Bob has recognized an utterance
 *
 * Adds the utterances that Bob should speak into the queue, and start the
 * first one off immediately.
 *
 * @see /js/chatbot.js
 */
function onSpeechRecognized() {
  let message = chat(ears.resultString);
  let lines = message.split('\n');

  speechQueue = lines;
  voice.speak(speechQueue[0]);
}
