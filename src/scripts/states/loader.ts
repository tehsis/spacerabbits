import { AssetsHandler } from '../utils/AssetsHandler';
import assetHandler from '../utils/assetHandlerManager';
import gameState from '../game-state';

class Loader extends Phaser.State {
    assets: AssetsHandler;

    create () {
      this.assets = assetHandler.getAssetsHandler(this.game);

      this.assets.loadImage('planet');
      this.assets.loadImage('stars');
      this.assets.loadImage('rabbit');
      this.assets.loadImage('rabbit-intro');
      this.assets.loadImage('bala');
      this.assets.loadImage('new-game-button')
      this.assets.loadImage('leaderboard-button')
      this.assets.loadImage('main-menu-button')
      this.assets.loadSound('shoot');
      this.assets.loadSound('explosion');
      this.assets.loadSound('jump');

      this.assets.loadSpreadSheet('destroyed', 20, 21);

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
