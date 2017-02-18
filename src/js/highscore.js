(function() {
  'use strict';

  function Highscore() {}

  Highscore.prototype = {
    create: function () {
      this.background = this.game.add.tileSprite(this.game.LBOUNDX,this.game.LBOUNDY,1366,768, 'background');
      var text = this.add.text(this.game.width * 0.5, 20,
        'Highscores', {font: '42px VT323', fill: '#ffffff', align: 'center'
      });

      var textYPos = 40

      for (var i = 0; i < window.scores.length; i++) {
        var score = window.scores[i]
        this.add.text(this.game.width * 0.3, textYPos, score.username, {font: '42px VT323', fill: '#ffffff', align: 'left'})
        this.add.text(this.game.width * 0.6, textYPos, score.score, {font: '42px VT323', fill: '#ffffff', align: 'left'})
        textYPos += 40
      }
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
