import login from '../extras/login';
import InputElement from '../extras/input'
import { API } from '../const'
import gameState from '../game-state';

import { writeActionText } from '../utils/write';

export default class Share extends Phaser.State {
  inputElement : InputElement
  fbTxt: Phaser.Text
  menuTxt: Phaser.Text
  create () {
    let stars = this.game.add.sprite(0, 0, 'stars');
    stars.scale.setTo(0.5, 0.5);

    this.inputElement = new InputElement(document.getElementById(this.game.parent as any), 70, 200, 200);

    if ('' !== gameState.getUserName().trim()) {
      this.inputElement.hide();
    }

    this.fbTxt = writeActionText(this.game, 'Send score!', 60, 300);
    this.menuTxt = writeActionText(this.game, 'Return to Main Menu', 60, 400);

    this.menuTxt.inputEnabled = true;
    this.menuTxt.events.onInputUp.add(this.onMenuTap, this)
    
    this.fbTxt.inputEnabled = true;
    this.fbTxt.events.onInputUp.add(this.onFbTap, this)

  }

  onMenuTap () {
    this.game.state.start('MainMenu')
  }

  async onFbTap () {
    const accessToken = await login.login('facebook');
    const form = new FormData();
    writeActionText(this.game, 'Sending Score...', 70, 200);
    this.fbTxt.destroy();

    this.inputElement.hide();
    
    if ('' === gameState.getUserName().trim()) {
      gameState.setUsername(this.inputElement.value().trim())
    }

    // TODO: (maybe?) handle success/error
    gameState.save()
      .then(() => {
        form.append('username', gameState.getUserName());
        form.append('score', `${gameState.getScore()}`);
        login.share(gameState.getScore());
        fetch(API.leaderboard, {
          method: 'POST',
          headers: {
            'Authorization': accessToken
          },
          body: form
        }).then(() => {
          this.game.state.start('Leaderboard');
        }).catch(() => {
          this.game.state.start('Leaderboard');
        })
      })
      .catch(() => {
        console.trace();
      });

    
  }
    

  shutdown () {
    this.inputElement.remove();
  }
}