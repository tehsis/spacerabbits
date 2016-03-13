class MainMenu extends Phaser.State {
        create() {
          this.game.stage.backgroundColor = '#1F1333';

          let stars = this.game.add.sprite(0, 0, 'stars');
          stars.scale.setTo(0.5, 0.5);

          this.game.add.sprite(this.game.world.centerX-120, this.game.world.centerY-150, 'rabbit-intro');


          this.game.add.text(this.game.world.centerX - 150, this.game.world.centerY+100, 'Space', {
             font: 'bold 32px Tron',
             fill: '#fff'
           });

         this.game.add.text(this.game.world.centerX - 80, this.game.world.centerY+100 + 50, 'Rabbits', {
            font: 'bold 32px Tron',
            fill: '#fff'
          });

          let enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
          enter.onDown.add(() => {
            this.game.state.start('MainGame');
          });
    }
}

export default MainMenu;
