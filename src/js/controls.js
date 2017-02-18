(function() {
  'use strict';

  function Controls() {}

  Controls.prototype = {
    create: function () {
      this.background = this.game.add.tileSprite(this.game.LBOUNDX,this.game.LBOUNDY,1366,768, 'background');
      var text = this.add.text(this.game.width * 0.5, 70,
        "Controls", {font: '72px Arial', fill: '#ffffff', align: 'center'
      });
      var font = 'Revalia';
      text.font = font;
      text.anchor.set(0.5);
      
      var arrow_text = this.add.text(600, 290,
       "to move.",{font: '30px Arial', fill: '#ffffff', align: 'center'
      });
      arrow_text.font = font;
      var space_text = this.add.text(600, 420,
       " to shoot.",{font: '30px Arial', fill: '#ffffff', align: 'center'});
      space_text.font = font;
      this.arrowTexture = this.game.add.sprite(340,220,'arrows');
      this.spaceKey = this.game.add.sprite(315,420,'space_bar');
      var back_text = this.add.text(340, 600,
       "Push B to go back..",{font: '30px Arial', fill: '#ffffff', align: 'center'});
      back_text.font = font;
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
