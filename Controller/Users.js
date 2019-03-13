// Dependencies
// =============================================================
const db = require("../models");

const Users = {
    onlyOneAdmin: (_id) => new Promise((resolve, reject) => {
        db.Users.find()
        .then((users) => {
          let adminUserCount = 0;
          let userIsAdmin = false;
          
          for (let i = 0; i < users.length; i++) {
            if (users[i].admin) {
              adminUserCount++;
              if (users[i]._id == _id) {
                userIsAdmin = true;
              }
            }
          }
          if (adminUserCount < 2 && userIsAdmin) {
            resolve(true);
          }
          resolve(false);
        })

        .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
        });
      })
  };

// Export the helper function object
module.exports = Users;