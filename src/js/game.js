(function() {
  'use strict';

  function Game() {}

  Game.prototype = {
      create: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.world.setBounds(-1000,-1000,2000,2000);
        this.robsLarge = this.game.add.group();
        this.rickysLarge = this.game.add.group();
        this.craigsLarge = this.game.add.group();
        for (var i = 0; i < 10; i++) {
            var bullet = this.robsLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'robpaklarge');
            this.game.physics.p2.enable(bullet,false);
            console.log("adding bullet", i)
        }
        for (var i = 0; i < 10; i++) {
            var bullet = this.rickysLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'rickypaklarge');
            this.game.physics.p2.enable(bullet,false);
            console.log("adding bullet", i)
        }
        for (var i = 0; i < 10; i++) {
            var bullet = this.craigsLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'craigsamlarge');
            this.game.physics.p2.enable(bullet,false);
            console.log("adding bullet", i)
        }

        this.cursors = this.game.input.keyboard.createCursorKeys();
        //this.background = this.game.add.tileSprite(-1000, -1000, 2000, 2000, 'background');
        this.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'andy');
        this.game.physics.p2.enable(this.ship);
        this.game.camera.follow(this.ship);
      },

    update: function () {
      //this.robsLarge.forEachAlive(this.moveBullets,this);  //make this.bullets accelerate to ship
      //this.background.tilePosition = this.game.camera.position;
      if (this.cursors.left.isDown) {
        this.ship.body.rotateLeft(100);
      }   //this.ship movement
      else if (this.cursors.right.isDown){
        this.ship.body.rotateRight(100);}
      else {
        this.ship.body.setZeroRotation();}
      if (this.cursors.up.isDown){
        this.ship.body.thrust(400);}
      else if (this.cursors.down.isDown){
        this.ship.body.reverse(400);}
    },

    moveBullets: function (bullet) { 
      this.accelerateToObject(bullet,this.ship,30);  //start accelerateToObject on every bullet
    },

    accelerateToObject: function (obj1, obj2, speed) {
      if (typeof speed === 'undefined') { speed = 60; }
      var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
      obj1.body.rotation = angle + this.game.math.degToRad(90);  // correct angle of angry this.bullets (depends on the sprite used)
      obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject 
      obj1.body.force.y = Math.sin(angle) * speed;
    }
  };


  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Game = Game;
}());
