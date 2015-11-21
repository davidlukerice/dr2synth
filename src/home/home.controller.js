import $ from 'jquery';
import filter from '../dr2synth/webAudioComponents/filter.js';
import delay from '../dr2synth/webAudioComponents/delay.js';
import reverb from '../dr2synth/webAudioComponents/reverb.js';

import DR2Synth from '../dr2synth/dr2synth.js';
import util from '../dr2synth/util.js';
import synth from '../dr2synth/synth.js';

export default class AppController {
  constructor() {
    this.name = 'dr2Synth';
    this.oscillatorTypes = DR2Synth.OscillatorTypes;

    this.synthModules = {};
    this.synth = DR2Synth.createSynth(this.synthModules);
  }
}
