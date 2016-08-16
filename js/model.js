
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
    self.value = function(hand, pickNum){
        var rest = getRest(hand, pickNum);
        var count = getCount(rest, checkIdFunc(self.id));
        if (count >= 3 && count % 3 == 0){
            return 10;
        }
        return 0;
    }
    return self;
}();

var TEMPURA = function(){
    var self = {};
    self.quantity = 14;
    self.id = "tempura";
    self.color = "purple";
    self.symbol = "T";
    self.value = function(hand, pickNum){
        var rest = getRest(hand, pickNum);
        var count = getCount(rest, checkIdFunc(self.id));
        if (count >= 2 && count % 2 == 0){
            return 5;
        }
        return 0;
    }
    return self;
}();

var DUMPLING = function(){
    var self = {};
    self.SCORES = [1, 3, 6, 10, 15];
    // self.SCORES = [0, 1, 2, 3, 4, 5];
    self.quantity = 14;
    self.id = "dumpling";
    self.color = "blue";
    self.symbol = "D";
    self.value = function(hand, pickNum){
        var rest = getRest(hand, pickNum);
        var count = getCount(rest, checkIdFunc(self.id));
        while (count > 5){
            count = count - 5;
        }
        return SCORES[count];
    }
    return self;
}();

var PUDDING = function(){
    var self = {};
    self.quantity = 10;
    self.id = "pudding";
    self.color = "pink";
    self.symbol = "P";
    self.value = function(hand, pickNum){
        return 0;
    }
    return self;
}();

var NIGIRI_SQUID = function(){
    var self = {};
    self.quantity = 5;
    self.id = "nigiri-squid";
    self.color = "yellow";
    self.symbol = "3";
    self.isNigiri = true;
    self.value = function(hand, pickNum){
        return 3;
    }
    return self;
}();

var NIGIRI_SALMON = function(){
    var self = {};
    self.quantity = 10;
    self.id = "nigiri-salmon";
    self.color = "yellow";
    self.symbol = "2";
    self.isNigiri = true;
    self.value = function(hand, pickNum){
        return 2;
    }
    return self;
}();

var NIGIRI_EGG = function(){
    var self = {};
    self.quantity = 5;
    self.id = "nigiri-egg";
    self.color = "yellow";
    self.symbol = "1";
    self.isNigiri = true;
    self.value = function(hand, pickNum){
        return 1;
    }
    return self;
}();

var WASABI = function(){
    var self = {};
    self.quantity = 6;
    self.id = "wasabi";
    self.color = "yellow";
    self.symbol = "W";
    self.value = function(hand, pickNum){
        var nextNigiriScore = 0;
        var futureWasabi = 0;
        var rest = getRest(hand, pickNum + 1);
        for (var i = 0; i < rest.length; i++){
            var next = rest[i];
            if (next.id == self.id){
                // found another wasabi, skip the next nigiri
                futureWasabi += 1;
            } else if (next.isNigiri) {
                if (futureWasabi > 0){
                    futureWasabi -= 1;
                } else {
                    nextNigiriScore = next.value(hand);
                    break;
                }
            }
        }
        return 2 * nextNigiriScore;
    }
    return self;
}();

var CHOPSTICKS = function(){
    var self = {};
    self.quantity = 4;
    self.id = "chopsticks";
    self.color = "lightblue";
    self.symbol = "C";
    self.value = function(hand, pickNum){
        return 0;
    }
    return self;
}();

var genMAKI = function(makiScore, makiCount){
    var self = {};
    self.quantity = makiCount;
    self.id = "maki-" + makiScore;
    self.isMaki = true;
    self.makiScore = makiScore;
    self.makiTotal = function(hand, pickNum){
        var rest = getRest(hand, pickNum);
        var count = getCount(rest, function(toCheck){ return toCheck.isMaki; });
        if (count != 1){
            // last maki decides value
            return 0;
        }
        var total = 0;
        hand.forEach(function (card){
            if (card.isMaki){
                total += card.makiScore;
            }
        });
        return total;
    }
    self.value = function(hand, pickNum){
        var total = self.makiTotal(hand, pickNum);
        if (total == 0){
            return 0;
        }
        // todo check other hands
        return 6;
    }
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
