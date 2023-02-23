import { GAME } from '../const';

import Asteroids    from '../entities/Asteroids';
import Planet       from '../entities/Planet';
import Rabbit       from '../entities/Rabbit';
import { GameState }  from '../game-state';
import gameState    from '../game-state';

const style = { font: 'bold 40pt Space Mono', fill: "#000", align: "center" };

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
  newLifeSound  : Phaser.Sound

  lifeUp    : Boolean

  create() {
    this.game.stage.backgroundColor = GAME.BACKGROUND_COLOR;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state = gameState;

    this.state.reset();


    this.game.add.image(0, 0, 'background');

    this.planet = new Planet(this.game, 0, GAME.SCREEN.BASE_HEIGHT);


    this.music = this.game.add.sound('squarenoise', 1, true);
    this.newLifeSound = this.game.add.sound('newlife', 1);

    this.music.play();

    this.asteroids = new Asteroids(this.game, GAME.NUMBER_OF_ASTEROIDS, ASTEROIDS.REGULAR, () => {});
    this.rabbit = new Rabbit(this.game);
    this.score = this.game.add.text(30, 35, '0', style);

    this.lifes = this.createLifes();

    this.score.text = `${this.state.getScore()}`;
  }

  private createLifes () {
    const lifes = [];
    for (let i=0;i<5;i++) {
      lifes.push(this.game.add.sprite(322, 32 + (50*i), 'alberto-vida'));   
    }

    return lifes;
  }

  private updateLifes () {
    this.lifes.forEach((lifeText, index) => {
      lifeText.visible = index < this.state.getLifes();
    });
  }

  update() {
    this.rabbit.move();
    
    this.game.physics.arcade.collide(this.asteroids.getGroup(), this.rabbit.getBullets(), (asteroid, bullet) => {      
      this.asteroids.destroy(asteroid);

      bullet.kill();
      this.state.increaseScore(SCORES.SIMPLE_ASTEROID);
      
      if (this.state.getScore() % 200 === 0 && this.state.getLifes() < 5) {
        this.state.increaseLife(1);
        this.newLifeSound.play();
      }

      this.score.text = `${this.state.getScore()}`;
    }, null, this);

    this.game.physics.arcade.collide(this.planet.getSprite(), this.asteroids.getGroup(), (planet: Phaser.Sprite, asteroid: Phaser.Sprite) => {
      this.asteroids.destroy(asteroid);
      this.state.decreaseLife(1);
        if (navigator.vibrate) {
        navigator.vibrate(1000);
      }
      this.game.camera.shake(0.05, 500);
      this.game.camera.flash();
    }, null, this);

    this.updateLifes();

    this.game.camera.onShakeComplete.add(() => {
      debugger;
      if (this.state.getLifes() <= 0) {
        this.music.stop();
        this.state.isOver(true);
        this.state.goTo('GameOver');
      } 
    });
   
  }
}

export default MainGame;
