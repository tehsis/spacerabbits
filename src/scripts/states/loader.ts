import { AssetsHandler } from '../utils/AssetsHandler';
import assetHandler from '../utils/assetHandlerManager';

class Loader extends Phaser.State {
    assets: AssetsHandler;

    create () {
      this.assets = assetHandler.getAssetsHandler(this.game);

      this.assets.loadImage('planet');
      this.assets.loadImage('stars');
      this.assets.loadImage('rabbit');
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
      this.game.state.start('MainMenu');
    }
}

export default Loader;
