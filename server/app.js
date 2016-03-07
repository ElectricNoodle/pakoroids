var express = require('express');
var app = module.exports.app = exports.app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection', function (socket) {
  socket.emit('test', { hello: 'world' });
});

console.log(__dirname + '/../src');
app.use(express.static(__dirname + '/../src'));

app.listen(9000);
 
app.use(require('connect-livereload')());