const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is similar to a Sequelize model
const PortfolioSchema = new Schema({
  menu: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
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
    default: [{'text': 'link1', 'url': '/'}]
  },
  about: {
    type: String,
    default: '<p>Your About!</p>'
  },
  technology: {
    type: Array,
    default: [{'name': 'HTML', 'score': 100}]
  },
  portfolio: {
    introduction: {
      type: String,
      default: '<p>Your Introduction!</p>'
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
const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

// Instantiate new schema
// const instance = new Portfolio();
// instance.title = 'Your Title!';
// instance.save(function (err) {
//   //
// });

// Export the Article model
module.exports = Portfolio;