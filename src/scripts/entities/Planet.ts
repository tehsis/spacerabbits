import ISpriteEntity from './IEntity';

import { GAME } from '../const';

class Planet implements ISpriteEntity {
  game: Phaser.Game;
  sprite: Phaser.Sprite;

  constructor (game, x: number, y: number) {
    this.game = game;
    this.sprite = this.game.add.sprite(x, y, 'planet');
    this.sprite.width = GAME.SCREEN.BASE_WIDTH;
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.setSize(GAME.SCREEN.BASE_WIDTH, 20);
    //this.sprite.body.setCircle(230, -50, 0);
  }

  setTint(tint: number) {
    this.sprite.tint = tint;
  }

  getSprite () {
    return this.sprite;
  }
}

export default Planet;
