/**
 * The most Bob will dance to the left or right
 */
let MAX_X_OFFSET = 25;

class KingBobIII {
  constructor() {
    this.voice = new p5.Speech();
    this.ears = new p5.SpeechRec();
    this.speechQueue = [];

    this.dancingDirection = 0;
    this.x = 0;

    /**
     * Attach the event listener for the end of an utterance
     *
     * If there are remaining utterances in the queue, speech should be called
     * again. If not, the chatbot should start listening.
     */
    this.voice.onEnd = () => {
      this.speechQueue.shift();

      if (this.isSpeaking()) {
        this.speak();
      } else {
        this.stopDancing();
        this.listen();
      }
    };

    /**
     * Attach the event listener for a recognition timeout
     *
     * If the chatbot is not currently speaking, it should start listening
     * again.
     */
    this.ears.onEnd = () => {
      if (!this.isSpeaking()) {
        this.listen();
      }
    };

    /**
     * Attach the event listener for speech being recognized
     *
     * The message should be split on newline characters and passed to the
     * speech() method.
     */
    this.ears.onResult = () => {
      let result = this.ears.resultString;
      this.hear(result);
    };
  }

  hear(message) {
    this.translate(message).then(reply => {
      let lines = reply.split('\n');
      this.say(lines);
    });
  }

  /**
   * Adds an utterance to the speech queue and starts speech queue processing
   *
   * @param utterance  A string or array of strings to say
   */
  say(utterance) {
    if (Array.isArray(utterance)) {
      this.speechQueue = this.speechQueue.concat(utterance);
    } else if (utterance) {
      this.speechQueue.push(utterance);
    }

    this.speak();
  }

  /**
   * Says the utterance at the front of the speech queue if the queue is not
   * empty
   */
  speak() {
    if (this.speechQueue.length > 0) {
      let tags = [];
      let nextLine = this.speechQueue[0];
      let matches = nextLine.match(/^(\[.+\])?(.*)$/);
      let speech = matches[2];

      if (matches[1]) {
        tags = matches[1].match(/\[.+?\]/);
      }

      this.onSpeak(speech);
      this.voice.speak(speech);

      if (tags.includes('[dance]')) {
        this.dance();
      }
    }
  }

  /**
   * Clears the speech queue and stops the current speech
   */
  stopSpeaking() {
    this.speechQueue = [];
    this.voice.stop();
  }

  /**
   * Uses the microphone to listen for speech
   */
  listen() {
    this.ears.start();
  }

  /**
   * @return true if there are utterances in the queue, and false otherwise
   */
  isSpeaking() {
    return this.speechQueue.length > 0;
  }

  /**
   * Dummy method for generating a reponse to a message
   *
   * This basic method gives back exactly what was heard.
   *
   * @param result  The input message
   * @return  The response to the speech
   */
  translate(result) {
    return result;
  }

  /**
   * Dummy handler that gets called when a line of speech is uttered
   *
   * @param speech  The line that was uttered
   */
  onSpeak(speech) {}

  /**
   * Sets Bob's voice
   *
   * Must be the index or name of a known voice
   */
  setVoice(index) {
    this.voice.setVoice(index);
  }

  /**
   * Tells Bob to start dancing
   */
  dance() {
    if (this.dancingDirection == 0) {
      this.dancingDirection = 1;
    }
  }

  /**
   * Tells Bob to stop dancing
   *
   * Bob will move back to the center
   */
  stopDancing() {
    this.dancingDirection = 0;
  }

  /**
   * Gets the next x coordinate for Bob
   *
   * Bob will calculate where he needs to be next if he is currently dancing.
   *
   * @return  The next x coordinate for Bob's center
   */
  getNextX() {
    if (this.dancingDirection == 0) {
      if (this.x > 0) {
        this.x--;
      } else if (this.x < 0) {
        this.x++;
      }
    } else if (this.dancingDirection < 0) {
      if (this.x <= -MAX_X_OFFSET) {
        this.dancingDirection = 1;
      } else {
        this.x--;
      }
    } else {
      if (this.x >= MAX_X_OFFSET) {
        this.dancingDirection = -1;
      } else {
        this.x++;
      }
    }

    return this.x;
  }
}
