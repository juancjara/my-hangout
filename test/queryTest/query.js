var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/myhangout');
var Chat = require('./../../models/chat.model');

var query = function  (arg) {
    arg.emails = 'jc@gg.comdu@de.com';
    Chat.getLastMsgs(arg, function(err, docs) {
      if (err) console.log(err);
      console.log(docs);
    });
}

var date = Date.now();

query({
  lastUpdate: date,
  limit: 1
});
