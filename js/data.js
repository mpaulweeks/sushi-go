
var HISTORY = function(){
var module = {};
var data = {};

module.getObj = function(card1, card2){
    if (!data.hasOwnProperty(card1.id)){
        data[card1.id] = {};
    }
    var d1 = data[card1.id];
    if (!d1.hasOwnProperty(card2.id)){
        d1[card2.id] = { scores: [] };
    }
    var d2 = d1[card2.id];
    return d2;
}

module.getScore = null; //average

module.new = function(choice, other){
    return module.getObj(choice, other);
}

return module.
}();
