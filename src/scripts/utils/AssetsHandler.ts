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

  getImageSVG (asset: string): string {
    return this.get('images', `${asset}.svg`);
  }

  getAudio (asset: string, format: string = 'wav'): string {
    return this.get('sounds', `${asset}.${format}`);
  }

  loadImage (name: string) {
    let i = this.game.load.image(name, this.getImage(name));
  }

  loadImageSVG (name: string) {
    let i = this.game.load.image(name, this.getImageSVG(name));
  }

  loadSpreadSheet (name:string, width: number, height: number) {
    this.game.load.spritesheet(name, this.getImage(name), width, height);
  }

  loadSpreadSheetSVG(name:string, width: number, height: number) {
    this.game.load.spritesheet(name, this.getImageSVG(name), width, height);
  }

  loadSound (name: string, format?: string) {
    this.game.load.audio(name, this.getAudio(name, format))
  }
  
}

export {AssetsHandler};
