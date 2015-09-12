
(function() {
  $(function() {
    var synth = DR2Synth.createSynth();

    $('button').click(function() {
      synth.play($(this).data('note'));
    });
  });
})();
