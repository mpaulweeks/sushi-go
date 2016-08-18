
var PLAYER = function(){
var module = {};

function genPlayer(prefFunc, id){
    var self = {};
    self.isHuman = !Boolean(prefFunc);
    self.hand = null;
    self.id = id;
    self.scores = null;
    self.puddingCount = null;

    // temp
    self.otherPlayers = null;
    self.chooseCallback = null;
    self.choosePack = null;
    self.pendingChopsticks = 0;

    self.restart = function(){
        self.scores = [];
        self.puddingCount = 0;
        self.newHand();
    }

    self.getCurrentPudding = function(){
        return self.puddingCount + self.hand.tally[PUDDING.id];
    }

    function otherHands(otherPlayers){
        var otherHands = [];
        otherPlayers.forEach(function (otherPlayer){
            otherHands.push(otherPlayer.hand);
        });
        return otherHands;
    }

    self.draft = function(pack, otherPlayers){
        var pref = prefFunc(self.hand.tally, pack, otherHands(otherPlayers));
        return self.hand.applyPreferences(pack, pref);
    };

    self.chopsticks = function(){
        if (self.hand.tally[CHOPSTICKS.id] == 0){
            throw "trying to pop chopsticks when you dont have any"
        }
        self.pendingChopsticks += 1;
        self.hand.tally[CHOPSTICKS.id] -= 1;
        self.hand.cards = removeCard(self.hand.cards, CHOPSTICKS);
        self.choosePack.push(CHOPSTICKS);
        VIEW.drawPlayer(self, self.otherPlayers, self.choosePack, 0);
    };

    self.chooseCard = function(cardId){
        if (!self.isHuman || !self.chooseCallback || !self.choosePack){
            console.log(self.isHuman, self.chooseCallback, self.choosePack);
            throw "bad player state"
        }
        var card = getCardById(cardId);
        var pack = self.hand.applyPreferences(self.choosePack, [card]);
        if (self.pendingChopsticks == 0){
            var callback = self.chooseCallback;
            self.otherPlayers = null;
            self.chooseCallback = null;
            self.choosePack = null;
            callback(pack);
        } else {
            self.pendingChopsticks -= 1;
            self.choosePack = pack;
            VIEW.drawPlayer(self, self.otherPlayers, self.choosePack, 0);
        }
    }

    self.newHand = function(){
        self.hand = HAND.new();
    };

    self.calculateScore = function(otherPlayers){
        return self.hand.calculateScore(otherHands(otherPlayers));
    }

    self.endRound = function(otherPlayers){
        self.scores.push(self.calculateScore(otherPlayers));
        self.puddingCount += self.hand.tally[PUDDING.id];
    };

    self.endGame = function(otherPlayers){
        var greaterPudding = 0;
        var equalPudding = 1;
        var lessPudding = 0;
        otherPlayers.forEach(function (otherPlayer){
            var otherPudding = otherPlayer.puddingCount;
            if (otherPudding > self.puddingCount){
                greaterPudding += 1;
            } else if (otherPudding == self.puddingCount){
                equalPudding += 1;
            } else {
                lessPudding += 1;
            }
        });
        var pp = 0;
        if (greaterPudding == 0){
            pp += 6;
        }
        if (lessPudding == 0){
            pp -= 6;
        }
        var puddingScore = parseInt(pp / equalPudding);
        self.scores.push(puddingScore);
    };

    self.getScore = function(){
        var sum = 0;
        self.scores.forEach(function (roundScore){
            sum += roundScore;
        });
        return sum;
    };

    self.restart();
    return self;
}

module.new = genPlayer;
return module;
}();
