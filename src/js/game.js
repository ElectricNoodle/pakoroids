(function() {
  'use strict';
  var that;
  function Game() {}

  Game.prototype = {
      create: function () {
        that = this;
        this.DEBUG = true;
        this.game.LBOUNDX = -10000;
        this.game.LBOUNDY = -10000;
        this.game.UBOUNDX = 10000;
        this.game.UBOUNDY = 10000;

        this.MAX_PAKORA_COUNT = 500;
        this.MAX_POWERUP_COUNT = 100;

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.friction = 0;
        this.game.physics.p2.restitution = 0;

        this.world.setBounds(this.game.LBOUNDX,this.game.LBOUNDY,this.game.UBOUNDX,this.game.UBOUNDY);
        this.background = this.game.add.tileSprite(this.game.LBOUNDX,this.game.LBOUNDY,this.game.UBOUNDX,this.game.UBOUNDY, 'background');

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
        this.danPowerUp.enableBody = true;
        this.danPowerUp.physicsBodyType = Phaser.Physics.P2JS;

        this.andyLife = this.game.add.group();
        this.andyLife.enableBody =true;
        this.andyLife.physicsBodyType = Phaser.Physics.P2JS;

        this.scrangleHerb = this.game.add.group();
        this.scrangleHerb.enableBody = true;
        this.scrangleHerb.physicsBodyType = Phaser.Physics.P2JS;

        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.pakoraCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.powerUpCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.andyLifeCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.scrangleHerbCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.psychedelicDanCollisonGroup = this.game.physics.p2.createCollisionGroup();

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


        this.pakoraCount = 0;
        for (var i = 0; i < 300; i++) {
          this.spawnPakora();
        };
        this.game.time.events.loop(Phaser.Timer.SECOND, this.spawnPakoraTimed, this);

        this.powerUpCount = 0;
        for(var i =0; i < 25; i++){
          this.spawnPowerUp();
        }
        this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.spawnPowerUpTimed, this);
        this.danPsychPowerUpCount = 0;
        for(var i = 0; i < 10; i++){
          this.spawnPowerUpPsych();
        }
        this.lifePickupCount =0;
        for(var i=0; i < 25; i++){
          this.spawnLifePickup();
        }
        this.scrangleHerbCount  = 0;
        for(var i=0; i< 25; i++){
          this.spawnScrangleHerb();
        }
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        //his.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'andy');

        this.players.enableBody = true;
        this.players.physicsBodyType = Phaser.Physics.P2JS;

        this.ship = this.players.create(this.game.world.centerX, this.game.world.centerY, 'andy');
        this.ship.body.setCollisionGroup(this.playerCollisionGroup);
        this.ship.body.collides([this.playerCollisionGroup, this.pakoraCollisionGroup,this.powerUpCollisionGroup,this.andyLifeCollisionGroup,this.scrangleHerbCollisionGroup,this.psychedelicDanCollisonGroup]);

        this.game.physics.p2.enable(this.ship);
        this.ship.body.collidesWorldBounds = false;

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

        if(this.DEBUG){
          this.pakoraCountText = this.game.add.text(140, 60, 'PakoraCount: ' + this.pakoraCount, { font: '16px Arial', fill: '#ffffff' } );
          this.powerupCountText = this.game.add.text(140, 80, 'PowerUpCount: ' + this.powerUpCount, { font: '16px Arial', fill: '#ffffff' } );
          this.lifePickupText = this.game.add.text(140, 100, 'LifePickupCount: ' + this.lifePickupCount, { font: '16px Arial', fill: '#ffffff' } );
          this.scrangleHerbText = this.game.add.text(140, 120, 'scrangleHerbCount: ' + this.scrangleHerbCount, { font: '16px Arial', fill: '#ffffff' } );
          this.playerPosText = this.game.add.text(140, 140, 'PlayerPos: X:' + this.ship.position.x + ' Y:' +this.ship.position.y, { font: '16px Arial', fill: '#ffffff' } );
          this.psychText = this.game.add.text(140, 160, 'PpsychCount: ' + this.danPsychPowerUpCount, { font: '16px Arial', fill: '#ffffff' } );
          this.pakoraCountText.fixedToCamera = true;
          this.powerupCountText.fixedToCamera = true;
          this.lifePickupText.fixedToCamera = true;
          this.scrangleHerbText.fixedToCamera = true;
          this.playerPosText.fixedToCamera = true;
          this.psychText.fixedToCamera = true;
        }
        this.livesText = this.game.add.text( this.game.width - 140, 40, 'Lives: ', { font: '16px Arial', fill: '#ffffff' } );
        this.livesText.fixedToCamera = true;
        this.lives = 3;
        this.livesTexture1 = this.game.add.sprite(this.game.width - 90,30,'life');
        this.livesTexture2 = this.game.add.sprite(this.game.width - 75,30,'life');
        this.livesTexture3 = this.game.add.sprite(this.game.width - 60,30,'life');
        this.livesTexture4 = this.game.add.sprite(this.game.width - 45,30,'life');
        this.livesTexture5 = this.game.add.sprite(this.game.width - 30,30,'life');
        this.livesTexture1.fixedToCamera = true;
        this.livesTexture2.fixedToCamera = true;
        this.livesTexture3.fixedToCamera = true;
        this.livesTexture4.fixedToCamera = true;
        this.livesTexture5.fixedToCamera = true;




        this.have_dan_powerup = false;
        this.have_scrangle_herb = false;
        this.score = 0;
        this.rotationSpeed = 100;
        this.moveSpeed = 400;
        this.scoreText = this.game.add.text( 20, 40, 'Score: ' + this.score, { font: '16px Arial', fill: '#ffffff' } );
        this.scoreText.fixedToCamera = true;

        //this.game.physics.p2.updateBoundsCollisionGroup();
      },

    update: function () {
      if(this.DEBUG){
        this.pakoraCountText.setText('PakoraCount: ' + this.pakoraCount);
        this.powerupCountText.setText('PowerUpCount: ' + this.powerUpCount);
        this.lifePickupText.setText('LifePickupCount: ' + this.lifePickupCount);
        this.scrangleHerbText.setText('scrangleHerbCount: ' + this.scrangleHerbCount);
        this.playerPosText.setText('PlayerPos: X: ' + parseInt(this.ship.position.x) + ' Y: ' +parseInt(this.ship.position.y));
        this.psychText.setText('PsychCount: ' + this.danPsychPowerUpCount);
      }

      this.robsLarge.forEachAlive(this.moveBullets,this);  //make this.bullets accelerate to ship
      this.rickysSmall.forEachAlive(this.moveBullets,this);
      this.craigsSmall.forEachAlive(this.moveBullets,this);
      //this.background.tilePosition = this.game.camera.position;
      if (this.cursors.left.isDown) {
        this.ship.body.rotateLeft(this.rotationSpeed);
      }   //this.ship movement
      else if (this.cursors.right.isDown){
        this.ship.body.rotateRight(this.rotationSpeed);}
      else {
        this.ship.body.setZeroRotation();}
      if (this.cursors.up.isDown){
        this.ship.body.thrust(this.moveSpeed);
      }
      else if (this.cursors.down.isDown){
        this.ship.body.reverse(this.moveSpeed);
      }

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.fireBullet();
      }


      this.game.world.wrap(this.ship);
      this.game.world.wrap(this.ship.body);
      this.fisheye.update()

      this.showLives();
    },

    spawnPakoraTimed: function(){
      if(this.pakoraCount < this.MAX_PAKORA_COUNT){
        this.spawnPakora();
      }
    },
    spawnPakora: function() {
      var pakType = this.game.rnd.integerInRange(0, 2);
      switch (pakType){
        case 0:
          var asteroid = this.robsLarge.create(this.game.rnd.integerInRange(this.game.LBOUNDX, this.game.UBOUNDX),
                                              this.game.rnd.integerInRange(this.game.LBOUNDY,this.game.UBOUNDY), 'robpaklarge');
          break;
        case 1:
          var asteroid = this.craigsLarge.create(this.game.rnd.integerInRange(this.game.LBOUNDX, this.game.UBOUNDX),
                                              this.game.rnd.integerInRange(this.game.LBOUNDY,this.game.UBOUNDY), 'craigsamlarge');
          break;
        case 2:
          var asteroid = this.rickysLarge.create(this.game.rnd.integerInRange(this.game.LBOUNDX, this.game.UBOUNDX),
                                              this.game.rnd.integerInRange(this.game.LBOUNDY,this.game.UBOUNDY), 'rickypaklarge');
          break;
      }
      asteroid.body.setCollisionGroup(this.pakoraCollisionGroup);
      asteroid.body.collides([this.pakoraCollisionGroup])
      asteroid.body.collides(this.playerCollisionGroup,this.handlePlayerPakoraCollision);
      asteroid.body.collides(this.bulletCollisionGroup, this.handlePakoraCollision)
      asteroid.body.pakoraType = "large";

      this.game.physics.p2.enable(asteroid, false);
      this.pakoraCount++;
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
      this.pakoraCount++;
    },
    spawnPowerUpTimed: function(){
      if(this.powerUpCount < this.MAX_POWERUP_COUNT){
        this.spawnPowerUp();
      }
    },
    spawnPowerUp: function(){
      var dan= this.danPowerUp.create(this.game.rnd.integerInRange(this.game.LBOUNDX, this.game.UBOUNDX),
                                     this.game.rnd.integerInRange(this.game.LBOUNDY, this.game.UBOUNDY),'dandip');
      dan.body.setCollisionGroup(this.powerUpCollisionGroup);
      dan.body.collides(this.playerCollisionGroup,this.handlePowerUpCollision);
      dan.body.force.x = this.game.rnd.integerInRange(-10000,-10000);
      dan.body.force.y = this.game.rnd.integerInRange(1000,5000);
      this.game.physics.p2.enable(dan,true);
      this.powerUpCount++;

      var emitter = this.game.add.emitter(0, 0, 50);
      emitter.makeParticles('dandip');
      dan.addChild(emitter);
      emitter.minParticleSpeed.setTo(-300, -300);
      emitter.maxParticleSpeed.setTo(300, 300);
      emitter.setAlpha(0, 0.7, -0.1)
      emitter.minParticleScale = 0.1;
      emitter.maxParticleScale = 0.6;
      emitter.gravity = 0;
      emitter.flow(300, 66, 1, -1);
      emitter.emitParticle();
    },
    spawnPowerUpPsych: function() {
      var dan= this.danPowerUp.create(this.game.rnd.integerInRange(this.game.LBOUNDX, this.game.UBOUNDX),
                                     this.game.rnd.integerInRange(this.game.LBOUNDY, this.game.UBOUNDY),'danpsych');
      dan.body.setCollisionGroup(this.psychedelicDanCollisonGroup);
      dan.body.collides(this.playerCollisionGroup,this.handlePsychDanCollision);
      dan.body.force.x = this.game.rnd.integerInRange(-10000,-10000);
      dan.body.force.y = this.game.rnd.integerInRange(1000,5000);
      this.game.physics.p2.enable(dan,true);
      this.danPsychPowerUpCount++;

      var emitter = this.game.add.emitter(0, 0, 50);
      emitter.makeParticles('danpsych');
      dan.addChild(emitter);
      emitter.minParticleSpeed.setTo(-300, -300);
      emitter.maxParticleSpeed.setTo(300, 300);
      emitter.setAlpha(0, 0.7, -0.1)
      emitter.minParticleScale = 0.1;
      emitter.maxParticleScale = 0.6;
      emitter.gravity = 0;
      emitter.flow(300, 66, 1, -1);
      emitter.emitParticle();
    },
    spawnLifePickup: function() {
      var lemon = this.andyLife.create(this.game.rnd.integerInRange(this.game.LBOUNDX, this.game.UBOUNDX),
                                     this.game.rnd.integerInRange(this.game.LBOUNDY, this.game.UBOUNDY),'andy_lemon');
      lemon.body.setCollisionGroup(this.andyLifeCollisionGroup);
      lemon.body.collides(this.playerCollisionGroup,this.handleLifePickupCollision);
      lemon.body.force.x = this.game.rnd.integerInRange(200,900);
      lemon.body.force.y = this.game.rnd.integerInRange(200,900);
      this.game.physics.p2.enable(lemon,true);
      this.lifePickupCount++;

      var emitter = this.game.add.emitter(0, 0, 50);
      emitter.makeParticles('andy_lemon');
      lemon.addChild(emitter);
      emitter.minParticleSpeed.setTo(-300, -300);
      emitter.maxParticleSpeed.setTo(300, 300);
      emitter.setAlpha(0, 0.7, -0.1)
      emitter.minParticleScale = 0.1;
      emitter.maxParticleScale = 0.6;
      emitter.gravity = 0;
      emitter.flow(300, 66, 1, -1);
      emitter.emitParticle();
    },
    spawnScrangleHerb: function(){
      var scrangle = this.andyLife.create(this.game.rnd.integerInRange(this.game.LBOUNDX, this.game.UBOUNDX),
                                     this.game.rnd.integerInRange(this.game.LBOUNDY, this.game.UBOUNDY),'scrangleherb');
      scrangle.body.setCollisionGroup(this.scrangleHerbCollisionGroup);
      scrangle.body.collides(this.playerCollisionGroup,this.handleScrangleHerbCollision);
      scrangle.body.force.x = this.game.rnd.integerInRange(200,900);
      scrangle.body.force.y = this.game.rnd.integerInRange(200,900);
      this.game.physics.p2.enable(scrangle,true);
      this.scrangleHerbCount++;

      var emitter = this.game.add.emitter(0, 0, 50);
      emitter.makeParticles('scrangleherb');
      scrangle.addChild(emitter);
      emitter.minParticleSpeed.setTo(-300, -300);
      emitter.maxParticleSpeed.setTo(300, 300);
      emitter.setAlpha(0, 0.7, -0.1)
      emitter.minParticleScale = 0.1;
      emitter.maxParticleScale = 0.6;
      emitter.gravity = 0;
      emitter.flow(300, 66, 1, -1);
      emitter.emitParticle();
    },
    fireBullet: function () {

      if (this.game.time.now > this.bulletTime)
      {
        if(this.have_dan_powerup){
          var bulletOne = this.bullets.getFirstExists(false);

          if (bulletOne)
          {
              bulletOne.reset(this.ship.body.x-(Math.sin(this.ship.rotation)*(-40)), this.ship.body.y+(Math.sin(this.ship.rotation+1.581)*(-40)));
              bulletOne.lifespan = 2000;
              bulletOne.rotation = this.ship.rotation;
              bulletOne.body.force.x = Math.cos(this.ship.rotation-1.581)*50000;
              bulletOne.body.force.y = Math.sin(this.ship.rotation-1.581)*50000;
          }
          var bulletTwo = this.bullets.getFirstExists(false);
          if(bulletTwo){
              bulletTwo.reset(this.ship.body.x-(Math.sin(this.ship.rotation)*(-20)), this.ship.body.y+(Math.sin(this.ship.rotation+1.581)*(-40)));
              bulletTwo.lifespan = 2000;
              bulletTwo.rotation = this.ship.rotation;

              bulletTwo.body.force.x = Math.cos(this.ship.rotation-1.581+0.2)*50000;
              bulletTwo.body.force.y = Math.sin(this.ship.rotation-1.581+0.2)*50000;

          }
          var bulletThree = this.bullets.getFirstExists(false);
          if(bulletThree){
              bulletThree.reset(this.ship.body.x-(Math.sin(this.ship.rotation)*(-20)), this.ship.body.y+(Math.sin(this.ship.rotation+1.581)*(-40)));
              bulletThree.lifespan = 2000;
              bulletThree.rotation = this.ship.rotation;

              bulletThree.body.force.x = Math.cos(this.ship.rotation-1.581-0.2)*50000;
              bulletThree.body.force.y = Math.sin(this.ship.rotation-1.581-0.2)*50000;

          }
           this.bulletTime = this.game.time.now + 200;
        }else{
          var bullet = this.bullets.getFirstExists(false);

          if (bullet)
          {
              bullet.reset(this.ship.body.x-(Math.sin(this.ship.rotation)*(-40)), this.ship.body.y+(Math.sin(this.ship.rotation+1.581)*(-40)));
              bullet.lifespan = 2000;
              bullet.rotation = this.ship.rotation;
              bullet.body.force.x = Math.cos(this.ship.rotation-1.581)*50000;
              bullet.body.force.y = Math.sin(this.ship.rotation-1.581)*50000;
              this.bulletTime = this.game.time.now + 200;
          }
        }

      }

    },


    showLives: function () {
      if(this.lives < 0){
        this.lives = 0;
      }

      switch(this.lives){
        case 0:
          this.livesTexture1.visible = false;
          this.livesTexture2.visible = false;
          this.livesTexture3.visible = false;
          this.livesTexture4.visible = false;
          this.livesTexture5.visible = false;
          break;
        case 1:
          this.livesTexture1.visible = true;
          this.livesTexture2.visible = false;
          this.livesTexture3.visible = false;
          this.livesTexture4.visible = false;
          this.livesTexture5.visible = false;
          break;
        case 2:
          this.livesTexture1.visible = true;
          this.livesTexture2.visible = true;
          this.livesTexture3.visible = false;
          this.livesTexture4.visible = false;
          this.livesTexture5.visible = false;
          break;
        case 3:
          this.livesTexture1.visible = true;
          this.livesTexture2.visible = true;
          this.livesTexture3.visible = true;
          this.livesTexture4.visible = false;
          this.livesTexture5.visible = false;
          break;
        case 4:
          this.livesTexture1.visible = true;
          this.livesTexture2.visible = true;
          this.livesTexture3.visible = true;
          this.livesTexture4.visible = true;
          this.livesTexture5.visible = false;
        break;
        case 5:
          this.livesTexture1.visible = true;
          this.livesTexture2.visible = true;
          this.livesTexture3.visible = true;
          this.livesTexture4.visible = true;
          this.livesTexture5.visible = true;
        break;
      }
    },

    handlePakoraCollision: function(body1, body2) {
      //body2.sprite.destroy();
      //body2.destroy();
      body2.reset();

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
      that.pakoraCount--;

    },
    handlePlayerPakoraCollision: function(body1, body2) {
        if(that.lives < 0){
          that.lives = 0;
        }
          if(that.lives == 0){
              console.log("SHOULD DIE HERE");
              that.game.state.start('gameover', true, false, that.score);


          }else{
            that.lives--;
          }
    },
    handlePowerUpCollision: function(body1,body2){
      body1.sprite.destroy();
      that.powerUpCount--;
      that.have_dan_powerup = true;
      if (that.danPowerUpTimer){
        that.game.time.events.remove(that.danPowerUpTimer);
      }
      that.danPowerUpTimer = that.game.time.events.add(Phaser.Timer.SECOND * 30, function(){
        that.have_dan_powerup = false;
      }, that);

    },
    handlePsychDanCollision: function(body1,body2){
      body1.sprite.destroy();
      that.danPsychPowerUpCount--;
      that.have_dan_psych_powerup = true;
      that.world.filters = [that.fisheye]
      if (that.danPowerUpTimer){
        that.game.time.events.remove(that.danPsychPowerUpTimer);
      }
      that.danPsychPowerUpTimer = that.game.time.events.add(Phaser.Timer.SECOND * 30, function(){
        that.have_dan_psych_powerup = false;
        that.world.filters = null
      }, that);

    },
    handleLifePickupCollision: function(body1,body2){
      body1.sprite.destroy();
      that.lifePickupCount--;
      if(that.lives < 5){
        that.lives++;
      }
    },
    handleScrangleHerbCollision: function(body1,body2){
      body1.sprite.destroy();
      that.scrangleHerbCount--;
      that.have_scrangle_herb = true;
      that.rotationSpeed += 100;
      that.moveSpeed += 800;

      that.game.time.events.add(Phaser.Timer.SECOND * 30, function(){
        that.have_scrangle_herb = false;
        that.rotationSpeed -= 100;
        that.moveSpeed -= 800;
      }, that);
    },
    startPowerUp: function (){

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
    },
  };


  window['pakoroids'] = window['pakoroids'] || {};
  window['pakoroids'].Game = Game;
}());
