(function() {
  'use strict';

  function Gameover() {}

  Gameover.prototype = {
    create: function () {
      this.background = this.game.add.tileSprite(this.game.LBOUNDX,this.game.LBOUNDY,1366,768, 'background');
      this.world.setBounds(0, 0, 1024, 768);

      var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
        'You dead, score: ' + this.game.state.states['gameover'].score , {font: '72px Arial', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);
      this.input.onDown.add(this.onDown, this);
      console.log(this);
    },
    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.H)){
        this.game.state.start('highscore');
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.R)){
        this.game.state.start('game');
      }
    },
    onDown: function () {
      //this.game.state.start('menu');
    }
  };

  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Gameover = Gameover;
}());
