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
      this.load.image('andy', 'assets/images/pakora/medium/andy-crinkle-cut-chip.png');
      this.load.image('robpak', 'assets/images/pakora/large/rob-pakosha_360.png');
      this.load.image('background','assets/images/space.png');

      // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      // this.loadResources();

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
