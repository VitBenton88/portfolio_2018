const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is similar to a Sequelize model
const MenuSchema = new Schema({
  text: {
    type: String,
    default: 'Link1',
    trim: true
  },
  url: {
    type: String,
    default: '/',
    trim: true
  },
  _portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' }
});

// This creates our model from the above schema, using mongoose's model method
const Menu = mongoose.model("Menu", MenuSchema);

// Export the Article model
module.exports = Menu;