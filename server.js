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

var cookieSession = require('cookie-session')

var app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['username','password'],
}))


function authenticate(username,password,res,callback) {
	var ans = conn.query("SELECT * FROM users WHERE username = '"+username+"' AND password = '"+password+"';",function(err,result){
		if (result.length == 0){
			res.redirect('/login');
		}else{
			callback();
		}
	});
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {	
	res.render('home');
});

app.get('/login', function (req, res) {
	res.render('home');
});

app.get('/shop/*', function (req, res) {
	authenticate(req.session.username,req.session.password,res,function(){
		var shop = req.url.split("/")[2];
		conn.query("SELECT * FROM items WHERE department='"+shop+"';", function (err, result) {
			res.render('shop',{items: result,department:shop });
		});
	});
});

app.listen(8080);