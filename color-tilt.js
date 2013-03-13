/**
 * Module Dependencies
 */

var EIO = require('engine.io'),
    socket = new EIO.Socket('192.168.2.103:9000');

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

  socket.send(JSON.stringify({
    x : x,
    y : y,
    z : z
  }));
};

/**
 * On acceleration from another device
 */

socket.on('message', function(message) {
  message = JSON.parse(message)
  document.body.style.backgroundColor = rgb(message.x, message.y, message.z);
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
