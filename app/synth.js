DR2Synth.createSynth = function() {
  var audioContext = new (AudioContext || webkitAudioContext)();

  function determineSubNote(note) {
    var sub = 1;
    return note[0] + (parseInt(note[1], 10)-sub) + (note[2]?note[2]:'');
  }

  return {
    /**
     * Plays the synth for a given value
     * @param  {String} Note (default: 'c4')
     */
    play: function(note) {
      note = note || 'c4';

      var osc1 = audioContext.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.value = DR2Synth.Util.frequencyForNote(note);

      // Used as a sub oscillator atm
      var osc2 = audioContext.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.value = DR2Synth.Util.frequencyForNote(determineSubNote(note));

      var gainNode = audioContext.createGain();
      gainNode.gain.value = 0.1;

      gainNode.connect(audioContext.destination);
      osc1.connect(gainNode);
      osc2.connect(gainNode);

      osc1.start(0);
      osc1.stop(audioContext.currentTime + 0.5);
      osc2.start(0);
      osc2.stop(audioContext.currentTime + 0.5);
    }
  }
};
