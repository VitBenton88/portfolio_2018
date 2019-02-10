// Routes
// =============================================================
module.exports = function(app, db, dotenv, nodemailer, validator) {
    // GET
    // =============================================================
    // homepage route
    app.get("/", (req, res) => {
        db.Admin.find()
        .then(function(content) {
          console.log(content);
          res.render("index", {content});
        });
    });

    // admin route
    app.get("/admin", (req, res) => {
        db.Admin.find()
        .then(function(content) {
          console.log(content);
          res.render("admin", {content, layout: "admin"});
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

      let replyTo = req.body.email;
      let name = req.body.name;
      let text = req.body.message;
      let subject = `${name} @ ${replyTo} contacted you through VitBenton.com!`;

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
          replyTo,
          to: process.env.EMAIL_REC,
          subject,
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
};
