window.addEventListener('load', function () {
  'use strict';

  var ns = window['pakoroids'];
  var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'pakoroids-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('controls', ns.Controls);
  game.state.add('game', ns.Game);
  game.state.add('highscore', ns.Highscore);
  game.state.add('gameover', ns.Gameover);

  /* yo phaser:state new-state-files-put-here */
  game.state.start('boot');
}, false);

var userToken = localStorage.getItem('user_token')
var socket = io('http://localhost:9000');
  socket.on('connected', function (token) {
    if (!userToken){
      console.log('Setting new userToken')
      userToken = token
      localStorage.setItem('user_token', token)
    }
    socket.emit('get-scores')
    socket.emit('register', userToken, 'peter')
  });



  socket.on('scores', function (scores) {
    console.log(scores)
    socket.emit('relay', 'peter', userToken, Math.floor(Math.random() * 10000))
  })
