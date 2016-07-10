var User = require('./models/user.model');

var user = new User({
  picture: 'https://alrescateverde.files.wordpress.com/2011/06/koala.jpg',
  name: 'yo',
  email: 'yo@gmail.com'
});

user.save(function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('saved');
});
