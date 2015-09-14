(function() {
  function Synth() {

    this.modules = {
      'oscillators': {
        hasPower: true,
        settings: {
          osc1: {
            type: 'sine',
            envelope: {
              sustainTime: 0.5
            }
          },
          osc2: {
            type: 'sine',
            envelope: {
              sustainTime: 0.5
            }
          }
        }
      },
      'feedbackDelay': {
        hasPower: false,
        settings: {
          type: 2, //0: normal, 1: inverted, 2: ping pong.
          delay: 1.0, //Signal delay time in seconds.
          feedback: 0.42, //Signal feedback coefficient.
          offset: -0.027, //Stereo offset amount (seconds). Lets you time offset the left or right channel to create a richer stereo panorama.
          cutoff: 800 //Lowpass filter cutoff frequency applied to the delayed signal.
        }
      },
      'reverb': {
        hasPower: false,
        settings: {
          seconds: 1, //Impulse response length.
          decay: 1, //Impulse response decay rate.
          reverse: 1 // Reverse the impulse response.
        }
      },
      'out': {
        hasPower: true,
        settings: {
          outGain: 0.5
        }
      }
    };

    var audioContext = new (AudioContext || webkitAudioContext)();

    function determineSubNote(note) {
      var sub = 1;
      return note[0] + (parseInt(note[1], 10)-sub) + (note[2]?note[2]:'');
    }

    function createOscillatorsModule(note) {
      var osc1Node = audioContext.createOscillator();
      osc1Node.type = this.modules.oscillators.settings.osc1.type;
      osc1Node.frequency.value = DR2Synth.Util.frequencyForNote(note);

      // Used as a sub oscillator atm
      var osc2Node = audioContext.createOscillator();
      osc2Node.type = this.modules.oscillators.settings.osc2.type;
      osc2Node.frequency.value = DR2Synth.Util.frequencyForNote(determineSubNote(note));

      return {
        osc1Node: osc1Node,
        osc2Node: osc2Node
      };
    }

    function createFeedbackDelayModule() {
      var delayNode = new Delay(audioContext, this.modules.feedbackDelay.settings);
      return {
        delayNode: delayNode
      };
    }

    function createReverbModule() {
      var reverbNode = new SimpleReverb(audioContext, this.modules.reverb.settings);
      return {
        reverbNode: reverbNode
      };
    }

    function createOutModule() {
      var gainNode = audioContext.createGain();
      gainNode.gain.value = this.modules.out.settings.outGain;

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

      var nextNode = outModule.gainNode;

      if (this.modules.reverb.hasPower) {
        reverbModule.reverbNode.connect(nextNode);
        nextNode = reverbModule.reverbNode.input;
      }
      if (this.modules.feedbackDelay.hasPower) {
        feedbackDelayModule.delayNode.connect(nextNode);
        nextNode = feedbackDelayModule.delayNode.input
      }

      oscModule.osc1Node.connect(nextNode);
      oscModule.osc2Node.connect(nextNode);

      // Play the oscillators
      oscModule.osc1Node.start(0);
      oscModule.osc1Node.stop(audioContext.currentTime + this.modules.oscillators.settings.osc1.envelope.sustainTime);
      oscModule.osc2Node.start(0);
      oscModule.osc2Node.stop(audioContext.currentTime + this.modules.oscillators.settings.osc2.envelope.sustainTime);
    };

    this.toggleModulePower = function(moduleName) {
      this.modules[moduleName].hasPower = !this.modules[moduleName].hasPower;
    };

    this.moduleHasPower = function(moduleName) {
      return this.modules[moduleName].hasPower;
    };
  }

  DR2Synth.createSynth = function() {
    return new Synth();
  };
  DR2Synth.OscillatorTypes = ['sine', 'square', 'sawtooth', 'triangle'];
})();
