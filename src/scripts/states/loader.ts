import { AssetsHandler } from '../utils/AssetsHandler';
import assetHandler from '../utils/assetHandlerManager';
import gameState from '../game-state';

const images = [
 ['planet'],
 ['stars'],
 ['heart'],
 ['bala'],
 ['gunpoints'],
 ['new-game-button'],
 ['leaderboard-button'],
 ['main-menu-button'],
];

const sounds = [
  ['shoot'],
  ['newlife'],
  ['explosion'],
  ['jump'],
  ['squarenoise', 'mp3'],
];

const sheets: [string, number, number, string?][] = [
  ['asteroids-orange', 23, 24],
  ['asteroids-blue', 23, 24],
  ['rabbit-sheet', 131, 171, 'svg']
];

class Loader extends Phaser.State {
    assets: AssetsHandler;
    game: Phaser.Game

    create () {
      this.assets = assetHandler.getAssetsHandler(this.game);

      this.game.load.onLoadComplete.add(this._loadComplete, this);

      images.forEach(([image, type]) => this.assets.loadImage(image, type));
      sounds.forEach(([sound, type]) => this.assets.loadSound(sound, type));
      sheets.forEach(([name, width, height, type]) => this.assets.loadSpreadSheet(name, width, height, type));

      this.game.load.start();
    }

    async _loadComplete() {
      const state = gameState.getJSON();
      if (state.screen && ['Loader', 'Boot'].indexOf(state.screen) === -1) {
        gameState.goTo(state.screen);
      } else {
        gameState.goTo('MainMenu');
      }
    }
}

export default Loader;
