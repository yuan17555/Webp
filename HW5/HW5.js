var data_url = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24top=30&%24format=JSON";
var price_url = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24top=420&%24format=JSON";
var data = $.getJSON(data_url);
var price = $.getJSON(price_url);

data.done(function(msg){
    items = msg[0].TravelTimes
    var index = 0;
    var ID = 1;
    
    $("select").append("<option>" + items[0].FromStationName.Zh_tw + "</option>");

    for (var i = 0; i < 20;i++){
        $("select").append("<option>" + items[i].ToStationName.Zh_tw + "</option>");
    }

    $(".Station")[0].append(items[index].FromStationName.Zh_tw);

    while(index<items.length){
        if(items[index].FromStationID=="A"+ID){
            $(".Arrow")[ID - 1].append(items[index].RunTime + "s");
            $(".Station")[ID].append(items[index].ToStationName.Zh_tw);
            ID++;
        }
        else if(ID==14&&items[index].FromStationID=="A14a"){
            $(".Arrow")[ID - 1].append(items[index].RunTime + "s");
            $(".Station")[ID].append(items[index].ToStationName.Zh_tw);
            ID++;
        }
        index++;
    }
});

price.done(function(fare){
    console.log(fare)
    $("#Price").click(function(){
        var start = $("#Start").val();
        var end = $("#End").val();

        for (var i = 0; i < 420;i++){
            if(fare[i].OriginStationName.Zh_tw == start){
                for (var j = 0; j < 20;j++){
                    if(fare[i+j].DestinationStationName.Zh_tw == end){
                        $("#value").html(fare[i + j].Fares[0].Price + "$");
                        break;
                    }
                }
                break;
            }
        }
    });
});