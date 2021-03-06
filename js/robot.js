
var ROBOT = function(){
var module = {};

var registry = [];

function genRobot(name, prefFunc){
    var self = {};
    self.name = name;
    self.prefFunc = prefFunc;
    self.isHuman = Boolean(prefFunc);
    registry.push(self);
    return self;
}

module.AdamBot = genRobot('AdamBot', function(tally, pack, hands){
    var remainingPicks = pack.length - 1;
    var pref = [];

    // early picks
    if (tally[SASHIMI.id] % 3 == 2){
        pref.push(SASHIMI);
    }
    if (tally.pendingWasabi > 0){
        pref.push(NIGIRI_SQUID);
    }
    if (tally[DUMPLING.id] % 5 == 4){
        pref.push(DUMPLING);
    }
    if (tally[SASHIMI.id] % 3 == 1 && remainingPicks >= 5){
        pref.push(SASHIMI);
    }
    if (tally.pendingWasabi > 0){
        pref.push(NIGIRI_SALMON);
    }
    if (tally[TEMPURA.id] % 2 == 1){
        pref.push(TEMPURA);
    }
    if (tally[DUMPLING.id] % 5 == 3){
        pref.push(DUMPLING);
    }
    if (tally[DUMPLING.id] % 5 == 2){
        pref.push(DUMPLING);
    }
    pref.push(NIGIRI_SQUID);
    if (remainingPicks >= 5 && tally.pendingWasabi == 0){
        pref.push(WASABI);
    }
    if (tally[SASHIMI.id] % 3 == 0 && remainingPicks >= 7){
        pref.push(SASHIMI);
    }
    if (tally[TEMPURA.id] % 2 == 0 && remainingPicks >= 5){
        pref.push(TEMPURA);
    }
    if (tally[DUMPLING.id] % 5 == 3){
        pref.push(DUMPLING);
    }
    if (tally[DUMPLING.id] % 5 == 2){
        pref.push(DUMPLING);
    }
    if (tally.pendingWasabi > 0){
        pref.push(NIGIRI_EGG);
    }
    if (remainingPicks >= 2 + tally[CHOPSTICKS.id]){
        pref.push(CHOPSTICKS);
    }

    // else
    pref.push(NIGIRI_SALMON);
    pref.push(DUMPLING);
    pref.push(MAKI_3);
    pref.push(NIGIRI_EGG);
    pref.push(MAKI_2);
    pref.push(CHOPSTICKS);
    pref.push(PUDDING);
    pref.push(MAKI_1);

    // dumping ground
    pref.push(TEMPURA);
    pref.push(SASHIMI);
    pref.push(WASABI);
    return pref;
});

module.PaulBot = genRobot('PaulBot', function(tally, pack, hands){
    var remainingPicks = pack.length - 1;
    var pref = [];

    // early picks
    if (tally[SASHIMI.id] % 3 == 2){
        pref.push(SASHIMI);
    }
    if (tally.pendingWasabi > 0){
        pref.push(NIGIRI_SQUID);
    }
    if (tally[DUMPLING.id] == 4){
        pref.push(DUMPLING);
    }
    if (tally[SASHIMI.id] % 3 == 1 && remainingPicks >= 3){
        pref.push(SASHIMI);
    }
    if (tally.pendingWasabi > 0){
        pref.push(NIGIRI_SALMON);
    }
    if (tally[TEMPURA.id] % 2 == 1){
        pref.push(TEMPURA);
    }
    if (tally[DUMPLING.id] == 3){
        pref.push(DUMPLING);
    }
    if (tally[DUMPLING.id] == 2){
        pref.push(DUMPLING);
    }
    pref.push(NIGIRI_SQUID);
    if (remainingPicks >= 5 && tally.pendingWasabi == 0){
        pref.push(WASABI);
    }
    if (tally[SASHIMI.id] % 3 == 0 && remainingPicks >= 6){
        pref.push(SASHIMI);
    }
    if (tally[TEMPURA.id] % 2 == 0 && remainingPicks >= 4){
        pref.push(TEMPURA);
    }
    if (tally.pendingWasabi > 0){
        pref.push(NIGIRI_EGG);
    }
    if (remainingPicks >= 2 + tally[CHOPSTICKS.id]){
        pref.push(CHOPSTICKS);
    }

    // else
    pref.push(NIGIRI_SALMON);
    if (tally[DUMPLING.id] < 5){
        pref.push(DUMPLING);
    }
    pref.push(MAKI_3);
    pref.push(MAKI_2);
    pref.push(PUDDING);
    pref.push(NIGIRI_EGG);
    pref.push(MAKI_1);

    // dumping ground
    pref.push(TEMPURA);
    pref.push(SASHIMI);
    pref.push(WASABI);
    pref.push(CHOPSTICKS);
    pref.push(DUMPLING);
    return pref;
});

module.PrudentBot = genRobot('PrudentBot', function(tally, pack, hands){
    var remainingPicks = pack.length - 1;
    var pref = [];
    if (tally[SASHIMI.id] % 3 == 2){
        pref.push(SASHIMI);
    }
    if (tally.pendingWasabi > 0){
        pref.push(NIGIRI_SQUID);
        pref.push(NIGIRI_SALMON);
    }
    if (tally[TEMPURA.id] % 2 == 1){
        pref.push(TEMPURA);
    }
    if (tally.pendingWasabi == 0 && remainingPicks >= 5){
        pref.push(WASABI);
    }
    pref.push(NIGIRI_SQUID);
    if (tally[DUMPLING.id] < 5){
        pref.push(DUMPLING);
    }
    pref.push(NIGIRI_SALMON);
    if (tally.makiTotal < 6) {
        pref.push(MAKI_3);
    }
    pref.push(NIGIRI_EGG);
    pref.push(PUDDING);
    pref.push(TEMPURA);
    pref.push(MAKI_3);
    pref.push(MAKI_2);
    pref.push(SASHIMI);
    pref.push(MAKI_1);
    pref.push(WASABI);
    pref.push(CHOPSTICKS);
    pref.push(DUMPLING);
    return pref;
});

module.SimpleBot = genRobot('SimpleBot', function(tally, pack, hands){
    var pref = [];
    pref.push(WASABI);
    pref.push(SASHIMI);
    pref.push(NIGIRI_SQUID);
    pref.push(TEMPURA);
    pref.push(NIGIRI_SALMON);
    pref.push(MAKI_3);
    pref.push(DUMPLING);
    pref.push(CHOPSTICKS);
    pref.push(MAKI_2);
    pref.push(MAKI_1);
    pref.push(NIGIRI_EGG);
    pref.push(PUDDING);
    return pref;
});

module.RiskyBot = genRobot('RiskyBot', function(tally, pack, hands){
    var pref = [];
    pref.push(SASHIMI);
    pref.push(TEMPURA);
    pref.push(DUMPLING);
    pref.push(CHOPSTICKS);
    pref.push(NIGIRI_SQUID);
    pref.push(NIGIRI_SALMON);
    pref.push(NIGIRI_EGG);
    pref.push(PUDDING);
    pref.push(MAKI_3);
    pref.push(MAKI_2);
    pref.push(MAKI_1);
    pref.push(WASABI);
    return pref;
});

module.RandomBot = genRobot('RandomBot', function(tally, pack, hands){
    return shuffle(CARD.TYPES);
});

if (HISTORYv1){
    var data = HISTORYv1;
    var prefAverage = CARD.TYPES.slice(0);
    prefAverage.sort(function (item1, item2){
        return data[item2.id].value - data[item1.id].value;
    });
    // println(prefAverage);
    module.AverageBot = genRobot('AverageBot', function(tally, pack, hands){
        return prefAverage;
    });

    var prefCompare = CARD.TYPES.slice(0);
    prefCompare.sort(function (item1, item2){
        return data[item2.id].comparisons[item1.id] - data[item1.id].comparisons[item2.id];
    });
    // println(prefCompare);
    module.CompareBot = genRobot('CompareBot', function(tally, pack, hands){
        return prefCompare;
    });
}

module.registry = registry;
return module;
}();
