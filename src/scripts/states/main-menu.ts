import { GAME } from '../const';
import gameState from '../game-state'

class MainMenu extends Phaser.State {
        private rabbit: Phaser.Sprite;
        private spaceText: Phaser.Text;
        private rabbitsText: Phaser.Text;
  
        create() {
          gameState.load();
          
          this.game.stage.backgroundColor = '#1F1333';

          let stars = this.game.add.sprite(0, 0, 'stars');
          stars.scale.setTo(0.5, 0.5);

          this.rabbit = this.game.add.sprite(this.game.world.centerX-120, this.game.world.centerY-300, 'rabbit-intro');

          this.spaceText = this.game.add.text(GAME.SCREEN.BASE_WIDTH+150, this.game.world.centerY-50, 'Space', {
             font: 'bold 32px Tron',
             fill: '#fff'
           });

         this.rabbitsText = this.game.add.text(-150, this.game.world.centerY-10, 'Rabbits', {
            font: 'bold 32px Tron',
            fill: '#fff'
          });
          
          let spaceTextTween = this.game.add.tween(this.spaceText);
          let rabbitsTextTween = this.game.add.tween(this.rabbitsText);

          spaceTextTween.to({x: this.game.world.centerX-90}, 800, 'Linear', true, 0);
          rabbitsTextTween.to({x: this.game.world.centerX-110}, 800, 'Linear', true, 0);

          let enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
          enter.onDown.add(() => {
            this.game.state.start('MainGame');
          });

          this.game.add.button(this.game.world.centerX - 160, this.game.world.centerY+100, 'new-game-button', () => {
            this.game.state.start('MainGame');
          }, this);

          this.game.add.button(this.game.world.centerX - 120, this.game.world.centerY+200, 'leaderboard-button', () => {
            this.game.state.start('Leaderboard');
          }, this);
      }
}

export default MainMenu;
