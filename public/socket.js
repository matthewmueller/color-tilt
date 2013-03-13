
var socket = io.connect();
// window.onload = function() {
//   socket.emit('coords', {
//     hi : "hello"
//   })
// };

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var name = getParameterByName('name')

socket.emit('name', name);


window.ondevicemotion = function(e) {
  var y = round(e.accelerationIncludingGravity.y);
  var x = round(e.accelerationIncludingGravity.x);
  var z = round(e.accelerationIncludingGravity.z);
  // document
  // document.getElementById('accelerationX').innerHTML = x;
  socket.emit('coords', {
    y : y,
    x : x,
    z : z
  });
};

function round(num, dec) {
  dec = dec || 1;
  return Math.round(num * dec) / dec;
}


socket.on('receive', function(coords) {
  var r = round(((coords.z + 10)*255)/20);
  var g = round(((coords.y + 10)*255)/20);
  var b = round(((coords.x + 10)*255)/20);
  document.body.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
})
