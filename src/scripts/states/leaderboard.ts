import { GAME, API } from '../const';
import 'isomorphic-fetch'

class Leaderboard extends Phaser.State {
        private rabbit: Phaser.Sprite;
        private spaceText: Phaser.Text;
        private rabbitsText: Phaser.Text;
  
        create() {
          this.game.stage.backgroundColor = '#1F1333';
          let stars = this.game.add.sprite(0, 0, 'stars');
          stars.scale.setTo(0.5, 0.5);

          this.game.add.text(this.game.world.centerX-170, this.game.world.centerY-250, 'Leaderboard', {
             font: 'bold 20px spacemono',
             fill: '#fff'
           });

          fetch(API.leaderboard)
            .then((response) => {
              return response.json()
            }).then((leaderboad: any) => {
              alert('!');
              leaderboad.forEach((r, i) => {
                this.game.add.text(this.game.world.centerX-150, this.game.world.centerY-200 + (i*40), `${i+1}. ${r.Username}`, {
                  font: 'bold 20px spacemono',
                  fill: '#fff'
                });

                this.game.add.text(this.game.world.centerX + 20, this.game.world.centerY-200 + (i*40), r.Points, {
                  font: 'bold 20px spacemono',
                  fill: '#fff'
                });
              })
            });

           this.game.add.button(this.game.world.centerX-170, this.game.world.centerY+250, 'main-menu-button', () => {
             this.game.state.start('MainMenu')
           }, this);
      }
}

export default Leaderboard;
