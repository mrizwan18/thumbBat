let User = require('./models/User.model');

function isUserPresent(username) {
  User.findOne({
      username: username
    })
    .then(users => {
      console.log(users)
      console.log(users !== null)
      return users !== null;
    })
    .catch(err => {
      console.log(err)
      return false
    });
}


exports.addUser = function addUser(username) {
  if (!isUserPresent(username)) {
    console.log("inside creation")
    const newUser = new User({
      username
    });
    newUser.save()
      .then(() => {
        console.log("User Created")
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      });
  }
  return false;
}