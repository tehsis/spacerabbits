import "pixi.js";
import "p2";
import "Phaser";

import {GAME} from './const';
import { Game } from './game';
import * as states from './states/index';

class BunnyWars extends Game {}

window.onload = () => {
  const bunnywars = new BunnyWars({
      width: GAME.SCREEN.BASE_WIDTH,
      height: GAME.SCREEN.BASE_HEIGHT,
      element: GAME.DOM_ELEMENT,
      states: states,
      default_state: GAME.DEFAULT_STATE
  });

  bunnywars.init();
};
