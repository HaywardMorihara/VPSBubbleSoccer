//should move all of these variables to a file?
var numberOfPlayers = 2;
var goalsToWin = 5;

var fieldLength = 720;
var fieldWidth = 540;

var wallWidth = 80;
var midWallLength = 160;
var goalWidth = 540 - 2 * midWallLength;

var playerSpriteWidth = 93;
var playerSpriteHeight = 123;

var ballScale = .75; //If I can fix the scale, then I won't have to deal with the bug? Or try to fix the bug...
var ballSpriteWidth = 64;
var ballRadius = ballScale * ballSpriteWidth/2;

var gameWidth = fieldLength + 2 * wallWidth;
var gameHeight = fieldWidth + 2 * wallWidth;

var redScoreBoard;
var blueScoreBoard;

var field;

var topWall;
var bottomWall;
var midTopLeftWall;
var midBottomLeftWall;
var midTopRightWall;
var midBottomRightWall;

var redGoal;
var blueGoal;

var ball;
var player1;
var player2;
var player3;
var player4;

var redScore = 0;
var blueScore = 0;

var goalCelebrationText;

function initializeMatch(game, numOfPlayers) {
    destroyMenu();

    matchBeingPlayed = true;
    numberOfPlayers = numOfPlayers;

    initializeController(game);
    initializeMusic(game);
    initializeSoundEffects(game);
    initializeSprites();
    initializeAnimations();
    initializePhysics();
}

//used to be called "initializeSprites"
function initializeMatchObjects() {
    redScoreBoard = game.add.text(16, 16, redScore.toString(), { fill: '#ff0000' });
    blueScoreBoard = game.add.text(gameWidth-40,16,blueScore.toString(), { fill: '#0000ff'});

    field = game.add.sprite(wallWidth, wallWidth, 'soccer_field');

    topWall = game.add.sprite(0, 0, null);
    bottomWall = game.add.sprite(0, wallWidth+fieldWidth, null);
    midTopLeftWall = game.add.sprite(0, wallWidth, null);
    midBottomLeftWall = game.add.sprite(0, wallWidth+midWallLength+goalWidth, null);
    midTopRightWall = game.add.sprite(wallWidth+fieldLength, wallWidth, null);
    midBottomRightWall = game.add.sprite(wallWidth+fieldLength, wallWidth+midWallLength+goalWidth, null);

    ball = game.add.sprite(gameWidth/2,gameHeight/2,'soccer_ball');
    ball.anchor.setTo(0.5, 0.5);
    ball.scale.setTo(ballScale,ballScale);

    player1 = initializePlayer(game,1,wallWidth,wallWidth);
    player2 = initializePlayer(game,2,wallWidth+fieldLength-playerSpriteWidth,wallWidth);
    if(numberOfPlayers == 4) {
        player3 = initializePlayer(game,3,wallWidth,wallWidth+2*midWallLength+120);
        player4 = initializePlayer(game,4,wallWidth+fieldLength-playerSpriteWidth,wallWidth+2*midWallLength+120);
    }

    redGoal = game.add.sprite(0, wallWidth+midWallLength, 'goal');
    blueGoal = game.add.sprite(wallWidth+fieldLength, wallWidth+midWallLength, 'goal');
}

function updateMatch(game) {
    updatePhysics();
    updatePlayer(player1, controller);
    updatePlayer(player2, controller);
    if(numberOfPlayers == 4){
        updatePlayer(player3,controller);
        updatePlayer(player4,controller);
    }

    game.physics.arcade.overlap(redGoal, ball, goalScored);
    game.physics.arcade.overlap(blueGoal, ball, goalScored);

    animate();
}

function goalScored(goal,ball) {
    ball.body.position.setTo(gameWidth,gameHeight);//move offscreen for a second
    cheer.play();
    if(goal == redGoal){
        blueScore += 1;
        blueScoreBoard.setText(blueScore.toString());
    }else{
        redScore += 1;
        redScoreBoard.setText(redScore.toString());
    }
    if(redScore >= goalsToWin) {
        victory("Red");
    }
    else if(blueScore >= goalsToWin) {
        victory("Blue");
    }
    else {
        goalCelebration();
    }
}

//goalCelebration in "animation.js"
function onCompleteGoalCelebration() {
    omfgDogs.destroy();
    goalCelebrationText.destroy();
    resetBallAndPlayers();
}

function resetBallAndPlayers() {
    ball.body.position.setTo(gameWidth/2 - ball.width/2,gameHeight/2 - ball.height/2);
    ball.body.velocity.setTo(0,0);

    player1.body.position.setTo(wallWidth,wallWidth);
    player1.body.velocity.setTo(0,0);

    player2.body.position.setTo(wallWidth+fieldLength-playerSpriteWidth,wallWidth);
    player2.body.velocity.setTo(0,0);

    if(numberOfPlayers == 4){
        player3.body.position.setTo(wallWidth,wallWidth+2*midWallLength+120);
        player3.body.velocity.setTo(0,0);

        player4.body.position.setTo(wallWidth+fieldLength-playerSpriteWidth,wallWidth+2*midWallLength+120);
        player4.body.velocity.setTo(0,0);
    }
}

//"victory.js"
function onCompleteVictoryCelebration() {
    destroyMatch();
    initializeMenu();
}


function destroyMatch() {
    matchBeingPlayed = false;

    //controller.destroy();//not sure why exactly this is

    music.destroy();//shouldn't need to destroy

    cheer.destroy();//shouldn't need to destroy
    bounce.destroy();//shouldn't need to destroy

    redScore = 0;
    blueScore = 0;

    redScoreBoard.destroy();
    blueScoreBoard.destroy();

    field.destroy();

    topWall.destroy();
    bottomWall.destroy();
    midTopLeftWall.destroy();
    midBottomLeftWall.destroy();
    midTopRightWall.destroy();
    midBottomRightWall.destroy();

    redGoal.destroy();
    blueGoal.destroy();

    ball.destroy();

    player1.bubble.destroy();
    player1.destroy();
    player2.bubble.destroy();
    player2.destroy();

    if(numberOfPlayers == 4){
        player3.bubble.destroy();
        player3.destroy();
        player4.bubble.destroy();
        player4.destroy();
    }
    numberOfPlayers = 2;

    omfgDogs.destroy();
    goalCelebrationText.destroy();
}

function renderMatch() {
    // game.debug.bodyInfo(player1, 32, 32);
    // game.debug.body(player1);
    // game.debug.body(player2);
    // game.debug.body(ball);

    // game.debug.body(topWall);
    // game.debug.body(bottomWall);
    // game.debug.body(midTopLeftWall);
    // game.debug.body(midBottomLeftWall);
    // game.debug.body(midTopRightWall);
    // game.debug.body(midBottomRightWall);

    // game.debug.body(redGoal);
    // game.debug.body(blueGoal);

    // game.debug.text("0:"+controller.axis(0),100,200);
    // game.debug.text("1:"+controller.axis(1),100,250);
    // game.debug.text("2:"+controller.axis(2),100,300);
    // game.debug.text("3:"+controller.axis(3),100,350);
    // game.debug.text("4:"+controller.axis(4),100,400);
    // game.debug.text("5:"+controller.axis(5),100,450);
    // game.debug.text("6:"+controller.axis(6),100,500);
    // game.debug.text("7:"+controller.axis(7),100,550);
}