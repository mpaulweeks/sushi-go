
function readUrlParam(param_name, as_list){
    as_list = as_list || false;
    var vars = {};
    var q = document.URL.split('?')[1];
    if(q != undefined){
        q = q.split('&');
        for(var i = 0; i < q.length; i++){
            var param = q[i].split('=');
            var name = param[0];
            var value = param[1];
            vars[name] = vars[name] || [];
            vars[name].push(value);
        }
    }
    if (vars.hasOwnProperty(param_name)){
        if (vars[param_name].length == 1 && !as_list){
            return vars[param_name][0];
        }
        return vars[param_name];
    }
    return null;
}

function println(message){
    console.log(message);
    $('#out').append(message + '<br/>');
}

function shuffle(arr){
    var out = arr.concat();
    out.sort(function (a,b) {return parseInt(Math.random()*2);})
    return out;
}

function formatStr(str) {
    var args = arguments;
    return str.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
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

function exceptIndex(arr, index){
    var out = [];
    for (var i = 0; i < arr.length; i++){
        if (i != index){
            out.push(arr[i]);
        }
    }
    return out;
}
