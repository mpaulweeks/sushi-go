
function endPlay(players){
    $('#game').empty();
    var results = [];
    players.forEach(function (player){
        results = [(player.id + "|" + player.getScore())].concat(results);
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
    players.push(genPlayer(lowRiskPreferences, "ai4"));
    players.push(genPlayer(myPreferences, "ai3"));
    players.push(genPlayer(lowRiskPreferences, "ai2"));
    players.push(genPlayer(myPreferences, "ai1"));
    $('#reset').click(function (){
        resetPlay(players);
    });
    startPlay(players);
}
