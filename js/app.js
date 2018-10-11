/**
 * app.js
 *
 * The entry point for JavaScript. Delegates to /js/visuals.js for drawing Bob
 * on the screen, and to /js/conversation.js for Bob's conversational behaviour.
 */
let canvas;
let chatLog;
let voiceSelect;
let textInput;
let bob;
let avatar;
let riveBot;
let riveLoaded = false;

/**
 * Initializes all of the variables needed for Bob to run
 *
 * Called by p5.js
 */
function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent('bob-container');
  chatLog = createElement('ul');
  chatLog.parent('chat-container');

  riveBot = new RiveScript();
  riveBot.loadFile([
    'rive/main.rive',
    'rive/global.rive',
    'rive/heitor.rive',
    'rive/matteo.rive',
    'rive/graham.rive',
    'rive/duncan.rive'
  ]).then(loading_done).catch(loading_error);

  bob = new KingBobIII();
  bob.translate = riveChat;
  bob.onSpeak = speech => logMessage('BOB', speech);
  bob.listen();

  voiceSelect = createSelect();
  voiceSelect.parent('voice-select-container');

  bob.voice.onLoad = () => {
    for (let voice of bob.voice.voices) {
      voiceSelect.option(voice.name);
    }

    voiceSelect.elt.selectedIndex = 1;
  };

  voiceSelect.changed(() => {
    bob.setVoice(voiceSelect.value());
  });

  textInput = createInput();
  textInput.addClass('input');
  textInput.parent('text-input-container');

  textInput.changed(e => {
    let message = e.target.value;
    textInput.value('');
    bob.hear(message);
  });

  avatar = new KingBobIIIPresenter(bob);
}

/**
 * Draws a single frame
 *
 * Called by p5.js
 */
function draw() {
  background(BACKGROUND_COLOUR);
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

function loading_done() {
  riveBot.sortReplies();
  riveLoaded = true;

  console.log("Bot is loaded.");
  riveBot.reply('local-user', 'hello').then(reply => logMessage('King Bob III', reply));
}

function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}

function riveChat(message) {
  logMessage('You', message);
  return riveBot.reply('local-user', message);
}
