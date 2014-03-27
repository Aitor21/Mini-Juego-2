(function () {
  'use strict';

  function Game() {
    this.player = null;
    this.enemy = null;
    this.enemigo = null;
    this.scoreString = null;
    this.scoreText = null;
    //this.TimeString = null;
    //this.TimeText = null;
    this.score = null;
    //this.Time = null;
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.powerUp =null;
    this.timer=null;
    this.lastTime=1000;
    //this.textStyle = { font: '64px Desyrel', align: 'center'};
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2, y = this.game.height / 2;

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.input.onDown.add(this.onInputDown, this);
      this.enemy = this.add.group(); 
      this.enemy.createMultiple(/*0.2 + Math.random()**/6, 'enemy');
      this.enemy.setAll('outOfBoundsKill', true);
      this.enemigo = this.add.group();
      this.enemigo.createMultiple(/*0.2 + Math.random()**/6, 'enemigo');
      this.enemigo.setAll('outOfBoundsKill', true);
      this.powerUp = this.add.group();
      this.powerUp.createMultiple(1, 'powerUp');
      this.scoreString = 'Score : ';
      this.timer = this.add.text(820, 30, 0 + ':'+ 0, { fontSize: '34px', fill: '#fff' });
      this.scoreText = this.add.text(10, 30, this.scoreString + this.score, { fontSize: '34px', fill: '#fff' });
      this.player.body.collideWorldBounds = true;
    },

    update: function () {
         if (this.input.keyboard.isDown(Phaser.Keyboard.A)){
          this.player.x -=6;
          this.physics.overlap(this.player, this.enemy, function(player) { player.kill();}, null, this);
          this.physics.overlap(this.player, this.enemigo, function(player) { player.kill();}, null, this);
          //this.enemy.body.velocity.x-=200;
         }
         else if (this.input.keyboard.isDown(Phaser.Keyboard.D)){
          this.player.x +=6;
          this.physics.overlap(this.player, this.enemy, function(player) { player.kill();}, null, this);
          this.physics.overlap(this.player, this.enemigo, function(player) { player.kill();}, null, this);
          //this.enemy.body.velocity.x-=200;
         }
         if (this.input.keyboard.isDown(Phaser.Keyboard.S)){
          this.player.y +=6;
          this.physics.overlap(this.player, this.enemy, function(player) { player.kill();}, null, this);
          this.physics.overlap(this.player, this.enemigo, function(player) { player.kill();}, null, this);
         }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.W)){
          this.player.y -=6;
          this.physics.overlap(this.player, this.enemy, function(player) { player.kill();}, null, this);
          this.physics.overlap(this.player, this.enemigo, function(player) { player.kill();}, null, this);
        }

        this.enemyCheck = this.enemy.getFirstExists(false);
        if (this.enemyCheck){
          this.enemyCheck.reset(Math.random()*1024, 1000);
          this.enemyCheck.body.velocity.y = ((0.5 + Math.random())*-100);
          /*if(this.input.keyboard.isDown(Phaser.Keyboard.A)){
            //this.enemyCheck === this.player;
          }*/
          //this.enemyCheck.body.velocity.x = //0//((0.2 + Math.random())*-60 || 80);
        }

        this.enemigoCheck = this.enemigo.getFirstExists(false);
        if (this.enemigoCheck){
          this.enemigoCheck.reset(Math.random()*1024, -500);
          this.enemigoCheck.body.velocity.y = ((0.5 + Math.random())*100);
          //this.enemigoCheck.body.velocity.x = ((0.5 + Math.random())*60 || -80);
        }

        this.powerUpCheck = this.powerUp.getFirstExists(false);
        if(this.powerUpCheck){
          this.powerUpCheck.reset(Math.random()*900,Math.random()* 600);
          //this.physics.overlap(this.player, this.powerUp, function(powerUp) { powerUp.kill();}, null, this);
        }

        this.physics.overlap(this.powerUp, this.player, function(player,powerUp) { powerUp.kill();}, null, this);
      
        this.updateTimer();
    },
    
    updateTimer: function () {

        this.minutes = Math.floor(this.game.time.now / 60000) % 60;

        this.seconds = Math.floor(this.game.time.now / 1000) % 60;

        this.milliseconds = Math.floor(this.game.time.now) % 100;

        if (this.milliseconds < 10){
          this.milliseconds = '0' + this.milliseconds;
        }
        if (this.seconds < 10){
          this.seconds = '0' + this.seconds;
        }

        if (this.minutes < 10){
          this.minutes = '0' + this.minutes;
        }

        this.timer.setText(this.minutes + ':'+ this.seconds);
        //this.input.onDown.addOnce(updateText, this);

        /*if (this.seconds ++){
          this.score += 1;
          this.scoreText.content = this.scoreString + this.score;
        }*/
        if (this.game.time.now > this.lastTime)
        {
            this.score += 1;
            this.scoreText.content = this.scoreString + this.score;
            this.lastTime = this.game.time.now + 1000;
        }
  },

  onInputDown: function () {
    this.game.state.start('menu');
  }

};

window['minijuego-2'] = window['minijuego-2'] || {};
window['minijuego-2'].Game = Game;

}());


      //get.this.player.position;
      //this.physics.arcade.move(this.enemy, this.player, 100);
      //this.physics.overlap(this.player, this.enemy, function(player) { player.kill();}, null, this);
      //this.physics.overlap(this.player, this.enemigo, function(player) { player.kill();}, null, this);
      //this.physics.moveToObject(this.enemy,this.player, -20);


      //this.Time = 0;
      //this.TimeString = 'Time : ';
      //this.TimeText = this.add.text(820, 30, this.TimeString + this.Time, { fontSize: '34px', fill: '#fff' });
      //this.timer = this.add.text(820, 30, this.minutes + ':'+ this.seconds + ':' + this.milliseconds, { fontSize: '34px', fill: '#fff' });