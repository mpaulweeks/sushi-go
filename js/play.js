
var PLAY = function(){
var module = {};

function endGame(players){
    VIEW.endGame(players);
}

function resetPlay(players){
    players.forEach(function (player){
        player.restart();
    });
    $('#results').empty();
    $('#reset').hide();
    startPlay(players);
}

function startPlay(players){
    GAME.start(players, function(){
        endGame(players);
    });
}

function playGame(){
    var players = [];
    players.push(PLAYER.new(null, "human"));
    players.push(PLAYER.new(lowRiskPreferences, "ai4"));
    players.push(PLAYER.new(myPreferences, "ai3"));
    players.push(PLAYER.new(lowRiskPreferences, "ai2"));
    players.push(PLAYER.new(myPreferences, "ai1"));
    VIEW.drawGame(players);
    $('#reset').on('click', function (){
        resetPlay(players);
    });
    startPlay(players);
}

module.start = playGame;
return module;
}();
