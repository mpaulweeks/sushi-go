
var HAND = function(){
var module = {};

function genHand(cards, tally){
    var self = {};
    self.cards = cards || [];
    self.tally = tally || {
        wasabiTargets: [],
        pendingWasabi: 0,
        makiTotal: 0
    };
    self.history = [];

    CARD.TYPES.forEach(function (cardType){
        self.tally[cardType.id] = self.tally[cardType.id] || 0;
    });

    // temp
    self.pendingPicks = [];

    self.toString = function(){
        var out = [];
        self.cards.forEach(function (card){
            out.push(card.id);
        });
        return out.join(", ");
    }

    self.calculateScore = function(otherHands){
        var sum = 0;
        sum += 10 * parseInt(self.tally[SASHIMI.id] / 3);
        sum += 5 * parseInt(self.tally[TEMPURA.id] / 2);
        var dumplingCount = self.tally[DUMPLING.id];
        while (dumplingCount > 0){
            var thisGroup = dumplingCount;
            if (thisGroup > 5){
                thisGroup = 5;
            }
            sum += DUMPLING.SCORES[thisGroup - 1];
            dumplingCount -= thisGroup;
        }
        var nigiriTally = {};
        nigiriTally[NIGIRI_SQUID.id] = self.tally[NIGIRI_SQUID.id];
        nigiriTally[NIGIRI_SALMON.id] = self.tally[NIGIRI_SALMON.id];
        nigiriTally[NIGIRI_EGG.id] = self.tally[NIGIRI_EGG.id];
        self.tally.wasabiTargets.forEach(function (card){
            if (!card.isNigiri){
                throw "nigiri error";
            }
            nigiriTally[card.id] += 2;
        });
        sum += 3 * nigiriTally[NIGIRI_SQUID.id];
        sum += 2 * nigiriTally[NIGIRI_SALMON.id];
        sum += 1 * nigiriTally[NIGIRI_EGG.id];
        var greaterMakis = new Set();
        var tiedMakis = 1;
        otherHands.forEach(function (otherHand){
            var otherMaki = otherHand.tally.makiTotal;
            if (otherMaki > self.tally.makiTotal){
                greaterMakis.add(otherMaki);
            } else if (otherMaki == self.tally.makiTotal){
                tiedMakis += 1;
            }
        });
        var makiMultiplier = 3 * (2 - greaterMakis.size);
        if (makiMultiplier < 0 || self.tally.makiTotal == 0){
            makiMultiplier = 0;
        }
        sum += parseInt(makiMultiplier / tiedMakis);

        return sum;
    };

    function updateTally(tally, card){
        tally[card.id] += 1;
        if (card.id == WASABI.id){
            tally.pendingWasabi += 1;
        }
        if (card.isNigiri && self.tally.pendingWasabi > 0){
            tally.pendingWasabi -= 1;
            tally.wasabiTargets.push(card);
        }
        if (card.isMaki){
            tally.makiTotal += card.makiScore;
        }
    }

    self.resolvePicks = function(){
        self.pendingPicks.forEach(function (card){
            self.cards.push(card);
            updateTally(self.tally, card);
        });
        self.pendingPicks = [];
    };

    function recordHistory(choice, remainingCards){
        remainingCards.forEach(function (other){
            if (choice.id != other.id){
                self.history.push(HISTORY.new(choice, other, remainingCards.length + 1));
            }
        });
    }

    self.applyPreferences = function(pack, preferences){
        var packOptions = new Set();
        pack.forEach(function (card){
            packOptions.add(card.id);
        });
        var packChoice = null;
        for (var i = 0; i < preferences.length && packChoice == null; i++){
            var card = preferences[i];
            if (packOptions.has(card.id)){
                packChoice = card;
            }
        }
        if (packChoice == null){
            packChoice = pack[0];
            println('card not covered by preferences: ' + packChoice.id);
        }
        self.pendingPicks.push(packChoice);
        var newPack = removeCard(pack, packChoice);
        recordHistory(packChoice, newPack);
        return newPack;
    };

    self.simTally = function(){
        var futureTally = T.clone(self.tally);
        self.pendingPicks.forEach(function (card){
            updateTally(futureTally, card);
        });
        return futureTally;
    }

    self.popChopsticks = function(pack){
        self.tally[CHOPSTICKS.id] -= 1;
        self.cards = removeCard(self.cards, CHOPSTICKS);
        return pack.concat(CHOPSTICKS);
    }

    return self;
}

module.new = genHand;
return module;
}();
