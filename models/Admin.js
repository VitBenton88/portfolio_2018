const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is similar to a Sequelize model
const AdminSchema = new Schema({
  menu: {
    type: Array,
    default: [{'text': 'link1', 'url': '/'}, {'text': 'link2', 'url': '/'}]
  },
  title: {
    type: String,
    default: 'Your Title!'
  },
  subtitle: {
    type: String,
    default: 'Your Subtitle!'
  },
  social: {
    type: Array,
    default: [{'text': 'link1', 'url': '/'}, {'text': 'link2', 'url': '/'}]
  },
  about: {
    type: String,
    default: 'Your About!'
  },
  technology: {
    type: Array,
    default: [{'name': 'HTML', 'score': 100}, {'name': 'CSS', 'score': 80}]
  },
  portfolio: {
    introduction: {
      type: String,
      default: 'Your Introduction!'
    },
    projects: {
      type: Array,
      default: [
        {
          'title': 'Project 1', 
          'bullets': [
            'bullet 1',
            'bullet 2'
          ],
          'button': {
            'text': 'Button Text',
            'url': '/'
          }
        },
        {
          'title': 'Project 2', 
          'bullets': [
            'bullet 1',
            'bullet 2'
          ],
          'button': {
            'text': 'Button Text',
            'url': '/'
          }
        }
      ]
    },
  },
  resume: {
    type: String,
    default: 'Your Resume!'
  },
  
});

// This creates our model from the above schema, using mongoose's model method
const Admin = mongoose.model("Admin", AdminSchema);

// Export the Article model
module.exports = Admin;