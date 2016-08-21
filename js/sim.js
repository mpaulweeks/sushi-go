
var SIM = function(){
var module = {};

function printResults(players, scoreTotal){
    var html = [];
    html.push(scoreTotal.games + " games");
    players.forEach(function (player){
        var key = player.id;
        var avg = 0.0;
        scoreTotal[key].forEach(function (score){
            avg += score;
        });
        html.push(key + " | " + (avg / scoreTotal[key].length).toFixed(2));
    });
    $('#sim').html(html.join("<br/>"));
}

function gameCallbackFactory(players, scoreTotal, gameLock){
    var runs = 100;
    var callback = function(){
        scoreTotal.games += 1;
        players.forEach(function (player){
            scoreTotal[player.id] = (scoreTotal[player.id] || []).concat(player.getTotalScore());
            player.restart();
        });
        runs -= 1;
        if (runs > 0){
            GAME.start(players, callback);
        } else {
            printResults(players, scoreTotal);
            gameLock.resolve();
        }
    }
    return callback;
}

function startCallbackStack(players, scoreTotal){
    scoreTotal = scoreTotal || { games: 0 };
    var gameLock = new $.Deferred();
    var callback = gameCallbackFactory(players, scoreTotal, gameLock);
    GAME.start(players, callback);
    $.when(gameLock).then(function (){
        if (scoreTotal.games < 10000){
            setTimeout(function (){
                startCallbackStack(players, scoreTotal);
            }, 1);
        }
    });
}

function runSim(){
    var players = [];
    players.push(PLAYER.new(myPreferences, "myPref"));
    players.push(PLAYER.new(makiPreferences, "maki"));
    players.push(PLAYER.new(simplePreferences, "simple"));
    players.push(PLAYER.new(lowRiskPreferences, "lowRisk"));
    players.push(PLAYER.new(randomPreferences, "random"));
    startCallbackStack(players);
}

module.start = runSim;
return module;
}();
