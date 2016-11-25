var omfgDogs;

var omfgDogsSpriteWidth = 384;
var omfgDogsSpriteHeight = 80;
var omfgDogsScale = 3;
var omfgDogsWidth = omfgDogsSpriteWidth * omfgDogsScale;
var omfgDogsHeight = omfgDogsSpriteHeight * omfgDogsScale;

function initializeAnimations() {
    ball.rollingBallAnim = ball.animations.add('rolling_ball');

    initializePlayerAnim(player1);
    initializePlayerAnim(player2);
    if(numberOfPlayers == 4){
        initializePlayerAnim(player3);
        initializePlayerAnim(player4);
    }
}

function animate() {
    animatePlayer(player1,controller);
    animatePlayer(player2,controller);
    if(numberOfPlayers == 4){
        animatePlayer(player3,controller);
        animatePlayer(player4,controller);
    }
    animateBall(ball);
}

//to(properties, duration, ease, autoStart, delay, repeat, yoyo)
function goalCelebration() {
    omfgDogs = game.add.sprite(-omfgDogsWidth,gameHeight/2 - omfgDogsHeight/2,'omfgdogs');
    omfgDogs.scale.setTo(omfgDogsScale,omfgDogsScale);
    omfgDogsRunning = omfgDogs.animations.add('omfgdogs_running');
    omfgDogsRunning.play(20,true);
    var tween = game.add.tween(omfgDogs).to( { x: gameWidth }, 2500, Phaser.Easing.Linear.None, true, 0, 0, false);
    tween.onComplete.add(onCompleteGoalCelebration,this);

    goalCelebrationText = game.add.text(-omfgDogsWidth+200, game.world.centerY+100, "GOOOOOOOOOOOOOOOAL", {
        font: "65px Arial",
        fill: "#ffffff"
    });
    var tween2 = game.add.tween(goalCelebrationText).to( { x:gameWidth }, 2500, Phaser.Easing.Linear.None, true, 0, 0, false);
}

function victory(winner) {
    // var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    // text = game.add.text(0, 0, winner+" Team Wins!", style);
    // text.setTextBounds(0, 100, 800, 100);
    // text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    //this is duplicate code of goal celebration...consolidate the two
    omfgDogs = game.add.sprite(-omfgDogsWidth,gameHeight/2 - omfgDogsHeight/2,'omfgdogs');
    omfgDogs.scale.setTo(omfgDogsScale,omfgDogsScale);
    omfgDogsRunning = omfgDogs.animations.add('omfgdogs_running');
    omfgDogsRunning.play(20,true);
    var tween = game.add.tween(omfgDogs).to( { x: gameWidth }, 3500, Phaser.Easing.Linear.None, true, 0, 0, false);
    tween.onComplete.add(onCompleteVictoryCelebration,this);

    goalCelebrationText = game.add.text(-omfgDogsWidth+400, game.world.centerY+100, winner+"Team Wins!", {
        font: "65px Arial",
        fill: "#ffffff"
    });
    var tween2 = game.add.tween(goalCelebrationText).to( { x:gameWidth }, 2500, Phaser.Easing.Linear.None, true, 0, 0, false);
}