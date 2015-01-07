var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var session = require("express-session");
var rMain = require('./routes/main.route');
var socket = require('./socketEvents');
var mongoose = require('mongoose');
//var autoIncrement = require('mongoose-auto-increment');

/*var JSX = require('node-jsx').install();
var React = require('react');
var HangoutApp = require('./components/hangoutApp.react');*/

var connection = mongoose.connect('mongodb://localhost/myhangout');
//autoIncrement.initialize(connection);

var env = process.env.NODE_ENV || 'dev';
var port = (env == 'pro') ? 7771: 7777;

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/public', express.static(__dirname + '/public'));
app.use(session({secret: 'pulpin law', saveUninitialized: true, resave: true}));

app.get('/chat', rMain.chat);

app.get('/', rMain.index);

app.post('/ggmail', rMain.postLogin);

io.on('connection', socket.init);

http.listen(port);

console.log("My hangout");
console.log("Environment " + env);
console.log('Listenning '+ port);