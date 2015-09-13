
(function() {
  DR2Synth.handleInputs = function(synth) {
    $synth = $('.d2synth');

    $synth.find('.keyboard-controls button').click(function() {
      synth.play($(this).data('note'));
    });

    $synth.find('.module .power').click(function() {
      var $module = $(this).parents('.module');
      var module = $module.data('module');
      synth.toggleModulePower(module);
      if (synth.moduleHasPower(module)) {
        $module.addClass('panel-info');
        $module.removeClass('panel-default');
      }
      else {
        $module.addClass('panel-default');
        $module.removeClass('panel-info');
      }

    });

  };
})();
