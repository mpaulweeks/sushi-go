
function game(players){
    var deck = getDeck();
    var hands = [];
    var packs = [];
    for (var i = 0; i < 4; i++){
        hands.push(genHand());
        packs.push(deck.draw(8));
    }
    packs.forEach(function (p){
        var ids = [];
        p.forEach(function (card){
            ids.push(card.id);
        });
        println("pack: " + ids.join(", "));
    });
    while (packs[0].length > 0){
        var updatedPacks = [];
        for (var i = 0; i < hands.length; i++){
            var hand = hands[i];
            var packIndex = (i + 1) % packs.length;
            var pack = packs[packIndex];
            var preferences = myPreferences(hand.tally, pack, []);
            var updatedPack = hand.applyPreferences(pack, preferences);
            updatedPacks.push(updatedPack);
        }
        packs = updatedPacks;
    }
    println("---")
    for (var i = 0; i < hands.length; i++){
        var hand = hands[i];
        var others = exceptIndex(hands, i);
        var score = hand.score(others);
        println(hand.toString());
        println(score);
        println(hand.tally);
    }
}
