/**
 * app.js
 *
 * The entry point for JavaScript. Delegates to /js/visuals.js for drawing Bob
 * on the screen, and to /js/conversation.js for Bob's conversational behaviour.
 */
let canvas;
let chatLog;
let chatBot;
let voiceSelect;
let movingRight = true;
let xOffset = 0;
let dancing = false;
let avatar;

function startDancing() {
  dancing = true;
}

function stopDancing() {
  dancing = false;
  xOffset = 0;
}

/**
 * Initializes all of the variables needed for Bob to run
 *
 * Called by p5.js
 */
function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent('bob-container');
  chatLog = createElement('ul');

  chatBot = new ChatBot();
  chatBot.handleSpeechRecognized = chat;
  chatBot.onSpeak = speech => logMessage('BOB', speech);
  chatBot.listen();

  voiceSelect = createSelect();
  voiceSelect.parent('option-container');

  chatBot.voice.onLoad = () => {
    for (let voice of chatBot.voice.voices) {
      voiceSelect.option(voice.name);
    }

    voiceSelect.elt.selectedIndex = 1;
  };

  chatBot.onStopSpeaking = () => {
    stopDancing();
  };

  voiceSelect.changed(() => {
    chatBot.setVoice(voiceSelect.value());
  });

  avatar = new KingBobIII();
}

/**
 * Draws a single frame
 *
 * Called by p5.js
 */
function draw() {
  background(BACKGROUND_COLOUR);
  avatar.isSpeaking = chatBot.isSpeaking();
  if (dancing) {
    avatar.dance();
  } else {
    avatar.stopDancing();
  }
  avatar.draw();
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
  chatLog.elt.scrollTo(0, chatLog.elt.scrollHeight);
}
