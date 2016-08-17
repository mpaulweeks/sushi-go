
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
    return function(){
        scoreTotal.games += 1;
        players.forEach(function (player){
            scoreTotal[player.id] = (scoreTotal[player.id] || []).concat(player.getScore());
            player.restart();
        });
        runs -= 1;
        if (runs > 0){
            runGame(players);
        } else {
            printResults(players, scoreTotal);
            gameLock.resolve();
        }
    }
}

function startCallbackStack(players, scoreTotal){
    scoreTotal = scoreTotal || { games: 0 };
    var gameLock = new $.Deferred();
    var callback = gameCallbackFactory(players, scoreTotal, gameLock);
    players[0].gameCallback = callback;
    runGame(players);
    $.when(gameLock).then(function (){
        if (scoreTotal.games < 10000){
            setTimeout(function (){
                startCallbackStack(players, scoreTotal);
            }, 10);
        }
    });
}

function runSim(){
    var players = [];
    players.push(genPlayer(myPreferences, "myPref"));
    players.push(genPlayer(makiPreferences, "maki"));
    players.push(genPlayer(simplePreferences, "simple"));
    players.push(genPlayer(lowRiskPreferences, "lowRisk"));
    players.push(genPlayer(randomPreferences, "random"));
    startCallbackStack(players);
}
