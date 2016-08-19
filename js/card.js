
var CARD = function(){
    var module = {};
    var cardHtml = function(card){
        return formatStr(
            '<div class="card card-{3}" data-card="{1}">{2}</div>',
            card.id, card.symbol, card.color
        )
    }
    var registry = [];

    module.get = function(cardId){
        for (var i = 0; i < registry.length; i++){
            var card = registry[i];
            if (card.id == cardId){
                return card;
            }
        }
        throw "card not found"
    }
    module.new = function(){
        var cardObj = {};
        cardObj.html = function(){
            return cardHtml(cardObj);
        };
        registry.push(cardObj);
        return cardObj;
    }
    module.TYPES = registry;
    return module;
}();

var SASHIMI = function(){
    var self = CARD.new();
    self.quantity = 14;
    self.id = "sashimi";
    self.color = "green";
    self.symbol = "S";
    return self;
}();

var TEMPURA = function(){
    var self = CARD.new();
    self.quantity = 14;
    self.id = "tempura";
    self.color = "purple";
    self.symbol = "T";
    return self;
}();

var DUMPLING = function(){
    var self = CARD.new();
    self.SCORES = [1, 3, 6, 10, 15];
    self.quantity = 14;
    self.id = "dumpling";
    self.color = "blue";
    self.symbol = "D";
    return self;
}();

var PUDDING = function(){
    var self = CARD.new();
    self.quantity = 10;
    self.id = "pudding";
    self.color = "pink";
    self.symbol = "P";
    return self;
}();

var NIGIRI_SQUID = function(){
    var self = CARD.new();
    self.quantity = 5;
    self.id = "nigiri-squid";
    self.color = "yellow";
    self.symbol = "3";
    self.isNigiri = true;
    return self;
}();

var NIGIRI_SALMON = function(){
    var self = CARD.new();
    self.quantity = 10;
    self.id = "nigiri-salmon";
    self.color = "yellow";
    self.symbol = "2";
    self.isNigiri = true;
    return self;
}();

var NIGIRI_EGG = function(){
    var self = CARD.new();
    self.quantity = 5;
    self.id = "nigiri-egg";
    self.color = "yellow";
    self.symbol = "1";
    self.isNigiri = true;
    return self;
}();

var WASABI = function(){
    var self = CARD.new();
    self.quantity = 6;
    self.id = "wasabi";
    self.color = "yellow";
    self.symbol = "W";
    return self;
}();

var CHOPSTICKS = function(){
    var self = CARD.new();
    self.quantity = 4;
    self.id = "chopsticks";
    self.color = "teal";
    self.symbol = "C";
    return self;
}();

var genMAKI = function(makiScore, makiCount){
    var self = CARD.new();
    self.quantity = makiCount;
    self.id = "maki-" + makiScore;
    self.color = "red";
    self.symbol = makiScore;
    self.isMaki = true;
    self.makiScore = makiScore;
    return self;
}
var MAKI_3 = genMAKI(3, 8);
var MAKI_2 = genMAKI(2, 12);
var MAKI_1 = genMAKI(1, 6);
