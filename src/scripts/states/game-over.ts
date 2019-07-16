import gameState from '../game-state';
import { GAME }  from '../const';
const TEXT_BLINKING_TIME = 600;


class GameOver extends Phaser.State {
  texts: Phaser.Text[]
  private lastTimeBlinked = 0

  create() {
    this.game.stage.backgroundColor = GAME.BACKGROUND_COLOR;

    let stars = this.game.add.sprite(0, 0, 'stars');
    stars.scale.setTo(0.5, 0.5);

    this.texts = [
      this.game.add.text(this.game.world.centerX - 30, this.game.world.centerY-100, 'Game', {
        font: 'bold 20pt Space Mono',
        fill: '#fff'
      }),

      this.game.add.text(this.game.world.centerX - 30, this.game.world.centerY-50, 'Over', {
          font: 'bold 20pt Space Mono',
          fill: '#fff'
        }),


        this.game.add.text(this.game.world.centerX - 80, this.game.world.centerY + 80, "Your score", {
          font: 'bold 20pt Space Mono',
          boundsAlignH: 'center',
          fill: '#fff'
        }),

        this.game.add.text(this.game.world.centerX - 30, this.game.world.centerY + 150, `${gameState.getScore()}`, {
          font: 'bold 20pt Space Mono',
          align: "center",
          boundsAlignH: 'center',
          fill: '#fff'
        }),
      ];

      const goToMainMenuTimeOut = setTimeout(() => gameState.goTo('MainMenu'), 5000);

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
