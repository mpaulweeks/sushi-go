
function runRound(players){
    var deck = getDeck();
    var packs = [];
    players.forEach(function (player){
        player.newHand();
        packs.push(deck.draw(8));
    });

    // print packs
    packs.forEach(function (p){
        var ids = [];
        p.forEach(function (card){
            ids.push(card.id);
        });
        // println("pack: " + ids.join(", "));
    });
    // println("---")

    while (packs[0].length > 0){
        var updatedPacks = [];
        for (var i = 0; i < players.length; i++){
            var player = players[i];
            var others = exceptIndex(players, i);
            var packIndex = (i + 1) % packs.length;
            var pack = packs[packIndex];
            var updatedPack = player.draft(pack, others);
            updatedPacks.push(updatedPack);
        }
        packs = updatedPacks;
    }
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        player.endRound(others);
        // println(player.hand.toString());
        // println(player.hand.tally);
    }
}

function runGame(players){
    for (var i = 0; i < 3; i++){
        runRound(players);
    }
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        player.endGame(others);
        // println(player.getScore());
    }
}
