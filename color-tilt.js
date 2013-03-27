/**
 * Module Dependencies
 */

var IO = require('io');

/**
 * Initialize the socket
 */

socket = IO('http://ws.mat.io:80/color-tilt');

/**
 * Get device tilt
 *
 * @param {Object} e
 */

window.ondevicemotion = function(e) {
  var x = e.accelerationIncludingGravity.x,
      y = e.accelerationIncludingGravity.y,
      z = e.accelerationIncludingGravity.z;

  document.body.style.backgroundColor = rgb(x, y, z);

  socket.emit('tilt', {
    x : x,
    y : y,
    z : z
  });
};

/**
 * On acceleration from another device
 */

socket.on('tilt', function(tilt) {
  document.body.style.backgroundColor = rgb(tilt.x, tilt.y, tilt.z);
});


/**
 * Convert to RGB space
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 */

function rgb(x, y, z) {
  var r = round((x + 10) * 255 / 20),
      g = round((y + 10) * 255 / 20),
      b = round((z + 10) * 255 / 20);

  return 'rgb(' + [r, g, b].join(',') + ')';
}

/**
 * Round to the nearest decimal
 *
 * @param {Number} num
 * @param {Number} decimal
 */

function round(num, decimal) {
  decimal = decimal || 1;
  return Math.round(num * decimal) / decimal;
}
