var http = require('http');

http.createServer(function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.end('Hello World!');
	app.get('/', function(req, res){
	  	res.sendFile(path.join(__dirname, '/', 'client.html'));
		});
}).listen(8080);