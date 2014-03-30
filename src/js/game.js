(function () {
    'use strict';

    function Game() {
        this.player = null;
        this.enemy = null;
        this.enemigo = null;
		this.badGuy = null;
		this.badEnemys = null;
        this.scoreString = null;
        this.scoreText = null;
        this.score = null;
        this.milliseconds = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.powerUp = null;
        this.timer = null;
        this.lastTime = 1000;
		this.upKey = null;
		this.downKey = null;
		this.leftKey = null;
		this.rightKey = null;
    }

    Game.prototype =
        {

            create: function () {
                var x = this.game.width / 2, y = this.game.height / 2;
				this.player = this.add.sprite(x, y, 'player_up');

                this.player.anchor.setTo(0.5, 0.5);
				this.player.body.collideWorldBounds = true;
                this.input.onDown.add(this.onInputDown, this);
				
                this.enemy = this.add.group();
                this.enemy.createMultiple(5, 'enemy');
                this.enemy.setAll('outOfBoundsKill', true);
				
                this.enemigo = this.add.group();
                this.enemigo.createMultiple(5, 'enemigo');
                this.enemigo.setAll('outOfBoundsKill', true);

				this.badEnemys = this.add.group();
				this.badEnemys.createMultiple(5, 'badEnemys');
                this.badEnemys.setAll('outOfBoundsKill', true);
				
				this.badGuy = this.add.group();
				this.badGuy.createMultiple(5, 'badGuy');
				this.badGuy.setAll('outOfBoundsKill', true);

                this.powerUp = this.add.group();
                this.powerUp.createMultiple(1, 'powerUp');
				this.powerUp.setAll('outOfBoundsKill', true);
				
                this.scoreString = 'Score : ';
                this.timer = this.add.text(900, 30, ' : ', { fontSize: '34px', fill: '#fff' });
                this.scoreText = this.add.text(10, 30, this.scoreString + this.score, { fontSize: '34px', fill: '#fff' });
				
				this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
				this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
				this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
				this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            },
            update: function () {
                if (this.leftKey.isDown) {
                    this.player.x -= 6;
                    this.physics.overlap(this.player, this.enemy, function (player) { player.kill(); }, null, this);
                    this.physics.overlap(this.player, this.enemigo, function (player) { player.kill(); }, null, this);
                    this.physics.overlap(this.player, this.badEnemys, function (player) { player.kill(); }, null, this);
					this.physics.overlap(this.player, this.badGuy, function (player) { player.kill(); }, null, this);
					
					this.enemyCheck = this.enemy.getFirstExists(false);
					if (this.enemyCheck) {
						this.enemyCheck.reset(Math.random() * 1024, 800);
						this.game.physics.moveToObject(this.enemyCheck, this.player, 200);
					}
				}
                if (this.rightKey.isDown) {
                    this.player.x += 6;
                    this.physics.overlap(this.player, this.enemy, function (player) { player.kill(); }, null, this);
                    this.physics.overlap(this.player, this.enemigo, function (player) { player.kill(); }, null, this);
					this.physics.overlap(this.player, this.badEnemys, function (player) { player.kill(); }, null, this);
					this.physics.overlap(this.player, this.badGuy, function (player) { player.kill(); }, null, this);
					this.enemigoCheck = this.enemigo.getFirstExists(false);
					if (this.enemigoCheck) {
						this.enemigoCheck.reset(Math.random() * 1024, 0);
						this.game.physics.moveToObject(this.enemigoCheck, this.player, 200);
					}
                }
                if (this.downKey.isDown) {
                    this.player.y += 6;
                    this.physics.overlap(this.player, this.enemy, function (player) { player.kill(); }, null, this);
                    this.physics.overlap(this.player, this.enemigo, function (player) { player.kill(); }, null, this);
                    this.physics.overlap(this.player, this.badEnemys, function (player) { player.kill(); }, null, this);
					this.physics.overlap(this.player, this.badGuy, function (player) { player.kill(); }, null, this);
					this.badEnemyCheck = this.badEnemys.getFirstExists(false);
					if (this.badEnemyCheck) {
						this.badEnemyCheck.reset(1000, Math.random() * 1024);
						this.game.physics.moveToObject(this.badEnemyCheck, this.player, 200);
					}
                }
                if (this.upKey.isDown) {
                    this.player.y -= 6;
                    this.physics.overlap(this.player, this.enemy, function (player) { player.kill(); }, null, this);
                    this.physics.overlap(this.player, this.enemigo, function (player) { player.kill(); }, null, this);
                    this.physics.overlap(this.player, this.badEnemys, function (player) { player.kill(); }, null, this);
					this.physics.overlap(this.player, this.badGuy, function (player) { player.kill(); }, null, this);
					this.badGuyCheck = this.badGuy.getFirstExists(false);
					if (this.badGuyCheck) {
						this.badGuyCheck.reset(0, Math.random() * 1024);
						this.game.physics.moveToObject(this.badGuyCheck, this.player, 200);
					}
                }

                this.powerUpCheck = this.powerUp.getFirstExists(false);
                if (this.powerUpCheck) {
                    this.powerUpCheck.reset(Math.random() * 900, Math.random() * 650);
                }

                this.physics.overlap(this.powerUp, this.player, function (player, powerUp) { powerUp.kill(); }, null, this);
                this.updateTimer();
            },
            updateTimer: function () {
				
                this.minutes = Math.floor(this.game.time.now / 60000) % 60;
                this.seconds = Math.floor(this.game.time.now / 1000) % 60;
                this.milliseconds = Math.floor(this.game.time.now) % 100;

                if (this.milliseconds < 10) {
                    this.milliseconds = + this.milliseconds;
                }
                if (this.seconds < 10) {
                    this.seconds = + this.seconds;
                }
                if (this.minutes < 10) {
                    this.minutes = '0' + this.minutes;
				}
                this.timer.setText(this.minutes + ':' + this.seconds + ':' + this.milliseconds);

                if (this.game.time.now > this.lastTime) {
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