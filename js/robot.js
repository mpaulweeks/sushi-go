
function myPreferences(tally, pack, hands){
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
    if (tally[SASHIMI.id] % 3 == 1 && remainingPicks >= 3){
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
    if (tally[SASHIMI.id] % 3 == 0 && remainingPicks >= 6){
        pref.push(SASHIMI);
    }
    if (tally[TEMPURA.id] % 2 == 0 && remainingPicks >= 4){
        pref.push(SASHIMI);
    }
    if (tally.pendingWasabi > 0){
        pref.push(NIGIRI_EGG);
    }

    // else
    pref.push(NIGIRI_SALMON);
    pref.push(DUMPLING);
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
    return pref;
}
