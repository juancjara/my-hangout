var added = false;
var User = require('./models/user.model');
var Chat = require('./models/chat.model');

var usernames = {};

exports.init = function(socket){
  
  socket.on('add user', function(email) {
    User.connect(email, function(err, d) {
      if (err) console.log('add err', err);
      socket.username = email;
      usernames[email] = socket.id;
      socket.broadcast.emit('user joined', email);
    })
  });

  socket.on('chat message', function(data){
    Chat.addMsg(data, function(err, data) {
      if (err) console.log('chat message', err);
      socket.broadcast.to(usernames[data.to])
      .emit('chat message', data);
    });
  });

  socket.on('on writing', function(data) {
    socket.broadcast.to(usernames[data.to])
      .emit('on writing', data)
  });

  socket.on('off writing', function(data) {
    socket.broadcast.to(usernames[data.to])
      .emit('off writing', data)
  });


  socket.on('disconnect', function () {
    if (!socket.username) return;
    User.disconnect(socket.username, function(err, d) {
      if (err) console.log('dc err', err);
      //TODO delete username
      socket.broadcast.emit('user left', socket.username);
    });
  });
}