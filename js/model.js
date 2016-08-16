
function getRest(hand, index){
    var out = [];
    for (var i = index; i < hand.length; i++){
        out.push(hand[i]);
    }
    return out;
}

function checkIdFunc(queryId){
    return function(toCheck){
        return toCheck.id == queryId;
    }
}

function getCount(hand, queryFunc){
    var count = 0;
    for (var i = 0; i < hand.length; i++){
        if (queryFunc(hand[i])){
            count += 1;
        }
    }
    return count;
}

var SASHIMI = function(){
    var self = {};
    self.quantity = 14;
    self.id = "sashimi";
    self.color = "green";
    self.symbol = "S";
    return self;
}();

var TEMPURA = function(){
    var self = {};
    self.quantity = 14;
    self.id = "tempura";
    self.color = "purple";
    self.symbol = "T";
    return self;
}();

var DUMPLING = function(){
    var self = {};
    self.SCORES = [1, 3, 6, 10, 15];
    self.quantity = 14;
    self.id = "dumpling";
    self.color = "blue";
    self.symbol = "D";
    return self;
}();

var PUDDING = function(){
    var self = {};
    self.quantity = 10;
    self.id = "pudding";
    self.color = "pink";
    self.symbol = "P";
    return self;
}();

var NIGIRI_SQUID = function(){
    var self = {};
    self.quantity = 5;
    self.id = "nigiri-squid";
    self.color = "yellow";
    self.symbol = "3";
    self.isNigiri = true;
    return self;
}();

var NIGIRI_SALMON = function(){
    var self = {};
    self.quantity = 10;
    self.id = "nigiri-salmon";
    self.color = "yellow";
    self.symbol = "2";
    self.isNigiri = true;
    return self;
}();

var NIGIRI_EGG = function(){
    var self = {};
    self.quantity = 5;
    self.id = "nigiri-egg";
    self.color = "yellow";
    self.symbol = "1";
    self.isNigiri = true;
    return self;
}();

var WASABI = function(){
    var self = {};
    self.quantity = 6;
    self.id = "wasabi";
    self.color = "yellow";
    self.symbol = "W";
    return self;
}();

var CHOPSTICKS = function(){
    var self = {};
    self.quantity = 4;
    self.id = "chopsticks";
    self.color = "lightblue";
    self.symbol = "C";
    return self;
}();

var genMAKI = function(makiScore, makiCount){
    var self = {};
    self.quantity = makiCount;
    self.id = "maki-" + makiScore;
    self.isMaki = true;
    self.makiScore = makiScore;
    return self;
}
var MAKI_3 = genMAKI(3, 8);
var MAKI_2 = genMAKI(2, 12);
var MAKI_1 = genMAKI(1, 6);

var CardTypes = [
    SASHIMI,
    TEMPURA,
    DUMPLING,
    PUDDING,
    NIGIRI_SQUID,
    NIGIRI_SALMON,
    NIGIRI_EGG,
    WASABI,
    CHOPSTICKS,
    MAKI_1,
    MAKI_2,
    MAKI_3
];

var getDeck = function(){
    var deckList = [];
    CardTypes.forEach(function (cardType){
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
