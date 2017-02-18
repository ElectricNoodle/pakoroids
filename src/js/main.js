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
/*
var socket = io('http://localhost:9000');
  socket.on('test', function (data) {
    console.log(data);
  });
*/