var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');

var UserSchema = new Schema({
  picture: String,
  name: String,
  email: String,
  online: {type: Boolean, default: false},
  friends: [{ type : ObjectId, ref: 'User' }]});

UserSchema.statics.connect = function(email, cb) {
  User.findOne({ email: email }, function (err, doc) {
    if (err) console.log('err connect', err);
    doc.online = true;
    doc.save(cb);
  });
};

UserSchema.statics.disconnect = function(email, cb) {
  User.findOne({ email: email }, function (err, doc) {
    if (err) console.log('err disconnect', err);
    doc.online = false;
    doc.save(cb);
  });
};

UserSchema.statics.getFriends = function(name, cb) {
  var data = {
    name: 1, 
    _id: 0, 
    online: 1, 
    picture: 1,
    email: 1
  };
  User.findOne({name: name})
    .populate("friends", data).exec(cb);
};

UserSchema.statics.addFriend = function(data) {
  var deferred = Q.defer();

  User .findByIdAndUpdate(
    data.userId,
    {$push: {friends: data.id}},
    function (err) {
      if (err) {
        return deferred.reject(err);
      }
      deferred.resolve();
    });

  return deferred.promise();
};

var User = module.exports =
  mongoose.model('User', UserSchema);
