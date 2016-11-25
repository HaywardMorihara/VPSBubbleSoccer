var vpsLogo;
var titleText;
var twoPlayerOption;
var fourPlayerOption;

function initializeMenu(game) {
    vpsLogo = game.add.sprite(250,0,'vps_logo');
    vpsLogo.scale.setTo(.5,.5);

    titleText = game.add.text(250, game.world.centerY, "Bubble Soccer", {
        font: "65px Arial",
        fill: "#ffffff"
    });

    twoPlayerOption = game.add.text(250+100, game.world.centerY + 150, "2 Players", {
        font: "45px Arial",
        fill: "#ffffff"
    });
    twoPlayerOption.inputEnabled = true;
    twoPlayerOption.events.onInputOver.add(hoverOver,this);
    twoPlayerOption.events.onInputOut.add(hoverOff, this);
    twoPlayerOption.events.onInputUp.add(initializeMatch(game, 2),this);

    fourPlayerOption = game.add.text(250+100, game.world.centerY + 200, "4 Players", {
        font: "45px Arial",
        fill: "#ffffff"
    });
    fourPlayerOption.inputEnabled = true;
    fourPlayerOption.events.onInputOver.add(hoverOver,this);
    fourPlayerOption.events.onInputOut.add(hoverOff, this);
    fourPlayerOption.events.onInputUp.add(initializeMatch(game,4),this);
}

function hoverOver(text) {
    text.fill = "#ffff00";
}

function hoverOff(text) {
    text.fill = "#ffffff";
}

function destroyMenu() {
    vpsLogo.destroy();
    titleText.destroy();
    twoPlayerOption.destroy();
    fourPlayerOption.destroy();
}