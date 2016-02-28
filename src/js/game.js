(function() {
  'use strict';

  function Game() {}

  Game.prototype = {
      create: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.world.setBounds(-1000,-1000,2000,2000);
        this.background = this.game.add.tileSprite(-1000, -1000, 2000, 2000, 'background');
        this.robsLarge = this.game.add.group();
        this.rickysLarge = this.game.add.group();
        this.craigsLarge = this.game.add.group();
        for (var i = 0; i < 10; i++) {
            var robAsteroid = this.robsLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'robpaklarge');
            this.game.physics.p2.enable(robAsteroid,false);
            console.log('adding bullet', i);
        }
        for (i = 0; i < 10; i++) {
            var rickyAsteroid = this.rickysLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'rickypaklarge');
            this.game.physics.p2.enable(rickyAsteroid,false);
            console.log('adding bullet', i);
        }
        for (i = 0; i < 10; i++) {
            var craigAsteroid = this.craigsLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'craigsamlarge');
            this.game.physics.p2.enable(craigAsteroid,false);
            console.log('adding bullet', i);
        }

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
        this.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'andy');
        this.game.physics.p2.enable(this.ship);
        this.game.camera.follow(this.ship);

            //  Our ships bullets
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        //  All 40 of them
        this.bullets.createMultiple(40, 'bullet');
        this.bullets.setAll('anchor.x', 0.1);


        this.bullets.setAll('anchor.y', 0.1);
        this.bulletTime = 0;
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

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.fireBullet();}
    },

    fireBullet: function () {

      if (this.game.time.now > this.bulletTime)
      {
          var bullet = this.bullets.getFirstExists(false);

          if (bullet)
          {
              bullet.reset(this.ship.body.x-(Math.sin(this.ship.rotation)*(-40)), this.ship.body.y+(Math.sin(this.ship.rotation+1.581)*(-40)));
              bullet.lifespan = 2000;
              bullet.rotation = this.ship.rotation;
              this.game.physics.arcade.velocityFromRotation(this.ship.rotation-1.571, 400, bullet.body.velocity);
              this.bulletTime = this.game.time.now + 50;
          }
      }

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
