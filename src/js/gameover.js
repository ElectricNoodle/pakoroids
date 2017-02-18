(function() {
  'use strict';

  function Gameover() {}

  Gameover.prototype = {
    init: function (score) {
      this.score = score
    },
    create: function (score) {
      var that = this
      var name = window.localStorage.getItem('user_name')
      if (!name) {
        var name = "123123123123123"
        while (name == null || name.length > 10) {
          name = prompt('What\'s your name?')
          if (name !== null) {
            window.localStorage.setItem('user_name', name)
          }
        }
      }

      var userToken = localStorage.getItem('user_token')
      var socket = io('http://localhost:9000');
      socket.on('connected', function (token) {
        if (!userToken){
          console.log('Setting new userToken')
          userToken = token
          localStorage.setItem('user_token', token)
        }
        socket.emit('register', userToken, name)
        socket.emit('relay', name, userToken, that.score)
        socket.emit('get-scores')
      });

      socket.on('scores', function (scores) {
        window.scores = scores
      })
      this.background = this.game.add.tileSprite(0, 0,1366,768, 'background');

      this.world.setBounds(0, 0, 1024, 768);

      var text = this.add.text(270, 200,
         'You died :( ' , {font: '72px Arial', fill: '#ffffff', align: 'center'
      });
      text.font ='Revalia';
      var text2 = this.add.text(270, 300,
         'Score: ' + this.score , {font: '72px Arial', fill: '#ffffff', align: 'center'
      });
      text2.font ='Revalia';
      this.input.onDown.add(this.onDown, this);
      var that = this
      setTimeout(function() {
        that.game.state.start('highscore', true, false, score)
      }, 4000)
    },
    update: function () {

    },
    onDown: function () {
      //this.game.state.start('menu');
    }
  };

  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Gameover = Gameover;
}());
