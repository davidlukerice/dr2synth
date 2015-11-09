
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './dr2synth/knobTypes/p1.css';
import './dr2synth.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import home from './home';

angular.module('app', [uirouter, home])
  .config(routing);
