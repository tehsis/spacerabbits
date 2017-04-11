import { GAME, API }  from '../const';
import gameState from '../game-state'
import Planet    from '../entities/Planet';
import LeaderBoardModal from '../modals/leaderboard'
import fetch from '../mocks/mocked-fetch';

class MainMenu extends Phaser.State {  
        create() {
          gameState.load();
          
          this.game.stage.backgroundColor = '#1F1333';

          let stars = this.game.add.sprite(0, 0, 'stars');
          stars.scale.setTo(0.5, 0.5);

          new Planet(this.game, 0, this.game.world.centerY + 240);
          
          this.game.add.sprite(this.game.world.centerX-90, this.game.world.centerY+80, 'rabbit-intro');

          // Buttons
          this.game.add.button(this.game.world.centerX-60, this.game.world.centerY-250, 'new-game-button', () => {
            this.game.state.start('MainGame');
          }, this);

          const leaderboardModal = new LeaderBoardModal(
            (e) => {
              this.game.state.start('MainGame');
            }, 
            (e) => {}, 
            document.body
          );

          this.game.add.button(this.game.world.centerX-60, this.game.world.centerY-200, 'leaderboard-button', () => {
            fetch(API.leaderboard)
              .then((response) => {
                return response.json();
              })
              .then((leaderboard: any) => {
                leaderboardModal.show(leaderboard);
              });
        });
      }
};

export default MainMenu;
