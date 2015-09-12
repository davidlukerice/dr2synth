(function() {
  function Synth() {

    this.osc1 = {
      type: 'triangle',
      envelope: {
        sustainTime: 0.5
      }
    };
    this.osc2 = {
      type: 'triangle',
      envelope: {
        sustainTime: 0.5
      }
    };
    this.outGain = 0.5;

    var audioContext = new (AudioContext || webkitAudioContext)();

    function determineSubNote(note) {
      var sub = 1;
      return note[0] + (parseInt(note[1], 10)-sub) + (note[2]?note[2]:'');
    }

    function createOscillatorsModule(note) {
      var osc1Node = audioContext.createOscillator();
      osc1Node.type = this.osc1.type;
      osc1Node.frequency.value = DR2Synth.Util.frequencyForNote(note);

      // Used as a sub oscillator atm
      var osc2Node = audioContext.createOscillator();
      osc2Node.type = this.osc2.type;
      osc2Node.frequency.value = DR2Synth.Util.frequencyForNote(determineSubNote(note));

      return {
        osc1Node: osc1Node,
        osc2Node: osc2Node
      };
    }

    function createFeedbackDelayModule() {
      var delayNode = new Delay(audioContext, {
        type: 0,
        delay: 1.0,
        feedback: 0.42,
        offset: -0.027,
        cutoff: 800
      });

      return {
        delayNode: delayNode
      };
    }

    function createReverbModule() {
      var reverbNode = new SimpleReverb(audioContext, {
        seconds: 1,
        decay: 1,
        reverse: 1
      });

      return {
        reverbNode: reverbNode
      };
    }

    function createOutModule() {
      var gainNode = audioContext.createGain();
      gainNode.gain.value = this.outGain;

      return {
        gainNode: gainNode
      };
    }

    /**
     * Plays the synth for a given value
     * @param  {String} Note (default: 'c4')
     */
    this.play = function(note) {
      note = note || 'c4';

      // Create the synth modules
      var oscModule = createOscillatorsModule.call(this, note);
      var feedbackDelayModule = createFeedbackDelayModule.call(this);
      var reverbModule = createReverbModule.call(this);
      var outModule = createOutModule.call(this);

      // Wire up the modules
      outModule.gainNode.connect(audioContext.destination);

      reverbModule.reverbNode.connect(outModule.gainNode);
      feedbackDelayModule.delayNode.connect(reverbModule.reverbNode.input);

      oscModule.osc1Node.connect(feedbackDelayModule.delayNode.input);
      oscModule.osc2Node.connect(feedbackDelayModule.delayNode.input);

      // Play the oscillators
      oscModule.osc1Node.start(0);
      oscModule.osc1Node.stop(audioContext.currentTime + this.osc1.envelope.sustainTime);
      oscModule.osc2Node.start(0);
      oscModule.osc2Node.stop(audioContext.currentTime + this.osc2.envelope.sustainTime);
    }
  }

  DR2Synth.createSynth = function() {
    return new Synth();
  };
})();
