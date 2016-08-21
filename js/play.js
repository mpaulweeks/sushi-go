
var PLAY = function(){
var module = {};

function endGame(players){
    VIEW.endGame(players);
}

function resetPlay(players){
    players.forEach(function (player){
        player.restart();
    });
    startPlay(players.length);
}

function startPlay(numPlayers){
    var players = [];
    players.push(PLAYER.new());
    var robots = shuffle(ROBOT.registry);
    for (var i = 0; i < numPlayers - 1; i++){
        players.push(PLAYER.new(robots[i]));
    }
    VIEW.drawGame(players, resetPlay);
    GAME.start(players, endGame);
}

module.start = startPlay;
return module;
}();
