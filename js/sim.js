
function runSim(){
    var players = [];
    for (var i = 0; i < 2; i++){
        players.push(genPlayer(myPreferences, "myPref"));
        players.push(genPlayer(randomPreferences, "random"));
    }
    var scoreTotal = {};
    for (var i = 0; i < 500; i++){
        // println("running game #" + i);
        runGame(players);
        players.forEach(function (player){
            scoreTotal[player.id] = player.getScore() + (scoreTotal[player.id] || 0);
            player.restart();
        });
    }
    println(scoreTotal);
}
