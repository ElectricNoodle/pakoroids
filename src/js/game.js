(function() {
  'use strict';

  function Game() {}

  Game.prototype = {
      create: function () {
        var that = this;
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.friction = 0;
        this.game.physics.p2.restitution = 0;

        this.game.world.setBounds(-1000,-1000,2000,2000);
        this.background = this.game.add.tileSprite(-1000, -1000, 2000, 2000, 'background');
        this.players = this.game.add.group();
        this.robsLarge = this.game.add.group();
        this.rickysLarge = this.game.add.group();
        this.craigsLarge = this.game.add.group();

        this.robsLarge.enableBody=true;
        this.rickysLarge.enableBody=true;
        this.craigsLarge.enableBody=true;

        this.robsLarge.physicsBodyType = Phaser.Physics.P2JS;
        this.rickysLarge.physicsBodyType = Phaser.Physics.P2JS;
        this.craigsLarge.physicsBodyType = Phaser.Physics.P2JS;

        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.pakoraCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup();


        for (var i = 0; i < 25; i++) {
          this.spawnPakora();
        };


        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        //his.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'andy');

        this.players.enableBody = true;
        this.players.physicsBodyType = Phaser.Physics.P2JS;

        this.ship = this.players.create(this.game.world.centerX, this.game.world.centerY, 'andy');
        this.ship.body.setCollisionGroup(this.playerCollisionGroup)
        this.ship.body.collides([this.playerCollisionGroup, this.pakoraCollisionGroup])

        this.game.physics.p2.enable(this.ship);

        this.game.camera.follow(this.ship);
        this.game.physics.p2.enable(this.ship);


        //  Our ships bullets
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.P2JS;

        
        //  All 40 of them
        this.bullets.createMultiple(40, 'bullet');
        this.bullets.setAll('anchor.x', 0.1);

        this.bullets.setAll('anchor.y', 0.1);

        this.bullets.children.forEach(function(child){
          child.body.setCollisionGroup(that.bulletCollisionGroup)
          child.body.collides(that.pakoraCollisionGroup)
        })
        this.bulletTime = 0;



        this.livesText = this.game.add.text( this.game.width - 140, 40, 'Lives: ', { font: '16px Arial', fill: '#ffffff' } );
        this.livesText.fixedToCamera = true;
        this.lives = 3;
        this.livesTexture = this.game.add.sprite(this.game.width - 90,30,'lives');
        this.livesTexture.fixedToCamera = true;
        this.score = 0;
        this.scoreText = this.game.add.text( 20, 40, 'Score: ' + this.score, { font: '16px Arial', fill: '#ffffff' } );
        this.scoreText.fixedToCamera = true;

        this.game.physics.p2.updateBoundsCollisionGroup();


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

      this.showLives();
    },


    spawnPakora: function() {
      var pakType = this.game.rnd.integerInRange(0, 2);
      switch (pakType){
        case 0:
          var asteroid = this.robsLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'robpaklarge');
          break;
        case 1:
          var asteroid = this.craigsLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'craigsamlarge');
          break;
        case 2:
          var asteroid = this.rickysLarge.create(this.game.rnd.integerInRange(-1000, 2000), this.game.rnd.integerInRange(-1000, 2000), 'rickypaklarge');
          break;        
      }
      asteroid.body.setCollisionGroup(this.pakoraCollisionGroup);
      asteroid.body.collides([this.pakoraCollisionGroup])
      asteroid.body.collides(this.playerCollisionGroup)
      asteroid.body.collides(this.bulletCollisionGroup, this.handleLarge)

      this.game.physics.p2.enable(asteroid, false);
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
              bullet.body.force.x = Math.cos(this.ship.rotation-1.581)*100000;
              bullet.body.force.y = Math.sin(this.ship.rotation-1.581)*100000;
              //this.game.physics.arcade.velocityFromRotation(this.ship.rotation-1.581, 400, bullet.body.velocity);
              this.bulletTime = this.game.time.now + 50;
          }
      }

    },


    showLives: function () {
      switch(this.lives){
        case 0:
          //TODO: YOU DEAD. 
          break;
        case 1:
          
          break;
        case 2:

          break;
        case 3:

          break;
      }
    },

    handleLarge: function(body1, body2) {
      console.log(body1, body2);
      body1.sprite.destroy();
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
