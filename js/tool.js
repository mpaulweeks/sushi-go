
var T = function(){
var module = {};


function readUrlParam(paramName, coerceInt, asList){
    asList = asList || false;
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
    if (vars.hasOwnProperty(paramName)){
        var paramList = vars[paramName];
        if (coerceInt){
            for (var i = 0; i < paramList.length; i++){
                paramList[i] = parseInt(paramList[i]);
            }
        }
        if (paramList.length == 1 && !asList){
            return paramList[0];
        }
        return paramList;
    }
    return null;
}

module.getParams = function(){
    var seats = readUrlParam("seats", true) || 4;
    if (seats < 2){
        seats = 2;
    }
    if (seats > 5){
        seats = 5;
    }
    return {
        sim: Boolean(readUrlParam("sim")) || false,
        collect: Boolean(readUrlParam("collect")) || false,
        runs: readUrlParam("runs", true) || 10000,
        seats: seats
    };
}

module.clone = function(obj){
    // todo make more general/robust
    var newObj = {};
    for (var key in obj){
        if (obj.hasOwnProperty(key)){
            var newVal = obj[key];
            if (
                (Array.isArray && Array.isArray(newVal)) ||
                (newVal instanceof Array)
            ){
                newVal = newVal.concat();
            }
            newObj[key] = newVal;
        }
    }
    return newObj;
}

module.sortById = function(cards){
    return arr.slice(0).sort(function (item1, item2){
        return item1.id.toLowerCase().localeCompare(item2.id.toLowerCase());
    });
};

module.average = function(arr){
    var sum = 0;
    arr.forEach(function (num){
        sum += num;
    });
    return sum / arr.length;
}

return module;
}();

function println(message){
    console.log(message);
    $('#out').append(message + '<br/>');
}

function shuffle(arr){
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    // http://stackoverflow.com/a/12646864/6461842
    var array = arr.slice(0);
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
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
