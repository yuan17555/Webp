var msg={
    count: 170,
    data: [
        {
            stationNo: "C0AD1",
            stationName: "八里",
            recTime: "202204271610",
            rain: 0,
        },
        {
            stationNo: "C0AD0",
            stationName: "三芝",
            recTime: "202204271610",
            rain: 0,
        },
        {
            stationNo: "C0AD4",
            stationName: "土城",
            recTime: "202204271610",
            rain: 0,
        },
        {
            stationNo: "318",
            stationName: "大安福州山",
            recTime: "202204271602",
            rain: 0,
        },
        {
            stationNo: "01A17",
            stationName: "坪林",
            recTime: "201911130140",
            rain: 0,
        }
    ]
}
for ( var j=0 ; j<5 ; j++){
    var time = msg.data[j].recTime ;
    var y="";
    var m="";
    var d="";
    var h="";
    var min="";
    for (var i=0 ; i<4 ; i++){
        y+=time[i];
    }
    for (var i=4 ; i<6 ; i++){
        m+=time[i];
        d+=time[i+2];
        h+=time[i+4];
        min+=time[i+6];
    }
    $("#contain"+j).append("<h2>"+msg.data[j].stationName+" "+msg.data[j].stationNo + "</h2>");
    $("#contain"+j).append("<h3>"+y+"年"+m+"月"+d+"號"+h+"時"+min+"分"+"</h3>");
    $("#contain"+j).append("<h4>" + "及時雨量"+msg.data[j].rain + "</h4>");
}
