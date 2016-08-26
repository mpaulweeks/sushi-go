
var PLAYER = function(){
var module = {};

function genPlayer(robot){
    var self = {};
    self.isHuman = !Boolean(robot);
    self.id = self.isHuman ? "Human" : robot.name;
    self.hand = null;
    self.scores = null;
    self.puddingCount = null;
    self.history = null;

    // temp
    self.otherPlayers = null;
    self.chooseCallback = null;
    self.choosePack = null;
    self.pendingChopsticks = 0;
    self.roundCallback = null;

    self.restart = function(){
        self.scores = [];
        self.puddingCount = 0;
        self.history = [];
        self.newHand();
    }

    function otherHands(otherPlayers){
        var otherHands = [];
        otherPlayers.forEach(function (otherPlayer){
            otherHands.push(otherPlayer.hand);
        });
        return otherHands;
    }

    self.resolvePicks = function(){
        self.hand.resolvePicks();
    }

    self.robotDraft = function(pack, otherPlayers){
        var pendingSticks = self.hand.tally[CHOPSTICKS.id];
        var pendingChoices = 1 + pendingSticks;
        while (pendingChoices > 0){
            if (pendingSticks > 0){
                pack = self.hand.popChopsticks(pack);
                pendingSticks -= 1;
            }
            var pref = robot.prefFunc(self.hand.simTally(), pack, otherHands(otherPlayers));
            pack = self.hand.applyPreferences(pack, pref);
            pendingChoices -= 1;
        }
        return pack;
    };

    self.chopsticks = function(){
        if (self.hand.tally[CHOPSTICKS.id] == 0){
            throw "trying to pop chopsticks when you dont have any"
        }
        self.pendingChopsticks += 1;
        self.choosePack = self.hand.popChopsticks(self.choosePack);
        VIEW.drawPlayer(self, self.otherPlayers, self.choosePack, 0);
    };

    self.chooseCard = function(cardId){
        if (!self.isHuman || !self.chooseCallback || !self.choosePack){
            console.log(self.isHuman, self.chooseCallback, self.choosePack);
            throw "bad player state"
        }
        var card = CARD.get(cardId);
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

    self.nextRound = function(){
        if (!self.roundCallback){
            throw "bad player state - end round"
        }
        var callback = self.roundCallback;
        self.roundCallback = null;
        callback();
    };

    self.newHand = function(){
        self.hand = HAND.new();
    };

    self.calculateScore = function(otherPlayers){
        return self.hand.calculateScore(otherHands(otherPlayers));
    }

    self.endRound = function(otherPlayers){
        self.scores.push(self.calculateScore(otherPlayers));
        self.puddingCount += self.hand.tally[PUDDING.id];
        self.history = self.history.concat(self.hand.history);
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
        self.history.forEach(function (hist){
            hist.addScore(self.getTotalScore());
        });
    };

    self.getTotalScore = function(){
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
