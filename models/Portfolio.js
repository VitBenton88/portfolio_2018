const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for navigation menu items
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
  }
});

// Schema for social links
const SocialSchema = new Schema({
  name: {
    type: String,
    default: 'StackOverflow',
    trim: true
  },
  url: {
    type: String,
    default: '/'
  },
  icon: {
    type: String,
    default: 'fa-stack-overflow'
  }
});

// Schema for technologies
const TechnologySchema = new Schema({
  name: {
    type: String,
    default: 'JavaScript',
    trim: true
  },
  score: {
    type: Number,
    default: 100
  },
  type: {
    type: String,
    default: 'Frontend'
  }
});

// Schema for project bullets
const ProjectBulletSchema = new Schema({
  bullet: {
    type: String,
    default: 'bullet'
  }
});

// Schema for projects
const ProjectSchema = new Schema({
  title: {
    type: String,
    default: 'Project Title'
  },
  bullets: [ProjectBulletSchema],
  text: {
    type: String,
    default: 'Link Text'
  },
  url: {
    type: String,
    default: '/'
  }
});

// Portfolio Schema
const PortfolioSchema = new Schema({
  menu: [MenuSchema],
  technology: [TechnologySchema],
  social: [SocialSchema],
  portfolio: {
    introduction: {
      type: String,
      default: '<p>Your Introduction!</p>'
    },
    projects: [ProjectSchema],
  },
  title: {
    type: String,
    default: 'Your Title!'
  },
  subtitle: {
    type: String,
    default: 'Your Subtitle!'
  },
  about: {
    type: String,
    default: '<p>Your About!</p>'
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