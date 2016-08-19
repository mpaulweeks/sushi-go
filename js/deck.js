
var DECK = function(){
    var module = {};

    var getDeck = function(){
        var deckList = [];
        CARD.TYPES.forEach(function (cardType){
            for (var i = 0; i < cardType.quantity; i++){
                deckList.push(cardType);
            }
        });
        var deckObj = {};
        deckObj._list = shuffle(deckList);
        deckObj.draw = function(number){
            number = number || 1;
            var out = [];
            while (number > 0){
                out.push(deckObj._list.pop());
                number -= 1;
            }
            return out;
        }
        return deckObj;
    }

    module.new = getDeck;
    return module;
}();
