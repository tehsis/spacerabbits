import { GAME } from '../const';

import Asteroids from '../entities/Asteroids';
import Planet    from '../entities/Planet';
import Rabbit    from '../entities/Rabbit';
import GameState from '../game-state';

const style = { font: "24px Arial", fill: "#ffffff", align: "center" };
const lifeChar = "❤️";

class MainGame extends Phaser.State {
  asteroids : Asteroids;
  rabbit    : Rabbit;
  planet    : Planet;
  score     : Phaser.Text;
  lifes     : Array<Phaser.Text>;
  state     : GameState;

  create() {
    this.game.stage.backgroundColor = '#1F1333';

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state = new GameState();

    let background = this.game.add.sprite(0, 0, 'stars');
    background.scale.setTo(0.5, 0.5);

    this.planet = new Planet(this.game, 0, this.game.world.centerY + 150);
    this.asteroids = new Asteroids(this.game, GAME.NUMBER_OF_ASTEROIDS, () => {
      this.state.decreaseLife(1);
    });
    this.rabbit = new Rabbit(this.game);
    this.score = this.game.add.text(32, 32, 'Score:', style);

    this.lifes = this._createLifes();

    this.score.text = "" + this.state.getScore();
  }

  _createLifes () {
    const lifes = [];
    for (let i=0;i<this.state.getLifes();i++) {
      console.log('i', i);
      lifes.push(this.game.add.text(332, 32 + (30*i), lifeChar, style));   
    }

    return lifes;
  }

  _updateLifes () {
    this.lifes.forEach((lifeText, index) => {
      console.log('SCORE: ', index, this.state.getLifes());
      lifeText.text = (index < this.state.getLifes()) ? lifeChar : '';
    });
  }
 

  update() {
    this.rabbit.move();
    this.game.physics.arcade.overlap(this.asteroids.getGroup(), this.rabbit.getBullets(), (asteroid, bullet) => {
      asteroid.animations.play('destroyed');
      bullet.kill();
      this.state.increaseScore(10);
      this.score.text = ""+ this.state.getScore();;
    }, null, this);

    this.game.physics.arcade.overlap(this.planet.getSprite(), this.asteroids.getGroup(), (planet: Phaser.Sprite, asteroid: Phaser.Sprite) => {
      asteroid.animations.play('destroyed');
    }, null, this);

    this._updateLifes();

    if (this.state.getLifes() <= 0) {
      this.game.state.start('GameOver');
    }
  }
}

export default MainGame;
