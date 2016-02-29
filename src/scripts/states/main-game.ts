import { Asteroids } from '../entities/Asteroids';

class MainGame extends Phaser.State {
  entities: {
    asteroids?: Phaser.Group,
    planet?: Phaser.Sprite
  };

  preload() {
    this.entities = {};
  }

  create() {
    this.game.stage.backgroundColor = '#1F1333';

    this.game.physics.startSystem(Phaser.Physics.NINJA);
    this.game.physics.ninja.gravity = 1;

    this.game.add.sprite(0, 0, 'stars');
    this.entities.planet = this.game.add.sprite(0, this.game.world.centerY + 157, 'planet');
    this.game.physics.ninja.enable(this.entities.planet);
    this.entities.planet.body.immovable = true;

    this.entities.asteroids = this.game.add.group();

  //  this.entities.asteroids.enableBody = true;
    for (let i = 0; i<10; i++) {
      this._createAsteroid((Math.random() * 320), -(Math.random() * 1000));
    }

  }

  _createAsteroid(x: number, y: number) {
    let asteroid: Phaser.Sprite = this.entities.asteroids.create(x, y, 'destroyed', 0);
    let anim = asteroid.animations.add('destroyed');
    this.game.physics.ninja.enable(asteroid);
    asteroid.body.moveDown(900);
    anim.onComplete.add((as: Phaser.Sprite) => {
        as.kill();
        this._createAsteroid((Math.random() * 320), (Math.random() * 1000));
    }, this);
  }

  update() {
    this.game.physics.ninja.overlap(this.entities.planet, this.entities.asteroids, (planet: Phaser.Sprite, asteroid: Phaser.Sprite) => {
      asteroid.animations.play('destroyed');
    }, null, this);
  }
}

export { MainGame };
