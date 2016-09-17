function updatePlayer(player, controller) {
	cStickLR = controller.axis(0);
    cStickUD = controller.axis(4);

    if(cStickLR == 0) {
    	if(player.body.velocity.x > 0) {
    		if (player.body.velocity.x - player.dampening < 0) {
    			player.body.velocity.x = 0;
    		}else{
    			player.body.velocity.x -= player.dampening;
    		}
    	}else{
    		if (player.body.velocity.x + player.dampening > 0) {
    			player.body.velocity.x = 0;
    		}else{
    			player.body.velocity.x += player.dampening;
    		}
    	}
    }else{
    	player.body.velocity.x += cStickLR * player.speedValue;
    }

    if(cStickUD == 0) {
    	if(player.body.velocity.y > 0) {
    		if (player.body.velocity.y - player.dampening < 0) {
    			player.body.velocity.y = 0;
    		}else{
    			player.body.velocity.y -= player.dampening;
    		}
    	}else{
    		if (player.body.velocity.y + player.dampening > 0) {
    			player.body.velocity.y = 0;
    		}else{
    			player.body.velocity.y += player.dampening;
    		}
    	}
    }else{
    	player.body.velocity.y += cStickUD * player.speedValue;
    }
}

function animatePlayer(player,controller) {
	var fps = 5 + Math.min(1, Math.max(Math.abs(player.body.velocity.x), Math.abs(player.body.velocity.y)) / 200) * 20;
    if(player.body.velocity.x == 0 && player.body.velocity.y == 0) {
        player.walkingRightAnim.stop();
        player.walkingUpAnim.stop();
        player.walkingDownAnim.stop();
        player.walkingLeftAnim.stop();
    }else{
        if(Math.abs(cStickLR) > Math.abs(cStickUD)){
            player.walkingUpAnim.stop();
            player.walkingDownAnim.stop();
            if(cStickLR > 0) {
                player.walkingLeftAnim.stop();
                playAnimation(player.walkingRightAnim,fps);
            }else{
                player.walkingRightAnim.stop();
                playAnimation(player.walkingLeftAnim,fps);
            }
        }else{
            player.walkingLeftAnim.stop();
            player.walkingRightAnim.stop();
            if(cStickUD > 0) {
                player.walkingUpAnim.stop();
                playAnimation(player.walkingDownAnim,fps);
            }else{
                player.walkingDownAnim.stop();
                playAnimation(player.walkingUpAnim,fps);
            }
        }
        //old code that did direction based on velocity, not the direction controller pointing
        // if(Math.abs(player.body.velocity.x) > Math.abs(player.body.velocity.y)) {
        // 	player.walkingUpAnim.stop();
        // 	player.walkingDownAnim.stop();
        //     if(player.body.velocity.x > 0) {
        //     	player.walkingLeftAnim.stop();
        //         if(player.walkingRightAnim.isPlaying) {
        //     		player.walkingRightAnim.speed = fps;
        // 		} else {
        //     		player.walkingRightAnim.play(fps, true);
        // 		}
        //   	}else{
        //   		player.walkingRightAnim.stop();
        //         if(player.walkingLeftAnim.isPlaying) {
        //     		player.walkingLeftAnim.speed = fps;
        // 		} else {
        //     		player.walkingLeftAnim.play(fps, true);
       	// 		}
        //     }
        // }else{
        // 	player.walkingRightAnim.stop();
        // 	player.walkingLeftAnim.stop();
        //     if(player.body.velocity.y > 0) {
        //     	player.walkingUpAnim.stop();
        //         if(player.walkingDownAnim.isPlaying) {
        //     		player.walkingDownAnim.speed = fps;
        // 		} else {
        //     		player.walkingDownAnim.play(fps, true);
       	// 		 }
        //     }else{
        //     	player.walkingDownAnim.stop();
        //         if(player.walkingUpAnim.isPlaying) {
        //     		player.walkingUpAnim.speed = fps;
        // 		} else {
        //    			 player.walkingUpAnim.play(fps, true);
        // 		}
        //     }
        // }
    }
}

function playAnimation(animation, fps) {
    if(animation.isPlaying) {
        animation.speed = fps;
    } else {
        animation.play(fps, true);
    }
}