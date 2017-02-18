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
      this.load.image('dandip', 'assets/images/pakora/dan-dip-small.png');
      this.load.image('scrangleherb', 'assets/images/pakora/small/scrangle-leaf_360.png');

      this.load.image('life', 'assets/images/gui/life.png');
      this.load.shader('fisheye', 'assets/shaders/Fisheye.frag');

      this.load.image('bullet','assets/images/splodge.png');


      this.load.image('background','assets/images/space.png');

      this.load.image('arrows', 'assets/images/gui/keys.png');
      this.load.image('space_bar', 'assets/images/gui/space.png');

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
