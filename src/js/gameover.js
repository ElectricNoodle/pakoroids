(function() {
  'use strict';

  function Gameover() {}

  Gameover.prototype = {
    init: function (score) {
      this.score = score
    },
    create: function (score) {
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
        socket.emit('get-scores')
        socket.emit('register', userToken, name)
        socket.emit('relay', name, userToken, this.score)
      });

      socket.on('scores', function (scores) {
        window.scores = scores
      })

      this.world.setBounds(0, 0, 1024, 768);

      var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
         'You dead, score: ' + this.score , {font: '72px Arial', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);
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
