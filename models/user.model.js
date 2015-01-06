var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  picture: String,
  name: String,
  email: String,
  online: {type: Boolean, default: false},
  friends: [{ type : ObjectId, ref: 'User' }]
})

UserSchema.statics.connect = function(name, cb) {
  User.findOne({ name: name }, function (err, doc) {
    doc.online = true;
    doc.save(cb);
  });
}

UserSchema.statics.disconnect = function(name, cb) {
  User.findOne({ name: name }, function (err, doc) {
    doc.online = false;
    doc.save(cb);
  });
}

UserSchema.statics.getFriends = function(name, cb) {
  var data = {
    name: 1, 
    _id: 0, 
    online: 1, 
    picture: 1,
    email: 1
  }
  User.findOne({name: name})
    .populate("friends", data).exec(cb);
}

UserSchema.statics.addFriend = function(data, cb) {
  User.findByIdAndUpdate(data.userId,
    {$push: {friends: data.id}}, cb);
}

var User = module.exports =
  mongoose.model('User', UserSchema);