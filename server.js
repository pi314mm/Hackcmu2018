var fs = require('fs');
var http = require('http');
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "stuff",
  port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


http.createServer(function (req, res) {
    fs.readFile('client.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    con.query("SELECT * FROM items", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
	res.write(data);
    res.end();
  });
}).listen(8080);
