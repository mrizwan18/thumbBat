let User = require('./models/User.model');

async function isUserPresent(username) {
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


exports.addUser = async function addUser(username) {
  if (!isUserPresent(username)) {
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