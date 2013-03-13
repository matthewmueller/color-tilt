/**
 * Module Dependencies
 */

var port = process.argv[2] || 9000,
    express = require('express'),
    engine = require('engine.io'),
    app = module.exports = express(),
    http = require('http').createServer(app);

/**
 * Configure engine.io
 */

var es = app.es = new engine.Server();

/**
 * Handle request upgrade to websockets
 */

http.on('upgrade', es.handleUpgrade.bind(es));

/**
 * Server Configuration
 */

app.set('views', __dirname);
app.set('view engine', 'jade');

app.configure(function() {
  app.use(express.static(__dirname + '/build'));
  app.use(app.router);
  app.use(es.handleRequest.bind(es));
});

/**
 * Websocket stuff
 */

var sockets = [];

es.on('connection', function(socket) {
  console.log('connected');

  sockets.push(socket);

  socket.on('message', function(message) {
    for (var i = 0, len = sockets.length; i < len; i++) {
      if(sockets[i] === this) return;
      sockets[i].send(message);
    };
  })
});

/**
 * Routing
 */

app.get('/', function(req, res) {
  res.render('index');
});

// /**
//  * Module Dependencies
//  */

// var express = require('express'),
//     fs = require('fs'),
//     app = express();



// var server = require('http').Server(app);
// var io = require('socket.io').listen(server);

// var connected = {};
// io.on('connection', function(socket) {
//   // console.log('someone connected!', socket);

//   socket.on('coords', function(obj) {
//     var id = this.id;
//     var compId = connected['computer'];
//     var computer = io.sockets.sockets[compId];
//     computer.emit('receive', obj);
//   })

//   socket.on('name', function(name) {
//     connected[name] = this.id;
//   })
// })

// app.use(express.static('./public'));

// app.get('/', function(req, res) {
//   res.send(fs.readFileSync('./index.html', 'utf8'));
// });


// server.listen(8080);


// /**
//  * Configuration
//  */

// app.set('views', __dirname);
// app.set('view engine', 'jade');

// /**
//  * Routes
//  */

// app.get('/', function(req, res) {
//   res.render('index.html');
// });

/**
 * Listen
 */

if(!module.parent) {
  http.listen(port);
  console.log('Server started on port', port);
}
