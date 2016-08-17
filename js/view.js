
var DRAW_ORDER = ['yellow', 'red', 'green', 'purple', 'blue', 'pink', 'teal'];

function drawPlayer(player, otherPlayers, position){
    if (position != 0){
        // todo
        return;
    }
    var divs = {};
    player.hand.cards.forEach(function (card){
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
    var boardHtml = colorHtmls.join("");
    var score = player.calculateScore(otherPlayers);
    $('#player-score-' + position).html(score);
    $('#player-board-' + position).html(boardHtml);
}