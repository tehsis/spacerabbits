import ISpriteEntity from './IEntity';
import Bullets from './bullets';
import { Map } from 'immutable';

enum Positions { LEFT_CORNER, LEFT, CENTER, RIGHT, RIGHT_CORNER };

interface IRabbitPositions {
  x: number,
  y: number,
  rotation: number
}

class Rabbit implements ISpriteEntity {
  game: Phaser.Game;
  sprite: Phaser.Sprite;
  cursors: Phaser.CursorKeys;
  availablePositions: Array<IRabbitPositions>;
  currentPosition: Positions;
  bullets: Bullets;
  bulletTime: number;

  constructor(game) {
    this.game = game;

    this.availablePositions = [
      {
        x: this.game.world.centerX-200,
        y: this.game.world.centerY+100,
        rotation: -0.50
      },
      {
        x: this.game.world.centerX-150,
        y: this.game.world.centerY+70,
        rotation: -0.25
      },
      {
        x: this.game.world.centerX-60,
        y: this.game.world.centerY+34,
        rotation: 0
      },
      {
        x: this.game.world.centerX+50,
        y: this.game.world.centerY+34,
        rotation: 0.25
      },
      {
        x: this.game.world.centerX+100,
        y: this.game.world.centerY+34,
        rotation: 0.50
      }
    ];

    this.bulletTime = 0;

    this.currentPosition = Positions.CENTER;

    this.sprite = this.game.add.sprite(
        this.availablePositions[this.currentPosition].x,
        this.availablePositions[this.currentPosition].y,
        'rabbit'
    );

    this.bullets = new Bullets(this.game, 20);
   
    this.cursors = this.game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
  }


  move() {

    if (this.cursors.left.isDown) {
      if (Positions.LEFT_CORNER !== this.currentPosition) {
        this.currentPosition--;
      }
    }

    if (this.cursors.right.isDown) {
      if (Positions.RIGHT_CORNER !== this.currentPosition) {
        this.currentPosition++;
      }
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.shoot();
    }

    this.moveTo(this.currentPosition);
  }

  moveTo(position: Positions) {
    let new_position = this.availablePositions[position];
    this.getSprite().x = new_position.x;
    this.getSprite().y = new_position.y;
    this.getSprite().rotation = new_position.rotation;
  }

  getSprite() {
    return this.sprite;
  }

  getBullets() {
    return this.bullets.getGroup();
  }

  shoot () {
    if (this.game.time.now > this.bulletTime) {
      const bullet = this.bullets.getGroup().getFirstExists(false);
      if (bullet) {
        bullet.reset(this.getSprite().x + 130, this.getSprite().y - 8 );
        bullet.body.velocity.y = -300;
        this.bulletTime = this.game.time.now + 150;
      }
    }
  }
}

export default Rabbit;
