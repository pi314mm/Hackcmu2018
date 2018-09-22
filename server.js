var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "stuff",
  port: 3306
});

conn.connect();

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	conn.query("SELECT * FROM items", function (err, result) {
		res.render('home',{items: result});
	});
});

app.listen(8080);