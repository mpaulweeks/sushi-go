
var PLAYER_HAND_SIZE = {
    2: 10,
    3: 9,
    4: 8,
    5: 7
};

function genGameData(players, callback){
    return {
        players: players,
        callback: callback
    };
}

function finishDraft(gameData, packs){
    if (packs[0].length > 0){
        runDraft(gameData, packs);
    } else {
        finishRound(gameData);
    }
}

function draftCallbackFactory(gameData, packs, packIndex){
    return function(newPack){
        packs[packIndex] = newPack;
        finishDraft(gameData, packs);
    }
}

function runDraft(gameData, packs){
    var players = gameData.players;
    var updatedPacks = [];
    var setCallback = false;
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        var pack = packs[i];
        var updatedPackIndex = (i + 1) % packs.length;
        if (player.isHuman){
            setCallback = true;
            player.chooseCallback = draftCallbackFactory(gameData, updatedPacks, updatedPackIndex);
            player.choosePack = pack;
            drawPlayers(players, pack);
        } else {
            var updatedPack = player.draft(pack, others);
            updatedPacks[updatedPackIndex] = updatedPack;
        }
    }
    if (!setCallback){
        finishDraft(gameData, updatedPacks);
    }
}

function finishRound(gameData){
    var players = gameData.players;
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        player.endRound(others);
        // println(player.hand.toString());
        // println(player.hand.tally);
    }
    var roundsSeen = players[0].scores.length;
    if (roundsSeen < 3){
        runRound(gameData);
    } else {
        endGame(gameData);
    }
}

function runRound(gameData){
    var players = gameData.players;
    var deck = getDeck();
    var packs = [];
    players.forEach(function (player){
        player.newHand();
        packs.push(deck.draw(PLAYER_HAND_SIZE[players.length]));
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

    runDraft(gameData, packs);
}

function endGame(gameData){
    var players = gameData.players;
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        player.endGame(others);
        // println(player.getScore());
    }
    gameData.callback();
}

function runGame(players, callback){
    runRound(genGameData(players, callback));
}
