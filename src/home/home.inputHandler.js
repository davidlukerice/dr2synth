
import $ from '../../node_modules/jquery/dist/jquery.min.js';
import DR2Synth from '../dr2synth/dr2synth';

import angular from 'angular';

function inputHandler($document) {
  return {
    restrict: 'A',
    scope: {
      synth: '='
    },
    link: function(scope, element, attrs) {
      // TODO: Make angulary

      var $synth = $('.d2synth');

      $synth.find('.keyboard-controls button').click(function() {
        scope.synth.play($(this).data('note'));
      });

      $synth.find('.module .power').click(function() {
        var $module = $(this).parents('.module');
        var module = $module.data('module');
        scope.synth.toggleModulePower(module);
        if (scope.synth.moduleHasPower(module)) {
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

      document.addEventListener("keydown", keyDownTextField, false);
      function keyDownTextField(e) {
        var keyCode = e.keyCode;
        console.log('keycode: '+ keyCode);

        //65 //a
        //82 //r
        //83 //s
        //87  //w
        //70  //f
      }

    }
  }
}

export default angular.module('home.inputHandler', [])
  .directive('inputHandler', ['$document', inputHandler])
  .name;
