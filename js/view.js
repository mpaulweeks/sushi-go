
var DRAW_ORDER = ['yellow', 'red', 'blue', 'green', 'purple', 'pink', 'teal'];
var CLEAR_HTML = '<div class="clear"></div>';
var PLAYER_HTML = `
<div class="info">{2} - <span class="score" id="player-score-{1}"></span></div>
<div class="board" id="player-board-{1}"></div>
<div class="draft" id="player-draft-{1}" data-player="{1}"></div>
`;

function genBoardHtml(cards){
    var divs = {};
    cards.forEach(function (card){
        var cardDiv = cardHtml(card);
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

function setupListeners(players){
    $('.draft').on('click', '.card', function (){
        var cardId = $(this).data('card');
        var playerId = parseInt($(this).parent().data('player'));
        players[playerId].chooseCard(cardId);
    });
}

function drawGame(players){
    var numPlayers = players.length;
    var gameHtml = [];
    for (var i = numPlayers - 1; i >= 0; i--){
        gameHtml.push(formatStr(PLAYER_HTML, i, players[i].id));
    }
    $("#game").html(gameHtml.join(""));
    setupListeners(players);
}

function drawPlayer(player, otherPlayers, pack, position){
    var score = player.calculateScore(otherPlayers);
    var boardHtml = genBoardHtml(player.hand.cards);
    $('#player-score-' + position).html(score);
    $('#player-board-' + position).html(boardHtml);
    if (position == 0){
        var draftHtml = genBoardHtml(pack);
        $('#player-draft-' + position).html(draftHtml);
    }
}

function drawPlayers(players, pack){
    for (var i = 0; i < players.length; i++){
        var player = players[i];
        var others = exceptIndex(players, i);
        drawPlayer(player, others, pack, i);
    }
}
