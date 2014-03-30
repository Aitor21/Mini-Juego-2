(function () {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {

        preload: function () {
            this.asset = this.add.sprite(320, 240, 'preloader');
            this.asset.anchor.setTo(0.5, 0.5);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);
            this.load.image('player_up', 'assets/mirndo para arriba.png');
			this.load.image('enemydown', 'assets/enemigo mirando abajo.png');
			this.load.image('enemyleft', 'assets/enemigo minrando izquierda.png');
			this.load.image('enemyup', 'assets/enemigo mirando para arriba');
			this.load.image('enemyright', 'assets/enemigo mirando derecha.png');
			this.load.spritesheet('boton', 'assets/Buttons.png', 545, 160);


            this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
        },

        create: function () {
            this.asset.cropEnabled = false;
        },

        update: function () {
            if (!!this.ready) {
                this.game.state.start('menu');
            }
        },

        onLoadComplete: function () {
            this.ready = true;
        }
    };

    window['minijuego-2'] = window['minijuego-2'] || {};
    window['minijuego-2'].Preloader = Preloader;

}());