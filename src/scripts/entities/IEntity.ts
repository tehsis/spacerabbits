
interface IEntity {
  game: Phaser.Game;
  getGroup?(): Phaser.Group;
  getSprite?(): Phaser.Sprite;
};

export default IEntity;
