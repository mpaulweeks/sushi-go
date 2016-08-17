
function endGame(){
    // todo
}

function playGame(){
    var players = [];
    players.push(genPlayer(null, "human"));
    players.push(genPlayer(makiPreferences, "maki"));
    players.push(genPlayer(simplePreferences, "simple"));
    players.push(genPlayer(randomPreferences, "random"));
    drawGame(players);
    runGame(players);
}