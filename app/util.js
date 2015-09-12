(function() {
  var Util = {};
  DR2Synth.Util = Util;

  var TWELTH_ROOT = Math.pow(2,1/12);
  var A4 = 440;
  var DISTANCE_FROM_A = {
    c:-9, d:-7, e:-5, f:-4, g:-2, a:0, b:2
  };

  /**
    Gets the frequency based on an equal tempered scale
    with A4 = 440
    @param note (ex: 'c4', 'c4#', 'C4b')
  */
  Util.frequencyForNote = function(note) {
    var steps = Util.stepsFromRootNote(note);
    return Util.frequencyOfStepsFromRootNote(steps);
  };

  Util.stepsFromRootNote = function(note) {
    note = note.toLowerCase().split('');
    var letter = note[0],
        octave = parseInt(note[1], 10),
        modifier = note[2],
        steps = DISTANCE_FROM_A[letter];
    if (modifier==='#')
      ++steps;
    else if (modifier==='b')
      --steps;

    steps+= 12 * (octave-4);
    return steps;
  };

  Util.frequencyOfStepsFromRootNote = function(steps) {
    return A4 * Math.pow(TWELTH_ROOT, steps);
  };
})();
