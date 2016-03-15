window.addEventListener('load', function () {
  'use strict';

  var ns = window['pakoroids'];
  var game = new Phaser.Game(1024, 768, Phaser.HEADLESS, 'pakoroids-game');
  game.state.add('boot', ns.Preloader);
  game.state.add('preloader', ns.Preloader);
  game.state.add('game', ns.Game);
  game.state.start('boot');
}, false);
