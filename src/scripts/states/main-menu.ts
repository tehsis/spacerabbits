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

        let block_callback = false;

        this.game.add.sprite(GAME.SCREEN.OFFSETX, 50, 'Default-Alberto');
        this.game.add.button(GAME.SCREEN.OFFSETX + 170, 5, 'barcelona', () => {
          block_callback = true;
          window.location.href = "https://bit.ly/AWBarcelonaDigital"
        });

      
        this.game.input.keyboard.onPressCallback = () => {
          if (block_callback) { return; }
          gameState.goTo('MainGame');
        }

        this.game.add.sprite(GAME.SCREEN.OFFSETX, 50, 'Default-Alberto');

        this.fireText = this.game.add.text(GAME.SCREEN.OFFSETX + 5, GAME.SCREEN.OFFSETY + 430, '¡Ayudá a Alberto a seguir tirándose tiros en los pies!', {
          font: 'bold 30pt Arial',
          fill: "#f2d50f",
          wordWrap: true,
          wordWrapWidth: GAME.SCREEN.BASE_WIDTH,
          align: 'center',
        });
        
        this.fireText.stroke = "#5d45a2";
        this.fireText.strokeThickness = 5;
        //this.fireText.setShadow(2, 2, "#333333", 2, true, true);

        //this.fireText.setShadow(3, 3, 'rgba(255,255,255, 1)', 2);



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
       //   this.rabbit.shoot();
        }
      }

    }
};

export default MainMenu;
