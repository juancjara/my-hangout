var mongoose = require('mongoose');
var User = require('./../models/user.model');
var Chat = require('./../models/chat.model');

exports.index = function(req, res) {
  res.render('login');  
}

exports.chat = function(req, res) {
  var email = req.session.email;
  console.log('email', email);
  User.getFriends(email, function(err, dude) {
    if (err) console.log('err', err);
    var data = {
      user: dude,
    };
    res.render('index', {
      initialState: JSON.stringify(data)
    });
    
  });
}

exports.postLogin = function(req, res) {
  var email = req.body.email;
  User.getFriends(email, function(err, dude) {
    if (err) console.log('err', err);
    var url = '/'
    if (dude) {
      req.session.email = email;
      url = '/chat'
    }
    res.send({url: url});
  });
}

exports.getMessages = function(req, res) {
  Chat.getLastMsgs(req.body, function(err, docs) {
    if (err) res.send({err: console.log('err', err)});
    else {
      res.send({
        messages: docs
      });
    }
      
  });
}