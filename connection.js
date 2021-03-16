let User = require('./models/User.model');

function isUserPresent(username, res) {
  User.findOne({
      username: username
    })
    .then(users => {
      return res(users !== null);
    })
    .catch(err => {
      return res(false);
    });
}


exports.addUser = function addUser(username, res) {
  isUserPresent(username, function (result) {
    console.log(result)
    if (result) {
      const newUser = new User({
        username
      });
      newUser.save()
        .then(() => {
          return res(true)
        })
        .catch(err => {
          return res(false)
        });
    } else
      return res(false)
  })
}