// Routes
// =============================================================
module.exports = function(app, db, dotenv, nodemailer, validator) {
    // GET
    // =============================================================
    // homepage route
    app.get("/", (req, res) => {
        db.Portfolio.find()
        .then(function(portfolio) {
          res.render("index", {portfolio});
        });
    });

    // admin route
    app.get("/admin", (req, res) => {
        db.Portfolio.find()
        .then(function(portfolio) {
          res.render("admin", {portfolio, layout: "admin"});
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
      const { name, email, subject, text } = req.body;

      if (!validator.isEmpty(replyTo) && !validator.isEmpty(name) && !validator.isEmpty(text) && validator.isEmail(replyTo)) {

        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SER,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          replyTo: email,
          to: process.env.EMAIL_REC,
          subject: `${name} @ ${replyTo} contacted you through VitBenton.com!`,
          text
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });

        res.send(true);

      } else {
        res.send(false);
      };

    });

    // update title
    app.post("/updatetitle", (req, res) => {
      const { _id, title } = req.body;
      db.Portfolio
      .updateOne({_id},{title})
        .then((result) => {
          req.flash(
            'success_msg',
            'Title successfully edited.'
          );
          res.redirect('/admin');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin');
      });
    });

    // update subtitle
    app.post("/updatesubtitle", (req, res) => {
      const { _id, subtitle } = req.body;
      db.Portfolio
      .updateOne({_id},{subtitle})
        .then((result) => {
          req.flash(
            'success_msg',
            'Subtitle successfully edited.'
          );
          res.redirect('/admin');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin');
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
          res.redirect('/admin');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin');
      });
    });

    // update menu items
    app.post("/updatemenuitem", (req, res) => {
      const { _id, _menu, text, url } = req.body;
      db.Portfolio.findOneAndUpdate(
        { _id, "menu._id": _menu }, { "$set": {"menu.$.url": url, "menu.$.text": text} })
        .then((result) => {
          req.flash(
            'success_msg',
            'Menu item successfully edited.'
          );
          res.redirect('/admin');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin');
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
          res.redirect('/admin');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin');
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
          res.redirect('/admin');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin');
      });
    });

    // add project
    app.post("/addproject", (req, res) => {
      const { _id, details, title, text, url } = req.body;
      let bullets = [];
      details.forEach((bullet) => {bullets.push({bullet})});
      db.Portfolio
      .findByIdAndUpdate(_id, {'$push': {"portfolio.projects" : {title, text, url, bullets}}})
        .then((result) => {
          req.flash(
            'success_msg',
            'Project successfully added.'
          );
          res.redirect('/admin');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin');
      });
    });

    // update project
    app.post("/updateproject", (req, res) => {
      const { _id, details, _project, title, text, url } = req.body;
      console.log(req.body);
      let bullets = [];
      details.forEach((bullet) => {bullets.push({bullet})});
      db.Portfolio
      .findOneAndUpdate(
        { _id, "portfolio.projects._id": _project }, { "$set": {"portfolio.projects.$.url": url, "portfolio.projects.$.text": text, "portfolio.projects.$.title": title, "portfolio.projects.$.bullets": bullets} })
        .then((result) => {
          req.flash(
            'success_msg',
            'Project successfully updated.'
          );
          res.redirect('/admin');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error_msg', error.message);
        res.redirect('/admin');
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
            res.redirect('/admin');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error_msg', error.message);
          res.redirect('/admin');
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
            res.redirect('/admin');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error_msg', error.message);
          res.redirect('/admin');
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
