
(function() {
  DR2Synth.handleInputs = function(synth) {
    $synth = $('.d2synth');

    $synth.find('.keyboard-controls button').click(function() {
      synth.play($(this).data('note'));
    });

  };
})();
