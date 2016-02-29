import { AssetsHandler } from '../utils/AssetsHandler';

interface IEntity {
  assets: AssetsHandler;

  game: Phaser.Game

  load();
};

export {IEntity};
