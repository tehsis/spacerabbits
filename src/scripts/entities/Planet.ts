import IEntity from './IEntity';

class Planet implements IEntity {
  game: Phaser.Game;
  sprite: Phaser.Sprite;
  
  constructor (game, x: number, y: number) {
    this.game = game;
    this.sprite = this.game.add.sprite(x, y, 'planet');
    this.game.physics.ninja.enable(this.sprite);
    this.sprite.body.immovable = true;
  }

  getSprite () {
    return this.sprite;
  }
}

export default Planet;