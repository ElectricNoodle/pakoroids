(function() {
  'use strict';

  function Menu() {}

  Menu.prototype = {
    create: function () {
      this.background = this.game.add.tileSprite(0, 0,1366,768, 'background');
      var text = this.add.text(this.game.width * 0.5, 220,
        'Pakoroids', {font: '125px Arial', fill: '#ffffff', align: 'center'
      });
      text.font = 'Revalia';
      var start_text = this.add.text(370,475,
        'S - Start Game', {font: '30px Arial', fill: '#ffffff', align: 'center'
      });
      start_text.font = 'Revalia';
      var controls_text = this.add.text(370,550,
        'C - Controls', {font: '30px Arial', fill: '#ffffff', align: 'center'
      });
      controls_text.font = 'Revalia';
      var scores_text = this.add.text(370, 625,
        'H - Highscores', {font: '30px Arial', fill: '#ffffff', align: 'center'
      });
      scores_text.font = 'Revalia';
      text.anchor.set(0.5);

      this.pakoroidsNoise = this.add.audio('pakoroids');
      this.pakoroidsNoise.allowMultiple = false;
      this.pakoroidsNoise.play()

      this.buttonNoise = this.add.audio('button');
      this.buttonNoise.allowMultiple = true;
      this.buttonNoise.addMarker('button',0,1);

      this.input.onDown.add(this.onDown, this);

      var socket = io('http://localhost:9000');
      socket.on('connected', function (token) {
        socket.emit('get-scores')
      });

      socket.on('scores', function (scores) {
        window.scores = scores
        socket.close()
      })

      this.menuMusic = this.add.audio('menu_music');
      this.menuMusic.loopFull(0.8);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.C)){
        this.buttonNoise.play('button');
        this.game.state.start('controls');
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
        this.buttonNoise.play('button');
        this.game.state.start('game');
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.H)){
        this.buttonNoise.play('button');
        this.game.state.start('highscore');
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.G)){
        this.buttonNoise.play('button');
        this.game.state.start('gameover');
      }
    },

    onDown: function () {
    },
    shutdown: function () {
      this.menuMusic.stop()
    }

  };

  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Menu = Menu;
}());
