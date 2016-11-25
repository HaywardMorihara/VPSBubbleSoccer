window.onload = function() {

    var matchBeingPlayed = false;
    
    var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'vps-bubble-soccer', { preload: preload, create: create, update: update, render: render });

    function preload() {
        game.load.audio('omfgdogs_music', ['assets/music/omfgdogs.mp3']);//, 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']); //ogg file for Firefox

        game.load.audio('cheer',['assets/sound_effects/cheer.mp3']);//EpicSoundFX on YouTube
        game.load.audio('bounce',['assets/sound_effects/bounce.mp3']);//soundbible.com

        game.load.image('vps_logo','assets/sprites/VPS_Logo.png');

        game.load.image('soccer_field', 'assets/sprites/soccerField.jpg');
        game.load.image('bubble','assets/sprites/bubble2.png');
        game.load.image('goal','assets/sprites/goal.png');

        game.load.spritesheet('soccer_ball', 'assets/sprites/soccerball.png', 64, 64, 7);
        game.load.spritesheet('player1','assets/sprites/red_player_1.png',playerSpriteWidth, playerSpriteHeight, 28);
        game.load.spritesheet('player2','assets/sprites/blue_player_1.png',playerSpriteWidth, playerSpriteHeight, 28);
        game.load.spritesheet('player3','assets/sprites/red_player_2.png',playerSpriteWidth, playerSpriteHeight, 28);
        game.load.spritesheet('player4','assets/sprites/blue_player_2.png',playerSpriteWidth, playerSpriteHeight, 28);

        game.load.spritesheet('omfgdogs','assets/sprites/omfgdogs_spritesheet.png',omfgDogsSpriteWidth,omfgDogsSpriteHeight,48);//Thanks PiskellApp
    }


    function create() {
        initializeMenu(game);
    }

    function update() {
        if(matchBeingPlayed){
            updateMatch(game,matchBeingPlayed);
        }
    }

    function render() {
        if(matchBeingPlayed) {
            renderMatch(game);
        }
    }

    
};
