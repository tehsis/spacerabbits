import { AssetsHandler } from '../utils/AssetsHandler';
import assetHandler from '../utils/assetHandlerManager';
import gameState from '../game-state';

class Loader extends Phaser.State {
    assets: AssetsHandler;

    create () {
      this.assets = assetHandler.getAssetsHandler(this.game);

      this.assets.loadImage('planet');
      this.assets.loadImage('stars');
      this.assets.loadImage('heart');
      this.assets.loadImage('bala');
      this.assets.loadImage('gunpoints');
      this.assets.loadImage('new-game-button')
      this.assets.loadImage('leaderboard-button')
      this.assets.loadImage('main-menu-button')
      this.assets.loadSound('shoot');
      this.assets.loadSound('explosion');
      this.assets.loadSound('jump');
      this.assets.loadSound('squarenoise', 'mp3');
      
      this.assets.loadSpreadSheet('asteroids-orange', 23, 24);
      this.assets.loadSpreadSheet('asteroids-blue', 23, 24);
      this.assets.loadSpreadSheetSVG('rabbit-sheet', 131, 171);

      this.game.load.onLoadStart.add(this._loadStart, this);
      this.game.load.onLoadComplete.add(this._loadComplete, this);

      this.game.load.start();
    }

    _loadStart() {
      this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, 'Loading...', {
         font: 'bold 32px Tron',
         fill: '#fff'
     });
    }

    _loadComplete() {
      gameState.load().then(() => {
        this.game.state.start('MainMenu');
      }).catch(() => {
        this.game.state.start('MainMenu');
      })
    }
}

export default Loader;
