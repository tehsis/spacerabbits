import IGroupEntity from './IEntity';

class Asteroids implements IGroupEntity {
  game: Phaser.Game;
  resource : Phaser.Group;
  onDestroyed : () => void;
  destroyedSound: Phaser.Sound;
  modifier: number;

  constructor (game: Phaser.Game, quantity: number, onDestroyed) {
    this.game = game;
    this.resource = this.game.add.group();
    this.onDestroyed = onDestroyed;

    this.modifier = 0;

    this.destroyedSound = this.game.add.sound('explosion')
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
    const positions = [
      this.game.world.centerX-68, 
      this.game.world.centerX-60, 
      this.game.world.centerX+65,
      this.game.world.centerX+180,  
    ];

    const index = Math.round(Math.random() * (positions.length-1));
    let x = positions[index];
    let y = (Math.random() * 1000) - 900;

    let asteroid: Phaser.Sprite = this.getGroup().create(x, y, 'destroyed', 0);
    let animation = asteroid.animations.add('destroyed');
    this.game.physics.arcade.enable(asteroid);
    asteroid.body.setCircle(10);
    setInterval(() => {
        this.modifier++;
    }, 10000);
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
