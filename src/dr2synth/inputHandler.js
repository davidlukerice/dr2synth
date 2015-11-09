
import $ from '../../node_modules/jquery/dist/jquery.min.js';
import DR2Synth from './dr2synth';

DR2Synth.handleInputs = function(synth) {
  var $synth = $('.d2synth');

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
  /*
  var osc1TypeKnob = new Knob($('.oscillator1-controls .type input').get()[0], new Ui.P1(), 0);
  osc1TypeKnob.onChanged = function(val) {
    synth.modules.oscillators.settings.osc1.type = DR2Synth.OscillatorTypes[val];
  };

  var osc2TypeKnob = new Knob($('.oscillator2-controls .type input').get()[0], new Ui.P1(), 0);
  osc2TypeKnob.onChanged = function(val) {
    synth.modules.oscillators.settings.osc2.type = DR2Synth.OscillatorTypes[val];
  };*/
};
