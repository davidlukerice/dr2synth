import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import HomeController from './home.controller';
import inputHandler from './home.inputHandler';

export default angular.module('app.home', [uirouter, inputHandler])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
