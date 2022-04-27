setInterval(function myFunction() {     
  var now = new Date();
  //var hh = now.getHours();
  //var mm = now.getMinutes();
  //var ss = now.getSeconds();
  document.getElementById('clock').innerHTML = now.getHours() + ":" + now.getMinutes() + ":" +now.getSeconds();
}, 1000);
