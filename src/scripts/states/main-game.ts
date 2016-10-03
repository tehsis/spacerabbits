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

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    let background = this.game.add.sprite(0, 0, 'stars');
    background.scale.setTo(0.5, 0.5);

    this.planet = new Planet(this.game, 0, this.game.world.centerY + 150);
    this.asteroids = new Asteroids(this.game, GAME.NUMBER_OF_ASTEROIDS);
    this.rabbit = new Rabbit(this.game);
  }

  update() {
    this.rabbit.move();
    this.game.physics.arcade.overlap(this.asteroids.getGroup(), this.rabbit.getBullets(), (asteroid, bullet) => {
      console.log('pichun!');
      asteroid.animations.play('destroyed');
      bullet.kill();
    }, null, this);

    this.game.physics.arcade.overlap(this.planet.getSprite(), this.asteroids.getGroup(), (planet: Phaser.Sprite, asteroid: Phaser.Sprite) => {
      asteroid.animations.play('destroyed');
    }, null, this);

  }
}

export default MainGame;
