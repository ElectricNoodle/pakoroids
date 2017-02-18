(function() {
  'use strict';

  function Highscore() {}

  Highscore.prototype = {
    create: function () {
      var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
        'I\'m a highscore table', {font: '72px Arial', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.B)){
        this.game.state.start('menu');
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.R)){
        this.game.state.start('game');
      }
    },
    onDown: function () {
      this.game.state.start('menu');
    }
  };

  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Highscore = Highscore;
}());
