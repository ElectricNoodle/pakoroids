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

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia','VT323']
    }

};
