
 interface IEntity {
  game: Phaser.Game;
}

export interface ISpriteEntity extends IEntity {
  getSprite?(): Phaser.Sprite;
}

export interface IGroupEntity extends IEntity {
  getGroup?(): Phaser.Group;
}

export default IEntity;
