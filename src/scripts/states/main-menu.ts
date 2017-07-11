import { GAME, API }  from '../const';
import gameState from '../game-state'
import Planet    from '../entities/Planet';
import Rabbit       from '../entities/Rabbit';  

import fetch from '../mocks/mocked-fetch';

class MainMenu extends Phaser.State {  
        create() {
          // gameState.load();
          
          this.game.stage.backgroundColor = '#1F1333';

          let stars = this.game.add.sprite(0, 0, 'stars');

          new Planet(this.game, 0, this.game.world.centerY + 240);
          
          new Rabbit(this.game, true);

          this.game.add.button(128, 75, 'new-game-button', () => {
            gameState.goTo('MainGame');
          }, this);

          if (gameState.isOver()) {
            gameState.openModal('game-over');
          }

          this.game.add.button(128, 140, 'leaderboard-button', () => {
            gameState.openModal('leaderboard');
            gameState.getLeaderboard();
          });
      }
};

export default MainMenu;
