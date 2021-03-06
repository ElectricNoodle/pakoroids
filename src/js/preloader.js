(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      this.load.image('andy', 'assets/images/pakora/small/andy-crinkle-cut-chip.png');
      this.load.image('andy_beard', 'assets/images/pakora/small/andy-crinkle-cut-chip-beard.png');
      this.load.image('andy_lemon', 'assets/images/pakora/small/andrew-lemon-wedge.png');

      this.load.image('robpaklarge', 'assets/images/pakora/big/rob-pakosha_360.png');
      this.load.image('robpakmedium', 'assets/images/pakora/medium/rob-pakosha_360.png');
      this.load.image('robpaksmall', 'assets/images/pakora/small/rob-pakosha_360.png');

      this.load.image('rickypaklarge', 'assets/images/pakora/big/ricky-pakora.png');
      this.load.image('rickypakmedium', 'assets/images/pakora/medium/ricky-pakora.png');
      this.load.image('rickypaksmall', 'assets/images/pakora/small/ricky-pakora.png');

      this.load.image('craigsamlarge', 'assets/images/pakora/big/craig-samosa.png');
      this.load.image('craigsammedium', 'assets/images/pakora/medium/craig-samosa.png');
      this.load.image('craigsamsmall', 'assets/images/pakora/small/craig-samosa.png');

      this.load.image('abepaklarge','assets/images/pakora//big/abe-pakora.png');
      this.load.image('abepakmedium','assets/images/pakora/medium/abe-pakora.png' );
      this.load.image('abepaksmall', 'assets/images/pakora/small/abe-pakora.png');

      this.load.image('dandip', 'assets/images/pakora/dan-dip-small.png');
      this.load.image('danpsych', 'assets/images/pakora/dan-dip-small-psych.png');
      this.load.image('scrangleherb', 'assets/images/pakora/small/scrangle-leaf_360.png');
      this.load.image('pete_gerkin_pickup', 'assets/images/pakora/Pete-Gerkin-Small.png');
      this.load.image('pete_beard','assets/images/pakora/Pete-Gerkin-Beard-Small.png');

      this.load.image('life', 'assets/images/gui/life.png');

      this.load.shader('fisheye', 'assets/shaders/Fisheye.frag');

      this.load.image('bullet','assets/images/splodge.png');


      this.load.image('background','assets/images/space.png');
      this.load.image('gui', 'assets/images/gui/pakoroids_gui.png');

      this.load.image('arrows', 'assets/images/gui/keys.png');
      this.load.image('space_bar', 'assets/images/gui/space.png');

      this.load.audio('splat', 'assets/sounds/splat.wav');
      this.load.audio('life_pickup', 'assets/sounds/life_pickup.wav');
      this.load.audio('lose_life', 'assets/sounds/lose_life.wav');
      this.load.audio('pakora_bang', 'assets/sounds/pakora_bang.wav');
      this.load.audio('button', 'assets/sounds/button.wav');
      this.load.audio('pakoroids', 'assets/sounds/pakoroids.wav');
      this.load.audio('pete_power_up_noise', 'assets/sounds/power_up.wav');
      this.load.audio('dan_dip_noise', 'assets/sounds/dan_yass_normal.wav');
      this.load.audio('dan_dip_psych_noise','assets/sounds/dan_yass_psych.wav');
      this.load.audio('scrangle_noise','assets/sounds/scrangle_powerup.wav');
      this.load.audio('dan_dip_psych_noise_out','assets/sounds/dan_yass_psych_out.wav');

      this.load.audio('menu_music','assets/sounds/menu_music.wav');
      this.load.audio('game_music','assets/sounds/the_ballad_of_andy_chip.mp3');
      // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      // this.loadResources();
         //  Load the Google WebFont Loader script
      this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
      this.ready = true;
    },

    loadResources: function () {
      // load your assets here
    },

    create: function () {

    },

    update: function () {
      // if (!!this.ready) {
        this.game.state.start('menu');
      // }
    },

    onLoadComplete: function () {
      // this.ready = true;
    }
  };

  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Preloader = Preloader;
}());
