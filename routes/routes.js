// Routes
// =============================================================
module.exports = function(app, bcrypt, db, dotenv, Controller, ensureAuthenticated, nodemailer, passport, validator) {
    // GET
    // =============================================================
    // homepage route
    app.get("/", (req, res) => {
      db.Portfolio.find()
      .then((portfolio) => {
        res.render("index", {portfolio});
      });
    });

    // login page
    app.get("/login", (req, res) => {
      res.render("login", {layout: "login"});
    });

    // admin route
    app.get("/admin", (req, res) => {
      res.redirect('/admin/dashboard');
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
      db.Users.find()
      .then((users) => {
        res.render("admin-users", {users, layout: "admin"});
      });
    });

    // admin edit user page
    app.get("/admin/users/edit/:id", (req, res) => {
      const _id = req.params.id;

      db.Users
      .findById({_id})
        .then((user) => {
          res.render("admin-edit-user", {user, layout: "admin"});
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/users');
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
          'success',
          'Message successfully sent.'
        );
        res.redirect('/');

      } else {
        req.flash('error',
        'Message not sent. Please make sure the form is filled out correctly.'
        );
        res.redirect('/');
      };

    });

    // update meta head
    app.post("/updatemetahead", (req, res) => {
      let { _id, meta_head } = req.body;
      
      db.Portfolio.updateOne({_id}, {'site_settings.meta_head': meta_head})
      .then((result) => {
        req.flash(
          'success',
          'Meta head successfully updated.'
        );
        res.redirect('/admin/settings');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/settings');
      });
    });

    // update meta body
    app.post("/updatemetabody", (req, res) => {
      let { _id, meta_body } = req.body;
      
      db.Portfolio.updateOne({_id}, {'site_settings.meta_body': meta_body})
      .then((result) => {
        req.flash(
          'success',
          'Meta body successfully updated.'
        );
        res.redirect('/admin/settings');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/settings');
      });
    });

    // update web site info (name & description)
    app.post("/updatesiteinformation", (req, res) => {
      let { _id, site_description, site_name } = req.body;

      db.Portfolio.updateOne({_id}, {'site_settings.site_description': site_description, 'site_settings.site_name': site_name})
      .then((result) => {
        req.flash(
          'success',
          'Site information successfully updated.'
        );
        res.redirect('/admin/settings');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/settings');
      });
    });

    // update title
    app.post("/updatetitle", (req, res) => {
      const { _id, title } = req.body;
      db.Portfolio.updateOne({_id},{title})
      .then((result) => {
        req.flash(
          'success',
          'Title successfully edited.'
        );
        res.redirect('/admin/content');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/content');
      });
    });

    // update subtitle
    app.post("/updatesubtitle", (req, res) => {
      const { _id, subtitle } = req.body;
      db.Portfolio.updateOne({_id},{subtitle})
      .then((result) => {
        req.flash(
          'success',
          'Subtitle successfully edited.'
        );
        res.redirect('/admin/content');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
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
            'success',
            'Menu item successfully added.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/content');
      });
    });

    // update menu item
    app.post("/updatemenuitem", (req, res) => {
      const { _id, _menu, text, url } = req.body;
      db.Portfolio.findOneAndUpdate(
        { _id, "menu._id": _menu }, {"menu.$.url": url, "menu.$.text": text})
        .then((result) => {
          req.flash(
            'success',
            'Menu item successfully edited.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
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
            'success',
            'Social link successfully added.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/content');
      });
    });

    // update social
    app.post("/updatesocial", (req, res) => {
      const { icon, _id, name, _social, url } = req.body;
      db.Portfolio.findOneAndUpdate(
        { _id, "social._id": _social }, {"social.$.name": name, "social.$.url": url, "social.$.icon": icon})
        .then((result) => {
          req.flash(
            'success',
            'Menu item successfully edited.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
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
            'success',
            'About text successfully updated.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
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
            'success',
            'Portfolio introduction successfully updated.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
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
            'success',
            'Project successfully added.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
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
        { _id, "portfolio.projects._id": _project }, {"portfolio.projects.$.url": url, "portfolio.projects.$.text": text, "portfolio.projects.$.title": title, "portfolio.projects.$.bullets": bullets} )
        .then((result) => {
          req.flash(
            'success',
            'Project successfully updated.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/content');
      });
    });

    // update resume
    app.post("/updateresume", (req, res) => {
      const { _id, resume } = req.body;
      db.Portfolio.updateOne({_id},{resume})
      .then((result) => {
        req.flash(
          'success',
          'Resume successfully edited.'
        );
        res.redirect('/admin/content');
      })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
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
            'success',
            'Technology successfully added.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/content');
      });
    });

    // update technology
    app.post("/updatetechnology", (req, res) => {
      const { _id, name, score, type, _technology } = req.body;
      db.Portfolio.findOneAndUpdate(
        { _id, "technology._id": _technology }, {"technology.$.name": name, "technology.$.score": score, "technology.$.type": type} )
        .then((result) => {
          req.flash(
            'success',
            'Technology successfully edited.'
          );
          res.redirect('/admin/content');
        })
        .catch((error) => {
        // If an error occurred, send it to the client
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/admin/content');
      });
    });

    // add user
    app.post("/adduser", (req, res) => {
      let { username, email, password, passwordCheck, admin } = req.body;
      if (admin == "on") {admin = true};

      if ( !username || !email || !password || !passwordCheck ) {
        req.flash(
          'error',
          'Please fill out all fields when adding a new user.'
        );

        return res.redirect('/admin/users'); 
      }

      //check if password verification passes
      if (password !== passwordCheck) {
        req.flash(
          'error',
          'Password verification failed.'
        );
        return res.redirect('/admin/users');
      }

      //Hash Password
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) throw error;

          //reassign password var to newley hashed password
          password = hash;
          
          //create user in database
          db.Users
          .create({username, email, password, admin})
            .then((result) => {
              req.flash(
                'success',
                'User successfully added.'
              );
              res.redirect('/admin/users');
            })
            .catch((error) => {
            // If an error occurred, send it to the client
            console.log(error);
            req.flash('error', error.message);
            res.redirect('/admin/users');
          });
        })
      })

    });

    // edit user (basic information)
    app.post("/edituserbasic", (req, res) => {
      let { _id, username, email, admin } = req.body;
      if (admin == "on") {admin = true};

      if ( !username || !email ) {
        req.flash(
          'error',
          'Please fill out all fields when editing user.'
        );

        return res.redirect(`/admin/users/edit/${_id}`); 
      }

      Controller.Users.onlyOneAdmin( _id).then(userIsAdmin => {
        if (userIsAdmin && !admin) {
          req.flash(
            'error',
            'Cannot remove last admin user account.'
          );
          return res.redirect(`/admin/users/edit/${_id}`);
        }

        //update user in database
        db.Users.findOneAndUpdate(
          { _id }, {username, email, admin})
          .then((result) => {
            req.flash(
              'success',
              'User successfully edited.'
            );
            res.redirect(`/admin/users/edit/${_id}`);
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error', error.message);
          res.redirect(`/admin/users/edit/${_id}`);
        });
      })

    });

    // edit user (password)
    app.post("/edituserpassword", (req, res) => {
      let { _id, password, passwordCheck} = req.body;

      if ( !password || !passwordCheck ) {
        req.flash(
          'error',
          'Please fill out both password fields.'
        );

        return res.redirect(`/admin/users/edit/${_id}`); 
      }

      //check if password verification passes
      if (password !== passwordCheck) {
        req.flash(
          'error',
          'Password verification failed.'
        );
        return res.redirect(`/admin/users/edit/${_id}`);
      }

      //Hash Password
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) throw error;

          //reassign password var to newley hashed password
          password = hash;
          
          //update user in database
          db.Users.findOneAndUpdate(
            { _id }, {password, passwordCheck})
            .then((result) => {
              req.flash(
                'success',
                'User successfully edited.'
              );
              res.redirect(`/admin/users/edit/${_id}`);
            })
            .catch((error) => {
            // If an error occurred, send it to the client
            console.log(error);
            req.flash('error', error.message);
            res.redirect(`/admin/users/edit/${_id}`);
          });
        })
      })

    });

    // login user
    app.post("/login", (req, res, next) => {
      passport.authenticate('local', {
        successRedirect:  '/admin/dashboard',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
    });

    // logout user
    app.post("/logout", (req, res) => {
      req.logout();
      req.flash(
        'success',
        'Successfully logged out.'
      );

      res.redirect('/login');
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
              'success',
              'Menu item successfully deleted.'
            );
            res.redirect('/admin/content');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error', error.message);
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
              'success',
              'Social link successfully deleted.'
            );
            res.redirect('/admin/content');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error', error.message);
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
              'success',
              'Technology successfully deleted.'
            );
            res.redirect('/admin/content');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error', error.message);
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
              'success',
              'Project successfully deleted.'
            );
            res.redirect('/admin/content');
          })
          .catch((error) => {
          // If an error occurred, send it to the client
          console.log(error);
          req.flash('error', error.message);
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
          req.flash('error', error.message);
          res.end(`{"error" : "${error.message}", "status" : 400}`);
        });
      });

      // delete user
      app.post("/deleteuser", (req, res) => {
        const { _id, isAdmin } = req.body;

        Controller.Users.onlyOneAdmin( _id).then(userIsAdmin => {
            if (userIsAdmin) {
              req.flash(
                'error',
                'Cannot delete last admin user account.'
              );
              return res.redirect(`/admin/users/edit/${_id}`);
            }

            db.Users
            .deleteOne({_id})
              .then((result) => {
                req.flash(
                  'success',
                  'User successfully deleted.'
                );
                res.redirect('/admin/users');
              })
              .catch((error) => {
                // If an error occurred, send it to the client
                console.log(error);
                req.flash('error', error.message);
                res.redirect(`/admin/users/edit/${_id}`);
            });
          })
        });
};
