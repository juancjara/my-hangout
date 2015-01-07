var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
  emails: String,
  messages : [{
    who: String,
    msg: String,
    dateTime: { type: Date, default: Date.now }
  }]
})

ChatSchema.statics.getMessages = function(emails, cb) {
  Chat.findOne({emails: emails})
    .populate("messages").exec(cb);
}

ChatSchema.statics.addMsg = function(data, cb) {
  var msg = {
    who: data.from,
    msg: data.msg
  }
  Chat.update(
    {emails: data.emails}, 
    { $push: 
      { 'messages': 
        {
          $each: [msg],
          $position: 0
        }
      }
    }, function(err, res) {
      if (err) cb(err);
      if (res == 0) {
        Chat.findOne({emails: data.emails}, function(err, doc) {
          if (err) cb(err);
          var chat = new Chat({
            emails: data.emails,
            messages: [msg]
          });
          chat.save(cb);
        });
      } else {
        cb(null, res);
      }
    });
  /*
  Chat.findOne({emails: data.emails}, function(err, doc) {
    if (err) cb(err);
    if (doc) {
      Chat.findByIdAndUpdate(doc.id, {$push: {messages: msg}}, cb);
    } else {
      var chat = new Chat({
        emails: data.emails,
        messages: [msg]
      });
      chat.save(cb);
    }
  })*/
}

ChatSchema.statics.getLastMsgs = function(query, cb) {
  console.log(query.emails);
   Chat.findOne({emails: query.emails},{messages: 1})
    .limit(1).exec(cb);
   /*Tweet.find({},'twid active author avatar body date screenname',
    {skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,docs)*/
}

var Chat = module.exports =
  mongoose.model('Chat', ChatSchema);