(function() {
  'use strict';

  function Menu() {}

  Menu.prototype = {
    create: function () {
      var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
        'Pakoroids', {font: '72px Arial', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.C)){
        this.game.state.start('controls');
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
        this.game.state.start('game');
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.H)){
        this.game.state.start('highscore');
      }
    },

    onDown: function () {
    }
  };

  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Menu = Menu;
}());
