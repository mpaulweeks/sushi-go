
function genPlayer(prefFunc, id){
    var self = {};
    self.hand = null;
    self.id = id;
    self.scores = null;
    self.puddingCount = null;

    self.restart = function(){
        self.scores = [];
        self.puddingCount = 0;
        self.newHand();
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

    self.newHand = function(){
        self.hand = genHand();
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
