
var GAME = function(){
var module = {};

var PLAYER_HAND_SIZE = {
    2: 10,
    3: 9,
    4: 8,
    5: 7
};

function genGameData(players, deck, callback){
    return {
        players: players,
        deck: deck,
        callback: callback
    };
}

function finishDraft(gameData, packs){
    gameData.players.forEach(function (player){
        player.resolvePicks();
    });
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
        var updatedPackIndex = (i - 1 + packs.length) % packs.length;
        if (player.isHuman){
            setCallback = true;
            player.otherPlayers = others;
            player.chooseCallback = draftCallbackFactory(gameData, updatedPacks, updatedPackIndex);
            player.choosePack = pack;
            VIEW.drawPlayers(players, pack);
        } else {
            var updatedPack = player.robotDraft(pack, others);
            updatedPacks[updatedPackIndex] = updatedPack;
        }
    }
    if (!setCallback){
        finishDraft(gameData, updatedPacks);
    }
}

function finishRound(gameData){
    var players = gameData.players;
    var setCallback = false;
    var shouldDraw = false;
    var roundsSeen = players[0].scores.length + 1;
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        player.endRound(others);
        if (player.isHuman){
            shouldDraw = true;
            if (roundsSeen < 3){
                setCallback = true;
                player.roundCallback = function(){
                    runRound(gameData);
                };
            }
        }
    }
    if (shouldDraw){
        VIEW.endRound(players);
    }
    if (!setCallback){
        if (roundsSeen < 3){
            runRound(gameData);
        } else {
            endGame(gameData);
        }
    }
}

function runRound(gameData){
    var players = gameData.players;
    var packs = [];
    players.forEach(function (player){
        player.newHand();
        packs.push(gameData.deck.draw(PLAYER_HAND_SIZE[players.length]));
    });

    packs.forEach(function (p){
        var ids = [];
        p.forEach(function (card){
            ids.push(card.id);
        });
    });

    runDraft(gameData, packs);
}

function endGame(gameData){
    var players = gameData.players;
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        player.endGame(others);
    }
    gameData.callback(players);
}

function runGame(players, callback){
    var deck = DECK.new();
    runRound(genGameData(players, deck, callback));
}

module.start = runGame;
return module;
}();
