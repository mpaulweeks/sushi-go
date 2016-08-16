
function genPlayer(prefFunc){
    var self = {};
    self.hand = null;

    function otherHands(otherPlayers){
        var otherHands = [];
        otherPlayers.forEach(function (otherPlayer){
            otherHands.push(otherPlayer.hand);
        });
        return otherHands;
    }

    self.score = function(otherPlayers){
        return self.hand.score(otherHands(otherPlayers));
    };

    self.draft = function(pack, otherPlayers){
        var pref = prefFunc(self.hand.tally, pack, otherHands(otherPlayers));
        return self.hand.applyPreferences(pack, pref);
    };

    self.newHand = function(){
        self.hand = genHand();
    };

    return self;
}
