/**
 * app.js
 *
 * The entry point for JavaScript. Delegates to /js/visuals.js for drawing Bob
 * on the screen, and to /js/chatbot.js for Bob's conversational behaviour.
 */
let canvas;
let chatLog;

let voice, ears;
let bobIsSpeaking = false;
let utteranceEvent;

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
  ears.onEnd = () => {
    if (!bobIsSpeaking) {
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
  drawBob();
}

/**
 * Logs a message to the screen
 *
 * @param speaker  The name of the person who said the message
 * @param message  The message that was uttered
 */
function logMessage(speaker, message) {
  let el = createElement('li', `${speaker}: ${message}`);
  el.parent(chatLog);
}

/**
 * Callback function for when Bob has finished speaking
 *
 * Tells Bob to start listening again.
 */
function onSpeechEnded() {
  bobIsSpeaking = false;
  ears.start();
}

/**
 * Callback function for when Bob has recognized an utterance
 *
 * Passes the recognized speech on to the chatbot routines.
 *
 * @see /js/chatbot.js
 */
function onSpeechRecognized() {
  bobIsSpeaking = true;
  voice.speak(chat(ears.resultString));
}
