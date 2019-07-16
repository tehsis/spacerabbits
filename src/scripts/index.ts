import "pixi.js";
import "p2";
import "Phaser";

import { GAME } from './const';
import { Game } from './game';
import * as states from './states/index';
import gameState from './game-state';

import '../styles/index.less';

class BunnyWars extends Game {}

const bunnywars = new BunnyWars({
    width: GAME.SCREEN.BASE_WIDTH,
    height: GAME.SCREEN.BASE_HEIGHT,
    element: GAME.DOM_ELEMENT,
    states,
    gameState,
    default_state: GAME.DEFAULT_STATE
});

bunnywars.init();
