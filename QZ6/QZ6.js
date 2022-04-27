setInterval(function myFunction() {     
  var now = new Date();
  var hh = now.getHours();
  var mm = now.getMinutes();
  var ss = now.getSeconds();
  document.getElementById('clock').innerHTML = hh + ":" + mm + ":" + ss;
}, 1000);
