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


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieSession({
  name: 'session',
  keys: ['username','password','userid'],
}))


function authenticate(req,res,callback) {
	if(req.session.username ===undefined || req.session.password===undefined){
		res.redirect('/login');
	}else{
		var ans = conn.query("SELECT * FROM users WHERE username = '"+req.session.username+"' AND password = '"+req.session.password+"';",function(err,result){
			if (result.length == 0){
				res.redirect('/login');
			}else{
				req.session.username = req.session.username;
				req.session.password = req.session.password;
				req.session.userid = result[0].id;
				callback();
			}
		});
	}
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	if(req.session.userid===undefined){
		res.render('home')
	}else{
		authenticate(req,res,function(){
			res.render('home',{username:req.session.username});
		});
	}
});

app.get('/login', function (req, res) {
	res.render('login');
});

app.post('/login', function (req, res) {
	conn.query("INSERT INTO users VALUES (NULL, '"+req.body.username+"','"+req.body.password+"');",function(err,result){
		req.session.username = req.body.username;
		req.session.password = req.body.password;
		authenticate(req,res,function(){res.redirect('/')});
	});
});

app.get('/logout', function (req, res) {
	req.session = null;
	res.redirect('/');
});

app.get('/buy',function(req,res){
	authenticate(req,res,function(){
		conn.query("SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'items' AND COLUMN_NAME = 'department';",function(err,dep){
			shops = dep[0].COLUMN_TYPE.match(/'[^,]*'/g)
			for (i = 0; i < shops.length; i++) { 
				shops[i] = shops[i].substring(1,shops[i].length-1);
			}
			res.render('buy',{shop:shops})
		});
	});
});

app.post('/buy',function(req,res){
	authenticate(req,res,function(){
		var s = `INSERT INTO items VALUES (NULL,'${req.body.name}','${req.body.description}','${req.body.department}');`;
		conn.query(s,function(err,result){
			res.redirect(`/shop/${req.body.department}`)
		});
	});
});

app.get('/shop/*', function (req, res) {
	authenticate(req,res,function(){
		var shop = req.url.split("/")[2];
		conn.query(`SELECT items.*,
					(SELECT price FROM bids WHERE itemID=items.id ORDER BY price ASC LIMIT 1 ) price,
					(SELECT username FROM users LEFT JOIN bids ON users.id = bids.userID WHERE itemID=items.id ORDER BY price ASC LIMIT 1 ) username
					FROM items
					WHERE department='${shop}';`, function (err, result) {
			res.render('shop',{items: result,department:shop, username:req.session.username });
		});
	});
});

app.post('/shop/*', function (req, res) {
	authenticate(req,res,function(){
		var s = `INSERT INTO bids VALUES (NULL,${req.body.itemID},${req.session.userid},${req.body.price});`;
		conn.query(s, function (err, result) {
			res.redirect(req.url);
		});
	});
});

app.listen(8080);