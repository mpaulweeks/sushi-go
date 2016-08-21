
var VIEW = function(){
var module = {};

var DRAW_ORDER = ['yellow', 'red', 'blue', 'green', 'purple', 'pink', 'teal'];
var CLEAR_HTML = '<div class="clear"></div>';
var PLAYER_WRAPPER = `
<div class="player-row" id="player-row-{2}">
<div class="player-info" id="player-history-{2}"></div>
<div class="player-info" id="player-info-{2}"></div>
<div class="player-table" data-player="{2}">{1}</div>
<div class="clear"></div>
</div>
`;
var PLAYER_HTML = `
<div class="info">{2}</div>
<div class="board" id="player-board-{1}"></div>
`;
var DRAFT_HTML = `
<hr/>
<div class="draft" id="player-draft-{1}"></div>
`;
var ROUND_BUTTON = '<button id="next-round" class="btn">Next Round</button>';
var RESET_BUTTON = '<button id="reset" class="btn">Reset</button>';

function genBoardHtml(cards){
    var divs = {};
    cards.forEach(function (card){
        var cardDiv = card.html();
        divs[card.color] = (divs[card.color] || []).concat(cardDiv);
    });
    var colorHtmls = [];
    DRAW_ORDER.forEach(function (color){
        var colorHtml = (divs[color] || []).join("");
        if (colorHtml.length > 0){
            colorHtmls.push(colorHtml);
        }
    });
    return colorHtmls.join("") + CLEAR_HTML;
}

function setupListeners(players, resetCallback){
    $('.draft').on('click', '.card', function (){
        var cardId = $(this).data('card');
        var playerId = parseInt($(this).parent().parent().data('player'));
        players[playerId].chooseCard(cardId);
    });
    $('#player-board-0').on('click', '.card-teal', function (){
        var playerId = parseInt($(this).parent().parent().data('player'));
        players[playerId].chopsticks();
    });
    $('#player-draft-0').on('click', '#next-round', function (){
        var playerId = 0;
        players[playerId].nextRound();
    });
    $('#player-draft-0').on('click', '#reset', resetCallback);
}

function drawGame(players, resetCallback){
    var numPlayers = players.length;
    var rowHtmls = [];
    for (var i = numPlayers - 1; i >= 0; i--){
        var rowHtml = formatStr(PLAYER_HTML, i, players[i].id);
        if (players[i].isHuman){
            rowHtml += formatStr(DRAFT_HTML, i);
        }
        rowHtmls.push(formatStr(PLAYER_WRAPPER, rowHtml, i));
    }
    $("#game").html(rowHtmls.join(""));
    setupListeners(players, resetCallback);
}

function drawPlayer(player, otherPlayers, pack, position){
    $('#player-row-' + position).removeClass('highlight');
    var score = "Current Score: " + player.calculateScore(otherPlayers);
    var puddingCount = player.puddingCount + " pudding";
    var boardHtml = genBoardHtml(player.hand.cards);
    $('#player-board-' + position).html(boardHtml);
    if (position == 0){
        var draftHtml = genBoardHtml(pack);
        if (pack.length == 0){
            draftHtml = ROUND_BUTTON;
            if (player.scores.length == 4){
                draftHtml = RESET_BUTTON;
            }
        }
        $('#player-draft-' + position).html(draftHtml);
    }
    var info = [score, puddingCount];
    if (pack.length == 0){
        var total = formatStr("<br/><b>Total: {1}</b>", player.getTotalScore());
        info.push(total);
    }
    $('#player-info-' + position).html(info.join('<br/>'));
    var history = [];
    for (var i = 0; i < player.scores.length; i++){
        var line = formatStr("Round {1}: {2}", i+1, player.scores[i]);
        line = line.replace("Round 4", "Pudding");
        history.push(line);
    }
    $('#player-history-' + position).html(history.join('<br/>'));
}

function drawPlayers(players, pack){
    pack = pack || [];
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        drawPlayer(player, others, pack, i);
    }
}

function highlightWinner(players){
    var maxId = 0;
    for (var i = 1; i < players.length; i++){
        var maxScore = players[maxId].getTotalScore();
        var newScore = players[i].getTotalScore();
        var winner = (
            newScore > maxScore || (
                newScore == maxScore &&
                players[i].puddingCount > players[maxId].puddingCount
            )
        );
        if (winner){
            maxId = i;
        }
    }
    $('#player-row-' + maxId).addClass('highlight');
}

function endRound(players){
    drawPlayers(players);
    highlightWinner(players);
}

function endGame(players){
    drawPlayers(players);
    highlightWinner(players);
}

module.drawGame = drawGame;
module.drawPlayers = drawPlayers;
module.drawPlayer = drawPlayer;
module.endRound = endRound;
module.endGame = endGame;
return module;
}();
