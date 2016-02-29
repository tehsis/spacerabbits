import { AssetsHandler } from '../utils/AssetsHandler';

class Loader extends Phaser.State {
    assets: AssetsHandler;

    create () {
      this.assets = new AssetsHandler(this.game);

      this.assets.loadImage('planet');
      this.assets.loadImage('stars');
      this.assets.loadSpreadSheet('destroyed', 20, 20);

      this.game.load.onLoadStart.add(this._loadStart, this);
      this.game.load.onLoadComplete.add(this._loadComplete, this);

      this.game.load.start();
    }

    start() {

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

export { Loader };
