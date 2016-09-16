var rollingBallAnim;

function loadBallSprites() {
	game.load.spritesheet('soccer_ball', 'assets/sprites/soccerball.png', 64, 64, 7);
}

function createBall() {
	ball = game.add.sprite(gameWidth/2,gameHeight/2,'soccer_ball');
    ball.anchor.setTo(0.5, 0.5);
    ball.scale.setTo(.75,.75);
	rollingBallAnim = ball.animations.add('rolling_ball'); 
}

function initializeBallPhysics() {
	ball.body.velocity.setTo(200,200);
    ball.body.collideWorldBounds = true;
    //This sets the image bounce energy for the horizontal
    // and vertical vectors (as an x,y point). "1" is 100% energy return
    ball.body.bounce.setTo(.9,.9);
}

function updateBall() {

}

function animateBall() {
	var thetaRadians = Math.atan2(ball.body.velocity.y,ball.body.velocity.x);
    var thetaDegrees = thetaRadians * 180/Math.PI;
    ball.angle = thetaDegrees - 180; //backwards so needed to turn around

    if (ball.body.velocity.x == 0 && ball.body.velocity.y == 0) {
        rollingBallAnim.stop();
    } else {
        var fps = Math.min(1, Math.max(Math.abs(ball.body.velocity.x),
                    Math.abs(ball.body.velocity.y)) / 200) * 20;//animation speed is specified in frames per second and has a minimum value of 1. I want the maximum frame speed to be 20, and I want to use that when the velocity of the ball is equal to or greater than 200. Velocities under 200 will calculate an animation frame rate as a ratio, but not go under 1. A velocity of 100 will result in a frame rate of 4.5, for example
        if (rollingBallAnim.isPlaying) {
            rollingBallAnim.speed = fps;
        } else {
            rollingBallAnim.play(fps, true);
        }
    }
}