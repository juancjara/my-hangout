var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
  emails: String,
  who: String,
  msg: String,
  dateTime: { type: Date, default: Date.now }
})

ChatSchema.statics.getMessages = function(emails, cb) {
  Chat.find({emails: emails}, cb);
}

ChatSchema.statics.addMsg = function(data, cb) {
  var msg = {
    who: data.from,
    msg: data.msg
  }
  var chat = new Chat(
  {
    emails: data.emails,
    who: data.from,
    msg: data.msg
  });
  chat.save(cb);
}

ChatSchema.statics.getLastMsgs = function(query, cb) {
  Chat.find({emails: query.emails, dateTime: {$lte: query.lastUpdate}})
    .limit(query.limit)
    .sort( '-dateTime' ).exec(cb);
}

var Chat = module.exports =
  mongoose.model('Chat', ChatSchema);