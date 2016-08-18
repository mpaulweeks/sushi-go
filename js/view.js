
var DRAW_ORDER = ['yellow', 'red', 'blue', 'green', 'purple', 'pink', 'teal'];
var CLEAR_HTML = '<div class="clear"></div>';
var PLAYER_WRAPPER = '<div class="player-row" data-player="{2}">{1}</div>';
var PLAYER_HTML = `
<div class="info">{2}<span class="score" id="player-score-{1}"></span></div>
<div class="board" id="player-board-{1}"></div>
`;
var DRAFT_HTML = `
<hr/>
<div class="draft" id="player-draft-{1}"></div>
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
        var playerId = parseInt($(this).parent().parent().data('player'));
        players[playerId].chooseCard(cardId);
    });
    $('#player-board-0').on('click', '.card-teal', function (){
        var playerId = parseInt($(this).parent().parent().data('player'));
        players[playerId].chopsticks();
    });
}

function drawGame(players){
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
    setupListeners(players);
}

function drawPlayer(player, otherPlayers, pack, position){
    var score = "";
    if (player.isHuman){
        score = " - " + player.calculateScore(otherPlayers);
    }
    $('#player-score-' + position).html(score);
    var boardHtml = genBoardHtml(player.hand.cards);
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
