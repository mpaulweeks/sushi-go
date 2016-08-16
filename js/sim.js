
function runSim(){
    var players = [];
    players.push(genPlayer(myPreferences, "myPref"));
    players.push(genPlayer(makiPreferences, "maki"));
    players.push(genPlayer(simplePreferences, "simple"));
    players.push(genPlayer(randomPreferences, "random"));
    var scoreTotal = {};
    for (var i = 0; i < 500; i++){
        // println("running game #" + i);
        runGame(players);
        players.forEach(function (player){
            scoreTotal[player.id] = (scoreTotal[player.id] || []).concat(player.getScore());
            player.restart();
        });
    }
    Object.keys(scoreTotal).forEach(function (key){
        var avg = 0.0;
        scoreTotal[key].forEach(function (score){
            avg += score;
        });
        println(key + " | " + (avg / scoreTotal[key].length));
    });
}
