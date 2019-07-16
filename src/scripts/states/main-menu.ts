import { GAME }  from '../const';
import gameState from '../game-state'
import Planet    from '../entities/Planet';
import Rabbit       from '../entities/Rabbit';  

const TEXT_BLINKING_TIME = 600;

class MainMenu extends Phaser.State {  
       private fireText: Phaser.Text

       private lastTimeBlinked = 0

       private rabbit: Rabbit

      create() {
        this.game.stage.backgroundColor = GAME.BACKGROUND_COLOR;

        this.game.add.sprite(GAME.SCREEN.OFFSETX, 0, 'stars');

        new Planet(this.game, 0, GAME.SCREEN.BASE_HEIGHT - 98);
        
        this.rabbit = new Rabbit(this.game, true);

        this.game.input.keyboard.onPressCallback = () => {
          gameState.goTo('MainGame');
        }

        this.fireText = this.game.add.text(145, 300, 'Press Start', {
          font: 'bold 20pt Space Mono',
          wordWrap: true,
          align: 'center',
          fill: 'white'
        });

        gameState.isOver(!gameState.isOver());
    }

    update() {
      const pointer = this.game.input.pointer1;

      if (pointer.isDown) {
        gameState.goTo('MainGame');
      }

      if (this.game.time.now - this.lastTimeBlinked  >= TEXT_BLINKING_TIME) {
        this.lastTimeBlinked = this.game.time.now;
        this.fireText.visible = !this.fireText.visible;

        if (!this.fireText.visible) {
          this.rabbit.shoot();
        }
      }

    }
};

export default MainMenu;
