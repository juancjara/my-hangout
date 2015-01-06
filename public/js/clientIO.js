
module.exports = socket = io(); /*= (function() {
  var socket = io();
  var funs = {};
  return {
    join: function(user) {
      socket.emit('add user', user);
    },
    register: function(nameFun, fun) {
      funs[nameFun] = fun;
    },
    emit: function(nameFun, data) {
      socket.emit(nameFun, data);
    }
  }
})();*/