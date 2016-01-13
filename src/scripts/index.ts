import {GAME} from './const';
import { Game } from './game';
import * as states from './states/index';

class BunnyWars extends Game {}

window.onload = () => {
  new BunnyWars({
      width: window.innerWidth,
      height: window.innerHeight,
      element: GAME.DOM_ELEMENT,
      states: states,
      default_state: GAME.DEFAULT_STATE
  });
};
