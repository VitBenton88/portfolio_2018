// Routes
// =============================================================
module.exports = function(app, db, dotenv, nodemailer, validator) {
    // GET
    // =============================================================
    // homepage route
    app.get("/", (req, res) => {
      db.Portfolio.find()
      .then((portfolio) => {
        res.render("index", {portfolio});
      });
    });

    // admin route
    app.get("/admin", (req, res) => {
      res.redirect('/admin/content');
    });

    // admin content route
    app.get("/admin/content", (req, res) => {
      db.Portfolio.find()
      .then((portfolio) => {
        res.render("admin-content", {portfolio, layout: "admin"});
      });
    });

    // admin dashboard route
    app.get("/admin/dashboard", (req, res) => {
      db.Portfolio.find()
      .then((portfolio) => {
        res.render("admin-dashboard", {portfolio, layout: "admin"});
      });
    });

    // admin settings route
    app.get("/admin/settings", (req, res) => {
      db.Portfolio.find()
      .then((portfolio) => {
        res.render("admin-settings", {portfolio, layout: "admin"});
      });
    });

    // admin users route
    app.get("/admin/users", (req, res) => {
      db.Portfolio.find()
      .then((portfolio) => {
        res.render("admin-users", {portfolio, layout: "admin"});
      });
    });

    //handle Googles robots
    app.get('/robots.txt', function (req, res) {
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
    });

    //handle sitemap request
    app.get('/sitemap.txt', function (req, res) {
        res.send("./public/sitemap.txt");
    });

    // POST
    // =============================================================
    //handle contact form
    app.post("/contact", (req, res) => {
      const { name, email, message } = req.body;
      const replyTo = email;
      const subject = `${name} @ ${replyTo} contacted you through VitBenton.com!`;

      if (!validator.isEmpty(replyTo) && !validator.isEmpty(name) && !validator.isEmpty(message) && validator.isEmail(replyTo)) {

        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SER,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          replyTo,
          to: process.env.EMAIL_REC,
          subject,
          text: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
        
        req.flash(
          'success_msg',
          'Message successfully sent.'
        );
        res.redirect('/');

      } else {
        req.flash('error_msg',
        'Message not sent. Please make sure the form is filled out correctly.'
        );
        res.redirect('/');
      };

    });

    // update meta head
    app.post("/updatemetahead", (req, res) => {
      let { _id, meta_head } = req.body;
      
      db.Portfolio.updateOne({_id},{$set: {'site_settings.meta_head': meta_head}})
      .then((result) => {
        req.flash(
          'success_msg',
          'Meta head successfully updated.'
        );
        res.redirect('/admin/settings');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/settings');
      });
    });

    // update meta body
    app.post("/updatemetabody", (req, res) => {
      let { _id, meta_body } = req.body;
      
      db.Portfolio.updateOne({_id},{$set: {'site_settings.meta_body': meta_body}})
      .then((result) => {
        req.flash(
          'success_msg',
          'Meta body successfully updated.'
        );
        res.redirect('/admin/settings');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/settings');
      });
    });

    // update web site info (name & description)
    app.post("/updatesiteinformation", (req, res) => {
      let { _id, site_description, site_name } = req.body;

      db.Portfolio.updateOne({_id},{$set: {'site_settings.site_description': site_description, 'site_settings.site_name': site_name}})
      .then((result) => {
        req.flash(
          'success_msg',
          'Site information successfully updated.'
        );
        res.redirect('/admin/settings');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/settings');
      });
    });

    // update title
    app.post("/updatetitle", (req, res) => {
      const { _id, title } = req.body;
      db.Portfolio.updateOne({_id},{title})
      .then((result) => {
        req.flash(
          'success_msg',
          'Title successfully edited.'
        );
        res.redirect('/admin/content');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // update subtitle
    app.post("/updatesubtitle", (req, res) => {
      const { _id, subtitle } = req.body;
      db.Portfolio.updateOne({_id},{subtitle})
      .then((result) => {
        req.flash(
          'success_msg',
          'Subtitle successfully edited.'
        );
        res.redirect('/admin/content');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // add menu item
    app.post("/addmenuitem", (req, res) => {
      const { _id, text, url } = req.body;
      db.Portfolio
      .updateOne({_id}, {'$push': {
            "menu" : {text, url}
        }})
        .then((result) => {
          req.flash(
            'success_msg',
            'Menu item successfully added.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // update menu item
    app.post("/updatemenuitem", (req, res) => {
      const { _id, _menu, text, url } = req.body;
      db.Portfolio.findOneAndUpdate(
        { _id, "menu._id": _menu }, { "$set": {"menu.$.url": url, "menu.$.text": text} })
        .then((result) => {
          req.flash(
            'success_msg',
            'Menu item successfully edited.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // add social
    app.post("/addsocial", (req, res) => {
      const { icon, _id, name, url } = req.body;
      db.Portfolio
      .updateOne({_id}, {'$push': {
            "social" : {icon, name, url}
        }})
        .then((result) => {
          req.flash(
            'success_msg',
            'Social link successfully added.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // update social
    app.post("/updatesocial", (req, res) => {
      const { icon, _id, name, _social, url } = req.body;
      db.Portfolio.findOneAndUpdate(
        { _id, "social._id": _social }, { "$set": {"social.$.name": name, "social.$.url": url, "social.$.icon": icon} })
        .then((result) => {
          req.flash(
            'success_msg',
            'Menu item successfully edited.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // update about copy
    app.post("/updateabout", (req, res) => {
      const { _id, about } = req.body;
      db.Portfolio
      .updateOne({_id}, {about})
        .then((result) => {
          req.flash(
            'success_msg',
            'About text successfully updated.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // update portfolio intro copy
    app.post("/updateportolfiointro", (req, res) => {
      const { _id, introduction } = req.body;
      db.Portfolio
      .updateOne({_id}, {portfolio: {introduction}})
        .then((result) => {
          req.flash(
            'success_msg',
            'Portfolio introduction successfully updated.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // add project
    app.post("/addproject", (req, res) => {
      const { _id, details, title, text, url } = req.body;
      let bullets = [];
      if (Array.isArray(details)) {
        details.forEach((bullet) => {bullets.push({bullet})});
      } else {
        bullets.push({bullet: details});
      }
      db.Portfolio
      .findByIdAndUpdate(_id, {'$push': {"portfolio.projects" : {title, text, url, bullets}}})
        .then((result) => {
          req.flash(
            'success_msg',
            'Project successfully added.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // update project
    app.post("/updateproject", (req, res) => {
      const { _id, details, _project, title, text, url } = req.body;
      let bullets = [];
      if (Array.isArray(details)) {
        details.forEach((bullet) => {bullets.push({bullet})});
      } else {
        bullets.push({bullet: details});
      }
      db.Portfolio
      .findOneAndUpdate(
        { _id, "portfolio.projects._id": _project }, { "$set": {"portfolio.projects.$.url": url, "portfolio.projects.$.text": text, "portfolio.projects.$.title": title, "portfolio.projects.$.bullets": bullets} })
        .then((result) => {
          req.flash(
            'success_msg',
            'Project successfully updated.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // update resume
    app.post("/updateresume", (req, res) => {
      const { _id, resume } = req.body;
      db.Portfolio.updateOne({_id},{resume})
      .then((result) => {
        req.flash(
          'success_msg',
          'Resume successfully edited.'
        );
        res.redirect('/admin/content');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // add technology
    app.post("/addtechnology", (req, res) => {
      const { _id, name, score, type } = req.body;
      db.Portfolio
      .updateOne({_id}, {'$push': {
            "technology" : {name, score, type}
        }})
        .then((result) => {
          req.flash(
            'success_msg',
            'Technology successfully added.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // update technology
    app.post("/updatetechnology", (req, res) => {
      const { _id, name, score, type, _technology } = req.body;
      db.Portfolio.findOneAndUpdate(
        { _id, "technology._id": _technology }, { "$set": {"technology.$.name": name, "technology.$.score": score, "technology.$.type": type} })
        .then((result) => {
          req.flash(
            'success_msg',
            'Technology successfully edited.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/content');
      });
    });

    // add user
    app.post("/adduser", (req, res) => {
      const { _id, username, email, password } = req.body;
      db.Portfolio
      .updateOne({_id}, {'$push': {
            "users" : {username, email, password, admin}
        }})
        .then((result) => {
          req.flash(
            'success_msg',
            'User successfully added.'
          );
          res.redirect('/admin/users');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin/users');
      });
    });

    // DELETE
    // =============================================================
      // delete menu item
      app.post("/deletemenuitem", (req, res) => {
        const { _id, _menu } = req.body;
        db.Portfolio
        .findByIdAndUpdate(_id, { $pull: { "menu": { _id: _menu } } })
          .then((result) => {
            req.flash(
              'success_msg',
              'Menu item successfully deleted.'
            );
            res.redirect('/admin/content');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error_msg', error.message);
          res.redirect('/admin/content');
        });
      });

      // delete social
      app.post("/deletesocial", (req, res) => {
        const { _id, _social } = req.body;
        db.Portfolio
        .findByIdAndUpdate(_id, { $pull: { "social": { _id: _social } } })
          .then((result) => {
            req.flash(
              'success_msg',
              'Social link successfully deleted.'
            );
            res.redirect('/admin/content');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error_msg', error.message);
          res.redirect('/admin/content');
        });
      });

      // delete technology
      app.post("/deletetechnology", (req, res) => {
        const { _id, _technology } = req.body;
        db.Portfolio
        .findByIdAndUpdate(_id, { $pull: { "technology": { _id: _technology } } })
          .then((result) => {
            req.flash(
              'success_msg',
              'Technology successfully deleted.'
            );
            res.redirect('/admin/content');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error_msg', error.message);
          res.redirect('/admin/content');
        });
      });

      // delete project
      app.post("/deleteproject", (req, res) => {
        const { _id, _project } = req.body;
        db.Portfolio
        .findByIdAndUpdate(_id, { $pull: { "portfolio.projects": { _id: _project } } })
          .then((result) => {
            req.flash(
              'success_msg',
              'Project successfully deleted.'
            );
            res.redirect('/admin/content');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error_msg', error.message);
          res.redirect('/admin/content');
        });
      });

      // delete project bullet
      app.post("/deleteprojectbullet", (req, res) => {
        const { bulletid, _id, projectid } = req.body;
        db.Portfolio
        .findById({ _id })
          .then((result) => {
            result.portfolio.projects.id(projectid).bullets.id(bulletid).remove();
            result.save();
            res.end('{"success" : "Bullet Successfully Deleted", "status" : 200}');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error_msg', error.message);
          res.end(`{"error" : "${error.message}", "status" : 400}`);
        });
      });
};
