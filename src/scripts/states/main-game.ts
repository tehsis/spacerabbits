import { GAME } from '../const';

import Asteroids    from '../entities/Asteroids';
import Planet       from '../entities/Planet';
import Rabbit       from '../entities/Rabbit';
import { GameState }  from '../game-state';
import gameState    from '../game-state';

const style = { font: "24px spacemono", fill: "#ffffff", align: "center" };

const SCORES = {
  SIMPLE_ASTEROID: 10
}

const ASTEROIDS = {
  LIFE: 'blue',
  REGULAR: 'orange'
}

export class MainGame extends Phaser.State {
  asteroids : Asteroids;
  rabbit    : Rabbit;
  planet    : Planet;
  score     : Phaser.Text;
  lifes     : Array<Phaser.Text>;
  state     : GameState;
  music     : Phaser.Sound

  create() {
    this.game.stage.backgroundColor = '#1F1333';

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // FIXME: This should removed, all objects should use gameState as is
    this.state = gameState;
    this.state.reset();

    let background = this.game.add.sprite(0, 0, 'stars');

    this.game.add.sprite(32, 32, 'gunpoints');
    this.music = this.game.add.sound('squarenoise', 1, true);

    this.music.play();

    this.planet = new Planet(this.game, GAME.SCREEN.OFFSETX, GAME.SCREEN.BASE_HEIGHT - 98);
    this.asteroids = new Asteroids(this.game, GAME.NUMBER_OF_ASTEROIDS, ASTEROIDS.REGULAR, () => {});
    this.rabbit = new Rabbit(this.game);
    this.rabbit.startAnimation();
    this.score = this.game.add.text(64, 38, '0', style);

    this.lifes = this._createLifes();

    this.score.text = `${this.state.getScore()}`;
  }

  _createLifes () {
    const lifes = [];
    for (let i=0;i<this.state.getLifes();i++) {
      lifes.push(this.game.add.sprite(332, 32 + (30*i), 'heart'));   
    }

    return lifes;
  }

  _updateLifes () {
    this.lifes.forEach((lifeText, index) => {
      lifeText.visible = index < this.state.getLifes();
    });
  }

  update() {
    this.rabbit.move();
    
    this.game.physics.arcade.collide(this.asteroids.getGroup(), this.rabbit.getBullets(), (asteroid, bullet) => {
      asteroid.animations.play('destroyed');
      bullet.kill();
      this.state.increaseScore(SCORES.SIMPLE_ASTEROID);
      this.score.text = `${this.state.getScore()}`;
    }, null, this);

    this.game.physics.arcade.collide(this.planet.getSprite(), this.asteroids.getGroup(), (planet: Phaser.Sprite, asteroid: Phaser.Sprite) => {
      asteroid.animations.play('destroyed');
      this.state.decreaseLife(1);
      asteroid.destroy();
      navigator.vibrate(1000);
      this.game.camera.shake(0.05, 500);
      this.game.camera.flash();
    }, null, this);

    this._updateLifes();

    this.game.camera.onShakeComplete.add(() => {
      if (this.state.getLifes() <= 0) {
        this.music.stop();
        this.state.isOver(true);
        this.game.state.start('MainMenu');
      } 
    });
   
  }
}

export default MainGame;
