const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is similar to a Sequelize model
const AdminSchema = new Schema({
  menu: Array,
  heading: {
    title: String,
    subtitle: String
  },
  social: Array,
  about: String,
  technology: Array,
  portfolio: {
    introduction: String,
    projects: Array
  },
  resume: String
  
});

// This creates our model from the above schema, using mongoose's model method
const Admin = mongoose.model("Admin", AdminSchema);

// Export the Article model
module.exports = Admin;