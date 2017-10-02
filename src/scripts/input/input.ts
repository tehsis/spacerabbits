/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />

export default class Input {
  game: Phaser.Game
  block: boolean
  constructor (game: Phaser.Game) {
    this.game = game;
    this.block = false;
  }

  checkAction (rabbitPosition) {
    const pointer = this.game.input.pointer1;
    const screen = this.game.width;

    if (pointer.isDown && !this.block) {
      this.block = true;      
      if (pointer.positionDown.x > this.game.width-100) {
          return 'RIGHT';
      }

      if (pointer.positionDown.x < 100) {
        return 'LEFT';
      }
   }

   if (pointer.isUp) {
    this.block = false;
   }
   
   return null;
  }
}