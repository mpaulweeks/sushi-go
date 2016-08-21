
var SIM = function(){
var module = {};

function getSimRobots(numPlayers){
    var robots = shuffle(ROBOT.registry);
    var out = [];
    for (var i = 0; i < numPlayers; i++){
        out.push(PLAYER.new(robots[i]));
    }
    return out;
}

function printResults(players, scoreTotal){
    var html = [];
    html.push(scoreTotal.games + " games");
    ROBOT.registry.forEach(function (robot){
        var key = robot.name;
        var avg = 0.0;
        scoreTotal[key].forEach(function (score){
            avg += score;
        });
        html.push(formatStr(
            "{1} | {2} | {3}",
            key,
            (avg / scoreTotal[key].length).toFixed(2),
            scoreTotal[key].length
        ));
    });
    $('#sim').html(html.join("<br/>"));
}

function gameCallbackFactory(scoreTotal, gameLock){
    var runs = 100;
    var callback = function(players){
        scoreTotal.games += 1;
        players.forEach(function (player){
            scoreTotal[player.id] = (scoreTotal[player.id] || []).concat(player.getTotalScore());
            player.restart();
        });
        runs -= 1;
        if (runs > 0){
            GAME.start(getSimRobots(players.length), callback);
        } else {
            printResults(players, scoreTotal);
            gameLock.resolve();
        }
    }
    return callback;
}

function startCallbackStack(numPlayers, scoreTotal){
    var gameLock = new $.Deferred();
    var callback = gameCallbackFactory(scoreTotal, gameLock);
    GAME.start(getSimRobots(numPlayers), callback);
    $.when(gameLock).then(function (){
        if (scoreTotal.games < 10000){
            setTimeout(function (){
                startCallbackStack(numPlayers, scoreTotal);
            }, 1);
        }
    });
}

function runSim(numPlayers){
    startCallbackStack(numPlayers, { games: 0 });
}

module.start = runSim;
return module;
}();
