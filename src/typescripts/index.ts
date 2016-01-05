import {GAME} from './const';
import { Game } from './game';

class BunnyWars extends Game {}

window.onload = () => {
  new BunnyWars({
      width: GAME.SCREEN.BASE_WIDTH,
      height: GAME.SCREEN.BASE_HEIGHT,
      element: GAME.DOM_ELEMENT
  });
};
