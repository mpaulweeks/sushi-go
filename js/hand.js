
function genHand(cards, tally){
    var self = {};
    self.cards = cards || [];
    self.tally = tally || {
        wasabiTargets: [],
        pendingWasabi: 0,
        makiTotal: 0
    };
    CardTypes.forEach(function (cardType){
        self.tally[cardType.id] = self.tally[cardType.id] || 0;
    });

    self.toString = function(){
        var out = [];
        self.cards.forEach(function (card){
            out.push(card.id);
        });
        return out.join(", ");
    }

    self.clone = function(){
        return genHand(self.cards, self.tally);
    };

    self.score = function(hands){
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
        hands.forEach(function (otherHand){
            var otherMaki = otherHand.tally.makiTotal;
            if (otherMaki > self.tally.makiTotal){
                greaterMakis.add(otherMaki);
            } else if (otherMaki == self.tally.makiTotal){
                tiedMakis += 1;
            }
        });
        var makiMultiplier = 3 * (2 - greaterMakis.size);
        if (makiMultiplier < 0){
            makiMultiplier = 0;
        }
        sum += parseInt(makiMultiplier / tiedMakis);

        // todo pudding

        return sum;
    };

    self.draft = function(card){
        self.cards.push(card);
        self.tally[card.id] += 1;
        if (card.id == WASABI.id){
            self.tally.pendingWasabi += 1;
        }
        if (card.isNigiri && self.tally.pendingWasabi > 0){
            self.tally.pendingWasabi -= 1;
            self.tally.wasabiTargets.push(card);
        }
        if (card.isMaki){
            self.tally.makiTotal += card.makiScore;
        }
    };

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
        }
        self.draft(packChoice);
        return removeCard(pack, packChoice);
    };

    self.createViewModel = function(){
        // todo
    };

    return self;
}
