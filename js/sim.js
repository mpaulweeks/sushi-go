
function runSim(){
    var players = [];
    players.push(genPlayer(myPreferences, "myPref"));
    players.push(genPlayer(makiPreferences, "maki"));
    players.push(genPlayer(simplePreferences, "simple"));
    players.push(genPlayer(lowRiskPreferences, "lowRisk"));
    players.push(genPlayer(randomPreferences, "random"));
    var scoreTotal = {};
    var runs = 500;
    var gameCallback = function(players){
        players.forEach(function (player){
            scoreTotal[player.id] = (scoreTotal[player.id] || []).concat(player.getScore());
            player.restart();
        });
        runs -= 1;
        if (runs > 0){
            runGame(players);
        } else {
            Object.keys(scoreTotal).forEach(function (key){
                var avg = 0.0;
                scoreTotal[key].forEach(function (score){
                    avg += score;
                });
                println(key + " | " + (avg / scoreTotal[key].length));
            });
        }
    }
    players[0].gameCallback = gameCallback;
    runGame(players);
}
