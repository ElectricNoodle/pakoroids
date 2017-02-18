(function() {
  'use strict';

  function Highscore() {}

  Highscore.prototype = {
    create: function () {
      this.background = this.game.add.tileSprite(0, 0,1366,768, 'background');
      var text = this.add.text(this.game.width * 0.5, 60,
        'Highscores', {font: '42px Revalia', fill: '#ffffff', align: 'center'
      });

      this.add.text(this.game.width * 0.05, 700,
        'Push B to go back, Push R to (Re)start game', {font: '32px Revalia', fill: '#ffffff', align: 'center'
      });

      var textYPos = 120

      for (var i = 0; i < window.scores.length; i++) {
        var score = window.scores[i]
        this.add.text(this.game.width * 0.3, textYPos, score.username, {font: '42px Revalia', fill: '#ffffff', align: 'left'})
        this.add.text(this.game.width * 0.6, textYPos, score.score, {font: '42px Revalia', fill: '#ffffff', align: 'left'})
        textYPos += 50
      }
      text.anchor.set(0.5);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.B)){
        this.game.state.start('menu');
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.R)){
        this.game.state.start('game');
      }
    },
  };

  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Highscore = Highscore;
}());
