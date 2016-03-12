import IEntity from './IEntity';

class Asteroids implements IEntity {
  game: Phaser.Game;
  resource : Phaser.Group;

  constructor (game: Phaser.Game, quantity: number) {
    this.game = game;
    this.resource = this.game.add.group();

    this.init(quantity);
  }

  getGroup(): Phaser.Group {
    return this.resource;
  }

  init (quantity: number) {
    for (let i = 0; i<quantity; i++) {
      this.createAsteroid();
    }
  }

  createAsteroid() {
    let x = Math.random() * 320
    let y = (Math.random() * 1000) - 200;

    let asteroid: Phaser.Sprite = this.getGroup().create(x, y, 'destroyed', 0);
    let animation = asteroid.animations.add('destroyed');
    this.game.physics.ninja.enable(asteroid);
    asteroid.body.moveDown(200);
    animation.onComplete.add((desroyedAsteroid: Phaser.Sprite) => {
        desroyedAsteroid.kill();
        this.createAsteroid();
    }, this);
  }

}

export default Asteroids;
