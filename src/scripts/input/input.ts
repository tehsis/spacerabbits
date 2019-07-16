/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />

export default class Input {
  game: Phaser.Game
  block: boolean
  cursors: Phaser.CursorKeys

  constructor (game: Phaser.Game) {
    this.game = game;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.block = false;
  }

  checkAction () {
    const pointer = this.game.input.pointer1;

    if (this.cursors.left.justDown && !this.block) {
      return 'LEFT';
    }

    if (this.cursors.right.justDown && !this.block) {
      return 'RIGHT';
    }

    if (pointer.isDown && !this.block) {
      this.block = true;      
      if (pointer.positionDown.x > this.game.width/2) {
          return 'RIGHT';
      }

      if (pointer.positionDown.x < this.game.width/2) {
        return 'LEFT';
      }
   }

   if (pointer.isUp || this.cursors.left.isUp || this.cursors.left.isUp) {
    this.block = false;
   }
   
   return null;
  }
}