var mongoose = require('mongoose');

var User = require('./models/user.model');

var connection = mongoose.connect('mongodb://localhost/myhangout');

var yo = {
  picture: 'https://alrescateverde.files.wordpress.com/2011/06/koala.jpg',
  name: 'yo',
  email: 'yo@gmail.com'
};

var dude = {
  picture: 'https://cdn.shopify.com/s/files/1/0770/2163/t/2/assets/character_img_2.jpg?12774873180828751322',
  name: 'dude',
  email: 'dude@gmail.com'
};

var someoneElse = {
  picture: 'http://emojipedia-us.s3.amazonaws.com/cache/42/60/42607f4f7ada067d08287082c025d910.png',
  name: 'someone else',
  email: 'else@gmail.com'
};

// var users = [
//   new User ({
//     picture: 'https://alrescateverde.files.wordpress.com/2011/06/koala.jpg',
//     name: 'yo',
//     email: 'yo@gmail.com'
//   }),
//   new User({
//     picture: 'https://cdn.shopify.com/s/files/1/0770/2163/t/2/assets/character_img_2.jpg?12774873180828751322',
//     name: 'dude',
//     email: 'dude@gmail.com'
//   }),
//   new User({
//     picture: 'http://emojipedia-us.s3.amazonaws.com/cache/42/60/42607f4f7ada067d08287082c025d910.png',
//     name: 'someone else',
//     email: 'else@gmail.com'
//   })
// ];

// user.save(function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   return console.log('saved');
// });
// User.addFriend({
//   id: '5782ae9700238e0a47b29172',
//   userId: '5782bc03801328335a9c4de4'
// }, function (err) {
//   console.log(err);
// });
