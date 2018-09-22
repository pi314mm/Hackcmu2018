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
	res.render('home');
});

app.get('/shop/*', function (req, res) {
	var shop = req.url.split("/")[2];
	conn.query("SELECT * FROM items WHERE department='"+shop+"';", function (err, result) {
		res.render('shop',{items: result,department:shop });
	});
});

app.listen(8080);