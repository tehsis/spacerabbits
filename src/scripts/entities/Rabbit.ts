import ISpriteEntity from './IEntity';

class Rabbit implements ISpriteEntity {
  game: Phaser.Game;
  sprite: Phaser.Sprite;

  constructor(game, x: number, y: number) {
    this.game = game;
    this.sprite = this.game.add.sprite(x, y, 'rabbit');
  }

  getSprite() {
    return this.sprite;
  }
}

export default Rabbit;
