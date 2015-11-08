import $ from 'jquery';
import knob from '../../node_modules/jim-knopf/dist/knob-min.js';
import knobP1 from '../dr2synth/knobTypes/p1.js';
import filter from '../dr2synth/webAudioComponents/filter.js';
import delay from '../dr2synth/webAudioComponents/delay.js';
import reverb from '../dr2synth/webAudioComponents/reverb.js';

import DR2Synth from '../dr2synth/dr2synth.js';
import util from '../dr2synth/util.js';
import synth from '../dr2synth/synth.js';
import inputHandler from '../dr2synth/inputHandler.js';

export default class AppController {
  constructor() {
    this.name = 'dr2Synth';
    var synth = DR2Synth.createSynth();
          DR2Synth.handleInputs(synth);
  }
}
