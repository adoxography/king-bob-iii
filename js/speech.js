/**
 * Contains the Speech and SpeechRec classes from the p5.speech library so
 * that they can exist with awareness of each other
 *
 * Capable of uttering sequences of statements, and will automatically revert
 * to listening mode when complete. Listens indefinitely when in listening
 * mode.
 */
class ChatBot {
  constructor() {
    this.voice = new p5.Speech();
    this.ears = new p5.SpeechRec();
    this.speechQueue = [];

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
        this.onStopSpeaking();
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
      let message = this.handleSpeechRecognized(result);
      let lines = message.split('\n');
      this.speak(lines);
    };
  }

  /**
   * Says the utterance at the front of the speech queue
   *
   * If a string or array is provided, it will be added to the speech queue.
   *
   * @param utterance  The utterance(s) to be added to the queue
   */
  speak(utterance = null) {
    if (Array.isArray(utterance)) {
      this.speechQueue = this.speechQueue.concat(utterance);
    } else if (utterance) {
      this.speechQueue.push(utterance);
    }

    if (this.speechQueue.length > 0) {
      let speech = this.speechQueue[0];
      this.onSpeak(speech);
      this.voice.speak(speech);
    }
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
   * Dummy method for speech recognition which should be overridden
   *
   * This basic method gives back exactly what was heard.
   *
   * @param result  The speech that was recognized
   * @return  The response to the speech
   */
  handleSpeechRecognized(result) {
    return result;
  }

  /**
   * Dummy handler that gets called when a line of speech is uttered
   *
   * @param speech  The line that was uttered
   */
  onSpeak(speech) {}

  setVoice(index) {
    this.voice.setVoice(index);
  }

  onStopSpeaking() {}
}
