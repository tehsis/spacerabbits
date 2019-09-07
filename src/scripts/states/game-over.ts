import gameState from '../game-state';
import { GAME }  from '../const';
const TEXT_BLINKING_TIME = 600;
const TIME_TO_MAINMENU = 5000;


class GameOver extends Phaser.State {
  texts: Phaser.Text[]
  private lastTimeBlinked = 0

  create() {
    this.game.stage.backgroundColor = GAME.BACKGROUND_COLOR;

    let stars = this.game.add.sprite(0, 0, 'stars');
    stars.scale.setTo(0.5, 0.5);

    this.texts = [
      this.game.add.text(this.game.world.centerX - 75, this.game.world.centerY-100, 'Game Over', {
        font: 'bold 20pt Space Mono',
        fill: '#fff'
      }),


        this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY - 30, "Your score is", {
          font: 'bold 20pt Space Mono',
          boundsAlignH: 'center',
          fill: '#fff'
        }),

        this.game.add.text(this.game.world.centerX - 10, this.game.world.centerY + 40, `${gameState.getScore()}`, {
          font: 'bold 20pt Space Mono',
          align: "center",
          boundsAlignH: 'center',
          fill: '#fff'
        }),
      ];

      const goToMainMenuTimeOut = setTimeout(() => true || gameState.goTo('MainMenu'), TIME_TO_MAINMENU);

      this.game.input.keyboard.onPressCallback = () => {
        clearTimeout(goToMainMenuTimeOut);
        gameState.goTo('MainMenu');
      }
   }

  update() {
    if (this.game.time.now - this.lastTimeBlinked  >= TEXT_BLINKING_TIME) {
      this.lastTimeBlinked = this.game.time.now;
      this.texts.forEach((text) => text.visible = !text.visible);
    }
  }
}

export default GameOver;
