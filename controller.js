//This needs to be used more where controller code is 
//renamce 'controller' in index.html

//support Gamecube controllers on Windows AND Mac, and alternative controller solution
//maybe arrows and WASD?
//never actually tested that Mac still works..

//Temporary solution: just use arrows for player one

var leftKey;
var rightKey;
var upKey;
var downKey


function initializeControllerJS(game) {
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}


function determineCStickLR(controller, player) {
	var cStickLR = controller.axis(player.playerNumber - 1);
	if(!cStickLR){
	    if(leftKey.isDown && player.playerNumber == 1) {
	    	cStickLR = -1;
	    }else if (rightKey.isDown && player.playerNumber == 1){
	    	cStickLR = 1;
	    }else{
	    	cStickLR = 0;
	    }
	}
	console.log(cStickLR);
	return cStickLR;
}

function determineCStickUD(controller, player) {
	var cStickUD = controller.axis(player.playerNumber == 1? 4 : player.playerNumber == 2? 6 : player.playerNumber == 3? 5 : 7);
	if(!cStickUD){ 
	    if(downKey.isDown && player.playerNumber == 1) {
	    	cStickUD = 1;
	    }else if (upKey.isDown && player.playerNumber == 1){
	    	cStickUD = -1;
	    }else{
	    	cStickUD = 0;
	    }
	}
	return cStickUD;
}

