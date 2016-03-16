import ISpriteEntity from './IEntity';
import Swipe from 'phaser-swipe';
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
  swipe: Swipe;

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

    this.currentPosition = Positions.CENTER;

    this.sprite = this.game.add.sprite(
        this.availablePositions[this.currentPosition].x,
        this.availablePositions[this.currentPosition].y,
        'rabbit'
    );
   
    this.swipe = new Swipe(this.game);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  checkTouch () {
    let swipe = this.swipe.check();

    return swipe;
  }

  move() {

    let swipe_direction = this.checkTouch();

    if (this.cursors.left.isDown || (swipe_direction && (swipe_direction.direction === this.swipe.DIRECTION_LEFT))) {
      if (Positions.LEFT_CORNER !== this.currentPosition) {
        this.currentPosition--;
      }
    }

    if (this.cursors.right.isDown || (swipe_direction && (swipe_direction.direction === this.swipe.DIRECTION_RIGHT))) {
      if (Positions.RIGHT_CORNER !== this.currentPosition) {
        this.currentPosition++;
      }
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
}

export default Rabbit;
