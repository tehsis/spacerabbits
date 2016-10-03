import ISpriteEntity from './IEntity';

class Planet implements ISpriteEntity {
  game: Phaser.Game;
  sprite: Phaser.Sprite;

  constructor (game, x: number, y: number) {
    this.game = game;
    this.sprite = this.game.add.sprite(x, y, 'planet');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
  }

  getSprite () {
    return this.sprite;
  }
}

export default Planet;
