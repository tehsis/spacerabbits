import { AssetsHandler } from './AssetsHandler';

let assetHandler: AssetsHandler = null;

let AssetHandlerManager = {
  getAssetsHandler: function (game) {
    if ( null === assetHandler ) {
      assetHandler = new AssetsHandler(game);
    }

    return assetHandler;
  }
};

export default AssetHandlerManager;
