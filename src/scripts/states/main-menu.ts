import { GAME, API }  from '../const';
import gameState from '../game-state'
import Planet    from '../entities/Planet';
import Rabbit       from '../entities/Rabbit';  

import fetch from '../mocks/mocked-fetch';

class MainMenu extends Phaser.State {  
        create() {
          this.game.stage.backgroundColor = GAME.BACKGROUND_COLOR;

          this.game.add.sprite(GAME.SCREEN.OFFSETX, 0, 'stars');

          new Planet(this.game, 0, GAME.SCREEN.BASE_HEIGHT - 98);
          
          new Rabbit(this.game, true);

          this.game.add.button(128, 250, 'new-game-button', () => {
            gameState.reset();
            gameState.goTo('MainGame');
          }, this);

          // if (gameState.isOver()) {
          //   gameState.openModal('game-over');
          //   gameState.isOver(false);
          //   gameState.getHighScore();
          // }

          // this.game.add.button(128, 140, 'leaderboard-button', () => {
          //   gameState.openModal('leaderboard');
          //   gameState.getLeaderboard();
          // });
      }
};

export default MainMenu;
