var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){ //Quand le user se connect
  io.emit('user alert', 'enter your nickname');
  io.emit('chat alert', 'user connected');
  socket.on('disconnect', function(){
    io.emit('chat alert', 'user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
