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

  getImage (asset: string, format = 'png'): string {
    return this.get('images', `${asset}.${format}`);
  }

  getAudio (asset: string, format: string = 'wav'): string {
    return this.get('sounds', `${asset}.${format}`);
  }

  loadImage (name: string, type = 'png') {
    let i = this.game.load.image(name, this.getImage(name, type));
  }

  loadSpreadSheet (name:string, width: number, height: number, imageType = 'png') {
    this.game.load.spritesheet(name, this.getImage(name, imageType), width, height);
  }

  loadSound (name: string, format?: string) {
    this.game.load.audio(name, this.getAudio(name, format))
  }
  
}

export {AssetsHandler};
