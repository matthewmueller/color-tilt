var max = -Infinity;
var min = Infinity;

window.ondevicemotion = function(e) {
  // ax = event.acceleration.x * 5;
  // ay = event.acceleration.y * 5;
  // document.getElementById("accelerationX").innerHTML = "acceleration X: <br>" + e.accelerationIncludingGravity.x;
  var y = round(e.accelerationIncludingGravity.y);
  var x = round(e.accelerationIncludingGravity.x);
  var z = round(e.accelerationIncludingGravity.z);

  var r = round(((z + 10)*255)/20);
  var g = round(((y + 10)*255)/20);
  var b = round(((x + 10)*255)/20);
  document.getElementById("accelerationX").innerHTML = 'rgb(' + r + ',' + g + ',' + b + ')';

  // document.getElementById("accelerationY").innerHTML = "acceleration Y: <br>" + y;
  // alert('rgb(' + (((z + 10)*255)/20) + ',' + (((x + 10)*255)/20) +',' + (((y + 10)*255)/20) + ')');
  document.body.style.backgroundColor = 'rgb(' + r + ',' + g +',' + b + ')';



  // if(max < y) max = y;
  // if(min > y) min = y;
  // document.getElementById("acceleration").innerHTML = e.accelerationIncludingGravity.z;
  // document.getElementById("maxY").innerHTML = "Max <br>" + max;
  // document.getElementById("minY").innerHTML = "Min <br>" + min;

  // document.getElementById("accelerationZ").innerHTML = "acceleration Z: <br>" + round(e.accelerationIncludingGravity.z, 2);
  if (e.rotationRate) {
    // document.getElementById("rotationAlpha").innerHTML = "Rotation Alpha: <br>" + round(e.rotationRate.alpha, 2);
    // document.getElementById("rotationBeta").innerHTML = "Rotation Beta: <br>" + e.rotationRate.beta;
    // document.getElementById("rotationGamma").innerHTML = "Rotation Gamma: <br>" + e.rotationRate.gamma;
  }
}


function round(num, dec) {
  dec = dec || 1;
  return Math.round(num * dec) / dec;
}
