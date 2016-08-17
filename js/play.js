
function playGame(){
    var players = [];
    players.push(genPlayer(myPreferences, "myPref"));
    players.push(genPlayer(makiPreferences, "maki"));
    players.push(genPlayer(simplePreferences, "simple"));
    players.push(genPlayer(randomPreferences, "random"));
    runRound(players, true);
}