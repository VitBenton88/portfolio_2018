const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for users
const UsersSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    trim: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
const Users = mongoose.model("Users", UsersSchema);

// Instantiate new schema
// const instance = new Users();
// instance.username = 'Your Usernaame!';
// instance.save(function (err) {
//   //
// });

// Export the Article model
module.exports = Users;