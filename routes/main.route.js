var mongoose = require('mongoose');
var User = require('./../models/user.model');

exports.index = function(req, res) {
  res.render('login');  
}

exports.chat = function(req, res) {
  var username = req.session.username;
  User.getFriends(username, function(err, dude) {
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
  var username = req.body.username;
  User.getFriends(username, function(err, dude) {
    if (err) console.log('err', err);

    var data = {
      user: dude
    };
    res.render('index', {
      initialState: JSON.stringify(data)
    });
    
  });
  /*User.findOne({name: req.body.username}, function(err, doc) {
    if (err) console.log('login err', err);
    console.log('doc', doc);
    res.redirect('/chat');
  });*/
}