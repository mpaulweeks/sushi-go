
function println(message){
    console.log(message);
    $('#out').append(message + '<br/>');
}

function shuffle(arr){
    var out = arr.concat();
    out.sort(function (a,b) {return parseInt(Math.random()*2);})
    return out;
}

function removeCard(arr, toRemove){
    var out = [];
    var found = false;
    arr.forEach(function (card){
        if (!found && card.id == toRemove.id){
            found = true;
        } else {
            out.push(card);
        }
    });
    return out;
}