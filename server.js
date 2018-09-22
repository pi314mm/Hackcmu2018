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


function authenticate(req,res,callback) {
	if(req.session.username ===undefined || req.session.password===undefined){
		res.redirect('/login');
	}else{
		var ans = conn.query("SELECT * FROM users WHERE username = '"+req.session.username+"' AND password = '"+eq.session.password+"';",function(err,result){
			if (result.length == 0){
				res.redirect('/login');
			}else{
				callback();
			}
		});
	}
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
	authenticate(req,res,function(){
		var shop = req.url.split("/")[2];
		conn.query("SELECT * FROM items WHERE department='"+shop+"';", function (err, result) {
			res.render('shop',{items: result,department:shop });
		});
	});
});

app.listen(8080);