import IGroupEntity from './IEntity';

import {GAME} from '../const';

// FIXME this positions should be always aligned with the rabbit bullets
const positions = [ 5, 100, 200 ].map(position => position + GAME.SCREEN.OFFSETX);

const ZAPATOS_TYPES = ['zapato-1','zapato-2','zapato-3','zapato-4','zapato-5','zapato-6',];

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

    this.asteroidType = color == 'blue' ? `zapato-azul`  : `zapato-verde`;

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

     this.asteroidType = ZAPATOS_TYPES[Math.floor(Math.random()*ZAPATOS_TYPES.length)]

    const index = Math.round(Math.random() * (positions.length-1));
    let x = positions[index];
    let y = (Math.random() * 1000) - 900;

    let asteroid: Phaser.Sprite = this.getGroup().create(x, y, this.asteroidType);
   // let animation = asteroid.animations.add('destroyed', [0,1,2,3,4]);
    this.game.physics.enable(asteroid);
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
    // animation.onComplete.add((desroyedAsteroid: Phaser.Sprite) => {
      
    // }, this);
  }

  destroy(desroyedAsteroid: Phaser.Sprite) {
    this.onDestroyed();
    desroyedAsteroid.kill();
    this.destroyedSound.play();
    this.createAsteroid();
  }

}

export default Asteroids;
