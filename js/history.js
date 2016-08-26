
var HISTORY = function(){
var module = {};
var data = {};

function createHistoryObj(parent){
    var self = {};
    self.parent = parent
    self.scores = [];
    self.addScore = function(score){
        self.parent.scores.push(score);
        self.scores.push(score);
    };
    return self;
}

module.getObj = function(card1, card2, packSize){
    // todo packSize
    if (!data.hasOwnProperty(card1.id)){
        data[card1.id] = { comparisons: [], scores: [] };
    }
    var parent = data[card1.id];
    var d1 = parent.comparisons;
    if (!d1.hasOwnProperty(card2.id)){
        d1[card2.id] = createHistoryObj(parent);
    }
    var d2 = d1[card2.id];
    return d2;
}

module.new = function(choice, other, packSize){
    return module.getObj(choice, other, packSize);
}

module.print = function(){
    var toPrint = {};
    for (var key1 in data){
        if (data.hasOwnProperty(key1)){
            var parent = data[key1];
            var d1 = parent.comparisons;
            var avgs = {};
            for (var key2 in d1){
                if (d1.hasOwnProperty(key2)){
                    avgs[key2] = T.average(d1[key2].scores);
                }
            }
            toPrint[key1] = {
                value: T.average(parent.scores),
                comparisons: avgs
            }
        }
    }
    var toPrintJson = JSON.stringify(toPrint);
    $('body').html(toPrintJson);
    console.log(toPrint);
}

return module;
}();

// var HISTORYv1 = null;
var HISTORYv1 = {"sashimi":{"value":28.0667782404723,"comparisons":{"tempura":28.03601039910062,"maki-2":28.08166255075133,"wasabi":27.995488721804513,"pudding":27.95950677032384,"nigiri-salmon":28.145053818554587,"dumpling":28.09773832981673,"maki-1":28.131436069134015,"chopsticks":28.146041320022185,"maki-3":27.976958831341303,"nigiri-squid":28.003636964787567,"nigiri-egg":28.180092718843742}},"nigiri-squid":{"value":29.497337818705454,"comparisons":{"sashimi":29.478055096664733,"maki-2":29.580054846535177,"maki-1":29.473545277172043,"nigiri-egg":29.58222648226756,"dumpling":29.512831819384424,"maki-3":29.436216706522636,"tempura":29.513925171574055,"nigiri-salmon":29.482493089377385,"pudding":29.46873605711008,"wasabi":29.31998204869292,"chopsticks":29.56461696370253}},"pudding":{"value":28.96346021275733,"comparisons":{"wasabi":28.868881438585795,"dumpling":28.97187339526633,"maki-3":28.943885839736552,"tempura":28.89004802119556,"sashimi":28.997720757554397,"maki-2":28.943955888590413,"maki-1":29.063068526379624,"chopsticks":29.006825775656324,"nigiri-egg":29.048619186046512,"nigiri-squid":28.831798603891283,"nigiri-salmon":29.03309228650138}},"maki-1":{"value":27.374221691189724,"comparisons":{"sashimi":27.40961807260776,"maki-2":27.377470878926932,"nigiri-egg":27.47569684404515,"dumpling":27.401563610518835,"maki-3":27.226944444444445,"tempura":27.401637209302326,"pudding":27.21310847067842,"nigiri-salmon":27.445138851149395,"chopsticks":27.42709232096635,"wasabi":27.332090284592738,"nigiri-squid":27.39185634221663}},"tempura":{"value":28.580139079127594,"comparisons":{"wasabi":28.529752934191897,"dumpling":28.549953347534462,"maki-3":28.54245376814476,"sashimi":28.591626510231162,"maki-2":28.54649702854273,"pudding":28.520011259532218,"nigiri-salmon":28.642738620988947,"nigiri-squid":28.564101160499234,"nigiri-egg":28.707559608834195,"chopsticks":28.62809457579972,"maki-1":28.64299536474506}},"maki-2":{"value":28.063458027447847,"comparisons":{"tempura":28.063296234427515,"wasabi":28.049572297227662,"pudding":27.915882094148703,"nigiri-salmon":28.129957254808833,"sashimi":28.093299457584738,"nigiri-egg":28.133795837462834,"dumpling":28.106602558944235,"maki-3":27.941330599225335,"chopsticks":28.07493437276271,"maki-1":28.11436461209816,"nigiri-squid":28.079611287609794}},"maki-3":{"value":28.824640009017386,"comparisons":{"wasabi":28.834634074510383,"dumpling":28.816109906001447,"sashimi":28.848051349951067,"nigiri-salmon":28.832870604072017,"maki-2":28.798562126966903,"nigiri-squid":28.758046128211873,"nigiri-egg":28.881211799096466,"tempura":28.883462406767066,"chopsticks":28.859283349788026,"pudding":28.713807671393315,"maki-1":28.82721928714934}},"dumpling":{"value":28.235668772996743,"comparisons":{"sashimi":28.25484322998774,"maki-2":28.252775208140612,"pudding":28.122707784493002,"nigiri-egg":28.345568927789934,"maki-3":28.14859278367563,"tempura":28.216477252735654,"maki-1":28.27589641434263,"nigiri-salmon":28.33122204699982,"chopsticks":28.2400137504297,"wasabi":28.18344407026486,"nigiri-squid":28.26937793812179}},"wasabi":{"value":28.688019843079775,"comparisons":{"tempura":28.762319700396752,"maki-2":28.655372700871247,"pudding":28.534808566577205,"nigiri-salmon":28.81821150601426,"dumpling":28.676114708603144,"maki-3":28.72801213123794,"sashimi":28.640459924590285,"chopsticks":28.37390419536631,"nigiri-egg":28.85916145471392,"nigiri-squid":28.885720962841784,"maki-1":28.7833238258224}},"nigiri-salmon":{"value":28.531333775088378,"comparisons":{"maki-2":28.597651284885327,"pudding":28.401221509485463,"dumpling":28.54756890823155,"wasabi":28.443699002719853,"chopsticks":28.647592795019246,"tempura":28.512187103743013,"maki-3":28.506892147795835,"maki-1":28.589477516839615,"sashimi":28.5507729117309,"nigiri-squid":28.36803572735925,"nigiri-egg":28.645918747670517}},"nigiri-egg":{"value":27.61702979425466,"comparisons":{"sashimi":27.690927128427127,"maki-3":27.51608623548922,"tempura":27.626821250888415,"wasabi":27.506654635686893,"maki-2":27.559184104840416,"chopsticks":27.685774364600476,"nigiri-salmon":27.672969822561843,"dumpling":27.69783433802188,"pudding":27.46965374140838,"maki-1":27.680452813270566,"nigiri-squid":27.577216594977106}},"chopsticks":{"value":28.047474715499913,"comparisons":{"sashimi":27.987837049790343,"tempura":28.06629266531508,"wasabi":27.869115872057936,"maki-2":28.024653209283578,"maki-3":27.949367088607595,"pudding":27.984823215476986,"dumpling":28.10452604137778,"nigiri-salmon":28.102738015978694,"nigiri-egg":28.1754994070966,"nigiri-squid":28.197544539831995,"maki-1":28.154961486180337}}};
