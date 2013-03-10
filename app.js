/**
 * Module Dependencies
 */

var express = require('express'),
    fs = require('fs'),
    app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var connected = {};
io.on('connection', function(socket) {
  // console.log('someone connected!', socket);

  socket.on('coords', function(obj) {
    var id = this.id;
    var compId = connected['computer'];
    var computer = io.sockets.sockets[compId];
    computer.emit('receive', obj);
  })

  socket.on('name', function(name) {
    connected[name] = this.id;
  })
})

app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.send(fs.readFileSync('./index.html', 'utf8'));
});


server.listen(8080);
