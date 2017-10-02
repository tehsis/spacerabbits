import ISpriteEntity from './IEntity';
import Input from '../input/input';
import Bullets from './bullets';
import { Map } from 'immutable';

enum Positions { LEFT_CORNER, LEFT, CENTER, RIGHT, RIGHT_CORNER };

const availablePositions = [
  {
    x: 0,
    y: 450,
    rotation: 0
  },
  {
    x: 50,
    y: 450,
    rotation: 0
  },
  {
    x: 100,
    y: 450,
    rotation: 0
  },
  {
    x: 150,
    y: 450,
    rotation: 0
  },
  {
    x: 200,
    y: 450,
    rotation: 0
  }
];

interface IRabbitPositions {
  x: number,
  y: number,
  rotation: number
}

class Rabbit implements ISpriteEntity {
  game: Phaser.Game;
  sprite: Phaser.Sprite;
  shootSound: Phaser.Sound;
  jumpSound: Phaser.Sound;
  currentPosition: Positions;
  bullets: Bullets;
  bulletTime: number;
  lock: boolean;
  input: Input;

  constructor(game, fixedPosition?: Boolean) {
    this.game = game;
    this.lock = false;
    

    this.bulletTime = 0;

    this.currentPosition = Positions.CENTER;

    this.sprite = this.game.add.sprite(
      availablePositions[this.currentPosition].x,
      availablePositions[this.currentPosition].y,
      'rabbit'
    );

    this.sprite.rotation = availablePositions[this.currentPosition].rotation;


      this.shootSound = this.game.add.sound("shoot");
      this.jumpSound = this.game.add.sound('jump');

      this.input = new Input(this.game);

      this.bullets = new Bullets(this.game, 20);

      this.game.input.onTap.add((pointer) => {
        this.shoot()
      });
    

  }


  move() {
    const action = this.input.checkAction(availablePositions[this.currentPosition]);

    if (action === 'LEFT') {
      if (Positions.LEFT_CORNER !== this.currentPosition) {
        this.currentPosition--;
      }
    }
  
    if (action === 'RIGHT') {
      if (Positions.RIGHT_CORNER !== this.currentPosition) {
        this.currentPosition++;
      }
    }

    this.moveTo(this.currentPosition);
  }

  moveTo(position: Positions) {
    let new_position = availablePositions[position];
    if (this.getSprite().x !== new_position.x && this.getSprite().y !== new_position.y) {
      this.jumpSound.play()
    }
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
        bullet.reset(this.getSprite().x + 112, this.getSprite().y - 8 );
        bullet.body.velocity.y = -300;
        this.bulletTime = this.game.time.now + 150;
        this.shootSound.play()
      }
    }
  }
}

export default Rabbit;
