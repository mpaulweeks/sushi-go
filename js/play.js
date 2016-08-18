
function endPlay(players){
    $('#game').empty();
    var results = [];
    players.forEach(function (player){
        results.push(player.id + "|" + player.getScore());
    });
    $('#results').html(results.join("<br/>"));
    $('#reset').show();
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
    drawGame(players);
    runGame(players, function(){
        endPlay(players);
    });
}

function playGame(){
    var players = [];
    players.push(genPlayer(null, "human"));
    players.push(genPlayer(lowRiskPreferences, "lowRisk"));
    players.push(genPlayer(makiPreferences, "maki"));
    players.push(genPlayer(simplePreferences, "simple"));
    players.push(genPlayer(randomPreferences, "random"));
    $('#reset').click(function (){
        resetPlay(players);
    });
    startPlay(players);
}
