/// <reference path="../../../node_modules/phaser-swipe/phaser-swipe.d.ts" />
import Swipe from 'phaser-swipe';

export default class Input {

  cursors: Phaser.CursorKeys;
  swipe: Swipe;

  constructor (game: Phaser.Game) {
    this.swipe = new Swipe(game);
  }

  checkAction () {
    const direction = this.swipe.check();
    switch (direction && direction.direction ) {
      case this.swipe.DIRECTION_UP_LEFT:
      case this.swipe.DIRECTION_DOWN_LEFT:
      case this.swipe.DIRECTION_LEFT:
        return 'LEFT';
      case this.swipe.DIRECTION_UP_RIGHT:
      case this.swipe.DIRECTION_DOWN_RIGHT:
      case this.swipe.DIRECTION_RIGHT:
        return 'RIGHT';
      case this.swipe.DIRECTION_UP: 
        return 'UP';
    }

    return null;
  }
}