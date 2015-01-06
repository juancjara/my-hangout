var added = false;
var User = require('./models/user.model');


exports.init = function(socket){
  
  socket.on('add user', function(username) {
    User.connect(username, function(err, d) {
      if (err) console.log('add err', err);
      socket.username = username;
      socket.broadcast.emit('user joined', username);
    })
    /*added = true;
    socket.username = username;
    usernames[username] = socket.id;
    numUsers++;
    socket.broadcast.emit('user joined', username);*/
  });

  socket.on('chat message', function(data){
    /*console.log('chat message', data);
    socket.broadcast.to(usernames[data.to])
      .emit('open chat', socket.username);
    socket.broadcast.to(usernames[data.to]).emit('chat message', data.msg);*/
  });

  socket.on('disconnect', function () {
    if (!socket.username) return;
    User.disconnect(socket.username, function(err, d) {
      if (err) console.log('dc err', err);
      socket.broadcast.emit('user left', socket.username);
    });
    /*console.log('dc');
    if (added) {
      delete usernames[socket.username];
      --numUsers;
      socket.broadcast.emit('user left', socket.username);
    }*/
  });
}