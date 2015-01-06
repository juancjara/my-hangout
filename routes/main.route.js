var mongoose = require('mongoose');
var User = require('./../models/user.model');

exports.index = function(req, res) {
  res.render('login');  
}

exports.chat = function(req, res) {
  var username = req.session.username;
  User.getFriends(username, function(err, dude) {
    console.log('dude', dude)
    if (err) console.log('err', err);
    var data = {
      username: username,
      friends: dude.friends
    };
    res.render('index', {
      initialState: JSON.stringify(data)
    });
    
  });
}

exports.postLogin = function(req, res) {
  req.session.username = req.body.username;
  console.log('session', req.session.username);
  res.redirect('/chat');
}