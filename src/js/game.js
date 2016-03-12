(function() {
  'use strict';
  var that;
  function Game() {}

  Game.prototype = {
      create: function () {
        that = this;
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.friction = 0;
        this.game.physics.p2.restitution = 0;

        this.game.world.setBounds(-10000,-10000,10000,10000);
        this.background = this.game.add.tileSprite(-10000, -10000, 10000, 10000, 'background');
        this.players = this.game.add.group();
        this.robsLarge = this.game.add.group();
        this.rickysLarge = this.game.add.group();
        this.craigsLarge = this.game.add.group();
        this.robsMedium = this.game.add.group();
        this.rickysMedium = this.game.add.group();
        this.craigsMedium = this.game.add.group();
        this.robsSmall = this.game.add.group();
        this.rickysSmall = this.game.add.group();
        this.craigsSmall = this.game.add.group();

        this.robsLarge.enableBody=true;
        this.rickysLarge.enableBody=true;
        this.craigsLarge.enableBody=true;
        this.robsMedium.enableBody=true;
        this.rickysMedium.enableBody=true;
        this.craigsMedium.enableBody=true;
        this.robsSmall.enableBody=true;
        this.rickysSmall.enableBody=true;
        this.craigsSmall.enableBody=true;

        this.robsLarge.physicsBodyType = Phaser.Physics.P2JS;
        this.rickysLarge.physicsBodyType = Phaser.Physics.P2JS;
        this.craigsLarge.physicsBodyType = Phaser.Physics.P2JS;
        this.robsMedium.physicsBodyType = Phaser.Physics.P2JS;
        this.rickysMedium.physicsBodyType = Phaser.Physics.P2JS;
        this.craigsMedium.physicsBodyType = Phaser.Physics.P2JS;
        this.robsSmall.physicsBodyType = Phaser.Physics.P2JS;
        this.rickysSmall.physicsBodyType = Phaser.Physics.P2JS;
        this.craigsSmall.physicsBodyType = Phaser.Physics.P2JS;

        this.danPowerUp = this.game.add.group();

        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.pakoraCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.danPowerUpCollisionGroup = this.game.physics.p2.createCollisionGroup();

        this.pakoraDegradationMap = {
          "robpaklarge": "robpakmedium",
          "robpakmedium": "robpaksmall",
          "craigsamlarge": "craigsammedium",
          "craigsammedium": "craigsamsmall",
          "rickypaklarge": "rickypakmedium",
          "rickypakmedium": "rickypaksmall"
        }

        this.fisheye = new Phaser.Filter(this, null, this.cache.getShader('fisheye'));
        this.fisheye.setResolution(1024, 768);
        //this.world.filters = [this.fisheye]



        for (var i = 0; i < 60; i++) {
          this.spawnPakora();
        };

        for(var i =0; i < 10000; i++){
          this.spawnPowerUp();
        }
        

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
        this.livesTexture1 = this.game.add.sprite(this.game.width - 90,30,'life');
        this.livesTexture2 = this.game.add.sprite(this.game.width - 75,30,'life');
        this.livesTexture3 = this.game.add.sprite(this.game.width - 60,30,'life');
        this.livesTexture1.fixedToCamera = true;
        this.livesTexture2.fixedToCamera = true;
        this.livesTexture3.fixedToCamera = true;

        this.score = 0;
        this.scoreText = this.game.add.text( 20, 40, 'Score: ' + this.score, { font: '16px Arial', fill: '#ffffff' } );
        this.scoreText.fixedToCamera = true;

        this.game.physics.p2.updateBoundsCollisionGroup();


      },

    update: function () {
      this.robsLarge.forEachAlive(this.moveBullets,this);  //make this.bullets accelerate to ship
      this.rickysSmall.forEachAlive(this.moveBullets,this);
      this.craigsSmall.forEachAlive(this.moveBullets,this);
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
      asteroid.body.collides(this.playerCollisionGroup,this.handlePlayerPakoraCollision);
      asteroid.body.collides(this.bulletCollisionGroup, this.handlePakoraCollision)
      asteroid.body.pakoraType = "large";

      this.game.physics.p2.enable(asteroid, false);
    },

    generatePakora: function(type, sprite, x, y, forcex, forcey) {
      var pakType = this.game.rnd.integerInRange(0, 2);
      var asteroid = this.robsLarge.create(x, y, sprite);
      asteroid.body.setCollisionGroup(this.pakoraCollisionGroup);
      asteroid.body.collides([this.pakoraCollisionGroup]);
      asteroid.body.collides(this.playerCollisionGroup,this.handlePlayerPakoraCollision);
      asteroid.body.collides(this.bulletCollisionGroup, this.handlePakoraCollision);
      asteroid.body.force.x = forcex;
      asteroid.body.force.y = forcey;
      asteroid.body.pakoraType = type;

      this.game.physics.p2.enable(asteroid, false);
    },
    spawnPowerUp: function(number,sprite,x,y){
      var x = this.game.rnd.integerInRange(0, this.game.width - sprite.width);
      var y = this.game.rnd.integerInRange(0, this.game.width - sprite.height);
      var danPowerUp = this.danPowerUp.create(x,y,sprite);
    }
    fireBullet: function () {

      if (this.game.time.now > this.bulletTime)
      {
          var bullet = this.bullets.getFirstExists(false);

          if (bullet)
          {
              bullet.reset(this.ship.body.x-(Math.sin(this.ship.rotation)*(-40)), this.ship.body.y+(Math.sin(this.ship.rotation+1.581)*(-40)));
              bullet.lifespan = 2000;
              bullet.rotation = this.ship.rotation;
              bullet.body.force.x = Math.cos(this.ship.rotation-1.581)*50000;
              bullet.body.force.y = Math.sin(this.ship.rotation-1.581)*50000;
              this.bulletTime = this.game.time.now + 50;
          }
      }

    },


    showLives: function () {
      console.log("IN SHOW: " + this.lives);
      if(this.lives < 0)
        this.lives = 0;
      switch(this.lives){
        case 0:
          this.livesTexture1.visible = false;
          break;
        case 1:
          this.livesTexture2.visible = false;
          break;
        case 2:
          this.livesTexture3.visible = false;
          break;
        case 3:
          this.livesTexture1.visible = true;
          this.livesTexture2.visible = true;
          this.livesTexture3.visible = true;
          break;
      }
    },

    handlePakoraCollision: function(body1, body2) {
      //body2.sprite.destroy();
      //body2.destroy();
      body2.reset();
      console.log(body1, body2);
      var origX = body1.x;
      var origY = body1.y;
      var forceX = body1.force.x;
      var forceY = body1.force.y;

      var nextSprite = that.pakoraDegradationMap[body1.sprite.key];

      if (body1.pakoraType == "large"){
        that.generatePakora("medium",nextSprite,origX-20,origY-20,forceX, forceY);
        that.generatePakora("medium",nextSprite,origX+20,origY+20,forceX, forceY);
        that.score+=10;
      }

      if (body1.pakoraType == "medium"){
        that.generatePakora("small",nextSprite,origX-20,origY-20,forceX, forceY);
        that.generatePakora("small",nextSprite,origX+20,origY+20,forceX, forceY);
        that.generatePakora("small",nextSprite,origX+10,origY+10,forceX, forceY);
        that.generatePakora("small",nextSprite,origX-10,origY-10,forceX, forceY);
        that.score+=20
      }

      if (body1.pakoraType == "small"){
        that.score+=50
      }
      that.scoreText.setText('Score: ' + that.score);

      body1.sprite.destroy();

    },
handlePlayerPakoraCollision: function(body1, body2) {
    if(that.lives < 0){
      that.lives = 0;
    }
      if(that.lives < 0){
          console.log("YOU DEAD");
      }else{
        that.lives--;
      }
    },


    moveBullets: function (bullet) { 
      var speed = 0;
      switch (bullet.width){
        case 128:
          speed = 20;
          break;
        case 64:
          speed = 30;
          break;
        case 32:
          speed = 60;
          break;
        default:
          speed = 30;
      }
      this.accelerateToObject(bullet,this.ship,speed);  //start accelerateToObject on every bullet
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
