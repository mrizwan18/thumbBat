let User = require('./models/User.model');

function isUserPresent(username) {
  User.findOne({
      username: username
    })
    .then(users => {
      return users !== null;
    })
    .catch(err => {
      console.log(err)
      return false
    });
}


exports.addUser = function addUser(username) {
  if (!isUserPresent(username)) {
    const newUser = new User({
      username
    });
    newUser.save()
      .then(() => {
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      });
  }
  return false;
}