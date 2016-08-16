
function simHand(){
    var pack = getDeck().draw(7);
    var hand = genHand();
    while (pack.length > 0){
        var preferences = myPreferences(hand.tally, pack, []);
        pack = hand.applyPreferences(pack, preferences);
        println(hand.toString());
    }
    println(hand.score([]));
}

function runSim(){
    for (var i = 0; i < 10; i++){
        simHand();
    }
}
