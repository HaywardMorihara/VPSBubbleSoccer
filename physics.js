function initializePhysics() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    if(numberOfPlayers == 2){
        game.physics.enable([ball,player1,player2,redGoal,blueGoal,topWall,bottomWall,midTopLeftWall,midBottomLeftWall,midTopRightWall,midBottomRightWall], Phaser.Physics.ARCADE);
    }else if (numberOfPlayers == 4){
        game.physics.enable([ball,player1,player2,player3,player4,redGoal,blueGoal,topWall,bottomWall,midTopLeftWall,midBottomLeftWall,midTopRightWall,midBottomRightWall], Phaser.Physics.ARCADE);
    }


    initializeWallPhysics();

    redGoal.body.setSize(wallWidth/4,goalWidth,0,0);
    blueGoal.body.setSize(wallWidth/4,goalWidth,wallWidth*3/4,0);

    //ball.body.collideWorldBounds = true;
    //This sets the image bounce energy for the horizontal
    // and vertical vectors (as an x,y point). "1" is 100% energy return
    ball.body.bounce.setTo(1,1);
    //ball.body.setSize(0,0,ballRadius/3,ballRadius/3);
    //ball.body.setCircle(ballRadius);

    initializePlayerPhysics(player1);
    initializePlayerPhysics(player2);
    if(numberOfPlayers == 4){
        initializePlayerPhysics(player3);
        initializePlayerPhysics(player4);
    }
}

function initializeWallPhysics() {
    topWall.body.setSize(gameWidth, wallWidth, 0, 0);
    topWall.body.immovable = true;

    bottomWall.body.setSize(gameWidth, wallWidth, 0, 0);
    bottomWall.body.immovable = true;

    midTopLeftWall.body.setSize(wallWidth,midWallLength,0,0);
    midTopLeftWall.body.immovable = true;

    midBottomLeftWall.body.setSize(wallWidth,midWallLength,0,0);
    midBottomLeftWall.body.immovable = true;

    midTopRightWall.body.setSize(wallWidth,midWallLength,0,0);
    midTopRightWall.body.immovable = true;

    midBottomRightWall.body.setSize(wallWidth,midWallLength,0,0);
    midBottomRightWall.body.immovable = true;
}

function updatePhysics() {
    //I gotta user grouping here...

    var p1b = game.physics.arcade.collide(player1,ball);
    var p2b = game.physics.arcade.collide(player2,ball);

    var p1p2 = game.physics.arcade.collide(player1,player2);

    playBounce(p1b,player1,ball);
    playBounce(p2b,player2,ball);

    playBounce(p1p2,player1,player2);

    game.physics.arcade.collide(player1,topWall);
    game.physics.arcade.collide(player1,bottomWall);
    game.physics.arcade.collide(player1,midTopLeftWall);
    game.physics.arcade.collide(player1,midBottomLeftWall);
    game.physics.arcade.collide(player1,midTopRightWall);
    game.physics.arcade.collide(player1,midBottomRightWall);

    game.physics.arcade.collide(player2,topWall);
    game.physics.arcade.collide(player2,bottomWall);
    game.physics.arcade.collide(player2,midTopLeftWall);
    game.physics.arcade.collide(player2,midBottomLeftWall);
    game.physics.arcade.collide(player2,midTopRightWall);
    game.physics.arcade.collide(player2,midBottomRightWall);

    game.physics.arcade.collide(ball,topWall);
    game.physics.arcade.collide(ball,bottomWall);
    game.physics.arcade.collide(ball,midTopLeftWall);
    game.physics.arcade.collide(ball,midBottomLeftWall);
    game.physics.arcade.collide(ball,midTopRightWall);
    game.physics.arcade.collide(ball,midBottomRightWall);

    if(numberOfPlayers == 4){
        var p3b = game.physics.arcade.collide(player3,ball);
        var p4b = game.physics.arcade.collide(player4,ball);

        var p1p3 = game.physics.arcade.collide(player1,player3);
        var p1p4 = game.physics.arcade.collide(player1,player4);

        var p2p3 = game.physics.arcade.collide(player2,player3);
        var p2p4 = game.physics.arcade.collide(player2,player4);

        var p3p4 = game.physics.arcade.collide(player3,player4);

        playBounce(p3b,player3,ball);
        playBounce(p4b,player4,ball);

        playBounce(p1p3,player1,player3);
        playBounce(p1p4,player1,player4);
        playBounce(p2p3,player2,player3);
        playBounce(p2p4,player2,player4);
        playBounce(p3p4,player3,player3);

        game.physics.arcade.collide(player3,topWall);
        game.physics.arcade.collide(player3,bottomWall);
        game.physics.arcade.collide(player3,midTopLeftWall);
        game.physics.arcade.collide(player3,midBottomLeftWall);
        game.physics.arcade.collide(player3,midTopRightWall);
        game.physics.arcade.collide(player3,midBottomRightWall);

        game.physics.arcade.collide(player4,topWall);
        game.physics.arcade.collide(player4,bottomWall);
        game.physics.arcade.collide(player4,midTopLeftWall);
        game.physics.arcade.collide(player4,midBottomLeftWall);
        game.physics.arcade.collide(player4,midTopRightWall);
        game.physics.arcade.collide(player4,midBottomRightWall);
    }
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}