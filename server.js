var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var session = require("express-session");
var rMain = require('./routes/main.route');
var socket = require('./socketEvents');
var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost/myhangout');

var env = process.env.NODE_ENV || 'dev';
var port = (env == 'pro') ? 8001: 7001;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/public', express.static(__dirname + '/public'));
app.use(session({secret: 'pulpin law', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());

app.get('/chat', rMain.chat);
app.get('/', rMain.index);

app.post('/ggmail', rMain.postLogin);
app.post('/getMessages', rMain.getMessages);

io.on('connection', socket.init);

http.listen(port);

console.log("My hangout");
console.log("Environment " + env);
console.log('Listenning '+ port);