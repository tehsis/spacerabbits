import gameState from '../game-state';
import { GAME }  from '../const';
const TEXT_BLINKING_TIME = 5000;
const TIME_TO_MAINMENU = 5000;


class GameOver extends Phaser.State {
  texts: Phaser.Text[]
  private lastTimeBlinked = 0
  private goToMainMenuTimeOut: NodeJS.Timeout

  create() {
    this.game.stage.backgroundColor = GAME.BACKGROUND_COLOR;

    this.game.add.sprite(GAME.SCREEN.OFFSETX + 170, 5, 'barcelona');

    this.texts = [
      this.game.add.text(
        this.game.world.centerX - 150, 
        this.game.world.centerY - 100, 
        `¡Qué pena!\n\¡Pegaste ${gameState.getScore()} menos tiros\nen los pies de Alberto\nque el propio Alberto!\n\n¡Volvé a intentarlo!`,
        {
          font: 'bold 15pt Space Mono',
          fill: '#000',
          align: 'center'
        }
      )
    ];

    this.game.add.button(
      this.game.world.centerX - 30, 
      this.game.world.centerY + 100,
      'twitter',
      () => {
        window.location.href = `https://twitter.com/intent/tweet?text=¡Me sume a la guerra contra la inflación y pude bajar ${gameState.getScore()} precios más que Alberto!&url=https://albertowars-barcelona.alidion.studio&hashtags=albertowars&via=revisbarcelona`
      }
    )

    this.game.add.button(
      this.game.world.centerX - 115, 
      this.game.world.centerY + 180,
      'suscribite',
      () => {
        window.location.href = "https://bit.ly/AWBarcelonaDigital";
      }
    )

    this.goToMainMenuTimeOut = setTimeout(() => gameState.goTo('MainMenu'), TIME_TO_MAINMENU);

    this.game.input.keyboard.onPressCallback = () => {
      clearTimeout(this.goToMainMenuTimeOut);
      gameState.goTo('MainMenu');
    }
   }

  update() {
    // if (this.game.time.now - this.lastTimeBlinked  >= TEXT_BLINKING_TIME) {
    //   this.lastTimeBlinked = this.game.time.now;
    //   this.texts.forEach((text) => text.visible = !text.visible);
    // }

    const pointer = this.game.input.pointer1;

    if (pointer.isDown) {
      clearTimeout(this.goToMainMenuTimeOut);
      gameState.goTo('MainGame');
    }
  }
}

export default GameOver;
