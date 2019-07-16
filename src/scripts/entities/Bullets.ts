import { IGroupEntity } from './IEntity';

export default class Bullets implements IGroupEntity {
  group: Phaser.Group;
  game: Phaser.Game;
  bullets: Array<Phaser.Sprite>;

  constructor (game: Phaser.Game, amount: number) {
    this.game = game;
    this.group = this.game.add.group();
    this.group.enableBody = true;
    this.group.physicsBodyType = Phaser.Physics.ARCADE;
    
    for (let i=0; i<20; i++) {
      const bullet = this.group.create(0, 0, 'bala');
      bullet.name = `bullet{i}`;
      bullet.exists = false;
      bullet.visible = false;
      bullet.checkWorldBounds = true;
      bullet.events.onOutOfBounds.add(this.reset); 
    }
  }

  reset (bullet) {
    bullet.kill();
  }

  getGroup() {
    return this.group;
  }
}