"use strict";
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
app.get('/', function(req, res){
	  	res.sendFile(path.join(__dirname, '/', 'client.html'));
		});
io.on('connection', function(socket){
  console.log('a user connected');
}
app.listen(8080, function(){
	console.log('listening on *:8080');
});