var music;

var cheer;
var bounce;

function initializeMusic(game) {
    music = game.add.audio('omfgdogs_music',1,true);
    music.play();
}

function initializeSoundEffects() {
    cheer = game.add.audio('cheer');
    bounce = game.add.audio('bounce');
    bounce.addMarker('shortened_bounce',0,.5);
    bounce.thresholdSpeed = 25;
}

function playBounce(isCollision,object1,object2){
    if(isCollision && (Math.abs(object1.body.speed) > bounce.thresholdSpeed || Math.abs(object2.body.speed) > bounce.thresholdSpeed)){
        bounce.play('shortened_bounce');
    }
}