(function() {
  'use strict';

  function Controls() {}

  Controls.prototype = {
    create: function () {
      var text = this.add.text(this.game.width * 0.5, 70,
        "Controls", {font: '72px Arial', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);
      var arrow_text = this.add.text(600, 290,
       "to move.",{font: '30px Arial', fill: '#ffffff', align: 'center'
      });
      var space_text = this.add.text(600, 420,
       " to shoot.",{font: '30px Arial', fill: '#ffffff', align: 'center'});
      this.arrowTexture = this.game.add.sprite(340,220,'arrows');
      this.spaceKey = this.game.add.sprite(315,420,'space_bar');
      var back_text = this.add.text(380, 600,
       "Push B to go back..",{font: '30px Arial', fill: '#ffffff', align: 'center'});
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.B)){
        this.game.state.start('menu');
      }
    },
    onDown: function () {
    }
  };

  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Controls = Controls;
}());
