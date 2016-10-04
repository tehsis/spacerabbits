import IGroupEntity from './IEntity';

class Asteroids implements IGroupEntity {
  game: Phaser.Game;
  resource : Phaser.Group;
  onDestroyed : () => void;

  constructor (game: Phaser.Game, quantity: number, onDestroyed) {
    console.log('creating');
    this.game = game;
    this.resource = this.game.add.group();
    this.onDestroyed = onDestroyed;

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
    let y = (Math.random() * 1000) - 900;

    let asteroid: Phaser.Sprite = this.getGroup().create(x, y, 'destroyed', 0);
    let animation = asteroid.animations.add('destroyed');
    this.game.physics.arcade.enable(asteroid);
    asteroid.body.gravity.y = 50;
    animation.onComplete.add((desroyedAsteroid: Phaser.Sprite) => {
        this.onDestroyed();
        desroyedAsteroid.kill();
        this.createAsteroid();
    }, this);
  }

}

export default Asteroids;
