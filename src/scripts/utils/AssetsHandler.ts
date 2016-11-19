import { GAME } from '../const';

class AssetsHandler {
  game: Phaser.Game;
  base: string;

  constructor (game) {
    this.game = game;
    this.base = './assets';
  }

  get (type: string, asset: string): string {
    return `${this.base}/${type}/${asset}`;
  }

  getImage (asset: string): string {
    return this.get('images', `${asset}.png`);
  }

  loadImage (name: string) {
    this.game.load.image(name, this.getImage(name));
  }

  loadSpreadSheet (name:string, width: number, height: number) {
    this.game.load.spritesheet(name, this.getImage(name), width, height);
  }
}

export {AssetsHandler};
