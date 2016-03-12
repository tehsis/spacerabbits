import { GAME } from '../const';

import Asteroids from '../entities/Asteroids';
import Planet    from '../entities/Planet';
import Rabbit    from '../entities/Rabbit';

class MainGame extends Phaser.State {
  asteroids : Asteroids;
  rabbit    : Rabbit;
  planet    : Planet;

  create() {
    this.game.stage.backgroundColor = '#1F1333';

    this.game.physics.startSystem(Phaser.Physics.NINJA);
    this.game.physics.ninja.gravity = 0.1;

    let background = this.game.add.sprite(0, 0, 'stars');
    background.scale.setTo(0.5, 0.5);

    this.planet = new Planet(this.game, 0, this.game.world.centerY + 300);
    this.asteroids = new Asteroids(this.game, GAME.NUMBER_OF_ASTEROIDS);
    this.rabbit = new Rabbit(this.game, this.game.world.centerX-60, this.game.world.centerY+34);
  }

  update() {
    this.game.physics.ninja.overlap(this.planet.getSprite(), this.asteroids.getGroup(), (planet: Phaser.Sprite, asteroid: Phaser.Sprite) => {
      asteroid.animations.play('destroyed');
    }, null, this);

  }
}

export default MainGame;
