(function () {
    'use strict';

    function Menu() {
        this.titleTxt = null;
        this.startTxt = null;
    }

    Menu.prototype = {

        create: function () {
            var x = this.game.width / 2, y = this.game.height / 2;

            this.titleTxt = this.add.bitmapText(x, 100, 'Heart Beat', {font: '72px minecraftia', align: 'center'});
            this.titleTxt.anchor.setTo(0.5, 0.5);
            this.startButton = this.add.button(this.world.centerX, 300, 'abc', function () {this.game.state.start('game'); }, this, 1, 0);
            this.startButton.anchor.setTo(0.5, 0.5);
            this.instructionsText = this.add.bitmapText(10, 400, 'Como jugar:', {font: '32px minecraftia', align: 'center'});
            this.instructionsText = this.add.bitmapText(10, 460, 'Controls: W,A,S,D controlan al personaje', {font: '20px minecraftia', align: 'center'});
            this.instructionsText = this.add.bitmapText(10, 495, 'Manten tu corazon en funcionamiento', {font: '20px minecraftia', align: 'center'});
            this.instructionsText = this.add.bitmapText(10, 530, 'evitando a los enemigos.', {font: '20px minecraftia', align: 'center'});
            this.instructionsText = this.add.bitmapText(10, 565, 'Si no te mueves no seras atacado,', {font: '20px minecraftia', align: 'center'});
            this.instructionsText = this.add.bitmapText(10, 600, 'Pero cuidado, administra bien tus latidos...', {font: '20px minecraftia', align: 'center'});

            this.input.onDown.add(this.onDown, this);
        },

        update: function () {

        },

        onDown: function () {
            this.game.state.start('game');
			if(this.game.state.start('game')){
			//this.updateTimer.;
				console.log('hi');
	}
        }
		
    };

    window['minijuego-2'] = window['minijuego-2'] || {};
    window['minijuego-2'].Menu = Menu;

}());
