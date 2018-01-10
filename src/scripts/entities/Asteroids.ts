import IGroupEntity from './IEntity';

import {GAME} from '../const';

// FIXME this positions should be always aligned with the rabbit bullets
const positions = [ 90, 140, 190, 240, 290 ].map(position => position + GAME.SCREEN.OFFSETX);

class Asteroids implements IGroupEntity {
  game: Phaser.Game;
  resource : Phaser.Group;
  onDestroyed : () => void;
  destroyedSound: Phaser.Sound;
  modifier: number;
  init_quantity: number;
  current_quantity: number;
  color: string
  asteroidType: string

  constructor (game: Phaser.Game, quantity: number, color: string, onDestroyed) {
    this.game = game;
    this.resource = this.game.add.group();
    this.onDestroyed = onDestroyed;

    this.modifier = 0;

    this.asteroidType = color == 'blue' ? `asteroids-blue`  : `asteroids-orange`;

    this.destroyedSound = this.game.add.sound('explosion')
    this.init_quantity = quantity;
    this.init();
  }

  getGroup(): Phaser.Group {
    return this.resource;
  }

  init () {
    for (let i = 0; i<this.init_quantity; i++) {
      this.createAsteroid();
    }

    this.current_quantity = this.init_quantity;
  }

  createAsteroid() {
    // TODO: Asteroids position and speed should be handled outside (eg. main-game state)

     // TODO: remove
     this.asteroidType = Math.random() > 0.5 ? `asteroids-orange` : `asteroids-blue`;

    const index = Math.round(Math.random() * (positions.length-1));
    let x = positions[index];
    let y = (Math.random() * 1000) - 900;

    let asteroid: Phaser.Sprite = this.getGroup().create(x, y, this.asteroidType);
    let animation = asteroid.animations.add('destroyed', [0,1,2,3,4]);
    this.game.physics.arcade.enable(asteroid);
    asteroid.body.setCircle(10);
    
    setInterval(() => {
        this.modifier++;
    }, GAME.INCREASE_SPEED_TIME);

    // setInterval(() => {
    //   if (this.current_quantity <= GAME.MAX_ASTEROIDS) {
    //     this.createAsteroid();
    //     this.current_quantity++;
    //   }
    // }, GAME.CREATE_ASTEROID_TIME);

    asteroid.body.gravity.y = (Math.random() * this.modifier) + 10;
    animation.onComplete.add((desroyedAsteroid: Phaser.Sprite) => {
        this.onDestroyed();
        desroyedAsteroid.kill();
        this.destroyedSound.play();
        this.createAsteroid();
    }, this);
  }

}

export default Asteroids;
